"use client";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Hero from "./section/hero";

export default function Home() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      console.log("Swiped left!");
      router.push("/works");
    },
    onSwipedRight: () => {
      console.log("Swiped right!");
      router.push("/");
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <div {...(isMobile ? swipeHandlers : {})} className="section">
      <div className="container">
        <Hero />
      </div>
    </div>
  );
}
