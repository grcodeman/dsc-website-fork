import { BUILD_SESSION } from './events';
import {
  clubClock,
  clubIsoDateTime,
  sessionPlace,
  sessionsAt,
  upcomingEvents,
} from './schedule';
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from './site';

// schema.org Event data for the calendar page, so search engines and AI
// agents can read the schedule without parsing the page layout.

// The Student Center's address, per wmich.edu/student-center/contact.
const STUDENT_CENTER_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '1903 W Michigan Ave',
  addressLocality: 'Kalamazoo',
  addressRegion: 'MI',
  postalCode: '49008',
  addressCountry: 'US',
};

const ORGANIZER = { '@type': 'Organization', name: SITE_NAME, url: SITE_URL };

const event = (fields: Record<string, unknown>) => ({
  '@type': 'Event',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  organizer: ORGANIZER,
  image: [`${SITE_URL}${SOCIAL_IMAGE.url}`],
  url: `${SITE_URL}/calendar`,
  ...fields,
});

/** Every upcoming build session and dated special event at `now`. */
export function scheduleJsonLd(now: number) {
  const clock = clubClock(now);

  const sessions = sessionsAt(clock)
    .filter((s) => !s.noSession && s.status !== 'past')
    .map((s) =>
      event({
        name: `DSAIC ${BUILD_SESSION.title}`,
        description: BUILD_SESSION.description,
        startDate: clubIsoDateTime(s.date, s.start),
        endDate: clubIsoDateTime(s.date, s.end),
        location: {
          '@type': 'Place',
          name: `${sessionPlace(s.room)}, Western Michigan University`,
          address: STUDENT_CENTER_ADDRESS,
        },
      })
    );

  const specials = upcomingEvents(clock).flatMap((e) =>
    e.date
      ? [
          event({
            name: e.title,
            description: e.description,
            startDate: e.start ? clubIsoDateTime(e.date, e.start) : e.date,
            ...(e.start && e.end ? { endDate: clubIsoDateTime(e.date, e.end) } : {}),
            location: {
              '@type': 'Place',
              name: e.location ? `${e.location}, Western Michigan University` : 'Western Michigan University',
              address: { '@type': 'PostalAddress', addressLocality: 'Kalamazoo', addressRegion: 'MI', addressCountry: 'US' },
            },
            ...(e.link ? { sameAs: e.link.href } : {}),
          }),
        ]
      : []
  );

  return { '@context': 'https://schema.org', '@graph': [...sessions, ...specials] };
}
