import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Briefcase,
  List,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Loading } from "../loading";

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
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopUp();
    }
  };

  const nextImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev + 1) % work.about.images.length);
  };

  const prevImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex(
      (prev) => (prev - 1 + work.about.images.length) % work.about.images.length
    );
  };

  const sectionContent = {
    gallery: (
      <div className="relative w-full h-full bg-gray-900 flex items-center justify-center p-3 md:p-6">
        <AnimatePresence mode="wait">
          <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center">
            {!imageLoaded && <Loading />}
            <motion.img
              key={currentImageIndex}
              src={work.about.images[currentImageIndex]}
              alt={`Project image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-md border border-[rgb(255,215,0)]/30 shadow-sm"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{
                opacity: imageLoaded ? 1 : 0,
                scale: imageLoaded ? 1 : 0.98,
              }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>
        </AnimatePresence>

        {work.about.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 p-1.5 md:p-2 rounded-full text-[rgb(255,215,0)] hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 p-1.5 md:p-2 rounded-full text-[rgb(255,215,0)] hover:bg-gray-700 transition-colors"
            >
              <ChevronRight size={14} />
            </button>

            <div className="absolute inset-x-0 bottom-3 md:bottom-6 flex justify-center gap-1.5 md:gap-2">
              {work.about.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setImageLoaded(false); // Reset loading state on manual selection
                    setCurrentImageIndex(index);
                  }}
                  className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full transition-all ${
                    currentImageIndex === index
                      ? "bg-[rgb(255,215,0)]"
                      : "bg-gray-500 hover:bg-[rgb(255,215,0)]/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    ),

    features: (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="w-full px-3 py-4 md:px-6 md:py-6 bg-gray-900 overflow-y-auto"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[rgb(255,215,0)] border-b border-[rgb(255,215,0)]/30 pb-2">
          Key Features
        </h3>
        <ul className="space-y-2 md:space-y-3">
          {work.about.keyfeatures.map((feature, index) => (
            <motion.li
              key={index}
              className="bg-gray-800/50 p-3 md:p-4 rounded-md text-gray-200 text-sm md:text-base border border-[rgb(255,215,0)]/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-[rgb(255,215,0)]">• </span>
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    ),

    contribution: (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="w-full px-3 py-4 md:px-6 md:py-6 bg-gray-900 overflow-y-auto"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[rgb(255,215,0)] border-b border-[rgb(255,215,0)]/30 pb-2">
          My Contributions
        </h3>
        <ul className="space-y-2 md:space-y-3">
          {work.about.responsibility.map((task, index) => (
            <motion.li
              key={index}
              className="bg-gray-800/50 p-3 md:p-4 rounded-md text-gray-200 text-sm md:text-base border border-[rgb(255,215,0)]/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-[rgb(255,215,0)]">• </span>
              {task}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    ),
  };

  return (
    <motion.div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 rounded-lg shadow-lg w-full max-w-[95vw] md:max-w-5xl max-h-[85vh] flex flex-col border border-[rgb(255,215,0)]/20"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-3 md:p-4 text-white border-b border-[rgb(255,215,0)]/20 shrink-0 relative">
          <motion.button
            onClick={closePopUp}
            className="absolute top-2 right-2 md:top-3 md:right-3 bg-gray-800 hover:bg-[rgb(255,215,0)] text-[rgb(255,215,0)] hover:text-gray-900 p-1.5 md:p-2 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={14} />
          </motion.button>
          <div className="mt-6 md:mt-0">
            <h2 className="text-xl md:text-2xl font-semibold text-[rgb(255,215,0)] tracking-tight">
              {work.title}
            </h2>
            <div className="flex items-center gap-2 md:gap-3 mt-1">
              <p className="text-gray-300 text-xs md:text-sm max-w-full leading-relaxed flex-1">
                {work.about.desc}
              </p>
              {work.link && (
                <motion.a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 bg-gray-800 hover:bg-[rgb(255,215,0)] hover:text-gray-900 rounded-md text-[rgb(255,215,0)] text-xs md:text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={12} />
                  <span>Visit</span>
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="flex-grow overflow-y-auto"
          style={{ maxHeight: "calc(85vh - 120px)" }}
        >
          <AnimatePresence mode="wait">
            {sectionContent[currentSection]}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="bg-gradient-to-t from-gray-900 to-gray-800 p-2 md:p-3 flex flex-wrap justify-center gap-1.5 md:gap-2 shrink-0 border-t border-[rgb(255,215,0)]/20">
          {[
            { name: "gallery", icon: <Camera size={14} />, label: "Gallery" },
            { name: "features", icon: <List size={14} />, label: "Features" },
            {
              name: "contribution",
              icon: <Briefcase size={14} />,
              label: "Contributions",
            },
          ].map((tab) => (
            <motion.button
              key={tab.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSection(tab.name as any)}
              className={`flex items-center gap-1 px-3 md:px-4 py-1 md:py-1.5 rounded-md text-xs md:text-sm font-medium transition-all ${
                currentSection === tab.name
                  ? "bg-[rgb(255,215,0)] text-gray-900"
                  : "text-gray-300 bg-gray-800/50 hover:bg-[rgb(255,215,0)] hover:text-gray-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PopUpWorkDetails;
