// Single source of truth for club events. The calendar page shows every
// event; the landing page Schedule section shows only the ones flagged
// `featured`. Edit event info here and both pages stay in sync.
export type ClubEvent = {
  id: number;
  title: string;
  date: string;
  description: string;
  color: 'violet' | 'ink';
  link?: { href: string; label: string };
  /** Show this event in the landing page Schedule section. */
  featured?: boolean;
};

export const EVENTS: ClubEvent[] = [
  {
    id: 1,
    title: "Bronco Bash",
    date: "Tue Sep 1 2026, 3:00-6:00pm | Main Campus",
    description: "Come support us and stop by our table for free goodies and snacks!",
    color: "violet",
    featured: true,
  },
  {
    id: 2,
    title: "Info Night",
    date: "Thu Sep 3 2026, 6:30-9:00pm | Parkview Campus, Room D-109",
    description: "Kick off the year with us! Featuring speaker Jia Chen, plus introductions to Developer Club, DSAIC, and W1 Builders. Hosted in collaboration with Developer Club and W1 Builders.",
    color: "ink",
    link: { href: "https://experiencewmu.wmich.edu/event/12515581", label: "Event Details" },
    featured: true,
  },
  {
    id: 3,
    title: "Company Tour",
    date: "TBA",
    description: "Currently in the works, stay tuned!",
    color: "violet",
  },
  {
    id: 4,
    title: "Stryker Company Tour",
    date: "Spring | TBA",
    description: "Visiting Stryker to learn about their industry usage of data science and AI.",
    color: "ink",
  },
];

export const FEATURED_EVENTS = EVENTS.filter((event) => event.featured);
