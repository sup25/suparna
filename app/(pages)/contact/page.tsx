import type { Metadata } from "next";
import Contact from "../../section/contact";

export const metadata: Metadata = {
  title:
    "Contact | Suparna Adhikari | Full-Stack Developer & Software Engineer",
  description:
    "Get in touch with Suparna Adhikari, a full-stack developer and Software Engineer",
};

function page() {
  return <Contact />;
}

export default page;
