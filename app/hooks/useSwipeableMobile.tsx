import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface Navigation {
  pathLeft: string;
  pathRight: string;
}
export const useSwipeableMobile = ({ pathLeft, pathRight }: Navigation) => {
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
      router.push(`/${pathLeft}`);
    },
    onSwipedRight: () => {
      console.log("Swiped right!");
      router.push(`/${pathRight}`);
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  return { swipeHandlers, isMobile };
};
