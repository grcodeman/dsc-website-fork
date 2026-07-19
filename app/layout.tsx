import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL_LINKS, SOCIAL_IMAGE } from "@/lib/site";

// Define fonts with next/font. Only ship the weights actually used on the
// site — the hero heading is the LCP element, so every extra font byte
// delays the swap that finalizes LCP on mobile.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['500', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Data Science Club",
    "AI Club",
    "DSAIC",
    "Western Michigan University",
    "WMU",
    "machine learning",
    "artificial intelligence",
    "data science",
    "student organization",
    "Kalamazoo",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: SOCIAL_IMAGE.url,
        width: SOCIAL_IMAGE.width,
        height: SOCIAL_IMAGE.height,
        alt: SOCIAL_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

// schema.org structured data — gives search engines and AI agents a machine-readable
// description of the organization (name, location, socials, logo).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  alternateName: "DSAIC",
  url: SITE_URL,
  logo: `${SITE_URL}/dsaic-logo.png`,
  description: SITE_DESCRIPTION,
  email: "wmu.datascienceclub@gmail.com",
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Western Michigan University",
    url: "https://wmich.edu",
  },
  location: {
    "@type": "Place",
    name: "Western Michigan University",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kalamazoo",
      addressRegion: "MI",
      addressCountry: "US",
    },
  },
  sameAs: SOCIAL_LINKS,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SmoothScroll />
        {children}
        <Script id="ms-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tjm97swhaq");
          `}
        </Script>
      </body>
    </html>
  );
}
