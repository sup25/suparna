"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkCard from "./workCard";
import { WorkDetail } from "./types";

gsap.registerPlugin(ScrollTrigger);

interface WorkSectionProps {
  works: WorkDetail[];
  title: string;
  onShowPopup: (work: WorkDetail) => void;
}

const WorkSection: React.FC<WorkSectionProps> = ({
  works,
  title,
  onShowPopup,
}) => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <>
      <h1 className="heading font-dmSerifDisplay text-center text-[rgb(var(--foreground))] my-10">
        {title}
      </h1>
      {works.map((work, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cardsRef.current[index] = el;
          }}
        >
          <WorkCard work={work} onShowPopup={onShowPopup} />
        </div>
      ))}
    </>
  );
};

export default WorkSection;
