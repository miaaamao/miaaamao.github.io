import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiIconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import PersonOutlineRounded from '@mui/icons-material/PersonOutlineRounded';
import ChatBubbleOutlineRounded from '@mui/icons-material/ChatBubbleOutlineRounded';
import WorkOutlineRounded from '@mui/icons-material/WorkOutlineRounded';
import CloseFullscreenRounded from '@mui/icons-material/CloseFullscreenRounded';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import ArrowBackIosNewRounded from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import MailOutlineRounded from '@mui/icons-material/MailOutlineRounded';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';
import GitHub from '@mui/icons-material/GitHub';
import LinkRounded from '@mui/icons-material/LinkRounded';

export {
  PersonOutlineRounded as PersonIcon,
  ChatBubbleOutlineRounded as ChatIcon,
  WorkOutlineRounded as WorkIcon,
  CloseFullscreenRounded as CollapseIcon,
  InfoOutlined as InfoIcon,
  OpenInNewRounded as ExternalIcon,
  CloseRounded as CloseIcon,
  ArrowBackIosNewRounded as BackIcon,
  ArrowForwardIosRounded as NextIcon,
  MailOutlineRounded as MailIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
  LinkRounded as LinkIcon,
};

const BASE_SX = {
  height: 64,
  width: 64,
  borderRadius: '16px',
  boxShadow: '0 1px 2px rgba(10,10,10,0.04), 0 8px 24px rgba(10,10,10,0.06)',
  transition: 'transform 300ms cubic-bezier(0,0,0.2,1)',
  '& .MuiSvgIcon-root': { fontSize: 22 },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&:hover': { transform: 'none' },
  },
};

const VARIANTS = {
  soft: {
    ...BASE_SX,
    backgroundColor: '#fff',
    color: '#0a0a0a',
    '&:hover': { backgroundColor: '#fff', transform: 'translateY(-2px)' },
  },
  solid: {
    ...BASE_SX,
    borderRadius: '9999px',
    backgroundColor: '#0a0a0a',
    color: '#fff',
    '&:hover': { backgroundColor: '#1a1a1a', transform: 'translateY(-2px)' },
  },
};

function IconButton({ label, to, href, onClick, variant = 'soft', children }) {
  const shared = {
    'aria-label': label,
    onClick,
    sx: VARIANTS[variant] ?? VARIANTS.soft,
  };

  let control;
  if (to) {
    control = (
      <MuiIconButton component={Link} to={to} {...shared}>
        {children}
      </MuiIconButton>
    );
  } else if (href) {
    control = (
      <MuiIconButton component='a' href={href} target='_blank' rel='noreferrer' {...shared}>
        {children}
      </MuiIconButton>
    );
  } else {
    control = <MuiIconButton {...shared}>{children}</MuiIconButton>;
  }

  return <Tooltip title={label}>{control}</Tooltip>;
}

IconButton.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  children: PropTypes.node.isRequired,
};

export default IconButton;
