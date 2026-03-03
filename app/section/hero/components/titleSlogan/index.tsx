"use client";
import { useEffect, useState } from "react";
import { GitBranch } from "lucide-react";
const TitleSlogan = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <div className="w-full ">
      <div className="hero-label mb-8">
        <div className="inline-block px-3 py-1.5 border border-black">
          <span className="text-[10px] uppercase tracking-[0.3em] font-light">
            Full-Stack Developer
          </span>
        </div>
      </div>

      <div className="mt-4  flex items-center ">
        <h2 className="md:text-2xl text-xl font-medium font-inter text-[rgb(var(--foreground))] mt-4">
          Bridging Front and Back-End for Success
        </h2>
      </div>
    </div>
  );
};

export default TitleSlogan;
