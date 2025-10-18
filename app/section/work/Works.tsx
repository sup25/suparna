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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { createPortal } from "react-dom";
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

  const worksSectionRef = useRef<HTMLDivElement>(null);

  // Add scroll event listener to show/hide the scroll button
  useEffect(() => {
    // Use GSAP ScrollTrigger to monitor scroll position
    ScrollTrigger.create({
      start: "top -300px",
      end: "max",
      onUpdate: (self) => {
        if (self.scroll() > 300) {
          setShowScrollButton(true);
        } else {
          setShowScrollButton(false);
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    // Get the ScrollSmoother instance
    const smoother = ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTo(0, true, "power2.inOut");
    } else {
      // Fallback for regular scroll
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
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
    <>
      {showScrollButton &&
        createPortal(
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] p-2 w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-[9999] hover:bg-opacity-90 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </button>,
          document.body
        )}
      {showPopup && selectedWork && (
        <PopUPWorkDetails closePopUp={handleClosePopup} work={selectedWork} />
      )}

      <div {...(isMobile ? swipeHandlers : {})} className="section">
        <div className="container">
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
    </>
  );
};

export default Works;
