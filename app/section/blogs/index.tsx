"use client";
import React from "react";
import { useSwipeableMobile } from "@/app/hooks/useSwipeableMobile";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogLists } from "./blogList";
import { Animate } from "@/app/animation";

const Blogs = () => {
  return (
    <>
      <main className="section">
        <div className="container px-4 mx-auto">
          <div className=" py-28 ">
            <Animate.FadeDown>
              <h1 className="heading font-bricolage  my-10">
                Latest Blog Posts
              </h1>
              <div className="grid gap-6 ">
                {BlogLists.map((blog) => (
                  <div
                    key={blog.id}
                    className="rounded-xl border border-dashed border-black  transition-all duration-300 overflow-hidden"
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

                      <h2 className="text-2xl font-bricolagefont-semibold  mb-3 group-hover:text-blue-600">
                        {blog.title}
                      </h2>

                      <p className="font-inter  mb-4">{blog.description}</p>

                      <div className="flex items-start justify-between md:flex-row flex-col gap-5">
                        <div className="flex items-center gap-4 text-sm ">
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
    </>
  );
};

export default Blogs;
