import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { site } from '../data/site';

function Seo({ title, description }) {
  const fullTitle = title ? `${site.name} — ${title}` : `${site.name} — ${site.role}`;
  const desc = description ?? site.tagline;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name='description' content={desc} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={desc} />
      <meta property='og:type' content='website' />
    </Helmet>
  );
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Seo;
