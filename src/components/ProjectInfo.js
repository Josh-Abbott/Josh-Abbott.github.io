import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import projectsData from "../data/ProjectsData";
import "../styles/ProjectInfo.css";

function ProjectInfo({ setShowNavbar }) {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.id === parseInt(projectId));

  useEffect(() => {
    setShowNavbar(true); // make sure navbar is shown here
  }, [setShowNavbar]);

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="project-info">
      <h1>{project.title}</h1>
      {project.content.map((block, index) => {
        if (block.type === "text") {
          return <p key={index} className="project-text">{block.value}</p>;
        } else if (block.type === "focused-text") {
          return <p key={index} className="focused-text">{block.value}</p>;
        } else if (block.type === "image") {
          return <img key={index} src={block.value} alt={block.alt || "Project Image"} className="project-image" />;
        } else if (block.type === "video") {
          return (
            <div key={index} className="project-video">
              <iframe
                width="560"
                height="315"
                src={block.value}
                title="Project Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default ProjectInfo;


