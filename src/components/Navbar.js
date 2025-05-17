import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ show }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const handleNavigation = (section) => {
    if (location.pathname !== "/") {
      navigate(`/#${section}`);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "intro";
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection === "intro" ? null : currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${show ? 'navbar-visible' : 'navbar-hidden'}`}>
      <div className="navbar-links">
        <button
          className={activeSection === "about" ? "active" : ""}
          onClick={() => handleNavigation("about")}
        >
          About
        </button>
        <button
          className={activeSection === "projects" ? "active" : ""}
          onClick={() => handleNavigation("projects")}
        >
          Projects
        </button>
        <button
          className={activeSection === "skills" ? "active" : ""}
          onClick={() => handleNavigation("skills")}
        >
          Skills
        </button>
        <button
          className={activeSection === "contact" ? "active" : ""}
          onClick={() => handleNavigation("contact")}
        >
          Contact
        </button>
      </div>
    </nav>
  );
}

export default Navbar;