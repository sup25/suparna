"use client";

import { forwardRef } from "react";

interface WatermarkProps {
  text?: string;
}

const Watermark = forwardRef<HTMLDivElement, WatermarkProps>(
  ({ text = "SUPARNA" }, ref) => {
    const lines = Array(7).fill(text);

    return (
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        style={{
          maskImage: `
            linear-gradient(
              to bottom,
              transparent 0%,
              black 20%,
              black 80%,
              transparent 100%
            )
          `,
        }}
      >
        <div
          ref={ref}
          className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col justify-between items-center opacity-60 mix-blend-multiply w-screen h-full py-[2vh]"
        >
          {lines.map((line, i) => (
            <span
              key={i}
              className="block text-center whitespace-nowrap"
              style={{
                fontSize: "clamp(16vw, 22vw, 260px)",
                fontFamily: "var(--font-bungee-shade), serif",
                letterSpacing: "0.05em",
                lineHeight: 0.9,
                color: "var(--red-shade)",
                width: "120%",
                marginLeft: "-10%",
                transform: `translateX(${i % 2 === 0 ? "-3%" : "3%"})`,
              }}
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    );
  },
);

Watermark.displayName = "Watermark";

export default Watermark;
