import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Previously the browser held the Turnstile token, checked only that it was
 * non-empty, and then called EmailJS directly. The CAPTCHA was therefore
 * decorative: TURNSTILE_SECRET_KEY was never read by any code, and a bot could
 * skip the widget entirely and POST to EmailJS with the public key.
 *
 * This route does the verification that was missing: the token is validated
 * against Cloudflare's siteverify endpoint server-side, and only then is the
 * email dispatched. The EmailJS private key never reaches the client.
 *
 * Required environment variables:
 *   TURNSTILE_SECRET_KEY        Cloudflare Turnstile secret (server-only)
 *   EMAILJS_SERVICE_ID          EmailJS service id
 *   EMAILJS_TEMPLATE_ID         EmailJS template id
 *   EMAILJS_PUBLIC_KEY          EmailJS public key
 *   EMAILJS_PRIVATE_KEY         EmailJS private key (server-only)
 *
 * EmailJS also requires "Allow EmailJS API for non-browser applications" to be
 * enabled under Account → Security, otherwise server-side sends are rejected.
 */

const MAX_LENGTHS = { name: 100, email: 200, message: 5000 } as const;

/**
 * Best-effort in-memory rate limit. Resets on cold start and is per-instance,
 * so it is a speed bump rather than a guarantee. Turnstile is the real
 * control. Good enough to stop a naive loop.
 */
const RATE_LIMIT = { windowMs: 60_000, max: 3 };
const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT.windowMs,
  );
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) hits.clear();

  return recent.length > RATE_LIMIT.max;
}

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[contact] TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.warn("[contact] turnstile rejected:", data["error-codes"]);
    }
    return data.success === true;
  } catch (error) {
    console.error("[contact] turnstile verification failed:", error);
    return false;
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip");

  if (isRateLimited(ip ?? "unknown")) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message, token, company } = payload as Record<
    string,
    string | undefined
  >;

  // Honeypot: real users never see this field, so anything in it is a bot.
  // Return 200 so the bot cannot distinguish rejection from success.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 },
    );
  }

  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return NextResponse.json(
      { error: "One or more fields is too long." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  if (!token) {
    return NextResponse.json(
      { error: "Please complete the verification challenge." },
      { status: 400 },
    );
  }

  if (!(await verifyTurnstile(token, ip))) {
    return NextResponse.json(
      { error: "Verification failed. Please try the challenge again." },
      { status: 403 },
    );
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.error("[contact] EmailJS environment variables are incomplete");
    return NextResponse.json(
      { error: "The contact form is not configured. Please email directly." },
      { status: 500 },
    );
  }

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          from_name: name.trim(),
          from_email: email.trim(),
          message: message.trim(),
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] EmailJS rejected the send:", res.status, detail);
      return NextResponse.json(
        { error: "Could not send the message. Please email directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] send failed:", error);
    return NextResponse.json(
      { error: "Could not send the message. Please email directly." },
      { status: 500 },
    );
  }
}
