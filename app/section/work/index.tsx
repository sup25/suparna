"use client";
import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Animate } from "@/app/animation";
import { workDetails } from "./workDetails";

const Works = () => {
  return (
    <div className="section">
      <div className="container">
        <Animate.FadeDown className="py-16 relative overflow-hidden">
          <div className="relative  mx-auto px-4 z-10">
            {workDetails.map((work, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-[rgb(var(--foreground))] rounded-3xl transition-all mb-12"
              >
                <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4 flex flex-col justify-between">
                      <div>
                        <h1 className="text-4xl md:text-6xl font-dmSerifDisplay font-bold text-[rgb(var(--background))] mb-2">
                          {work.title}{" "}
                          <span className="text-[#FFD700]">{work.type}</span>
                        </h1>
                        <p className="text-lg pt-2 w-full font-inter max-w-md text-[rgb(var(--background))] leading-relaxed">
                          "{work.subtitle}"
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="pb-10">
                        <div className="flex flex-wrap gap-2">
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

                      {/* Button */}
                      <div className="w-full">
                        <button className="relative font-inter group w-full max-w-[400px] inline-flex items-center justify-between text-[rgb(var(--background))] font-semibold py-2 px-4 rounded-full text-lg border-2 border-[rgb(var(--background))] overflow-hidden">
                          <span className="z-10">{work.buttonText}</span>
                          <ChevronRight className="z-10 ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                          <span className="absolute inset-0 bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#FFD700] group-hover:to-transparent transition-all duration-300 ease-in-out w-1/2" />
                        </button>
                      </div>
                    </div>

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
