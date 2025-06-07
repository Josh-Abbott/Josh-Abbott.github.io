import React, { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Intro from "./Intro";
import "../styles/MainPage.css";

const About = lazy(() => import("./About"));
const Skills = lazy(() => import("./Skills"));
const Projects = lazy(() => import("./Projects"));
const Contact = lazy(() => import("./Contact"));

function MainPage({setShowNavbar}) {
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

  const location = useLocation();

  useEffect(() => { // SCROLL IF USED NAVBAR
    setShowNavbar(false);

    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const scrollToSection = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      setTimeout(scrollToSection, 100); 
    }
  }, [location, setShowNavbar]);

  return (
    <>
      <Intro setShowNavbar={setShowNavbar} />
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