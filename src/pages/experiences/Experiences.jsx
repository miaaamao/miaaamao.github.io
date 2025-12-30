import React, { useEffect, useState, useMemo } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import './Experiences.css';
import { experiences } from './experiencesData';
import PropTypes from 'prop-types';

const extractColorFromImage = (imageSrc) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
            const data = imageData.data;

            let r = 0,
                g = 0,
                b = 0;
            let count = 0;

            // Sample pixels and calculate average (skip very light/dark pixels)
            for (let i = 0; i < data.length; i += 4 * 10) {
                // Sample every 10th pixel
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];
                const alpha = data[i + 3];

                // Skip transparent or very light pixels
                if (
                    alpha > 100 &&
                    red + green + blue < 700 &&
                    red + green + blue > 50
                ) {
                    r += red;
                    g += green;
                    b += blue;
                    count++;
                }
            }

            if (count > 0) {
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);
                resolve(
                    `#${((1 << 24) + (r << 16) + (g << 8) + b)
                        .toString(16)
                        .slice(1)}`
                );
            } else {
                resolve("#000000");
            }
        };

        img.onerror = () => resolve("#000000");
    });
};

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
        this.setState({ error: error, errorInfo: errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', color: 'red' }}>
                    <h1>Something went wrong.</h1>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node,
};

function ExperiencesContent() {
    console.log("Rendering ExperiencesContent component");
    const [experienceColors, setExperienceColors] = useState({});

    useEffect(() => {
        const extractColors = async () => {
            const colors = {};
            for (const exp of experiences) {
                colors[exp.id] = await extractColorFromImage(exp.logo);
            }
            setExperienceColors(colors);
        };

        extractColors();
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("timeline-animated");
                }
            });
        }, observerOptions);

        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item) => observer.observe(item));

        return () => {
            items.forEach((item) => observer.unobserve(item));
        };
    }, [experienceColors]); // Re-run when colors load/render

    const orderedExperiences = useMemo(() => {
        return [...experiences]
            .filter((exp) => exp.isActive !== false);
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Mia's Portfolio - Experiences</title>
                </Helmet>
            </HelmetProvider>

            <Container fluid className="skills-wrapper">
                <div className="skills-left animate__animated animate__zoomIn">
                    <h3>Experiences</h3>
                    <h4>
                        ───&nbsp;&nbsp;Page <strong>03</strong>
                    </h4>
                </div>

                <section id="timeline" className="timeline-section">
                    <div className="timeline-container">
                        <div className="timeline-track">
                            <div className="timeline-line"></div>

                            {orderedExperiences.map((exp, index) => {
                                const expColor = experienceColors[exp.id] || "#000000";
                                const isEven = index % 2 === 0;

                                return (
                                    <div
                                        key={exp.id}
                                        className={`timeline-item ${isEven ? 'timeline-left' : 'timeline-right'}`}
                                    >
                                        <div className="timeline-content">
                                            <div
                                                className="timeline-card"
                                                style={{
                                                    borderLeft: `4px solid ${expColor}`,
                                                    background: `linear-gradient(135deg, ${expColor}08 0%, ${expColor}18 100%)`,
                                                }}
                                            >
                                                <div className="timeline-company-header">
                                                    <div className="timeline-company-logo">
                                                        <img
                                                            src={exp.logo}
                                                            alt={exp.company}
                                                        />
                                                    </div>
                                                    <div className="timeline-company-info">
                                                        <h3
                                                            className="timeline-role"
                                                            style={{ color: expColor }}
                                                        >
                                                            {exp.role}
                                                        </h3>
                                                        <h4 className="timeline-company">
                                                            {exp.company}
                                                        </h4>
                                                    </div>
                                                    {exp.duration
                                                        .toLowerCase()
                                                        .includes("present") && (
                                                            <span className="timeline-active-badge">
                                                                Current
                                                            </span>
                                                        )}
                                                </div>

                                                <div className="timeline-meta">
                                                    <span className="timeline-location">
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                        >
                                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 0 0 1 18 0z" />
                                                            <circle cx="12" cy="10" r="3" />
                                                        </svg>
                                                        {exp.location}
                                                    </span>
                                                    <span className="timeline-duration">
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                        >
                                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                            <line x1="16" y1="2" x2="16" y2="6" />
                                                            <line x1="8" y1="2" x2="8" y2="6" />
                                                            <line x1="3" y1="10" x2="21" y2="10" />
                                                        </svg>
                                                        {exp.duration}
                                                    </span>
                                                </div>

                                                <div className="timeline-achievements">
                                                    {exp.achievements.map((achievement, idx) => (
                                                        <p key={idx}>{achievement}</p>
                                                    ))}
                                                </div>

                                                <div className="timeline-tech-stack">
                                                    {exp.technologies.map((tech, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="timeline-tech-tag"
                                                            style={{
                                                                backgroundColor: `${expColor}20`,
                                                                color: expColor,
                                                                borderColor: `${expColor}40`,
                                                            }}
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="timeline-dot"
                                            style={{ borderColor: expColor }}
                                        >
                                            <div
                                                className="timeline-dot-inner"
                                                style={{ backgroundColor: expColor }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </Container>
        </>
    );
}

function Experiences() {
    return (
        <ErrorBoundary>
            <ExperiencesContent />
        </ErrorBoundary>
    );
}

export default Experiences;
