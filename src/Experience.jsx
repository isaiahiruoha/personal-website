import { useRef, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { education, extracurriculars, workExperience } from './data/content';

const TABS = [
  { id: 'work', label: 'Work Experience', short: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'extracurriculars', label: 'Extracurriculars' },
];

const INITIALS = {
  'Amazon Web Services': 'AWS',
  'RBC Capital Markets': 'RBC',
  "Queen's University": 'QU',
  'Linamar Corporation': 'LIN',
};

const initialsFor = (company) =>
  INITIALS[company] ?? company.split(' ').map((word) => word[0]).slice(0, 3).join('').toUpperCase();

function CompanyLogo({ company, logoUrl }) {
  const [failed, setFailed] = useState(false);

  if (failed || !logoUrl) {
    return (
      <span className="company-initials" aria-hidden="true">
        {initialsFor(company)}
      </span>
    );
  }

  return (
    <img
      src={logoUrl}
      alt=""
      className="company-logo"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function Meta({ date, location, grade }) {
  return (
    <div className="timeline-meta">
      <span className="timeline-meta-item">
        <Calendar size={14} strokeWidth={2} aria-hidden="true" />
        {date}
      </span>
      {location && (
        <span className="timeline-meta-item">
          <MapPin size={14} strokeWidth={2} aria-hidden="true" />
          {location}
        </span>
      )}
      {grade && <span className="timeline-grade">{grade}</span>}
    </div>
  );
}

function WorkTimeline() {
  return (
    <ol className="timeline">
      {workExperience.map((job, index) => (
        <li key={`${job.company}-${job.date}`} className="timeline-item" style={{ animationDelay: `${index * 0.06}s` }}>
          <span className="timeline-marker" aria-hidden="true" />
          <div className="timeline-content">
            <div className="timeline-header">
              <h3 className="timeline-role">{job.role}</h3>
              <span className="timeline-type">{job.type}</span>
            </div>
            <div className="timeline-company-row">
              <p className="timeline-company">{job.company}</p>
              <CompanyLogo company={job.company} logoUrl={job.logo} />
            </div>
            <Meta date={job.date} location={job.location} />
            <p className="timeline-description">
              {job.description}
              {job.link && (
                <>
                  {' '}
                  <a href={job.link} target="_blank" rel="noopener noreferrer" className="timeline-link">
                    Learn more<span className="visually-hidden"> about {job.company}, {job.date} (opens in a new tab)</span>
                  </a>
                </>
              )}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function EducationTimeline() {
  return (
    <ol className="timeline">
      {education.map((edu, index) => (
        <li key={edu.school} className="timeline-item" style={{ animationDelay: `${index * 0.06}s` }}>
          <span className="timeline-marker" aria-hidden="true" />
          <div className="timeline-content">
            <h3 className="timeline-role">{edu.school}</h3>
            <p className="timeline-company">{edu.degree}</p>
            {edu.specialization && <p className="timeline-specialization">{edu.specialization}</p>}
            <Meta date={edu.date} grade={edu.grade} />
            {edu.activities && <p className="timeline-description">{edu.activities}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

function ExtracurricularGrid() {
  return (
    <ul className="extracurricular-grid">
      {extracurriculars.map((item, index) => (
        <li
          key={`${item.organization}-${item.role}`}
          className="extracurricular-card"
          style={{ animationDelay: `${index * 0.04}s` }}
        >
          <h3 className="extracurricular-role">{item.role}</h3>
          <p className="extracurricular-org">{item.organization}</p>
          <p className="extracurricular-date">{item.date}</p>
        </li>
      ))}
    </ul>
  );
}

const PANELS = { work: WorkTimeline, education: EducationTimeline, extracurriculars: ExtracurricularGrid };

function Experience() {
  const [activeTab, setActiveTab] = useState('work');
  const tabRefs = useRef({});

  // WAI-ARIA tabs pattern: arrows, Home and End move between tabs and activate them.
  const onKeyDown = (event) => {
    const index = TABS.findIndex((tab) => tab.id === activeTab);
    const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: TABS.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = TABS[(moves[event.key] + TABS.length) % TABS.length].id;
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  };

  const Panel = PANELS[activeTab];

  return (
    <section className="section experience-section" id="experience" aria-labelledby="experience-heading">
      <h2 className="section-header" id="experience-heading" data-aos="fade-up">
        Experience
      </h2>

      <div className="tab-container" role="tablist" aria-label="Experience categories" onKeyDown={onKeyDown}>
        {TABS.map((tab) => {
          const selected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className={`tab-button ${selected ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.short ? (
                <>
                  <span className="tab-label-full">{tab.label}</span>
                  <span className="tab-label-short" aria-hidden="true">
                    {tab.short}
                  </span>
                </>
              ) : (
                tab.label
              )}
            </button>
          );
        })}
      </div>

      <div className="tab-content" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        <Panel />
      </div>
    </section>
  );
}

export default Experience;
