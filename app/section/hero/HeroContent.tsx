const HeroContent = () => {
  return (
    <div className="hero-content w-full">
      {/* Label */}
      <div className="hero-label mb-10 animate-fade-up [animation-delay:0ms]">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E4E4E4] border border-[#C8C8C8]">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#ABABAB]" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-inter font-bold text-black">
            Full-Stack Developer
          </span>
        </div>
      </div>

      {/* Title lines — staggered */}
      <div className="space-y-1 mb-12">
        {[
          { text: "Turning Complex", italic: false },
          { text: "Problems Into", italic: true },
          { text: "Scalable Solutions.", italic: false },
        ].map((line, i) => (
          <div key={i} className="overflow-hidden pb-2">
            <h1
              className={`inline-block font-bricolage text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight
                animate-slide-up opacity-0 [animation-fill-mode:forwards]
                ${line.italic ? "italic" : ""}
              `}
              style={{
                color: i === 1 ? "#6B6B6B" : "#1A1A1A",
                fontWeight: i === 1 ? 400 : 700,
                animationDelay: `${150 + i * 120}ms`,
              }}
            >
              {line.text}
            </h1>
          </div>
        ))}
      </div>

      {/* Accent line */}
      <div className="mb-10 h-px w-0 bg-[#D4D4D4] animate-expand-x [animation-delay:600ms] [animation-fill-mode:forwards]" />

      {/* Subtitle */}
      <p
        className="font-inter text-base md:text-lg font-light leading-relaxed text-[#6B6B6B]
          animate-fade-up opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards]"
      >
        I turn complex problems into clean, fast products
        <em className="not-italic font-inter text-[#1A1A1A]">
          {" "}
          from the first commit to the final deploy.
        </em>{" "}
        Let's build something people actually use.
      </p>
    </div>
  );
};
export default HeroContent;
