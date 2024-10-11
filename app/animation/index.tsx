import { useRef, ReactNode, CSSProperties } from "react";
import { useElementOnScreen } from "./hook/useElementOnScreen";

interface AnimationProps {
  from: CSSProperties;
  to: CSSProperties;
  delay?: number;
  rootMargin?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

const Animation = ({
  from,
  to,
  delay = 0,
  rootMargin = "0px",
  children,
  className,
  id,
}: AnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onScreen = useElementOnScreen(ref, rootMargin);

  const defaultStyles: CSSProperties = {
    transition: `600ms ease-in ${delay}ms`,
  };

  return (
    <div
      ref={ref}
      style={
        onScreen
          ? {
              ...defaultStyles,
              ...to,
            }
          : {
              ...defaultStyles,
              ...from,
            }
      }
      className={className}
      id={id}
    >
      {children}
    </div>
  );
};

interface FadeInProps {
  delay?: number;
  rootMargin?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

const FadeIn = ({
  delay = 300,
  rootMargin = "10px",
  children = "",
  className,
  id,
}: FadeInProps) => (
  <Animation
    className={className}
    delay={delay}
    rootMargin={rootMargin}
    from={{ opacity: 0 }}
    to={{ opacity: 1 }}
  >
    {children}
  </Animation>
);

interface FadeUpProps {
  delay?: number;
  rootMargin?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

const FadeUp = ({
  delay,
  rootMargin,
  children,
  className,
  ...rest
}: FadeUpProps) => (
  <Animation
    delay={delay}
    rootMargin={rootMargin}
    from={{ opacity: 0, transform: "translateY(2rem)" }}
    to={{ opacity: 1, transform: "translateY(0)" }}
    className={className}
    {...rest}
  >
    {children}
  </Animation>
);

interface SlideProps {
  children: ReactNode;
  delay?: number;
  rootMargin?: string;
  className?: string;
  id?: string;
}

const SlideInDown = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{ transform: "translate3d(0, -100%, 0)", visibility: "visible" }}
    to={{ transform: "translateZ(0)" }}
    {...rest}
  >
    {children}
  </Animation>
);

const SlideInLeft = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{ transform: "translate3d(-100%, 0, 0)", visibility: "visible" }}
    to={{ transform: "translateZ(0)" }}
    {...rest}
  >
    {children}
  </Animation>
);

const SlideInRight = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{ transform: "translate3d(100%, 0, 0)", visibility: "visible" }}
    to={{ transform: "translateZ(0)" }}
    {...rest}
  >
    {children}
  </Animation>
);

const SlideInUp = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{ transform: "translate3d(0, 100%, 0)", visibility: "visible" }}
    to={{ transform: "translateZ(0)" }}
    {...rest}
  >
    {children}
  </Animation>
);

const SlideOutDown = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{ transform: "translateZ(0)" }}
    to={{ transform: "translate3d(0, 100%, 0)", visibility: "hidden" }}
    {...rest}
  >
    {children}
  </Animation>
);

const SlideOutLeft = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{ transform: "translateZ(0)" }}
    to={{ transform: "translate3d(-100%, 0, 0)", visibility: "hidden" }}
    {...rest}
  >
    {children}
  </Animation>
);

const SlideOutRight = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{ transform: "translateZ(0)" }}
    to={{ transform: "translate3d(100%, 0, 0)", visibility: "hidden" }}
    {...rest}
  >
    {children}
  </Animation>
);

const SlideOutUp = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{ transform: "translateZ(0)" }}
    to={{ transform: "translate3d(0, -100%, 0)", visibility: "hidden" }}
    {...rest}
  >
    {children}
  </Animation>
);

const ZoomOutUp = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{
      opacity: 1,
      transform: "scale3d(0.475, 0.465, 0.475) translate3d(0, 60px, 0)",
      animationTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    }}
    to={{
      opacity: 0,
      transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",
      animationTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1)",
    }}
    {...rest}
  >
    {children}
  </Animation>
);

const RollOut = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{ opacity: 1 }}
    to={{ opacity: 0, transform: "translate3d(100%, 0, 0) rotate(120deg)" }}
    {...rest}
  >
    {children}
  </Animation>
);

const RollIn = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{ opacity: 0, transform: "translate3d(-100%, 0, 0) rotate(-120deg)" }}
    to={{ opacity: 1, transform: "translateZ(0)" }}
    {...rest}
  >
    {children}
  </Animation>
);

const ZoomIn = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{ transform: "scale(0)" }}
    to={{ transform: "scale(1)" }}
    {...rest}
  >
    {children}
  </Animation>
);

const FadeDown = ({ children, ...rest }: SlideProps) => (
  <Animation
    from={{
      opacity: 0,
      transform: "translateY(-20px)",
    }}
    to={{
      opacity: 1,
      transform: "translateY(0)",
    }}
    {...rest}
  >
    {children}
  </Animation>
);

export const Animate = {
  FadeIn,
  FadeUp,
  ZoomIn,
  SlideInLeft,
  SlideInRight,
  SlideInDown,
  SlideInUp,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
  SlideOutDown,
  ZoomOutUp,
  RollOut,
  RollIn,
  FadeDown,
};
