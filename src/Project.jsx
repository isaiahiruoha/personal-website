import './App.css';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import ImageWithSpinner from './components/ImageWithSpinner';

function Project() {
    useEffect(() => {
        AOS.init();
    }, []);
    
    return (
        <div data-aos="fade-right"
            data-aos-offset="250"
            data-aos-duration="500">
            <section className="projects-section">
                <h2 className="projects-section-header" id="projects">Projects</h2>
                <div className="projects-grid">
                    <a
                        href="https://isaiahiruoha.github.io/arbitrage/#/"
                        target="_blank"
                        className="project project-tile"
                    >
                        <ImageWithSpinner
                            src={process.env.PUBLIC_URL + '/assets/cryptoarbitrage.png'}
                            alt='crypto arbitrage pathfinding'
                            className="project-image"
                        />
                        <p className="project-title">
                            <span className="code">&lt;</span>
                            {' '}Crypto Arbitrage{' '}
                            <span className="code">&#47;&gt;</span>
                        </p>
                    </a>
                    <a
                        href="https://github.com/IsaiahIruoha/music-genre-detector-ios"
                        target="_blank"
                        className="project project-tile"
                    >
                        <ImageWithSpinner
                            src={process.env.PUBLIC_URL + '/assets/mobileapp.png'}
                            alt='mobileapp'
                            className="project-image"
                        />
                        <p className="project-title">
                            <span className="code">&lt;</span>
                            {' '}AudioInsights{' '}
                            <span className="code">&#47;&gt;</span>
                        </p>
                    </a>
                    <a
                        href="https://github.com/IsaiahIruoha/excel-lite-project"
                        target="_blank"
                        className="project project-tile"
                    >
                        <ImageWithSpinner
                            src={process.env.PUBLIC_URL + '/assets/excel.png'}
                            alt='excellite'
                            className="project-image"
                        />
                        <p className="project-title">
                            <span className="code">&lt;</span>
                            {' '}Excel-Lite{' '}
                            <span className="code">&#47;&gt;</span>
                        </p>
                    </a>
                    <a
                        href="https://github.com/IsaiahIruoha/hack-the-hill-foresights"
                        target="_blank"
                        className="project project-tile"
                    >
                        <ImageWithSpinner
                            src={process.env.PUBLIC_URL + '/assets/foresights.png'}
                            alt='foresights'
                            className="project-image"
                        />
                        <p className="project-title">
                            <span className="code">&lt;</span>
                            {' '}ForeSights{' '}
                            <span className="code">&#47;&gt;</span>
                        </p>
                    </a>
                    <a
                        href="https://github.com/IsaiahIruoha/receiptvault"
                        target="_blank"
                        className="project project-tile"
                    >
                        <ImageWithSpinner
                            src={process.env.PUBLIC_URL + '/assets/receipttracking.png'}
                            alt='walkjump'
                            className="project-image"
                        />
                        <p className="project-title">
                            <span className="code">&lt;</span>
                            {' '}ReceiptVault{' '}
                            <span className="code">&#47;&gt;</span>
                        </p>
                    </a>     
                    <a
                        href="https://github.com/IsaiahIruoha/mern-buyonic"
                        target="_blank"
                        className="project project-tile"
                    >
                        <ImageWithSpinner
                            src={process.env.PUBLIC_URL + '/assets/buyonic.png'}
                            alt='buyonic'
                            className="project-image"
                        />
                        <p className="project-title">
                            <span className="code">&lt;</span>
                            {' '}Buyonic{' '}
                            <span className="code">&#47;&gt;</span>
                        </p>
                    </a>
                </div>
                <a href="https://drive.google.com/file/d/1n0a8gj1Dlw2YS4qFNtfBll83eLOS51V6/view?usp=sharing" 
                   className="btn btn-resume" 
                   target="_blank"
                   rel="noopener noreferrer">
                    Resume PDF<i className="fas fa-chevron-right"></i>
                </a>
            </section>
        </div>
    );
}

export default Project;