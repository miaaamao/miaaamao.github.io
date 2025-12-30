import React, { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container, Modal, Button } from 'react-bootstrap';
import '../../style.css';
import DukeDiploma from "../../assets/diploma/Duke Diploma.pdf";
import UCSBDiploma from "../../assets/diploma/UCSB Diploma.pdf";
import DukeDiplomaPreviewImage from "../../assets/diploma/Duke Diploma Preview.png";
import UCSBDiplomaPreviewImage from "../../assets/diploma/UCSB Diploma Preview.png";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Document, Page } from 'react-pdf';

function About() {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const [showDukeModal, setShowDukeModal] = useState(false);
  const [dukeIsDiplomaPreviewVisible, setDukeIsDiplomaPreviewVisible] = useState(false);

  const showDukeDiplomaPreview = () => setDukeIsDiplomaPreviewVisible(true);
  const hideDukeDiplomaPreview = () => setDukeIsDiplomaPreviewVisible(false);
  const handleDukeDiplomaModalShow = () => setShowDukeModal(true);
  const handleDukeDiplomaModalClose = () => setShowDukeModal(false);

  const [showUCSBModal, setShowUCSBModal] = useState(false);
  const [ucsbIsDiplomaPreviewVisible, setUCSBIsDiplomaPreviewVisible] = useState(false);

  const showUCSBDiplomaPreview = () => setUCSBIsDiplomaPreviewVisible(true);
  const hideUCSBDiplomaPreview = () => setUCSBIsDiplomaPreviewVisible(false);
  const handleUCSBDiplomaModalShow = () => setShowUCSBModal(true);
  const handleUCSBDiplomaModalClose = () => setShowUCSBModal(false);
  
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Mia's Portfolio - About</title>
        </Helmet>
      </HelmetProvider>
      <Container fluid className="about-wrapper">
        <div className="about-left animate__animated animate__zoomIn">
          <h3>About</h3>
          <h4>───&nbsp;&nbsp;Page <strong>02</strong></h4>
        </div>
        <div className="about-right">
          <p className="home-about-body">
            Hi, I'm Mia Mao, I graduated from <span onMouseEnter={showDukeDiplomaPreview} onMouseLeave={hideDukeDiplomaPreview} onClick={handleDukeDiplomaModalShow} style={{ cursor: 'pointer', color: '#00539c' }}>Duke University</span>
            {dukeIsDiplomaPreviewVisible && (
              <div className="duke-img-preview">
                <img src={DukeDiplomaPreviewImage} alt="Duke Diploma Preview" style={{ width: '100px', height: 'auto' }}/>
              </div>
            )} with a MS in Quantitative Management in Business Analytics, Finance Track, and from <span onMouseEnter={showUCSBDiplomaPreview} onMouseLeave={hideUCSBDiplomaPreview} onClick={handleUCSBDiplomaModalShow} style={{ cursor: 'pointer', color: '#003660' }}>University of California, Santa Barbara</span>
            {ucsbIsDiplomaPreviewVisible && (
              <div className="ucsb-img-preview">
                <img src={UCSBDiplomaPreviewImage} alt="UCSB Diploma Preview" style={{ width: '100px', height: 'auto' }}/>
              </div>
            )} with a BS in Financial Mathematics and Statistics and a BA in Theater in 2023.
          </p>
        </div>

        <Modal show={showDukeModal} onHide={handleDukeDiplomaModalClose} size="lg">
          <Modal.Header closeButton>
              <Modal.Title>My Duke Diploma</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="pdf-viewer-container">
                {currentPage > 1 && (
                  <AiOutlineLeft className="pdf-nav-arrow left-arrow" onClick={goToPreviousPage} />
                )}
                <Document file={DukeDiploma} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={currentPage} />
                </Document>
                {currentPage < numPages && (
                  <AiOutlineRight className="pdf-nav-arrow right-arrow" onClick={goToNextPage} />
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDukeDiplomaModalClose}>
                Close
              </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showUCSBModal} onHide={handleUCSBDiplomaModalClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>My UCSB Diploma</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="pdf-viewer-container">
              {currentPage > 1 && (
                <AiOutlineLeft className="pdf-nav-arrow left-arrow" onClick={goToPreviousPage} />
              )}
              <Document file={UCSBDiploma} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={currentPage} />
              </Document>
              {currentPage < numPages && (
                <AiOutlineRight className="pdf-nav-arrow right-arrow" onClick={goToNextPage} />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUCSBDiplomaModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default About;
