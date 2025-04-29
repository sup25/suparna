"use client";
import React, { useRef, useState, useEffect } from "react";
import { Animate } from "@/app/animation";
import PopUPWorkDetails from "@/app/components/popupWorkDetails";
import { useSwipeableMobile } from "@/app/hooks/useSwipeableMobile";
import { WorkDetail } from "./types";
import { useFetchWorks } from "./hooks/useFetchWorks";
import WorkSection from "./workSection";
import { Loading } from "@/app/components/loading";
import NoWorkToShow from "@/app/components/noWork";
import { SomethingWentWrong } from "@/app/components/somethingWentWrong";
import { ChevronUp } from "lucide-react";

const Works = () => {
  const { swipeHandlers, isMobile } = useSwipeableMobile({
    pathLeft: "specialties",
    pathRight: "",
  });

  const [works, setWorks] = useState<WorkDetail[]>([]);
  const { isLoading, error, hasFetched } = useFetchWorks(setWorks);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkDetail | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Custom style for the button animation
  const animationKeyframes = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  const worksSectionRef = useRef<HTMLDivElement>(null);

  // Add scroll event listener to show/hide the scroll button
  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down more than 300px
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!hasFetched || isLoading)
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
      <style jsx>{animationKeyframes}</style>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] p-2 w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-50 hover:bg-opacity-90 transition-all duration-300 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
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
              works={works}
              title="My Works"
              onShowPopup={handleShowPopup}
            />
          </div>
        </Animate.FadeDown>
      </div>
    </div>
  );
};

export default Works;
