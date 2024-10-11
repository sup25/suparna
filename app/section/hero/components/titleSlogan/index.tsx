import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GiHanger } from "react-icons/gi";
import { useTheme } from "@/app/context/themeProvider";
const TitleSlogan = () => {
  const [isClient, setIsClient] = useState(false);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <div className="w-full ">
      <motion.h1
        className="md:text-6xl text-4xl font-dmSerifDisplay text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {["S", "u", "p", "a", "r", "n", "a"].map((char, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block" }}
            initial={{ color: "#FFD700" }}
            animate={{ color: isDarkTheme ? "#ffffff" : "#000000" }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
          >
            {char}
          </motion.span>
        ))}
        <span> </span>
        {["A", "d", "h", "i", "k", "a", "r", "i"].map((char, i) => (
          <motion.span
            key={i + 7}
            style={{ display: "inline-block" }}
            initial={{ color: "#FFD700" }}
            animate={{ color: isDarkTheme ? "#ffffff" : "#000000" }}
            transition={{ delay: (i + 7) * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        className="mt-4 md:text-2xl text-xl text-[rgb(var(--foreground))] flex items-center "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
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
          <GiHanger size={40} className="mr-2 text-[rgb(var(--foreground))]" />
        </motion.div>
        <motion.h2
          className="text-xl font-medium font-inter text-[rgb(var(--foreground))] mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Bridging Front and Back-End for Success
        </motion.h2>
      </motion.div>
    </div>
  );
};

export default TitleSlogan;
