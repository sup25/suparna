import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  closePopUp: () => void;
  work: {
    title: string;
    about: {
      title: string;
      desc: string;
      images: string[];
      responsibility: string[];
    };
  };
}

const PopUpWorkDetails = ({ closePopUp, work }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Set the current image index to the next one, wrapping around to the first
   * one if we go past the last one.
   */

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % work.about.images.length);
  };

  /**
   * Set the current image index to the previous one, wrapping around to the
   * last image if we go below the first one.
   */

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + work.about.images.length) % work.about.images.length
    );
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999999] bg-black bg-opacity-75 flex items-center justify-center p-4"
      onClick={closePopUp}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[rgb(var(--foreground))] text-[rgb(var(--background))] rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Carousel */}
          <div className="lg:w-1/2 relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={work.about.images[currentImageIndex]}
                alt={`Project image ${currentImageIndex + 1}`}
                className="w-full h-64 lg:h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 " />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-20 p-2 rounded-full text-white hover:bg-opacity-30 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-20 p-2 rounded-full text-white hover:bg-opacity-30 transition-all"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {work.about.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white scale-125"
                      : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <motion.h2
                className="text-4xl font-dmSerifDisplay font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {work.title}
              </motion.h2>
              <button
                onClick={closePopUp}
                className="text-[rgb(var(--background))]"
              >
                <X size={24} />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[rgb(var(--background))] font-inter leading-relaxed mb-6">
                {work.about.desc}
              </p>
            </motion.div>

            <motion.h4
              className="text-xl font-semibold font-inter text-[rgb(var(--background))] mb-3 mt-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Core Tasks
            </motion.h4>
            <div className="space-y-3 mb-6">
              <ul>
                {work.about.responsibility.map((responsibility, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start font-inter text-[rgb(var(--background))] bg-[rgb(var(--foreground))]  p-3 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <span className="mr-2 text-[rgb(var(--background))] mt-1">
                      •
                    </span>
                    <span>{responsibility}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PopUpWorkDetails;
