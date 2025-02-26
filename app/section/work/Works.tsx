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

  const worksSectionRef = useRef<HTMLDivElement>(null);

  const pagination = usePagination(works, WORKS_PER_PAGE);

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handlePageChange = (page: number) => {
    pagination.setCurrentPage(page);
    scrollToTop();
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
        <Animate.FadeDown className="relative">
          <div
            ref={worksSectionRef}
            className="relative mx-auto px-4 z-10 pt-16"
          >
            <WorkSection
              works={pagination.currentItems}
              title="My Works"
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              onShowPopup={handleShowPopup}
            />
          </div>
        </Animate.FadeDown>
      </div>
    </div>
  );
};

export default Works;
