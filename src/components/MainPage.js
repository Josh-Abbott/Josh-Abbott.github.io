import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Intro from "./Intro";
import "../styles/MainPage.css";

const About = lazy(() => import("./About"));
const Skills = lazy(() => import("./Skills"));
const Projects = lazy(() => import("./Projects"));
const Contact = lazy(() => import("./Contact"));

function MainPage({setShowNavbar }) {
  const location = useLocation();
  const [autoCompleteIntro, setAutoCompleteIntro] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const fadeSections = document.querySelectorAll(".fade-in-section");
        fadeSections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
            section.classList.add("visible");
          } else {
            section.classList.remove("visible");
          }
        });
      });
    };
  
    const checkSections = setInterval(() => {
      const fadeSections = document.querySelectorAll(".fade-in-section");
      if (fadeSections.length > 0) {
        clearInterval(checkSections);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
      }
    }, 100);
  
    return () => {
      clearInterval(checkSections);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // If navigating directly to a section (via navbar click), force intro completion
    if (location.hash) {
      setAutoCompleteIntro(true);

      const timer = setTimeout(() => setAutoCompleteIntro(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const scrollToSection = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      // Wait a bit to allow intro completion
      setTimeout(scrollToSection, 300); 
    }
  }, [location]);

  return (
    <>
      <Intro setShowNavbar={setShowNavbar} autoCompleteIntro={autoCompleteIntro} />
      <Suspense fallback={<div>Loading...</div>}>
        <section className="fade-in-section" id="about">
          <About />
        </section>
        
        <section className="fade-in-section" id="projects">
          <Projects title="Software Projects" category="software" />
          <Projects title="Game Projects" category="game" />
        </section>
        
        <section className="fade-in-section" id="skills">
          <Skills />
        </section>
        
        <section className="fade-in-section" id="contact">
          <Contact />
        </section>
      </Suspense>
    </>
  );
}

export default MainPage;