import { BUILD_SESSION } from "@/lib/events";
import {
  SESSION_PLACE,
  SESSION_TIME,
  clubClock,
  eventWhen,
  formatLongDate,
  sessionPlace,
  sessionsAt,
  upcomingEvents,
} from "@/lib/schedule";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

// /llms.txt (llmstxt.org): a plain-text summary of the club and an index of
// the site for AI assistants. Built from the same data as the pages and
// refreshed hourly, so the upcoming sessions stay current.
export const dynamic = "force-static";
export const revalidate = 3600;

const fullDate = (date: string) => `${formatLongDate(date)}, ${date.slice(0, 4)}`;

export function GET() {
  const clock = clubClock(Date.now());
  const sessions = sessionsAt(clock).filter((s) => s.status !== "past");
  const events = upcomingEvents(clock);

  const lines = [
    `# ${SITE_NAME} (DSAIC)`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `The club meets every ${BUILD_SESSION.weekday}, ${SESSION_TIME} Eastern Time, in the ${SESSION_PLACE} at Western Michigan University in Kalamazoo, Michigan. ${BUILD_SESSION.description}`,
    "",
    "## Upcoming build sessions",
    "",
    ...(sessions.length
      ? sessions.map((s) =>
          s.noSession
            ? `- ${fullDate(s.date)}: no session${s.note ? ` (${s.note})` : ""}`
            : `- ${fullDate(s.date)}: ${SESSION_TIME}, ${sessionPlace(s.room)}${s.roomChange ? " (different room than usual)" : ""}`
        )
      : ["- None scheduled right now; next semester's dates will be on the calendar page."]),
    "",
    ...(events.length
      ? [
          "## Special events",
          "",
          ...events.map((e) => `- ${e.title} (${eventWhen(e)}${e.location ? `, ${e.location}` : ""}): ${e.description}`),
          "",
        ]
      : []),
    "## Pages",
    "",
    `- [Home](${SITE_URL}/): what the club does, the next build session, favorite learning resources, and the officers`,
    `- [Calendar](${SITE_URL}/calendar): every build session this semester, special events, and meeting recaps`,
    `- [Projects](${SITE_URL}/projects): active and past club projects with their leads`,
    `- [Join](${SITE_URL}/join): the membership form and FAQ`,
    `- [Calendar feed](${SITE_URL}/calendar.ics): upcoming sessions and events in iCalendar format`,
    "",
    "## Contact",
    "",
    "- Email: wmu.datascienceclub@gmail.com",
    ...SOCIAL_LINKS.map((url) => `- ${url}`),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
