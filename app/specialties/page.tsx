import type { Metadata } from "next";
import Specialties from "../section/specialties";

export const metadata: Metadata = {
  title:
    "Specialties | Suparna Adhikari | Full-Stack Developer & Software Engineer",
  description:
    "Delve into Suparna Adhikari's specialties, showcasing skills in front-end and back-end development",
};

function page() {
  return <Specialties />;
}

export default page;
