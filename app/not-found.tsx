"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NotFoundPage = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const codeRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Staggered fade-up entrance — clean, no horizontal movement
      tl.fromTo(
        codeRef.current,
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, delay: 0.2 },
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.inOut" },
          "-=0.4",
        )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2",
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.35",
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3",
        );
    });

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.22,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.22,
      ease: "power2.out",
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-[80vh] text-center overflow-hidden">
      {/* 404 number */}
      <span
        ref={codeRef}
        className="block text-[10rem] font-bricolage leading-none font-black tracking-tighter select-none"
      >
        404
      </span>

      {/* Divider line */}
      <div ref={lineRef} className="w-16 h-px my-5 origin-left bg-black" />

      {/* Heading */}
      <h1
        ref={headingRef}
        className="text-2xl font-semibold tracking-wide text-black mb-3"
      >
        Page Not Found
      </h1>

      {/* Sub text */}
      <p
        ref={textRef}
        className="text-sm text-zinc-400 mb-10 max-w-xs leading-relaxed"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        The page you&apos;re looking for has moved, been removed, or never
        existed.
      </p>

      {/* Button */}
      <a
        ref={buttonRef}
        href="/"
        className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium text-black"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        ← Go Back Home
      </a>
    </div>
  );
};

export default NotFoundPage;
