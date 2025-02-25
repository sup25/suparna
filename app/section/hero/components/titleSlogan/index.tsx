import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GiBridge, GiHanger } from "react-icons/gi";
import { useTheme } from "@/app/context/themeProvider";
import { Animate } from "@/app/animation";
import { GitBranch } from "lucide-react";
const TitleSlogan = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <div className="w-full ">
      <h1 className=" md:text-5xl text-4xl  font-semibold font-dmSerifDisplay text-center text-[rgb(var(--foreground))] mb-8">
        Suparna Adhikari
      </h1>

      <div className="mt-4 md:text-2xl text-xl text-[rgb(var(--foreground))] flex items-center ">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
          }}
        >
          <GitBranch size={40} className="mr-2 text-[rgb(var(--foreground))]" />
        </motion.div>
        <h2 className="text-xl font-medium font-inter text-[rgb(var(--foreground))] mt-4">
          Bridging Front and Back-End for Success
        </h2>
      </div>
    </div>
  );
};

export default TitleSlogan;
