"use client";
import React from "react";
import Pagination from "./pagination";
import WorkCard from "./workCard";
import { WorkDetail } from "./types";

interface WorkSectionProps {
  works: WorkDetail[];
  title: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onShowPopup: (work: WorkDetail) => void;
}

const WorkSection: React.FC<WorkSectionProps> = ({
  works,
  title,
  currentPage,
  totalPages,
  onPageChange,
  onShowPopup,
}) => {
  return (
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl  text-center font-dmSerifDisplay font-semibold text-[rgb(var(--foreground))] mb-8">
        {title}
      </h2>
      {works.map((work, index) => (
        <WorkCard key={index} work={work} onShowPopup={onShowPopup} />
      ))}
      {works.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default WorkSection;
