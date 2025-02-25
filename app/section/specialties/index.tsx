"use client";
import { specialties } from "./specialties";
import { useSwipeableMobile } from "@/app/hooks/useSwipeableMobile";
import { Animate } from "@/app/animation";
const Specialties = () => {
  const { swipeHandlers, isMobile } = useSwipeableMobile({
    pathLeft: "contact",
    pathRight: "works",
  });

  return (
    <div {...(isMobile ? swipeHandlers : {})} className="section">
      <div className="container">
        <div className="min-h-[80vh]   text-white flex flex-col items-center justify-center ">
          <Animate.FadeDown className="text-center max-w-2xl py-4">
            <h1 className="md:text-5xl text-4xl font-dmSerifDisplay font-semibold text-[rgb(var(--foreground))] mb-4">
              My Specialties
            </h1>
            <p className="text-lg text-[rgb(var(--foreground))] font-inter my-6">
              Discover the unique skills and expertise I bring to the table.
              Each specialty is designed to enhance user experience and drive
              results.
            </p>
          </Animate.FadeDown>

          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
            <Animate.FadeDown className="w-full md:w-1/2 grid md:grid-cols-4  grid-cols-3 gap-4">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className={`  
                
               rounded-xl bg-[rgb(var(--foreground))] text-[rgb(var(--background))] p-4 flex flex-col  items-center justify-center transition-all duration-300`}
                >
                  <div className="text-3xl  mb-2">{specialty.icon}</div>
                  <div className="text-center font-medium font-inter text-[rgb(var(--background))] text-sm">
                    {specialty.name}
                  </div>
                </div>
              ))}
            </Animate.FadeDown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialties;
