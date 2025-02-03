import React from "react";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import "../styles/Intro.css";

const Intro = () => {
    return (
      <div className="intro-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="intro-text">
            <ReactTyped
              strings={["Hello, I'm Josh.", ""]}
              typeSpeed={80}
              backSpeed={50}
              backDelay={2000}
              loop
            />
          </h1>
        </motion.div>
      </div>
    );
  };
  
  export default Intro;