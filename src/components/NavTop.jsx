import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink as NavLink } from 'react-router-hash-link';
import { FaAlignRight } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { useState } from 'react';
import './NavTop.css';
import Logo from '../assets/logo.png';
import { routes } from '../routes';

function NavTop() {
  const [toogleMenu, setToogleMenu] = useState(false);

  function toogleOpen() {
    setToogleMenu(true);
  }

  function toogleClose() {
    setToogleMenu(false);
  }

  if (toogleMenu) {
    return (
      <>
        <NavTop />
        <div className='menu'>
          <Container fluid className='menu-close'>
            <button className='toogle-menu ms-auto' onClick={toogleClose}>
              <GrClose />
            </button>
            <div className='menu-list'>
              {routes.map((route, index) => (
                <NavLink key={index} smooth to={route.path} onClick={toogleClose}>
                  {route.title}
                </NavLink>
              ))}
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar className='navtop py-3' expand='lg'>
        <Container fluid className='px-4'>
          <Navbar.Brand className='navtop-brand'>
            <Link to='/'>
              <img src={Logo} alt="Mia's Portfolio" style={{ height: 60, width: 60 }} />
            </Link>
          </Navbar.Brand>
          <button className='toogle-menu' onClick={toogleOpen}>
            <FaAlignRight />
          </button>
          <Nav className='navtop-list ms-auto'>
            {routes.map((route, index) => (
              <Nav.Link key={index} className={index < routes.length - 1 ? 'pe-3' : ''}>
                <NavLink to={route.path} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {route.title}
                </NavLink>
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavTop;
