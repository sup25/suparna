"use client";
import Hero from "./section/hero";
import { useSwipeableMobile } from "./hooks/useSwipeableMobile";

export default function Home() {
  const { swipeHandlers, isMobile } = useSwipeableMobile({
    pathLeft: "works",
    pathRight: "",
  });

  return (
    <div {...(isMobile ? swipeHandlers : {})} className="section">
      <div className="container">
        <Hero />
      </div>
    </div>
  );
}
