import type { Metadata } from 'next';

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

/**
 * Metadata for a page other than the homepage: its own title, canonical URL,
 * and link preview. Next.js replaces the layout's openGraph and twitter
 * objects outright when a page sets them, so both are rebuilt in full here to
 * keep the preview image.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title, // the root layout's title template appends the club name
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      title: fullTitle,
      description,
      url: path,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}
