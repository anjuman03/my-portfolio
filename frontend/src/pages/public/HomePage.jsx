import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../../components/sections/Hero";
import About from "../../components/sections/About";
import Skills from "../../components/sections/Skills";
import Projects from "../../components/sections/Projects";
import Experience from "../../components/sections/Experience";
import Certifications from "../../components/sections/Certifications";
import Contact from "../../components/sections/Contact";

import Footer from "@/components/common/Footer";
import AnimatedBackground from "@/components/common/AnimatedBackground";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    const timer = setTimeout(() => {
      if (!section || section === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <main className="relative">
      <AnimatedBackground />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />

      <Footer />
    </main>
  );
};

export default HomePage;