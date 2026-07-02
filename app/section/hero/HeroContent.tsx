const HeroContent = () => {
  return (
    <div className="hero-content w-full">
      {/* Label */}
      <div className="hero-label mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#E4E4E4] border border-[#C8C8C8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ABABAB]" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-inter font-bold text-black">
            Full-Stack Developer
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="font-bricolage text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight font-bold text-[#1A1A1A]">
          Full Stack Developer based in Nepal
        </h1>
      </div>

      {/* Accent line */}
      <div className="mb-6 h-px w-full bg-[#D4D4D4]" />

      {/* Subtitle */}
      <p className="font-inter text-2xl md:text-3xl lg:text-4xl font-medium text-[#6B6B6B]">
        Building production-ready systems end-to-end.
      </p>
    </div>
  );
};

export default HeroContent;
