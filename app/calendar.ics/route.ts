import { BUILD_SESSION } from "@/lib/events";
import {
  CLUB_TIME_ZONE,
  clubClock,
  sessionPlace,
  sessionsAt,
  upcomingEvents,
} from "@/lib/schedule";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// The "Add to calendar" file: every upcoming build session and dated event.
// Built statically and refreshed hourly, so sessions drop off once they're
// over and a member importing it in November doesn't get October's.
export const dynamic = "force-static";
export const revalidate = 3600;

// Kalamazoo's daylight-saving rules, so calendar apps place local times correctly.
const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  `TZID:${CLUB_TIME_ZONE}`,
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:-0500",
  "TZOFFSETTO:-0400",
  "TZNAME:EDT",
  "DTSTART:19700308T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:-0400",
  "TZOFFSETTO:-0500",
  "TZNAME:EST",
  "DTSTART:19701101T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

type FeedEvent = {
  uid: string;
  date: string;
  start?: string;
  end?: string;
  summary: string;
  location?: string;
  description: string;
};

/** Escapes a TEXT value (RFC 5545 §3.3.11). */
const text = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** Folds a content line at 75 octets (RFC 5545 §3.1). */
function fold(line: string) {
  const encoder = new TextEncoder();
  const chunks: string[] = [];
  let chunk = "";
  let size = 0;
  for (const char of line) {
    const charSize = encoder.encode(char).length;
    // Continuation lines start with a space, which counts toward their 75.
    if (size + charSize > (chunks.length ? 74 : 75)) {
      chunks.push(chunk);
      chunk = "";
      size = 0;
    }
    chunk += char;
    size += charSize;
  }
  chunks.push(chunk);
  return chunks.join("\r\n ");
}

const compactDate = (date: string) => date.replace(/-/g, "");
const localDateTime = (date: string, time: string) => `${compactDate(date)}T${time.replace(":", "")}00`;

function vevent(event: FeedEvent, stamp: string, host: string) {
  const timing =
    event.start && event.end
      ? [
          `DTSTART;TZID=${CLUB_TIME_ZONE}:${localDateTime(event.date, event.start)}`,
          `DTEND;TZID=${CLUB_TIME_ZONE}:${localDateTime(event.date, event.end)}`,
        ]
      : [`DTSTART;VALUE=DATE:${compactDate(event.date)}`];

  return [
    "BEGIN:VEVENT",
    `UID:${event.uid}@${host}`,
    `DTSTAMP:${stamp}`,
    ...timing,
    `SUMMARY:${text(event.summary)}`,
    ...(event.location ? [`LOCATION:${text(event.location)}`] : []),
    `DESCRIPTION:${text(event.description)}`,
    `URL:${SITE_URL}/calendar`,
    "END:VEVENT",
  ];
}

export function GET() {
  const now = Date.now();
  const clock = clubClock(now);
  const stamp = new Date(now).toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const host = new URL(SITE_URL).host;

  const sessions: FeedEvent[] = sessionsAt(clock)
    .filter((s) => !s.noSession && s.status !== "past")
    .map((s) => ({
      uid: `build-session-${s.date}`,
      date: s.date,
      start: s.start,
      end: s.end,
      summary: `DSAIC ${BUILD_SESSION.title}`,
      location: `WMU ${sessionPlace(s.room)}`,
      description: s.roomChange
        ? `Heads up: this week we're in Room ${s.room}, not the usual Room ${BUILD_SESSION.room}. ${BUILD_SESSION.description}`
        : BUILD_SESSION.description,
    }));

  const events: FeedEvent[] = upcomingEvents(clock).flatMap((e) =>
    e.date
      ? [{
          uid: e.id,
          date: e.date,
          start: e.start,
          end: e.end,
          summary: `DSAIC: ${e.title}`,
          location: e.location,
          description: e.link ? `${e.description}\n\n${e.link.label}: ${e.link.href}` : e.description,
        }]
      : []
  );

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DSAIC at WMU//Club Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${text("DSAIC @ WMU")}`,
    `X-WR-CALDESC:${text(`Build sessions and events from the ${SITE_NAME}`)}`,
    `X-WR-TIMEZONE:${CLUB_TIME_ZONE}`,
    ...VTIMEZONE,
    ...[...sessions, ...events]
      .sort((a, b) => `${a.date}T${a.start ?? ""}`.localeCompare(`${b.date}T${b.start ?? ""}`))
      .flatMap((event) => vevent(event, stamp, host)),
    "END:VCALENDAR",
  ];

  return new Response(`${lines.map(fold).join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      // Inline lets iPhones open the add-to-calendar sheet directly; desktop
      // browsers still save it as a file.
      "Content-Disposition": 'inline; filename="dsaic-calendar.ics"',
    },
  });
}
