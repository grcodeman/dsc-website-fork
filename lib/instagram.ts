// Recent Instagram posts for the calendar page's "See what we've been up to"
// section, newest first. The page shows the five most recent.
//
// To add a post: save its first image to public/instagram/ as a 1080x1350
// WebP, then add an entry at the top of the list. `href` is the post's link
// (Share > Copy link in the app); without one, the tile opens the profile.

export const INSTAGRAM_HANDLE = "dsaicwmu";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export type InstagramPost = {
  title: string;
  image: string;
  /** Describes the image for screen readers. */
  alt: string;
  href?: string;
};

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    title: "Week 2 meeting recap",
    image: "/instagram/week-2-meeting-recap.webp",
    alt: "Week 2 meeting recap: members around the conference table, with slides on the agenda, agent workflow, financial terms, fishbone analysis, git, and target audience",
  },
  {
    title: "Week 1 project meeting",
    image: "/instagram/week-1-project-meeting.webp",
    alt: "Photo collage of club members assembling a PC at the week 1 project meeting",
  },
];
