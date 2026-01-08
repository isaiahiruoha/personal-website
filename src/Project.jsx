import './App.css';
import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import VanillaTilt from 'vanilla-tilt';
import ImageWithSpinner from './components/ImageWithSpinner';

const techIcons = {
    'Python': { icon: 'devicon-python-plain', label: 'Python', color: '#3776AB' },
    'React': { icon: 'devicon-react-original', label: 'React', color: '#61DAFB' },
    'D3.js': { icon: 'devicon-d3js-plain', label: 'D3.js', color: '#F9A03C' },
    'Flask': { icon: 'devicon-flask-original', label: 'Flask', color: '#000000' },
    'Swift': { icon: 'devicon-swift-plain', label: 'Swift', color: '#FA7343' },
    'CoreML': { icon: 'devicon-apple-original', label: 'CoreML', color: '#000000' },
    'C': { icon: 'devicon-c-plain', label: 'C', color: '#A8B9CC' },
    'C++': { icon: 'devicon-cplusplus-plain', label: 'C++', color: '#00599C' },
    'PyTorch': { icon: 'devicon-pytorch-original', label: 'PyTorch', color: '#EE4C2C' },
    'YOLOv5': { icon: 'devicon-opencv-plain', label: 'YOLOv5', color: '#5C3EE8' },
    'JavaScript': { icon: 'devicon-javascript-plain', label: 'JavaScript', color: '#F7DF1E' },
    'MongoDB': { icon: 'devicon-mongodb-plain', label: 'MongoDB', color: '#47A248' },
};

const projects = [
    {
        id: 1,
        title: 'Crypto Arbitrage',
        image: '/assets/cryptoarbitrage.png',
        link: 'https://isaiahiruoha.github.io/arbitrage/#/',
        tech: ['Python', 'React', 'D3.js', 'Flask']
    },
    {
        id: 2,
        title: 'AudioInsights',
        image: '/assets/mobileapp.png',
        link: 'https://github.com/IsaiahIruoha/music-genre-detector-ios',
        tech: ['Swift', 'Python', 'CoreML']
    },
    {
        id: 3,
        title: 'Excel-Lite',
        image: '/assets/excel.png',
        link: 'https://github.com/IsaiahIruoha/excel-lite-project',
        tech: ['C']
    },
    {
        id: 4,
        title: 'ForeSights',
        image: '/assets/foresights.png',
        link: 'https://github.com/IsaiahIruoha/hack-the-hill-foresights',
        tech: ['Python', 'React', 'PyTorch', 'YOLOv5']
    },
    {
        id: 5,
        title: 'ReceiptVault',
        image: '/assets/receipttracking.png',
        link: 'https://github.com/IsaiahIruoha/receiptvault',
        tech: ['C++', 'Python']
    },
    {
        id: 6,
        title: 'Buyonic',
        image: '/assets/buyonic.png',
        link: 'https://github.com/IsaiahIruoha/mern-buyonic',
        tech: ['JavaScript', 'MongoDB', 'React']
    }
];

function ProjectCard({ project, index }) {
    const tiltRef = useRef(null);

    useEffect(() => {
        if (tiltRef.current) {
            VanillaTilt.init(tiltRef.current, {
                max: 8,
                speed: 400,
                glare: true,
                'max-glare': 0.15,
                scale: 1.02,
                perspective: 1000,
            });
        }

        return () => {
            if (tiltRef.current && tiltRef.current.vanillaTilt) {
                tiltRef.current.vanillaTilt.destroy();
            }
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
            <ImageWithSpinner
                src={process.env.PUBLIC_URL + project.image}
                alt={project.title}
                className="project-image"
            />
            <div className="project-info">
                <p className="project-title">
                    <span className="code">&lt;</span>
                    {' '}{project.title}{' '}
                    <span className="code">&#47;&gt;</span>
                </p>
                <div className="tech-stack">
                    {project.tech.map((tech, i) => {
                        const techInfo = techIcons[tech];
                        return (
                            <span 
                                key={i} 
                                className="tech-icon" 
                                title={techInfo?.label || tech}
                                style={{ '--brand-color': techInfo?.color || 'inherit' }}
                            >
                                {techInfo ? (
                                    <i className={techInfo.icon}></i>
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
                        key={project.id} 
                        project={project} 
                        index={index} 
                    />
                ))}
            </div>
        </section>
    );
}

export default Project;
