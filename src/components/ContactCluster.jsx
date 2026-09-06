import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { gsap } from '../lib/gsap';
import { useCopyEmail } from '../lib/useCopyEmail';
import { site } from '../data/site';
import IconButton, {
  ChatIcon,
  CloseIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  LinkIcon,
  MailIcon,
} from './IconButton';

const SOCIAL_ICONS = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  github: GitHubIcon,
};

function ContactCluster({ expandable = true }) {
  const [open, setOpen] = useState(false);
  const { copied, copyEmail } = useCopyEmail();
  const ref = useRef(null);

  useEffect(() => {
    if (!open || !ref.current) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-contact-item]',
        { scale: 0.6, opacity: 0, x: -10 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 0.42,
          ease: 'back.out(1.7)',
          stagger: 0.06,
          overwrite: 'auto',
        },
      );
    }, ref);

    return () => context.revert();
  }, [open]);

  const reachable = (
    <>
      <span data-contact-item className='inline-flex'>
        <IconButton label={copied ? 'Copied' : `Copy ${site.email}`} onClick={copyEmail}>
          <MailIcon />
        </IconButton>
      </span>

      {site.socials.map((social) => {
        const Icon = SOCIAL_ICONS[social.icon] ?? LinkIcon;
        return (
          <span key={social.label} data-contact-item className='inline-flex'>
            <IconButton label={social.label} href={social.href}>
              <Icon />
            </IconButton>
          </span>
        );
      })}
    </>
  );

  if (!expandable) return reachable;

  if (!open) {
    return (
      <IconButton label='Get in touch' onClick={() => setOpen(true)}>
        <ChatIcon />
      </IconButton>
    );
  }

  return (
    <div ref={ref} className='flex gap-3'>
      <IconButton label='Close' variant='solid' onClick={() => setOpen(false)}>
        <CloseIcon />
      </IconButton>

      {reachable}
    </div>
  );
}

ContactCluster.propTypes = {
  expandable: PropTypes.bool,
};

export default ContactCluster;
