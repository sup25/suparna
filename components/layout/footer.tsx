import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FileUser } from "lucide-react";
import { site, navigation } from "@/content/site";
import FooterWordmark from "./footer-wordmark";
import { wordmarkBand } from "@/lib/wordmark";

/** Kept here so the reserved band below matches what the mark actually draws. */
const WORDMARK = "SUPARNA";

const socialLinks = [
  { name: "LinkedIn", href: site.socials.linkedin, Icon: FaLinkedinIn },
  { name: "GitHub", href: site.socials.github, Icon: FaGithub },
  { name: "Résumé", href: site.socials.resume, Icon: FileUser },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Curved separator into the footer ground */}
      <div className="-mb-[2px] w-full overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="h-[80px] w-full"
        >
          <path
            d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z"
            className="fill-bg-subtle"
          />
        </svg>
      </div>

      <footer className="section relative isolate overflow-hidden bg-bg-subtle">
        <FooterWordmark text={WORDMARK} />

        {/* Content clears the mark rather than sitting on it: the reserved band
            is the mark's own cropped height plus a gap. */}
        <div
          className="container relative z-10 pt-4"
          style={{ paddingBottom: `calc(${wordmarkBand(WORDMARK)} + 2.5rem)` }}
        >
          <div className="grid gap-12 pt-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
            {/* Identity */}
            <div>
              <h2 className="font-bricolage text-2xl font-semibold tracking-tight md:text-3xl">
                Building something meaningful
              </h2>
              <p className="mt-4 max-w-sm font-inter text-sm leading-relaxed text-fg-muted">
                Available for freelance and full-time opportunities. Open to
                collaborations and interesting projects.
              </p>

              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-block border-b border-accent-border pb-px font-inter text-sm text-accent transition-colors hover:border-accent"
              >
                {site.email}
              </a>

              <div className="mt-7 flex items-center gap-3">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg-elevated text-fg-muted transition-colors hover:border-accent-border hover:bg-accent-soft hover:text-accent"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <nav aria-label="Footer">
              <p className="eyebrow mb-5">Navigate</p>
              <ul className="space-y-3">
                {navigation.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm text-fg-muted transition-colors hover:text-accent"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/blogs"
                    className="font-inter text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* fg-muted, not fg-subtle: the latter measured 3.17:1 on the bare
              background, under AA before the wordmark was ever a factor. */}
          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-inter text-sm text-fg-muted">
              © {year} {site.name}
            </p>
            <p className="font-inter text-sm text-fg-muted">
              {site.location.city}, {site.location.country} · Available remotely
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
