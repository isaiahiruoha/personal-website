import './App.css';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const contactLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/isaiahiruoha/',
    icon: 'fab fa-instagram',
    className: 'instagram'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/IsaiahIruoha',
    icon: 'fab fa-github',
    className: 'github'
  },
  {
    name: 'Email',
    url: 'mailto:isaiahiruoha@gmail.com',
    icon: 'fas fa-envelope',
    className: 'email'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/isaiahiruoha/',
    icon: 'fab fa-linkedin-in',
    className: 'linkedin'
  }
];

function Contact() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <section id="contact" className="contact-section">
        <a 
          href="https://drive.google.com/file/d/1n0a8gj1Dlw2YS4qFNtfBll83eLOS51V6/view?usp=sharing" 
          className="btn-resume" 
          target="_blank"
          rel="noopener noreferrer"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          Resume PDF<i className="fas fa-chevron-right"></i>
        </a>
        <div className="contact-links">
          {contactLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-icon ${link.className}`}
              aria-label={link.name}
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
              data-aos-duration="500"
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
      </section>
      <footer className="footer">
        <p>© 2025 Isaiah Iruoha</p>
      </footer>
    </>
  );
}

export default Contact;
