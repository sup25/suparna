"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSwipeableMobile } from "@/app/hooks/useSwipeableMobile";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogLists } from "./blogList";
import { Animate } from "@/app/animation";

const Blogs = () => {
  const { swipeHandlers, isMobile } = useSwipeableMobile({
    pathLeft: "",
    pathRight: "contact",
  });

  return (
    <main {...(isMobile ? swipeHandlers : {})} className="section ">
      <div className="container px-4 mx-auto">
        <div className="min-h-screen py-16 ">
          <Animate.FadeDown>
            <h1 className="md:text-5xl text-4xl  font-semibold font-dmSerifDisplay  mb-8 text-[rgb(var(--foreground))]">
              Latest Blog Posts
            </h1>
            <div className="grid gap-6 ">
              {BlogLists.map((blog) => (
                <div
                  key={blog.id}
                  className="rounded-xl border border-dashed border-[rgb(var(--foreground))]  transition-all duration-300 overflow-hidden"
                >
                  <Link href={`/blogs/${blog.slug}`} className="block p-6">
                    <div className="flex font-inter items-center gap-2 text-sm text-blue-600 mb-2">
                      {blog.category.map((categoryItem, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 px-3 py-1 rounded-full"
                        >
                          {categoryItem}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-2xl font-marcellus font-semibold text-[rgb(var(--foreground))] mb-3 group-hover:text-blue-600">
                      {blog.title}
                    </h2>

                    <p className="font-inter text-[rgb(var(--foreground))] mb-4">
                      {blog.description}
                    </p>

                    <div className="flex items-start justify-between md:flex-row flex-col gap-5">
                      <div className="flex items-center gap-4 text-sm text-[rgb(var(--foreground))]">
                        <span className="flex items-center  font-inter gap-1">
                          <Calendar className="w-4 h-4" />
                          {blog.date}
                        </span>
                        <span className="flex items-center font-inter gap-1">
                          <Clock className="w-4 h-4" />
                          {blog.readTime}
                        </span>
                      </div>

                      <div className="flex items-center font-inter gap-1 text-blue-600 group hover:translate-x-2 transition-transform duration-300">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Animate.FadeDown>
        </div>
      </div>
    </main>
  );
};

export default Blogs;
