import './App.css';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Experience() {
  const [activeTab, setActiveTab] = useState('work');
  
  useEffect(() => {
    AOS.init();
  }, []);

  const workExperience = [
    {
      id: 1,
      role: 'Quantitative Trading Analyst',
      company: 'RBC Capital Markets',
      type: 'Co-op',
      date: 'Aug 2025 - Present',
      location: 'Toronto, ON',
      description: 'Global Markets Electronic Trading',
      logo: 'https://logo.clearbit.com/rbc.com'
    },
    {
      id: 2,
      role: 'Software Development Engineer (AI/ML)',
      company: 'Amazon Web Services (AWS)',
      type: 'Internship',
      date: 'May 2025 - Aug 2025',
      location: 'Vancouver, BC',
      description: 'Open-Source Managed Apache Airflow',
      logo: 'https://logo.clearbit.com/aws.amazon.com'
    },
    {
      id: 3,
      role: 'Global Markets & Investment Banking Analyst',
      company: 'Scotiabank',
      type: 'Internship',
      date: 'Jun 2024 - Sep 2024',
      location: 'Toronto, ON',
      description: 'Rotational Exposure – Equity & Credit Derivatives, FX, Diversified and P&U',
      logo: 'https://logo.clearbit.com/scotiabank.com'
    },
    {
      id: 4,
      role: 'Software Engineer',
      company: 'Guestlogix',
      type: 'Internship',
      date: 'Apr 2024 - May 2024',
      location: 'Toronto, ON',
      description: 'Production Observability & Metrics',
      logo: 'https://logo.clearbit.com/guestlogix.com'
    },
    {
      id: 5,
      role: 'Teaching Assistant',
      company: 'Queen\'s University',
      type: 'Contract',
      date: 'Aug 2023 - Dec 2023',
      location: 'Kingston, ON',
      description: 'Computer Programming in C',
      logo: 'https://logo.clearbit.com/queensu.ca'
    },
    {
      id: 6,
      role: 'Software Automation Engineer',
      company: 'Linamar Corporation',
      type: 'Internship',
      date: 'May 2023 - Aug 2023',
      location: 'Guelph, ON',
      description: 'Robot Monitoring & Automation',
      logo: 'https://logo.clearbit.com/linamar.com'
    },
    {
      id: 7,
      role: 'Robotics and Automation Engineer',
      company: 'Linamar Corporation',
      type: 'Internship',
      date: 'Jul 2022 - Aug 2022',
      location: 'Guelph, ON',
      description: 'Conveyor Simulation & Robotics Maintenance',
      logo: 'https://logo.clearbit.com/linamar.com'
    }
  ];

  const education = [
    {
      id: 1,
      school: 'Queen\'s University',
      degree: 'Bachelor of Applied Science - Computer Engineering',
      specialization: 'Artificial Intelligence Stream',
      date: 'Sep 2022 - Apr 2027',
      grade: 'GPA: 4.1/4.3'
    },
    {
      id: 2,
      school: 'Smith School of Business at Queen\'s University',
      degree: 'Certificate in Business',
      specialization: '',
      date: 'Sep 2022 - Apr 2027',
      grade: ''
    },
    {
      id: 3,
      school: 'Bishop P. F. Reding Catholic Secondary School',
      degree: 'High School Diploma',
      specialization: '',
      date: 'Sep 2018 - Jun 2022',
      grade: 'Grade: 98%',
      activities: 'Varsity Basketball, Soccer, Football, Track & Field'
    }
  ];

  const volunteering = [
    {
      id: 1,
      role: 'Open-Source Contributor',
      organization: 'Apache Airflow',
      date: 'Jun 2025 - Present'
    },
    {
      id: 2,
      role: 'Technical Project Manager',
      organization: 'CREO Solutions',
      date: 'Mar 2024 - Present'
    },
    {
      id: 3,
      role: 'Machine Learning Engineer',
      organization: 'QMIND',
      date: 'Oct 2023 - Apr 2025'
    },
    {
      id: 4,
      role: 'Quantitative Analyst',
      organization: 'QUANTT',
      date: 'Sep 2023 - Apr 2025'
    },
    {
      id: 5,
      role: 'Capital Markets Analyst',
      organization: 'Queen\'s University Business and Engineering',
      date: 'Mar 2023 - Mar 2024'
    },
    {
      id: 6,
      role: 'Software Developer',
      organization: 'Queen\'s Hyperloop Design Team',
      date: 'Jan 2023 - Apr 2023'
    },
    {
      id: 7,
      role: 'Onyx Scholar',
      organization: 'Onyx Initiative',
      date: 'Mar 2024 - Present'
    },
    {
      id: 8,
      role: 'General Member',
      organization: 'ColorStack',
      date: 'Aug 2025 - Present'
    },
    {
      id: 9,
      role: 'General Member',
      organization: 'Blackleaf Capital',
      date: 'Oct 2024 - Present'
    },
    {
      id: 10,
      role: 'Engineering Orientation Leader (FREC)',
      organization: 'Engineering Society of Queen\'s University',
      date: 'Mar 2023 - Sep 2023'
    }
  ];

  return (
    <div data-aos="fade-left" data-aos-offset="250" data-aos-duration="500">
      <section className="experience-section" id="experience">
        <h2 className="experience-header">Experience</h2>
        
        {/* Tab Navigation */}
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
            className={`tab-button ${activeTab === 'volunteering' ? 'active' : ''}`}
            onClick={() => setActiveTab('volunteering')}
          >
            Volunteering
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Work Experience */}
          {activeTab === 'work' && (
            <div className="timeline">
              {workExperience.map((job, index) => (
                <div 
                  key={job.id} 
                  className="timeline-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-top">
                      <img 
                        src={job.logo} 
                        alt={`${job.company} logo`}
                        className="company-logo"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="timeline-header">
                        <h3 className="timeline-role">{job.role}</h3>
                        <span className="timeline-type">{job.type}</span>
                      </div>
                    </div>
                    <h4 className="timeline-company">{job.company}</h4>
                    <div className="timeline-meta">
                      <span className="timeline-date">{job.date}</span>
                      <span className="timeline-location">{job.location}</span>
                    </div>
                    <p className="timeline-description">{job.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {activeTab === 'education' && (
            <div className="timeline">
              {education.map((edu, index) => (
                <div 
                  key={edu.id} 
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

          {/* Volunteering */}
          {activeTab === 'volunteering' && (
            <div className="timeline volunteering-grid">
              {volunteering.map((vol, index) => (
                <div 
                  key={vol.id} 
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

