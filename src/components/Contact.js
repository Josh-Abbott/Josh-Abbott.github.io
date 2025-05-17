import React from 'react';
import "../styles/MainPage.css";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="section">
      <h2>Contact</h2>
      <div className="contact-icons">
        <a href="mailto:abbott.m.josh@gmail.com">
          <img src="/images/email.png" alt="Email" />
        </a>
        <a href="https://www.linkedin.com/in/josh-m-abbott/" target="_blank" rel="noopener noreferrer">
          <img src="/images/linkedin.png" alt="LinkedIn" />
        </a>
        <a href="https://github.com/Josh-Abbott" target="_blank" rel="noopener noreferrer">
          <img src="/images/github.png" alt="GitHub" />
        </a>
        <a href="tel:+2538867539" target="_blank" rel="noopener noreferrer">
          <img src="/images/phone.png" alt="Phone" />
        </a>
      </div>
    </div>
  );
}

export default Contact;
