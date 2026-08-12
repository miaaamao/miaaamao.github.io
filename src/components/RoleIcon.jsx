import PropTypes from 'prop-types';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import WorkIcon from '@mui/icons-material/Work';

const ICONS = {
  teacher: SchoolIcon,
  tutor: MenuBookIcon,
  business: TrendingUpIcon,
  finance: AccountBalanceIcon,
  data: QueryStatsIcon,
  actor: TheaterComedyIcon,
  director: MovieCreationIcon,
  model: CheckroomIcon,
  stage: HeadsetMicIcon,
};

function RoleIcon({ name, size = 'clamp(1rem, 26cqw, 3.2rem)' }) {
  const Icon = ICONS[name] ?? WorkIcon;
  return <Icon style={{ fontSize: size }} />;
}

RoleIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default RoleIcon;
