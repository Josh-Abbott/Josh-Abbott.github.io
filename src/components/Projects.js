import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/ProjectsData';
import '../styles/Projects.css';

function Projects({ title, category }) {
  const handleMouseEnter = (e) => {
    const content = e.target.closest('.project-title').closest('.scrolling-container').querySelector('.scrolling-content');
    if (content) {
      content.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = (e) => {
    const content = e.target.closest('.project-title').closest('.scrolling-container').querySelector('.scrolling-content');
    if (content) {
      content.style.animationPlayState = 'running';
    }
  };

  useEffect(() => {
    const rows = document.querySelectorAll('.scrolling-container');
    let totalDelay = 0;
  
    rows.forEach((row) => {
      const randomDelay = Math.random() * 3000 + 200;
      totalDelay += randomDelay;
  
      setTimeout(() => {
        row.classList.add('visible');
      }, totalDelay);
    });
  }, []);

  const filteredProjects = projectsData.filter(
    (project) => project.category === category
  );

  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="scrolling-wrapper">
        {[...Array(3)].map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className="scrolling-container"
          >
            <div className="scrolling-content">
              {[...filteredProjects, ...filteredProjects].map((project, index) => (
                <React.Fragment key={index}>
                  <Link
                    to={`/projects/${project.id}`} 
                    className="project-title"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {project.title}
                  </Link>
                  <span className="dot">•</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

