// Single source of truth for the club calendar. The landing page, the
// calendar page, and the subscribable feed at /calendar.ics all read from
// here, and each one hides anything that has already happened on its own.
//
// Dates are YYYY-MM-DD and times are 24-hour HH:MM, both in Kalamazoo time.

/** The usual build session. Individual Fridays below can override the room. */
export const BUILD_SESSION = {
  title: "Build Session",
  weekday: "Friday",
  start: "18:30",
  end: "20:30",
  building: "Student Center",
  room: "2122",
  description: "Bring a laptop and work on club projects with other members. All majors and skill levels welcome.",
};

export type BuildSession = {
  /** The Friday's date, YYYY-MM-DD. */
  date: string;
  /** Student Center room, when it isn't the usual one. */
  room?: string;
  /** No session that week. Keep the Friday listed so nobody shows up to an empty room. */
  noSession?: boolean;
  /** Short note shown with the date, e.g. "Thanksgiving break". */
  note?: string;
};

// Fall 2026, matching the confirmed Student Center room reservations.
export const BUILD_SESSIONS: BuildSession[] = [
  { date: "2026-10-02" },
  { date: "2026-10-09" },
  { date: "2026-10-16" },
  { date: "2026-10-23", noSession: true },
  { date: "2026-10-30", room: "2208" },
  { date: "2026-11-06" },
  { date: "2026-11-13" },
  { date: "2026-11-20" },
  { date: "2026-11-27", noSession: true, note: "Thanksgiving break" },
  { date: "2026-12-04" },
  { date: "2026-12-11" },
];

export type ClubEvent = {
  /** Stable slug. It's also the event's ID in calendar apps, so don't rename it once published. */
  id: string;
  title: string;
  /** YYYY-MM-DD. Leave it out while the date is TBA. */
  date?: string;
  start?: string;
  end?: string;
  /** Shown while the date is TBA, e.g. "Spring". */
  timeframe?: string;
  location?: string;
  description: string;
  link?: { href: string; label: string };
};

// One-off events. Once an event has a date, it appears on the landing page
// until it's over, then moves to "Past events" on the calendar page.
export const EVENTS: ClubEvent[] = [
  {
    id: "bronco-bash-2026",
    title: "Bronco Bash",
    date: "2026-09-01",
    start: "15:00",
    end: "18:00",
    location: "Main Campus",
    description: "Come support us and stop by our table for free goodies and snacks!",
  },
  {
    id: "info-night-2026",
    title: "Info Night",
    date: "2026-09-03",
    start: "18:30",
    end: "21:00",
    location: "Parkview Campus, Room D-109",
    description: "Kick off the year with us! Featuring speaker Jia Chen, plus introductions to Developer Club, DSAIC, and W1 Builders. Hosted in collaboration with Developer Club and W1 Builders.",
    link: { href: "https://experiencewmu.wmich.edu/event/12515581", label: "Event Details" },
  },
  {
    id: "company-tour",
    title: "Company Tour",
    description: "Currently in the works, stay tuned!",
  },
  {
    id: "stryker-company-tour",
    title: "Stryker Company Tour",
    timeframe: "Spring",
    description: "Visiting Stryker to learn about their industry usage of data science and AI.",
  },
];
