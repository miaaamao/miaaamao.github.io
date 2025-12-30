import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import './SideNav.css';
import { routes } from '../routes';

function SideNav() {
  const { pathname } = useLocation();
  const date = new Date().toISOString().slice(0, 10);
  const dateOfWeek = new Date().getDay();
  const dayOfWeekList = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dateOfWeekInWord = dayOfWeekList[dateOfWeek];
  const dateFormat = date.slice(5, 7) + '-' + date.slice(8, 10) + '-' + date.slice(0, 4);

  const currentIndex = routes.findIndex((route) => route.path === pathname);

  const pageNumber = currentIndex !== -1 ? currentIndex + 1 : 0;
  const numberPage = pageNumber < 10 ? `0${pageNumber}` : pageNumber;
  const totalPages = routes.length < 10 ? `0${routes.length}` : routes.length;

  const titlePage = currentIndex !== -1 ? routes[currentIndex].title : '';

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : routes.length - 1;
  const nextIndex = currentIndex < routes.length - 1 ? currentIndex + 1 : 0;

  const directUp = currentIndex !== -1 ? routes[prevIndex].path : routes[routes.length - 1].path;
  const directDown = currentIndex !== -1 ? routes[nextIndex].path : routes[0].path;

  const displayTitle = currentIndex !== -1 ? titlePage : '';
  const displayNumber = currentIndex !== -1 ? numberPage : '--';

  return (
    <>
      <div className='side-nav'>
        <div className='upper-side d-flex'>
          <p className='side-title'>{displayTitle}</p>
          <p className='side-date'>
            {dateOfWeekInWord} - {dateFormat}
          </p>
        </div>
        <div className='lower-side d-flex'>
          <p className='side-number'>
            {displayNumber} <span className='disabled-color'>/ {totalPages}</span>
          </p>
          <Link to={directUp} className='d-flex align-items-center pb-3 arrow'>
            <AiOutlineArrowUp />
          </Link>
          <Link to={directDown} className='d-flex align-items-center arrow'>
            <AiOutlineArrowDown />
          </Link>
        </div>
      </div>
    </>
  );
}

export default SideNav;
