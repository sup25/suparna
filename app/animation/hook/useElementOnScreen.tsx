import { useEffect, useState, RefObject } from "react";

export const useElementOnScreen = (
  ref: RefObject<HTMLElement>,
  rootMargin: string = "0px"
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const current = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(entry.isIntersecting);
        }
      },
      { rootMargin }
    );
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};
