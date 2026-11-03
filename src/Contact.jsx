import { ChevronRight } from 'lucide-react';
import { ContactIcon } from './components/Icons';
import { contactLinks, profile } from './data/content';

function Contact() {
  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
      <h2 className="section-header" id="contact-heading" data-aos="fade-up">
        Contact
      </h2>
      <a
        href={profile.resumeUrl}
        className="btn-resume"
        target="_blank"
        rel="noopener noreferrer"
        data-aos="fade-up"
      >
        Resume PDF
        <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" />
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
      <ul className="contact-links">
        {contactLinks.map((link, index) => (
          <li key={link.name} data-aos="fade-up" data-aos-delay={(index + 1) * 80}>
            <a
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className={`contact-icon contact-icon-${link.icon}`}
              aria-label={link.name}
            >
              <ContactIcon name={link.icon} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Contact;
