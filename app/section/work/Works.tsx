"use client";
import React, { useRef, useState } from "react";
import { Animate } from "@/app/animation";
import PopUPWorkDetails from "@/app/components/popupWorkDetails";
import { WORKS_PER_PAGE } from "@/app/constants";
import { useSwipeableMobile } from "@/app/hooks/useSwipeableMobile";
import { WorkDetail } from "./types";
import { useFetchWorks } from "./hooks/useFetchWorks";
import { usePagination } from "./hooks/usePagination";
import WorkSection from "./workSection";
import { Loading } from "@/app/components/loading";
import NoWorkToShow from "@/app/components/noWork";
import { SomethingWentWrong } from "@/app/components/somethingWentWrong";

const Works = () => {
  const { swipeHandlers, isMobile } = useSwipeableMobile({
    pathLeft: "specialties",
    pathRight: "",
  });

  const [works, setWorks] = useState<WorkDetail[]>([]);
  const { isLoading, error } = useFetchWorks(setWorks);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkDetail | null>(null);

  const professionalSectionRef = useRef<HTMLDivElement>(null);
  const freelanceSectionRef = useRef<HTMLDivElement>(null);

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

  // Smoothly scroll to the specific section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleNonFreelancePageChange = (page: number) => {
    nonFreelancePagination.setCurrentPage(page);
    scrollToSection(professionalSectionRef);
  };

  const handleFreelancePageChange = (page: number) => {
    freelancePagination.setCurrentPage(page);
    scrollToSection(freelanceSectionRef);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  if (error) return <SomethingWentWrong />;
  if (works.length === 0) return <NoWorkToShow />;

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
        <Animate.FadeDown className=" relative">
          <div className="relative mx-auto px-4 z-10">
            {nonFreelanceWorks.length > 0 && (
              <div ref={professionalSectionRef} className="pt-20 ">
                <WorkSection
                  works={nonFreelancePagination.currentItems}
                  title="Professional Works"
                  currentPage={nonFreelancePagination.currentPage}
                  totalPages={nonFreelancePagination.totalPages}
                  onPageChange={handleNonFreelancePageChange}
                  onShowPopup={handleShowPopup}
                />
              </div>
            )}
            {freelanceWorks.length > 0 && (
              <div ref={freelanceSectionRef} className="pt-20">
                <WorkSection
                  works={freelancePagination.currentItems}
                  title="Freelance Works"
                  currentPage={freelancePagination.currentPage}
                  totalPages={freelancePagination.totalPages}
                  onPageChange={handleFreelancePageChange}
                  onShowPopup={handleShowPopup}
                />
              </div>
            )}
          </div>
        </Animate.FadeDown>
      </div>
    </div>
  );
};

export default Works;
