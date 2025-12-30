import { Container, Row, Col } from 'react-bootstrap';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './Projects.css';
import LoadingGif from '../../assets/img/loading.gif';
import ProjectCard from "./ProjectCards";

function Projects() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Mia's Portfolio - Projects</title>
        </Helmet>
      </HelmetProvider>
      <Container fluid className="projects-container">
        <div className="about-left animate__animated animate__zoomIn">
          <h3>Projects</h3>
          <h4>
            ───&nbsp;&nbsp;Page <strong>04</strong>
          </h4>
        </div>
        <Container> <br />
          <Row style={{ justifyContent: "center" }}>
            <Col md={4}>
              <ProjectCard
                imgPath={LoadingGif}
                isBlog={false}
                title="Application of GARCH and Mean-Variance Model in the U.S. Financial Market"
                description="Constructed and applied a GARCH model to analyze volatility and price returns, integrating Monte Carlo simulations for comprehensive risk and return profile"
                ghLink=""
              //demoLink=""
              />
            </Col>

            <Col md={4}>
              <ProjectCard
                imgPath={LoadingGif}
                isBlog={false}
                title="Predictive Analytics in Stock Market Direction"
                description="Engineered and trained a Convolution Neural Network (CNN) model to forecast stock market trends, analyzing Nasdaq data across 82 features from 2009 to 2017"
                ghLink=""
              //demoLink=""
              />
            </Col>

            <Col md={4}>
              <ProjectCard
                imgPath={LoadingGif}
                isBlog={false}
                title="Predictive Analytics for Second-Hand Vehicle Pricing in India"
                description="Developed a robust predictive analytics model analyzing over 17,000 data points to price second-hand vehicles in India accurately"
                ghLink=""
              //demoLink=""
              />
            </Col>
          </Row>

          <div className="footer-space"></div>
        </Container>
      </Container>
    </>
  );
}

export default Projects;
