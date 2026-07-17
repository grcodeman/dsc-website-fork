// Central site configuration.
//
// SITE_URL is the production origin used to build absolute links for Open
// Graph/Twitter tags, the canonical URL, sitemap.xml, robots.txt, and the
// structured data. Defaults to the live domain; set NEXT_PUBLIC_SITE_URL to
// override it for preview deploys or local builds.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dscwmu.org'
).replace(/\/$/, '');

export const SITE_NAME = 'Data Science & AI Club at WMU';

export const SITE_DESCRIPTION =
  'Student club at Western Michigan University focused on data science, AI, and machine learning. Open to all majors — collaborate on real-world projects, connect with industry, and learn together.';

// Official social / organization profiles, surfaced to crawlers and AI agents
// via schema.org `sameAs`.
export const SOCIAL_LINKS = [
  'https://www.linkedin.com/company/data-science-club-wmu/',
  'https://www.instagram.com/wmudatascience',
  'https://experiencewmu.wmich.edu/organization/dsaic',
  'https://github.com/Data-Science-Club-at-WMU',
];

// Landscape image used for link previews (Open Graph / Twitter cards).
export const SOCIAL_IMAGE = {
  url: '/club-spring-26.webp',
  width: 1310,
  height: 922,
  alt: 'Members of the Data Science & AI Club at Western Michigan University',
};
