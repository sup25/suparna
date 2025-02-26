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
      <h1 className=" heading font-dmSerifDisplay text-start text-[rgb(var(--foreground))] mb-8">
        Suparna Adhikari
      </h1>

      <div className="mt-4  flex items-center ">
        <GitBranch size={40} className="mr-2 text-[rgb(var(--foreground))]" />
        <h2 className="md:text-2xl text-xl font-medium font-inter text-[rgb(var(--foreground))] mt-4">
          Bridging Front and Back-End for Success
        </h2>
      </div>
    </div>
  );
};

export default TitleSlogan;
