"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Turnstile from "react-turnstile";
import SectionHeader from "./section-header";
import SocialLinks from "./social-links";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "sending" | "success" | "error";

const initialForm = { name: "", email: "", message: "" };

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState(initialForm);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  /** Bumping this remounts the widget to get a fresh token after a send. */
  const [widgetKey, setWidgetKey] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(".contact-info-item", {
        x: -24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      })
        .from(
          ".contact-form-wrap",
          { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .from(
          ".field-wrap",
          {
            y: 16,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "all",
          },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Please complete the verification challenge first.");
      return;
    }

    setStatus("sending");

    const honeypot = (
      e.currentTarget.elements.namedItem("company") as HTMLInputElement | null
    )?.value;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token, company: honeypot }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        setToken(null);
        setWidgetKey((k) => k + 1);
        return;
      }

      setStatus("success");
      setForm(initialForm);
      setToken(null);
      setWidgetKey((k) => k + 1);
    } catch {
      setStatus("error");
      setError("Could not reach the server. Please try again.");
    }
  };

  const fieldClass =
    "rounded-xl border border-line bg-bg-elevated p-3 font-inter text-sm text-fg placeholder:text-fg-faint transition focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10";

  const details = [
    {
      key: "Email",
      value: (
        <a
          href={`mailto:${site.email}`}
          className="border-b border-accent-border pb-px text-accent transition-colors hover:border-accent"
        >
          {site.email}
        </a>
      ),
    },
    { key: "Based in", value: `${site.location.city}, ${site.location.country}` },
    { key: "Replies in", value: "24 hours" },
    { key: "Open to", value: "Freelance & full-time" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section scroll-mt-24 section-y"
    >
      <div className="container">
        <div className="grid gap-16 md:grid-cols-[1fr_1.35fr] md:gap-20">
          {/* Left */}
          <div>
            <SectionHeader
              index="05"
              eyebrow="Contact"
              title="Let's talk"
              intro="Got a project in mind, or just want to say hi? My inbox is always open. I'll get back to you within 24 hours."
            />

            <dl className="mb-9 flex flex-col gap-2.5 font-inter">
              {details.map((item) => (
                <div
                  key={item.key}
                  className="contact-info-item flex items-baseline gap-4 text-sm"
                >
                  <dt className="w-24 shrink-0 text-fg-subtle">{item.key}</dt>
                  <dd className="text-fg">{item.value}</dd>
                </div>
              ))}
            </dl>

            <hr className="mb-7 border-line" />
            <SocialLinks />
          </div>

          {/* Form */}
          <div className="contact-form-wrap overflow-hidden rounded-2xl border border-line bg-bg-elevated shadow-sm">
            <form onSubmit={handleSubmit} noValidate>
              <div className="p-7 pb-5 sm:p-10 sm:pb-6">
                {/* Honeypot: hidden from users, checked on the server */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="field-wrap flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="eyebrow text-fg-subtle"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      autoComplete="name"
                      className={fieldClass}
                    />
                  </div>

                  <div className="field-wrap flex flex-col gap-2">
                    <label htmlFor="email" className="eyebrow text-fg-subtle">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      maxLength={200}
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="field-wrap mt-5 flex flex-col gap-2">
                  <label htmlFor="message" className="eyebrow text-fg-subtle">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project…"
                    value={form.message}
                    onChange={handleChange}
                    required
                    maxLength={5000}
                    className={`${fieldClass} h-32 resize-none`}
                  />
                </div>
              </div>

              <div className="field-wrap px-7 sm:px-10">
                <Turnstile
                  key={widgetKey}
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onVerify={(t) => {
                    setToken(t);
                    setError(null);
                  }}
                  /* Tokens expire after ~5 minutes. Without these the form
                     would silently submit a stale token and fail. */
                  onExpire={() => setToken(null)}
                  onError={() => setToken(null)}
                  size="flexible"
                  className="w-full"
                />
              </div>

              <div className="px-7 py-6 sm:px-10">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-xl border-2 border-fg bg-fg px-8 py-3.5 font-inter text-sm font-semibold text-bg-elevated transition-all duration-200 hover:bg-bg-elevated hover:text-fg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message →"}
                </button>

                <div aria-live="polite">
                  {status === "success" && (
                    <p className="mt-4 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 font-inter text-sm text-green-700">
                      <span aria-hidden="true">✓</span>
                      Message sent. I&apos;ll get back to you soon.
                    </p>
                  )}
                  {error && (
                    <p className="mt-4 flex items-center gap-3 rounded-xl border border-accent-border bg-accent-soft p-4 font-inter text-sm text-accent">
                      <span aria-hidden="true">✕</span>
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
