"use client";

import { motion } from "framer-motion";
import { specialties } from "./specialties";

const Specialties = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="min-h-[80vh]  bg-[rgb(var(--background))] text-white flex flex-col items-center justify-center ">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl py-4"
          >
            <h1 className="md:text-6xl text-4xl font-dmSerifDisplay font-semibold text-[rgb(var(--foreground))] mb-4">
              My Specialties
            </h1>
            <p className="text-lg text-[rgb(var(--foreground))] font-inter my-6">
              Discover the unique skills and expertise I bring to the table.
              Each specialty is designed to enhance user experience and drive
              results.
            </p>
          </motion.div>

          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full md:w-1/2 grid md:grid-cols-4  grid-cols-3 gap-4"
            >
              {specialties.map((specialty, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer  
                
               rounded-xl bg-[rgb(var(--foreground))] text-[rgb(var(--background))] p-4 flex flex-col  items-center justify-center transition-all duration-300`}
                >
                  <div className="text-3xl  mb-2">{specialty.icon}</div>
                  <div className="text-center font-medium font-inter text-[rgb(var(--background))] text-sm">
                    {specialty.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialties;
