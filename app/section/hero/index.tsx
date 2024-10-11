"use client";

import Connection from "./components/connection";
import CopyRight from "./components/copyright";
import Description from "./components/description";
import TitleSlogan from "./components/titleSlogan";

const Hero = () => {
  return (
    <div className="section">
      <div className="container">
        <section className="flex gap-10 flex-col justify-center items-center h-[90vh] overflow-hidden">
          <div className="flex flex-col justify-start gap-10">
            <TitleSlogan />
            <Description />
            <Connection />
          </div>
          <CopyRight />
        </section>
      </div>
    </div>
  );
};

export default Hero;
