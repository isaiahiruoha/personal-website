import './App.css';
import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import VanillaTilt from 'vanilla-tilt';
import ImageWithSpinner from './components/ImageWithSpinner';
import { projects, techIcons } from './data/content';

function ProjectCard({ project, index }) {
    const tiltRef = useRef(null);

    useEffect(() => {
        const node = tiltRef.current;
        if (node) {
            VanillaTilt.init(node, {
                max: 8,
                speed: 400,
                glare: true,
                'max-glare': 0.15,
                scale: 1.02,
                perspective: 1000,
            });
        }

        return () => {
            node?.vanillaTilt?.destroy();
        };
    }, []);

    return (
        <a
            ref={tiltRef}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project project-tile"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-duration="600"
        >
            {project.image ? (
                <ImageWithSpinner
                    src={project.image}
                    alt=""
                    className="project-image"
                />
            ) : (
                <div className="project-image-placeholder" aria-hidden="true">
                    {project.title}
                </div>
            )}
            <div className="project-info">
                <h3 className="project-title">
                    <span className="code" aria-hidden="true">&lt;</span>
                    {' '}{project.title}{' '}
                    <span className="code" aria-hidden="true">&#47;&gt;</span>
                </h3>
                <div className="tech-stack">
                    {project.tech.map((tech, i) => {
                        const techInfo = techIcons[tech];
                        return (
                            <span 
                                key={i} 
                                className="tech-icon" 
                                title={tech}
                                style={{ '--brand-color': techInfo?.color || 'inherit' }}
                            >
                                {techInfo ? (
                                    <>
                                        <i className={techInfo.icon} aria-hidden="true"></i>
                                        <span className="visually-hidden">{tech}</span>
                                    </>
                                ) : (
                                    <span className="tech-fallback">{tech}</span>
                                )}
                            </span>
                        );
                    })}
                </div>
            </div>
        </a>
    );
}

function Project() {
    useEffect(() => {
        AOS.init();
    }, []);
    
    return (
        <section className="projects-section">
            <h2 
                className="projects-section-header" 
                id="projects"
                data-aos="fade-up"
                data-aos-duration="600"
            >
                Projects
            </h2>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={project.title} 
                        project={project} 
                        index={index} 
                    />
                ))}
            </div>
        </section>
    );
}

export default Project;
