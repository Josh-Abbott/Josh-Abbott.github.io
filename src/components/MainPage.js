import React, { lazy, Suspense } from "react";
import Intro from "./Intro";
import "../styles/MainPage.css";

const About = lazy(() => import("./About"));
const Skills = lazy(() => import("./Skills"));
const Projects = lazy(() => import("./Projects"));
const Contact = lazy(() => import("./Contact"));

function MainPage() {
  return (
    <>
      <Intro />
      <Suspense fallback={<div>Loading...</div>}>
        <section className="fade-in-section" id="about">
          <About />
        </section>
        <section className="fade-in-section" id="skills">
          <Skills />
        </section>
        <section className="fade-in-section" id="projects">
          <Projects />
        </section>
        <section className="fade-in-section" id="contact">
          <Contact />
        </section>
      </Suspense>
    </>
  );
}

export default MainPage;
