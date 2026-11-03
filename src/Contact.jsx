import './App.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { contactLinks, profile } from './data/content';

function Contact() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <section id="contact" className="contact-section">
        <a 
          href={profile.resumeUrl} 
          className="btn-resume" 
          target="_blank"
          rel="noopener noreferrer"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          Resume PDF<i className="fas fa-chevron-right" aria-hidden="true"></i>
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
              <i className={link.icon} aria-hidden="true"></i>
            </a>
          ))}
        </div>
      </section>
      <footer className="footer">
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </footer>
    </>
  );
}

export default Contact;
