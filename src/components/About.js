import React, { useEffect } from "react";

function About() {
  const viewResume = () => {
    const url = "../files/Abbott_RESUME.pdf"
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  };

  useEffect(() => {
      const handleScroll = () => {
        
      };
  
      window.addEventListener("scroll", handleScroll);
      handleScroll();
  
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <div className="section">
      <h2>About Me</h2>
      <p>I'm a software engineer based in Seattle, WA. I've created this website to act as a resume as well as a place to show off projects in more detail.</p>
      <p>Prior to completing my degree, my passion was designing and creating video games on the Roblox platform.</p>
      <p>I've also taken a substantial interest in web development, using this website and my education as an opportunity to explore and learn more about it.</p>
      <br></br>
      <button
          className={"button"}
          onClick={() => viewResume()}
        >
          View Resume
        </button>
    </div>
  );
}

export default About;
