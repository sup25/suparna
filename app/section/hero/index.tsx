"use client";

import { Animate } from "@/app/animation";
import Connection from "./components/connection";
import Description from "./components/description";
import TitleSlogan from "./components/titleSlogan";

const Hero = () => {
  return (
    <div className="section">
      <div className="container">
        <section className="flex gap-10 flex-col justify-center items-center h-[75vh] overflow-hidden">
          <Animate.FadeDown className="flex flex-col justify-start gap-10">
            <TitleSlogan />
            <Description />
            <Connection />
          </Animate.FadeDown>
        </section>
      </div>
    </div>
  );
};

export default Hero;
