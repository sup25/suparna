import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Briefcase,
  List,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  closePopUp: () => void;
  work: {
    title: string;
    about: {
      title: string;
      desc: string;
      images: string[];
      keyfeatures: string[];
      responsibility: string[];
    };
    link?: string;
  };
}

const PopUpWorkDetails = ({ closePopUp, work }: Props) => {
  const [currentSection, setCurrentSection] = useState<
    "gallery" | "features" | "contribution"
  >("gallery");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % work.about.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + work.about.images.length) % work.about.images.length
    );
  };

  const sectionContent = {
    gallery: (
      <div className="relative h-full w-full bg-black flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={work.about.images[currentImageIndex]}
            alt={`Project image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-4">
          <motion.button
            onClick={prevImage}
            className="bg-gray-400 p-2 rounded-full text-white hover:bg-gray-600 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={nextImage}
            className="bg-gray-400 p-2 rounded-full text-white hover:bg-gray-600 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    ),
    features: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="h-full overflow-y-auto p-6"
      >
        <h3 className="text-2xl font-inter font-bold mb-4 text-[rgb(var(--background))]">
          Key Features
        </h3>
        <ul className="space-y-4">
          {work.about.keyfeatures.map((feature, index) => (
            <motion.li
              key={index}
              className="bg-[#f5f5f5] font-inter text-black p-4 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    ),
    contribution: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="h-full overflow-y-auto p-6"
      >
        <h3 className="text-2xl font-bold font-inter mb-4 text-[rgb(var(--background))]">
          My Contributions
        </h3>
        <ul className="space-y-4">
          {work.about.responsibility.map((task, index) => (
            <motion.li
              key={index}
              className="bg-green-50 p-4 rounded-lg font-inter text-black"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {task}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    ),
  };

  return (
    <motion.div
      onClick={closePopUp}
      className="fixed inset-0 z-[9999999] bg-black/80 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-[rgb(var(--foreground))] rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex flex-col h-[80vh]">
          {/* Header */}
          <div className="bg-[rgb(var(--foreground))] p-6 text-[rgb(var(--background))]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl text-yellow-500 font-dmSerifDisplay font-bold">
                {work.title}
              </h2>
              <button
                onClick={closePopUp}
                className="text-[rgb(var(--background))] hover:text-gray-500 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <p className="mt-2 font-inter text-[rgb(var(--background))]">
              {work.about.desc}
            </p>
          </div>

          {/* Main Content */}
          <div className="flex-grow relative overflow-hidden">
            <AnimatePresence mode="wait" key={currentSection}>
              {sectionContent[currentSection]}
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          <div className="bg-[rgb(var(--foreground))] p-4 flex justify-between items-center">
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSection("gallery")}
                className={`p-2 rounded-lg flex items-center ${
                  currentSection === "gallery"
                    ? "bg-yellow-500 text-white"
                    : "text-[rgb(var(--background))]"
                }`}
              >
                <Camera size={20} className="mr-2 font-inter" /> Gallery
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSection("features")}
                className={`p-2 rounded-lg flex items-center ${
                  currentSection === "features"
                    ? "bg-yellow-500 text-white"
                    : "text-[rgb(var(--background))]"
                }`}
              >
                <List size={20} className="mr-2 font-inter" /> Features
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSection("contribution")}
                className={`p-2 rounded-lg flex items-center ${
                  currentSection === "contribution"
                    ? "bg-yellow-500 text-white"
                    : "text-[rgb(var(--background))]"
                }`}
              >
                <Briefcase size={20} className="mr-2 font-inter" />{" "}
                Contributions
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PopUpWorkDetails;
