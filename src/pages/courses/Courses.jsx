import React from "react";
import { Container } from "react-bootstrap";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './Courses.css';

import DukeLogo from "../../assets/img/education/duke.png";
import UCSBLogo from "../../assets/img/education/ucsb.png";

function CourseTaken() {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Mia's Portfolio - Courses</title>
                </Helmet>
            </HelmetProvider>
            <Container fluid className="skills-wrapper">
                <div className="skills-left animate__animated animate__zoomIn">
                    <h3>Courses</h3>
                    <h4>───&nbsp;&nbsp;Page <strong>05</strong></h4>
                </div>
                <div className="courses-section">
                    <div className="university-course-section">
                        <h4 className="text-center">Courses taken at <a href="https://www.fuqua.duke.edu/" target="blank" style={{ textDecoration: 'none', cursor: 'pointer', color: '#00539c' }}>Duke University</a></h4> <br />
                        {renderCourses("Duke")}
                    </div>
                    <div className="university-course-section">
                        <h4 className="text-center">Courses taken at <a href="https://www.ucsb.edu/" target="blank" style={{ textDecoration: 'none', cursor: 'pointer', color: '#003660' }}>University of California, Santa Barbara</a></h4> <br />
                        {renderCourses("UCSB")}
                    </div>
                </div>
                <div className="footer-space"></div>
            </Container>
        </>
    );
}

function renderCourses(university) {
    const courses = {
        UCSB: [
            { title: "Stochastic Processes" },
            { title: "Advanced Numerical Analysis" },
            { title: "Probability and Statistics" },
            { title: "Advanced Numerical Analysis" },
            { title: "Probability and Statistics" },
            { title: "Statistics, Regression" },
            { title: "Methods of Analysis" },
            { title: "Game Theory" },
            { title: "Econometrics" },
            { title: "Microeconomics" },
            { title: "Macroeconomics" },
        ],
        Duke: [
            { title: "DECISION 518Q - Applied Probability and Statistics" },
            { title: "DECISION 519Q - Data Infrastructure" },
            { title: "DECISION 520Q - Data Science for Business" },
            { title: "DECISION 521Q - Decision Analytics & Modeling" },
            { title: "DECISION 522Q - Data Visualization" },
            { title: "DECISION 563Q - Programming for Data Analytics" },
            { title: "DECISION 546Q - Modern Analytics" },
            { title: "FINANCE 527Q Intermediate Finance" },
            { title: "FINANCE 528Q - Derivatives" },
            { title: "FINANCE 529Q - Fixed Income Securities" },
            { title: "FINANCE 530Q - Financial Risk Management" },
            { title: "MANAGEMT 542Q - Critical Thinking & Collaboration" },
            { title: "MGMTCOM 507Q - Business Communication" },
            { title: "FUQINTRD 531Q - Business Fundamentals" },
            { title: "MANAGEMT 543Q - Navigating Organizations" },
        ],
    };

    const logos = {
        Duke: DukeLogo,
        UCSB: UCSBLogo
    };

    return (
        <div className="course-list">
            {courses[university].map((course, index) => (
                <div key={index} className="course-entry">
                    <img src={logos[university]} alt={course.title} width="150" height="150" />
                    <div className="course-info">
                        <strong>{course.title}</strong><br />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CourseTaken;
