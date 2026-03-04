const HeroContent = () => {
  return (
    <div className="hero-content w-full">
      {/* Label */}
      <div className="hero-label mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E4E4E4] border border-[#C8C8C8]">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#ABABAB]" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-marcellus font-bold text-black">
            Full-Stack Developer
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-1 mb-12">
        {[
          { text: "Turning Complex", italic: false },
          { text: "Problems Into", italic: true },
          { text: "Scalable Solutions.", italic: false },
        ].map((line, i) => (
          <div key={i} className="overflow-hidden pb-2">
            <h1
              className={`title-inner inline-block font-bricolage text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight ${
                line.italic ? "italic" : ""
              }`}
              style={{
                color: i === 1 ? "#6B6B6B" : "#1A1A1A",
                fontWeight: i === 1 ? 400 : 700,
              }}
            >
              {line.text}
            </h1>
          </div>
        ))}
      </div>

      <div className="accent-line mb-10 h-px w-full bg-[#D4D4D4]" />

      <p className="hero-subtitle font-marcellus text-base md:text-lg font-light leading-relaxed text-[#6B6B6B]">
        I turn complex problems into clean, fast products
        <em className="not-italic font-marcellus text-[#1A1A1A]">
          {" "}
          from the first commit to the final deploy.
        </em>{" "}
        Let's build something people actually use.
      </p>
    </div>
  );
};

export default HeroContent;
