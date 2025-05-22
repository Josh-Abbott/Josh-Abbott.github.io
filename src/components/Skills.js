import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import skillsData from '../data/SkillsData';
import '../styles/Skills.css';

function Skills() {
  const handleMouseEnter = (e) => {
    const content = e.target.closest('.skills-title').closest('.skills-scrolling-container').querySelector('.skills-scrolling-content');
    if (content) {
      content.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = (e) => {
    const content = e.target.closest('.skills-title').closest('.skills-scrolling-container').querySelector('.skills-scrolling-content');
    if (content) {
      content.style.animationPlayState = 'running';
    }
  };

  useEffect(() => {
    const rows = document.querySelectorAll('.skills-scrolling-container');

    rows.forEach((row) => {
        row.classList.add('visible');
    });
  }, []);

  const groupedSkills = {
    Language: skillsData.filter(skill => skill.type === 'Language'),
    Technology: skillsData.filter(skill => skill.type === 'Technology'),
  };

  return (
    <div className="section">
      <h2>Skills</h2>
      {Object.entries(groupedSkills).map(([type, skills]) => (
        <div key={type} className="skill-group">
          <h3 className="skill-heading">{type}</h3>
          <div className="skills-scrolling-wrapper">
            {[...Array(1)].map((_, rowIndex) => (
              <div 
                key={rowIndex} 
                className="skills-scrolling-container"
              >
                <div className="skills-scrolling-content">
                  {[...skills, ...skills].map((skill, index) => (
                    <React.Fragment key={index}>
                      <Link 
                        className="skills-title skill-circle" 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave} 
                      > 
                        {skill.name} 
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skills;
