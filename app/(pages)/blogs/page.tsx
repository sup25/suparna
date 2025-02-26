import React from "react";

import { Metadata } from "next";
import Blogs from "@/app/section/blogs";

export const metadata: Metadata = {
  title: "Blogs | Suparna Adhikari | Full-Stack Developer & Software Engineer",
  description:
    "Explore insightful articles and thoughts by Suparna Adhikari, a full-stack developer passionate about technology, innovation, and software engineering",
};
const page = () => {
  return <Blogs />;
};

export default page;
