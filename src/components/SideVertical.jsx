import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import "../style.css";

function SideVertical(props) {
  var numberPage;
  var titlePage;
  var directUp;
  var directDown;
  const { pathname } = useLocation();
  const date = new Date().toISOString().slice(0, 10);
  const dateOfWeek = new Date().getDay();
  const dayOfWeekList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dateOfWeekInWord = dayOfWeekList[dateOfWeek];
  const dateFormat = date.slice(5, 7) + "-" + date.slice(8, 10) + "-" + date.slice(0, 4);

  switch (pathname) {
    case "/":
      numberPage = "01";
      titlePage = "Home";
      break;
    case "/about":
      numberPage = "02";
      titlePage = "About";
      break;
    case "/experiences":
      numberPage = "03";
      titlePage = "Experiences";
      break;
    case "/projects":
      numberPage = "04";
      titlePage = "Projects";
      break;
    case "/courses":
      numberPage = "05";
      titlePage = "Course Taken";
    break;
    case "/skills":
      numberPage = "06";
      titlePage = "Skills";
      break;
    case "/resume":
      numberPage = "07";
      titlePage = "Resume";
      break;
    case "/contact":
      numberPage = "08";
      titlePage = "Contact";
      break;
    default:
  }

  switch (pathname) {
    case "/":
      directUp = "/contact";
      break;
    case "/about":
      directUp = "/";
      break;
    case "/experiences":
      directUp = "/about";
      break;
    case "/projects":
      directUp = "/experiences";
      break;
    case "/courses":
      directUp = "/projects";
      break;
    case "/skills":
      directUp = "/courses";
      break;
    case "/resume":
      directUp = "/skills";
      break;
    case "/contact":
      directUp = "/resume";
      break;
    default:
  }

  switch (pathname) {
    case "/":
      directDown = "/about";
      break;
    case "/about":
      directDown = "/experiences";
      break;
    case "/experiences":
      directDown = "/projects";
      break;
    case "/projects":
      directDown = "/courses";
      break;
    case "/courses":
      directDown = "/skills";
      break;
    case "/skills":
      directDown = "/resume";
      break;
    case "/resume":
      directDown = "/contact";
      break;
    case "/contact":
      directDown = "/";
      break;
    default:
  }

  return (
    <>
      <div className="side-vertical">
        <div className="upper-side d-flex">
          <p className="side-title">{titlePage}</p>
          <p className="side-date">{dateOfWeekInWord} - {dateFormat}</p>
        </div>
        <div className="lower-side d-flex">
          <p className="side-number">
            {numberPage} <span className="disabled-color">/ 08</span>
          </p>
          <Link to={directUp} className="d-flex align-items-center pb-3 arrow">
            <AiOutlineArrowUp />
          </Link>
          <Link to={directDown} className="d-flex align-items-center arrow">
            <AiOutlineArrowDown />
          </Link>
        </div>
      </div>
    </>
  );
}

export default SideVertical;
