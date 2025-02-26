import React from "react";

import type { Metadata } from "next";

import Works from "../../section/work/Works";

export const metadata: Metadata = {
  title: "Works | Suparna Adhikari | Full-Stack Developer & Software Engineer",
  description:
    "Discover Suparna Adhikari's involvement in innovative projects and creations",
};
function page() {
  return <Works />;
}

export default page;
