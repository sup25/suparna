"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Animate } from "@/app/animation";
import { workDetails } from "./workDetails";
import PopUPWorkDetails from "@/app/components/popupWorkDetails";
import Pagination from "./pagination";
import { WORKS_PER_PAGE } from "@/app/constants";
import { useSwipeableMobile } from "@/app/hooks/useSwipeableMobile";
import axios from "axios";
interface WorkDetail {
  title: string;
  type: string;
  subtitle: string;
  image: string;
  tags: string[];
  about: {
    title: string;
    desc: string;
    images: string[];
    keyfeatures: string[];
    responsibility: string[];
  };
  buttonText: string;
}

const Works = () => {
  const { swipeHandlers, isMobile } = useSwipeableMobile({
    pathLeft: "specialties",
    pathRight: "",
  });
  const [test, setTest] = useState([]);

  useEffect(() => {
    const fetchTestFromDb = async () => {
      const response = await axios.get(
        "https://quick-orelle-suparna-d194a811.koyeb.app/api/v1/work"
      );
      const data = await response.data;
      setTest(data);
      console.log("data", data);
    };
    fetchTestFromDb();
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const worksPerPage = WORKS_PER_PAGE;
  const totalPages = Math.ceil(workDetails.length / worksPerPage);

  const handleShowPopup = (work: WorkDetail) => {
    setSelectedWork(work);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedWork(null);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const indexOfLastWork = currentPage * worksPerPage;
  const indexOfFirstWork = indexOfLastWork - worksPerPage;
  const currentWorks = workDetails.slice(indexOfFirstWork, indexOfLastWork);

  return (
    <div {...(isMobile ? swipeHandlers : {})} className="section">
      <div className="container">
        {showPopup && selectedWork && (
          <PopUPWorkDetails closePopUp={handleClosePopup} work={selectedWork} />
        )}
        <Animate.FadeDown className="py-16 relative overflow-hidden">
          <h1 className=" text-center pb-5 font-dmSerifDisplay text-4xl md:text-6xl font-semibold  text-[rgb(var(--foreground))]">
            Featured Works
          </h1>
          <div className="relative mx-auto px-4 z-10">
            {currentWorks.map((work, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-[rgb(var(--foreground))] rounded-xl transition-all mb-12"
              >
                <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                      <div className="relative w-full h-full">
                        <Image
                          src={work.image}
                          alt={`${work.title} Interface`}
                          fill
                          style={{ objectFit: "cover" }}
                          className="brightness-105 contrast-105"
                          priority={true}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 flex flex-col justify-between h-full md:py-5 py-0">
                      <div className="">
                        <h2 className="text-4xl flex flex-col gap-2 md:text-6xl font-dmSerifDisplay font-medium text-[rgb(var(--background))] mb-2">
                          {work.title}{" "}
                          <span className="text-[#FFD700] text-3xl md:text-5xl  font-marcellus font-medium">
                            {work.type}
                          </span>
                        </h2>
                        <p className="text-lg pt-2 w-full font-inter max-w-md text-[rgb(var(--background))] leading-relaxed">
                          "{work.subtitle}"
                        </p>

                        <div className="flex flex-wrap gap-2 pt-4">
                          {work.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-block text-xs font-medium font-inter text-[rgb(var(--background))] px-2 py-1 border-2 border-dotted border-[rgb(var(--background))] rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Button */}
                      <div className="w-full">
                        <button
                          onClick={() => handleShowPopup(work)}
                          className="relative font-inter group w-full max-w-[400px] inline-flex items-center justify-between text-[rgb(var(--background))] font-semibold py-2 px-4 rounded-full text-lg border-2 border-[rgb(var(--background))] overflow-hidden"
                        >
                          <span className="z-10">{work.buttonText}</span>
                          <ChevronRight className="z-10 ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                          <span className="absolute inset-0 bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#FFD700] group-hover:to-transparent transition-all duration-300 ease-in-out w-1/2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </Animate.FadeDown>
      </div>
    </div>
  );
};

export default Works;
