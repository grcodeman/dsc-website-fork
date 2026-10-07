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

// Kept under 160 characters so search results and link previews show it whole.
export const SITE_DESCRIPTION =
  'Student club at Western Michigan University for data science, AI, and machine learning. Open to all majors — build real projects, connect with industry.';

// Official social / organization profiles, surfaced to crawlers and AI agents
// via schema.org `sameAs`.
export const SOCIAL_LINKS = [
  'https://www.linkedin.com/company/data-science-club-wmu/',
  'https://www.instagram.com/dsaicwmu/',
  'https://experiencewmu.wmich.edu/organization/dsaic',
  'https://github.com/Data-Science-Club-at-WMU',
];

// Link preview card (Open Graph / Twitter). Built by scripts/create-og-image.py
// at the 1200x630 every platform crops to. JPEG rather than WebP because a few
// crawlers (notably LinkedIn) still skip WebP previews. Bump ?v= whenever the
// image changes: link previews cache images by URL.
export const SOCIAL_IMAGE = {
  url: '/og-image.jpg?v=2',
  width: 1200,
  height: 630,
  alt: 'Members of the Data Science & AI Club at Western Michigan University',
  type: 'image/jpeg',
};

// Brand color for the mobile browser toolbar and the web app manifest.
export const THEME_COLOR = '#25197A';
