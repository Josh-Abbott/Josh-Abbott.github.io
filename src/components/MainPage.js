import React, { lazy, Suspense } from 'react';
import '../styles/MainPage.css';

const About = lazy(() => import('./About'));
const Skills = lazy(() => import('./Skills'));
const Projects = lazy(() => import('./Projects'));
const Contact = lazy(() => import('./Contact'));

function MainPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </Suspense>
    </>
  );
}

export default MainPage;