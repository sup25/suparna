"use client";
import React, { useState } from "react";
import { Animate } from "@/app/animation";
import PopUPWorkDetails from "@/app/components/popupWorkDetails";
import { WORKS_PER_PAGE } from "@/app/constants";
import { useSwipeableMobile } from "@/app/hooks/useSwipeableMobile";
import { WorkDetail } from "./types";
import { useFetchWorks } from "./hooks/useFetchWorks";
import { usePagination } from "./hooks/usePagination";
import WorkSection from "./workSection";
import { Loading } from "@/app/components/loading";

const Works = () => {
  const { swipeHandlers, isMobile } = useSwipeableMobile({
    pathLeft: "specialties",
    pathRight: "",
  });
  const [works, setWorks] = useState<WorkDetail[]>([]);

  const isLoading = useFetchWorks(setWorks);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkDetail | null>(null);

  const freelanceWorks = works.filter((work) =>
    work.tags.some((tag) => tag.toLowerCase() === "freelance")
  );
  const nonFreelanceWorks = works.filter(
    (work) => !work.tags.some((tag) => tag.toLowerCase() === "freelance")
  );

  const freelancePagination = usePagination(freelanceWorks, WORKS_PER_PAGE);

  const nonFreelancePagination = usePagination(
    nonFreelanceWorks,
    WORKS_PER_PAGE
  );

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  const handleShowPopup = (work: WorkDetail) => {
    setSelectedWork(work);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedWork(null);
  };

  return (
    <div {...(isMobile ? swipeHandlers : {})} className="section">
      <div className="container">
        {showPopup && selectedWork && (
          <PopUPWorkDetails closePopUp={handleClosePopup} work={selectedWork} />
        )}
        <Animate.FadeDown className="py-16 relative overflow-hidden">
          <div className="relative mx-auto px-4 z-10">
            {nonFreelanceWorks.length > 0 && (
              <WorkSection
                works={nonFreelancePagination.currentItems}
                title="Professional Works"
                currentPage={nonFreelancePagination.currentPage}
                totalPages={nonFreelancePagination.totalPages}
                onPageChange={nonFreelancePagination.setCurrentPage}
                onShowPopup={handleShowPopup}
              />
            )}
            {freelanceWorks.length > 0 && (
              <WorkSection
                works={freelancePagination.currentItems}
                title="Freelance Works"
                currentPage={freelancePagination.currentPage}
                totalPages={freelancePagination.totalPages}
                onPageChange={freelancePagination.setCurrentPage}
                onShowPopup={handleShowPopup}
              />
            )}
          </div>
        </Animate.FadeDown>
      </div>
    </div>
  );
};

export default Works;
