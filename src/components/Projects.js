import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Projects.css';

function Projects() {
  const projectList = [
    { id: 1, title: 'Portfolio Website' }
  ];

  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <div className="projects-list">
        {projectList.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="project-link">
            {project.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Projects;

