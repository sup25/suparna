import React from "react";
import Blogs from "../section/blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Suparna Adhikari | Full-Stack Developer & Software Engineer",
  description:
    "Explore insightful articles and thoughts by Suparna Adhikari, a full-stack developer passionate about technology, innovation, and software engineering",
};
const page = () => {
  return <Blogs />;
};

export default page;
