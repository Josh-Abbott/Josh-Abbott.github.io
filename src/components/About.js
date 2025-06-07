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
      <p>I'm a software engineer passionate about learning and pursuing creative endeavors.</p>
      <p>For over a decade now, I've dedicated much of my time to developing virtual experiences hosted on the platform Roblox that millions have played. This hobby of mine quickly evolved into a deep investment that would result in the pursuit of a formal education in programming. </p>
      <p>Since then, I've also taken a substantial interest in web development, using my education and projects such as this website in order to expand my knowledge of it. I'm constantly learning, taking any opportunity I can to expand my skillset and bring new visions to life.</p>
      <p>When I’m not at my computer, I like to spend my time reading, writing, or hanging out with my cat.</p>
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
