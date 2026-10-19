import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Expertise } from "@/components/sections/expertise";
import { Hero } from "@/components/sections/hero";
import { Infrastructure } from "@/components/sections/infrastructure";
import { ProjectShowcase } from "@/components/sections/project-showcase";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Expertise />
        <ProjectShowcase />
        <Experience />
        <Infrastructure />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
