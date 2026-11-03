import './App.css';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { education, extracurriculars, workExperience } from './data/content';

const getInitials = (company) => {
  const specialCases = {
    'Amazon Web Services': 'AWS',
    'RBC Capital Markets': 'RBC',
    "Queen's University": 'QU',
    'Linamar Corporation': 'LIN',
  };
  if (specialCases[company]) return specialCases[company];
  return company.split(' ').map(w => w[0]).slice(0, 3).join('').toUpperCase();
};

function CompanyLogo({ company, logoUrl }) {
  const [imgError, setImgError] = useState(false);
  
  if (imgError || !logoUrl) {
    return (
      <div className="company-initials">
        {getInitials(company)}
      </div>
    );
  }
  
  return (
    <img 
      src={logoUrl} 
      alt={`${company} logo`}
      className="company-logo"
      onError={() => setImgError(true)}
    />
  );
}

function Experience() {
  const [activeTab, setActiveTab] = useState('work');
  
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div data-aos="fade-left" data-aos-offset="250" data-aos-duration="500">
      <section className="experience-section" id="experience">
        <h2 className="experience-header">Experience</h2>
        
        <div className="tab-container">
          <button 
            className={`tab-button ${activeTab === 'work' ? 'active' : ''}`}
            onClick={() => setActiveTab('work')}
          >
            Work Experience
          </button>
          <button 
            className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button 
            className={`tab-button ${activeTab === 'extracurriculars' ? 'active' : ''}`}
            onClick={() => setActiveTab('extracurriculars')}
          >
            Extracurriculars
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'work' && (
            <div className="timeline">
              {workExperience.map((job, index) => (
                <div 
                  key={`${job.company}-${job.date}`} 
                  className="timeline-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3 className="timeline-role">{job.role}</h3>
                      <span className="timeline-type">{job.type}</span>
                    </div>
                    <div className="timeline-company-row">
                      <h4 className="timeline-company">{job.company}</h4>
                      <CompanyLogo company={job.company} logoUrl={job.logo} />
                    </div>
                    <div className="timeline-meta">
                      <span className="timeline-date">{job.date}</span>
                      <span className="timeline-location">{job.location}</span>
                    </div>
                    <p className="timeline-description">
                      {job.description}
                      {job.link && (
                        <>
                          {' '}
                          <a href={job.link} target="_blank" rel="noopener noreferrer" className="timeline-link">
                            Learn more<span className="visually-hidden"> about {job.company}, {job.date}</span>
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="timeline">
              {education.map((edu, index) => (
                <div 
                  key={edu.school} 
                  className="timeline-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3 className="timeline-role">{edu.school}</h3>
                    <h4 className="timeline-company">{edu.degree}</h4>
                    {edu.specialization && (
                      <p className="timeline-specialization">{edu.specialization}</p>
                    )}
                    <div className="timeline-meta">
                      <span className="timeline-date">{edu.date}</span>
                      {edu.grade && <span className="timeline-grade">{edu.grade}</span>}
                    </div>
                    {edu.activities && (
                      <p className="timeline-description">{edu.activities}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'extracurriculars' && (
            <div className="timeline volunteering-grid">
              {extracurriculars.map((vol, index) => (
                <div 
                  key={`${vol.organization}-${vol.role}`} 
                  className="volunteering-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <h3 className="volunteering-role">{vol.role}</h3>
                  <h4 className="volunteering-org">{vol.organization}</h4>
                  <span className="volunteering-date">{vol.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Experience;

