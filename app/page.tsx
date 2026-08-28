import Hero from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ExperienceSection from "@/components/sections/experience";
import WorksSection from "@/components/sections/works";
import SideProjectsSection from "@/components/sections/side-projects";
import ContactSection from "@/components/sections/contact";

/**
 * Home is a server component. Only the interactive sections below are client
 * components, so the page's text ships in the initial HTML. Previously the
 * whole page was marked "use client" and rendered nothing without JS.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <WorksSection />
      <SideProjectsSection />
      <ContactSection />
    </>
  );
}
