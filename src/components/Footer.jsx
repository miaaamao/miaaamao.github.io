import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import './Footer.css';

function Footer() {
  let date = new Date();
  let year = date.getFullYear();

  return (
    <>
      <footer className='px-4'>
        <div className='foot-left d-flex'>
          <p>Copyright © 2024 - {year} Mia</p>
        </div>
        <div className='foot-right d-flex'>
          {/* <a
            href="https://github.com/miaaamao"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub className="foot-icon" />
            &nbsp;&nbsp;GitHub
          </a> */}
          <a href='https://www.linkedin.com/in/mia-mao0320/' target='_blank' rel='noreferrer'>
            <AiFillLinkedin className='foot-icon' />
            &nbsp;&nbsp;Linkedin
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
