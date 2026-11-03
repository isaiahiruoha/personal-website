import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { TechIcon } from './components/Icons';
import { projects } from './data/content';
import { prefersReducedMotion } from './lib/scroll';

function ProjectImage({ project }) {
  return (
    <div className="project-media">
      <picture>
        {project.imageAvif && <source type="image/avif" srcSet={project.imageAvif} />}
        <img
          src={project.image}
          alt=""
          className="project-image"
          width="720"
          height="440"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const tiltRef = useRef(null);

  useEffect(() => {
    const node = tiltRef.current;
    if (!node || prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return undefined;

    VanillaTilt.init(node, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      scale: 1.02,
      perspective: 1000,
    });
    return () => node.vanillaTilt?.destroy();
  }, []);

  return (
    <li className="project-item" data-aos="fade-up" data-aos-delay={index * 80}>
      <a ref={tiltRef} href={project.link} target="_blank" rel="noopener noreferrer" className="project">
        <ProjectImage project={project} />
        <div className="project-info">
          <h3 className="project-title">
            <span className="code" aria-hidden="true">&lt;</span> {project.title}{' '}
            <span className="code" aria-hidden="true">/&gt;</span>
          </h3>
          <span className="visually-hidden">(opens in a new tab)</span>
          <div className="tech-stack">
            {project.tech.map((tech) => (
              <TechIcon key={tech} name={tech} />
            ))}
          </div>
        </div>
      </a>
    </li>
  );
}

function Project() {
  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
      <h2 className="section-header" id="projects-heading" data-aos="fade-up">
        Projects
      </h2>
      <ul className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </ul>
    </section>
  );
}

export default Project;
