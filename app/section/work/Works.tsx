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

  const professionalSectionRef = useRef<HTMLDivElement>(null);
  const freelanceSectionRef = useRef<HTMLDivElement>(null);

  const { isLoading, error } = useFetchWorks(setWorks);

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

  // Scroll to the specific section
  const scrollToProfessionalSection = () => {
    if (professionalSectionRef.current) {
      const rect = professionalSectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const targetTop = rect.top + scrollTop;
      console.log(
        "Target Top Position:",
        targetTop,
        "Current Scroll:",
        scrollTop
      );

      // Use window.scrollTo instead of scrollIntoView
      window.scrollTo({ top: targetTop, behavior: "smooth" });
      console.log("window.scrollTo attempted to:", targetTop);
    } else {
      console.log("Professional Section Ref is null");
    }
  };

  const scrollToFreelanceSection = () => {
    if (freelanceSectionRef.current) {
      const rect = freelanceSectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const targetTop = rect.top + scrollTop;
      console.log(
        "Target Top Position:",
        targetTop,
        "Current Scroll:",
        scrollTop
      );

      // Use window.scrollTo instead of scrollIntoView
      window.scrollTo({ top: targetTop, behavior: "smooth" });
      console.log("window.scrollTo attempted to:", targetTop);
    } else {
      console.log("Freelance Section Ref is null");
    }
  };

  const handleNonFreelancePageChange = (page: number) => {
    nonFreelancePagination.setCurrentPage(page);
    scrollToProfessionalSection(); // Scroll to Professional Works
  };

  const handleFreelancePageChange = (page: number) => {
    freelancePagination.setCurrentPage(page);
    scrollToFreelanceSection(); // Scroll to Freelance Works
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  if (error) {
    return <SomethingWentWrong />;
  }
  if (works.length === 0) {
    return <NoWorkToShow />;
  }

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
        <Animate.FadeDown className="py-16 relative ">
          <div className="relative mx-auto px-4 z-10">
            {nonFreelanceWorks.length > 0 && (
              <div ref={professionalSectionRef}>
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
              <div ref={freelanceSectionRef}>
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
