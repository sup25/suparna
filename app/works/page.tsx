import React from "react";
import Works from "../section/work";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works | Suparna Adhikari | Full-Stack Developer & Software Engineer",
  description:
    "Discover Suparna Adhikari's involvement in innovative projects and creations",
};
function page() {
  return <Works />;
}

export default page;
