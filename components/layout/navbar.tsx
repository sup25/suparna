"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { navigation } from "@/content/site";
import { cn } from "@/lib/utils";

/** Nav entries plus the one route that lives outside the home page sections. */
const entries = [...navigation, { id: "blog", href: "/blogs", name: "Blog" }];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    /* Nothing to observe off the home page. No state reset needed here:
       every read of `active` is already gated on `isHome`. */
    if (!isHome) return;

    const sections = navigation
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    /**
     * Track the entry closest to the viewport centre rather than reacting to
     * every intersection. The previous version set `active` on each
     * intersecting entry in turn, so with two sections on screen the winner
     * depended on callback ordering.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  /* Close on route change, so a browser back out of the panel never leaves it
     up. Adjusted during render rather than in an effect: setState in an effect
     body costs a second render pass, and React supports this pattern directly
     for state that has to follow a changing input. */
  const [panelRoute, setPanelRoute] = useState(pathname);
  if (panelRoute !== pathname) {
    setPanelRoute(pathname);
    setOpen(false);
  }

  /* Escape closes; the page underneath stops scrolling while it is open. */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const { overflow } = document.body.style;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Panel links rise in on open. Reduced motion gets them composed. */
  useEffect(() => {
    if (!open || !panelRef.current) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const links = panelRef.current.querySelectorAll(".nav-panel-link");

    if (reduce) {
      gsap.set(links, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      links,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.05,
        delay: 0.08,
      },
    );

    return () => {
      tween.kill();
    };
  }, [open]);

  const isActive = useCallback(
    (id: string) =>
      id === "blog" ? pathname.startsWith("/blogs") : isHome && active === id,
    [pathname, isHome, active],
  );

  const linkClass = (current: boolean) =>
    cn(
      "relative whitespace-nowrap font-inter text-xs font-bold uppercase tracking-wider transition-colors duration-300 md:text-sm",
      "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300",
      current
        ? "text-fg after:w-full"
        : "text-fg-muted after:w-0 hover:text-fg hover:after:w-full",
    );

  const currentLabel = entries.find((e) => isActive(e.id))?.name ?? "Menu";

  return (
    <>
      <div
        ref={navRef}
        className="section sticky top-4 z-50 md:top-6"
        role="navigation"
        aria-label="Main"
      >
        <div className="container flex justify-center">
          <div className="flex w-max max-w-full items-center rounded-full border border-white/40 bg-white/60 shadow-sm backdrop-blur-lg">
            {/* Desktop: every entry laid out flat. Below md there is no room for
                seven of these, and letting them scroll inside the pill only
                clipped the last label mid-word with nothing to say it scrolled. */}
            <div className="hidden items-center gap-6 px-6 py-2.5 md:flex">
              {entries.map((entry) => (
                <Link
                  key={entry.id}
                  href={entry.href}
                  className={linkClass(isActive(entry.id))}
                  aria-current={isActive(entry.id) ? "true" : undefined}
                >
                  {entry.name}
                </Link>
              ))}
            </div>

            {/* Mobile: where you are, plus a way to go elsewhere. */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-panel"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex items-center gap-3 rounded-full py-2.5 pl-5 pr-3 md:hidden"
            >
              <span className="font-inter text-xs font-bold uppercase tracking-wider text-fg">
                {currentLabel}
              </span>

              <span
                className="relative block h-8 w-8 rounded-full bg-fg/5"
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 bg-fg transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    open ? "rotate-45" : "-translate-y-[3.5px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 bg-fg transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    open ? "-rotate-45" : "translate-y-[3.5px]",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Panel. Fixed, so the blur sits on a stationary layer rather than over
          scrolling content. */}
      <div
        id="nav-panel"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 z-40 bg-bg/90 backdrop-blur-xl md:hidden"
      >
        <nav
          aria-label="Mobile"
          className="section h-full items-center pb-16 pt-28"
        >
          <ul className="container space-y-1">
            {entries.map((entry) => {
              const current = isActive(entry.id);
              return (
                <li key={entry.id}>
                  <Link
                    href={entry.href}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "true" : undefined}
                    className={cn(
                      "nav-panel-link flex items-baseline gap-4 py-3 font-bricolage text-3xl font-semibold tracking-tight transition-colors duration-300 sm:text-4xl",
                      current ? "text-accent" : "text-fg",
                    )}
                  >
                    {entry.name}
                    {current && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
