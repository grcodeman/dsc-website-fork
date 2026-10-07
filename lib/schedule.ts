import { BUILD_SESSION, BUILD_SESSIONS, EVENTS, type ClubEvent } from './events';

// Every club time is a Kalamazoo wall-clock time. Converting "now" to that
// same wall clock turns every comparison into a plain string comparison and
// gives the same answer on the server and in every visitor's browser,
// whatever their own time zone.
export const CLUB_TIME_ZONE = 'America/Detroit';

const clockFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: CLUB_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

/** Kalamazoo wall-clock time at `now`, as "YYYY-MM-DDTHH:MM". */
export function clubClock(now: number): string {
  const p: Partial<Record<Intl.DateTimeFormatPartTypes, string>> = {};
  for (const { type, value } of clockFormat.formatToParts(now)) p[type] = value;
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

export type TimeStatus = 'past' | 'live' | 'upcoming';

function statusAt(clock: string, date: string, start: string, end: string): TimeStatus {
  if (clock >= `${date}T${end}`) return 'past';
  if (clock >= `${date}T${start}`) return 'live';
  return 'upcoming';
}

// ---------------------------------------------------------------------------
// Date and time formatting. Names come from fixed tables rather than Intl so
// the server and every browser render exactly the same text.

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function utcDay(date: string): number {
  const [y, m, d] = date.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

function dateParts(date: string) {
  const d = new Date(utcDay(date));
  return { weekday: WEEKDAYS[d.getUTCDay()], month: MONTHS[d.getUTCMonth()], day: d.getUTCDate(), year: d.getUTCFullYear() };
}

/** "Friday" */
export const formatWeekday = (date: string) => dateParts(date).weekday;
/** "Fri" */
export const formatWeekdayShort = (date: string) => dateParts(date).weekday.slice(0, 3);
/** "Oct" */
export const formatMonthShort = (date: string) => dateParts(date).month.slice(0, 3);
/** "9" */
export const formatDayOfMonth = (date: string) => String(dateParts(date).day);
/** "October 2026" */
export function formatMonthYear(date: string) {
  const { month, year } = dateParts(date);
  return `${month} ${year}`;
}
/** "Fri, Oct 9" */
export function formatDate(date: string) {
  const { weekday, month, day } = dateParts(date);
  return `${weekday.slice(0, 3)}, ${month.slice(0, 3)} ${day}`;
}
/** "Friday, October 9" */
export function formatLongDate(date: string) {
  const { weekday, month, day } = dateParts(date);
  return `${weekday}, ${month} ${day}`;
}

function twelveHour(time: string) {
  const [h, m] = time.split(':').map(Number);
  return { clock: `${h % 12 || 12}:${String(m).padStart(2, '0')}`, period: h < 12 ? 'AM' : 'PM' };
}

/** "6:30 PM" */
export function formatTime(time: string) {
  const { clock, period } = twelveHour(time);
  return `${clock} ${period}`;
}

/** "6:30–8:30 PM", or "11:00 AM–1:00 PM" across noon. */
export function formatTimeRange(start: string, end: string) {
  const a = twelveHour(start);
  const b = twelveHour(end);
  return a.period === b.period
    ? `${a.clock}–${b.clock} ${b.period}`
    : `${a.clock} ${a.period}–${b.clock} ${b.period}`;
}

/** Whole days from the clock's date until `date` (negative once it's passed). */
function daysUntil(clock: string, date: string) {
  return Math.round((utcDay(date) - utcDay(clock.slice(0, 10))) / 86_400_000);
}

/** "Tonight", "Tomorrow", or "This Friday" within the coming week; null further out. */
export function relativeDay(clock: string, date: string, start?: string): string | null {
  const days = daysUntil(clock, date);
  if (days === 0) return start && start >= '17:00' ? 'Tonight' : 'Today';
  if (days === 1) return 'Tomorrow';
  if (days > 1 && days < 7) return `This ${formatWeekday(date)}`;
  return null;
}

// ---------------------------------------------------------------------------
// Build sessions

/** "Student Center, Room 2122" */
export function sessionPlace(room = BUILD_SESSION.room) {
  return `${BUILD_SESSION.building}, Room ${room}`;
}

/** The usual session time and place, for copy like "Every Friday, 6:30–8:30 PM". */
export const SESSION_TIME = formatTimeRange(BUILD_SESSION.start, BUILD_SESSION.end);
export const SESSION_PLACE = sessionPlace();

export type Session = {
  date: string;
  start: string;
  end: string;
  room: string;
  /** Meeting somewhere other than the usual room this week. */
  roomChange: boolean;
  noSession: boolean;
  note?: string;
  status: TimeStatus;
};

/** Every listed Friday, in date order, with its status at `clock`. */
export function sessionsAt(clock: string): Session[] {
  return [...BUILD_SESSIONS]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((s) => {
      const room = s.room ?? BUILD_SESSION.room;
      return {
        date: s.date,
        start: BUILD_SESSION.start,
        end: BUILD_SESSION.end,
        room,
        roomChange: room !== BUILD_SESSION.room,
        noSession: Boolean(s.noSession),
        note: s.note,
        status: statusAt(clock, s.date, BUILD_SESSION.start, BUILD_SESSION.end),
      };
    });
}

/**
 * The session happening now or coming up next, plus any session-free Fridays
 * before it. Null once the listed sessions are all over.
 */
export function nextSession(sessions: Session[]): { session: Session; skipped: Session[] } | null {
  const ahead = sessions.filter((s) => s.status !== 'past');
  const index = ahead.findIndex((s) => !s.noSession);
  if (index === -1) return null;
  return { session: ahead[index], skipped: ahead.slice(0, index) };
}

/** How many sessions are listed and the dates of the first and last. */
export function sessionRange(sessions: Session[]) {
  const held = sessions.filter((s) => !s.noSession);
  return { count: held.length, first: held[0]?.date, last: held[held.length - 1]?.date };
}

/** Consecutive items grouped by calendar month. */
export function groupByMonth<T extends { date: string }>(items: T[]) {
  const groups: { key: string; label: string; items: T[] }[] = [];
  for (const item of items) {
    const key = item.date.slice(0, 7);
    let group = groups[groups.length - 1];
    if (!group || group.key !== key) {
      group = { key, label: formatMonthYear(item.date), items: [] };
      groups.push(group);
    }
    group.items.push(item);
  }
  return groups;
}

// ---------------------------------------------------------------------------
// Special events

export function eventStatus(clock: string, event: ClubEvent): TimeStatus | 'tba' {
  if (!event.date) return 'tba';
  return statusAt(clock, event.date, event.start ?? '00:00', event.end ?? '23:59');
}

const startKey = (event: ClubEvent) => `${event.date}T${event.start ?? '00:00'}`;

/** Dated events that aren't over yet, soonest first, then TBA events as listed. */
export function upcomingEvents(clock: string): ClubEvent[] {
  const dated = EVENTS.filter((e) => e.date && eventStatus(clock, e) !== 'past');
  dated.sort((a, b) => startKey(a).localeCompare(startKey(b)));
  return [...dated, ...EVENTS.filter((e) => !e.date)];
}

/** Events that are over, most recent first. */
export function pastEvents(clock: string): ClubEvent[] {
  return EVENTS.filter((e) => eventStatus(clock, e) === 'past').sort((a, b) => startKey(b).localeCompare(startKey(a)));
}

/** "Tue, Sep 1 · 3:00–6:00 PM", or "Spring · Date TBA" before it's scheduled. */
export function eventWhen(event: ClubEvent) {
  if (!event.date) return event.timeframe ? `${event.timeframe} · Date TBA` : 'Date TBA';
  if (!event.start) return formatDate(event.date);
  const time = event.end ? formatTimeRange(event.start, event.end) : formatTime(event.start);
  return `${formatDate(event.date)} · ${time}`;
}
