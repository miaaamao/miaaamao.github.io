import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import './Home.css';
import Mia from '../../assets/img/mia.png';
import Type from '../../components/Type';

function Home() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Mia - Portfolio</title>
        </Helmet>
      </HelmetProvider>
      <Container fluid className="home-wrapper">
        <div className="home-left animate__animated animate__fadeInLeft">
          <h1 style={{ paddingBottom: 15 }} className="heading">
            Hello{" "}
            <span className="wave" role="img" aria-labelledby="wave">
              👋🏻
            </span>
          </h1>
          <h2>
            I'm <span className="name-hover"><Type /></span>
          </h2>
          <NavLink to="/contact" className="connect-download text-center">
            Let's Connect
          </NavLink>
        </div>
        <div className="home-right animate__animated animate__fadeIn animate__slower">
          <img
            className="home-image"
            src={Mia}
            alt="Avatar"
          />
        </div>

      </Container>
    </>
  );
}

export default Home;
