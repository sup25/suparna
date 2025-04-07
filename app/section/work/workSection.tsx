"use client";
import React from "react";
import WorkCard from "./workCard";
import { WorkDetail } from "./types";

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
  return (
    <div className="">
      <h2 className="heading  font-dmSerifDisplay text-center  text-[rgb(var(--foreground))] mb-10">
        {title}
      </h2>
      {works.map((work, index) => (
        <WorkCard key={index} work={work} onShowPopup={onShowPopup} />
      ))}
    </div>
  );
};

export default WorkSection;
