"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Animate } from "@/app/animation";
import { workDetails } from "./workDetails";
import PopUPWorkDetails from "@/app/components/popupWorkDetails";

const Works = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="section">
      <div className="container">
        {showPopup && <PopUPWorkDetails closePopUp={handleClosePopup} />}
        <Animate.FadeDown className="py-16 relative overflow-hidden">
          <div className="relative mx-auto px-4 z-10">
            {workDetails.map((work, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-[rgb(var(--foreground))] rounded-xl transition-all mb-12"
              >
                <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                      <div className="relative w-full h-full">
                        <Image
                          src={work.image}
                          alt={`${work.title} Interface`}
                          layout="fill"
                          objectFit="cover"
                          className="brightness-105 contrast-105"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 flex flex-col justify-between h-full md:py-5 py-0">
                      <div className=" ">
                        <h1 className="text-4xl flex flex-col gap-2 md:text-6xl font-dmSerifDisplay font-bold text-[rgb(var(--background))] mb-2">
                          {work.title}{" "}
                          <span className="text-[#FFD700] text-3xl md:text-5xl  font-marcellus font-semibold">
                            {work.type}
                          </span>
                        </h1>
                        <p className="text-lg pt-2 w-full font-inter max-w-md text-[rgb(var(--background))] leading-relaxed">
                          "{work.subtitle}"
                        </p>

                        <div className="flex flex-wrap gap-2 pt-4">
                          {work.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-block text-xs font-medium font-inter text-[rgb(var(--background))] px-2 py-1 border-2 border-dotted border-[rgb(var(--background))] rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}

                      {/* Button */}
                      <div className="w-full">
                        <button
                          onClick={handleShowPopup}
                          className="relative font-inter group w-full max-w-[400px] inline-flex items-center justify-between text-[rgb(var(--background))] font-semibold py-2 px-4 rounded-full text-lg border-2 border-[rgb(var(--background))] overflow-hidden"
                        >
                          <span className="z-10">{work.buttonText}</span>
                          <ChevronRight className="z-10 ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                          <span className="absolute inset-0 bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#FFD700] group-hover:to-transparent transition-all duration-300 ease-in-out w-1/2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Animate.FadeDown>
      </div>
    </div>
  );
};

export default Works;
