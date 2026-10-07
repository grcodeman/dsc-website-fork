"use client";

import React from 'react';
import { FaCheck, FaLaptopCode, FaMapMarkerAlt } from 'react-icons/fa';
import { BUILD_SESSION } from '@/lib/events';
import { useNow } from '@/lib/useNow';
import {
  SESSION_PLACE,
  SESSION_TIME,
  clubClock,
  formatDate,
  formatDayOfMonth,
  formatLongDate,
  formatMonthShort,
  formatTime,
  groupByMonth,
  nextSession,
  pastEvents,
  relativeDay,
  sessionRange,
  sessionsAt,
  upcomingEvents,
  type Session,
} from '@/lib/schedule';
import {
  Badge,
  CalendarFileLink,
  DateTile,
  EventCard,
  GOOGLE_CALENDAR_NOTE,
  GoogleCalendarLink,
  Led,
} from '@/components/schedule/ScheduleBits';

const monthDay = (date: string) => `${formatMonthShort(date)} ${formatDayOfMonth(date)}`;

// The standing meeting, set apart as a dark card that echoes the footer's
// circuit board: the one thing every member should be able to recite.
const SessionSummary = ({ clock, sessions }: { clock: string; sessions: Session[] }) => {
  const upcoming = nextSession(sessions);
  const live = upcoming?.session.status === 'live';

  let status = 'No more sessions this semester';
  if (upcoming) {
    const { session } = upcoming;
    const relative = relativeDay(clock, session.date, session.start);
    if (live) status = `Happening now, until ${formatTime(session.end)}`;
    else if (relative === 'Tonight' || relative === 'Today') status = `Next: ${relative} at ${formatTime(session.start)}`;
    else if (relative) status = `Next: ${relative}, ${monthDay(session.date)}`;
    else status = `Next: ${formatDate(session.date)}`;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink p-6 text-white shadow-[0_24px_48px_-24px_rgba(37,25,122,0.7)] sm:p-8">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(156,148,232,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(156,148,232,0.35) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lavender">Weekly build sessions</p>
        <p className="mt-3 font-heading text-4xl font-bold leading-tight">Every {BUILD_SESSION.weekday}</p>
        <p className="font-heading text-2xl font-medium text-lavender">{SESSION_TIME}</p>

        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-white/85">
          <li className="flex gap-3">
            <FaMapMarkerAlt className="mt-1 shrink-0 text-lavender" aria-hidden />
            {SESSION_PLACE}
          </li>
          <li className="flex gap-3">
            <FaLaptopCode className="mt-1 shrink-0 text-lavender" aria-hidden />
            {BUILD_SESSION.description}
          </li>
        </ul>

        <p className="mt-6 flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium">
          <Led live={live} />
          {status}
        </p>
        {upcoming?.session.roomChange && (
          <p className="mt-2 text-sm text-gold">Heads up: that one&apos;s in Room {upcoming.session.room}.</p>
        )}

        <div className="mt-6 flex flex-col gap-2">
          <GoogleCalendarLink className="w-full bg-white px-5 py-3 text-ink hover:bg-lavender" />
          <CalendarFileLink className="w-full border border-white/30 px-5 py-3 text-white hover:bg-white/10" />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/60">{GOOGLE_CALENDAR_NOTE}</p>
      </div>
    </div>
  );
};

const SessionRow = ({ session, clock, isNext }: { session: Session; clock: string; isNext: boolean }) => {
  const past = session.status === 'past';
  const live = session.status === 'live';

  const badges: React.ReactNode[] = [];
  if (live) badges.push(<Badge key="live" tone="live">Happening now</Badge>);
  else if (isNext) badges.push(<Badge key="next" tone="next">{relativeDay(clock, session.date, session.start) ?? 'Next up'}</Badge>);
  if (session.roomChange && !past) badges.push(<Badge key="room" tone="change">Room change</Badge>);
  if (past && !session.noSession) {
    badges.push(
      <Badge key="done" tone="muted">
        <FaCheck aria-hidden /> Done
      </Badge>
    );
  }

  const tileTone = session.noSession ? 'off' : past ? 'muted' : isNext || live ? 'highlight' : 'default';

  return (
    <li
      className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-2 px-4 py-3.5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:px-5 ${
        isNext || live ? 'bg-violet/[0.07]' : ''
      }`}
    >
      <div className={badges.length ? 'row-span-2 sm:row-span-1' : ''}>
        <DateTile date={session.date} tone={tileTone} />
      </div>
      <div className="min-w-0">
        <p className="sr-only">{formatLongDate(session.date)}</p>
        {session.noSession ? (
          <>
            <p className="font-medium text-ink/55">No session</p>
            {session.note && <p className="text-sm text-ink/50">{session.note}</p>}
          </>
        ) : (
          <>
            <p className={`font-medium ${past ? 'text-ink/45' : 'text-ink'}`}>{BUILD_SESSION.title}</p>
            <p className={`text-sm ${past ? 'text-ink/40' : 'text-ink/65'}`}>
              {SESSION_TIME} ·{' '}
              {session.roomChange && !past ? (
                <mark className="rounded bg-gold/30 px-1 font-medium text-ink">Room {session.room}</mark>
              ) : (
                `Room ${session.room}`
              )}
            </p>
          </>
        )}
      </div>
      {badges.length > 0 && (
        <div className="col-start-2 flex flex-wrap gap-1.5 sm:col-start-3 sm:row-start-1 sm:justify-end">{badges}</div>
      )}
    </li>
  );
};

const CalendarSchedule = ({ initialNow }: { initialNow: number }) => {
  const clock = clubClock(useNow(initialNow));
  const sessions = sessionsAt(clock);
  const next = nextSession(sessions)?.session;
  const range = sessionRange(sessions);
  const upcoming = upcomingEvents(clock);
  const past = pastEvents(clock);

  const rows = (items: Session[]) => (
    <ol className="divide-y divide-lavender/70 overflow-hidden rounded-xl border border-lavender bg-white shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)]">
      {items.map((session) => (
        <SessionRow key={session.date} session={session} clock={clock} isNext={session.date === next?.date} />
      ))}
    </ol>
  );

  return (
    <>
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <aside className="lg:sticky lg:top-28">
          <SessionSummary clock={clock} sessions={sessions} />
        </aside>

        <section aria-labelledby="sessions-heading">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 id="sessions-heading" className="my-0! text-2xl">Build sessions</h2>
            {range.first && range.last && (
              <p className="text-sm text-ink/60">
                {range.count} {range.count === 1 ? 'session' : 'sessions'} · {monthDay(range.first)} – {monthDay(range.last)}
              </p>
            )}
          </div>

          {groupByMonth(sessions).map((group) =>
            group.items.every((s) => s.status === 'past') ? (
              <details key={group.key} className="group mt-6">
                <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden rounded-lg py-1 text-sm text-ink/60 hover:text-violet focus-visible:outline-2 focus-visible:outline-violet">
                  <span className="font-heading font-bold uppercase tracking-[0.08em]">{group.label}</span>
                  <span>· all done</span>
                  <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.12em] group-open:hidden">Show</span>
                  <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.12em] group-open:inline">Hide</span>
                </summary>
                <div className="mt-3">{rows(group.items)}</div>
              </details>
            ) : (
              <div key={group.key} className="mt-6">
                <h3 className="mt-0! mb-3! text-sm text-violet!">{group.label}</h3>
                {rows(group.items)}
              </div>
            )
          )}
        </section>
      </div>

      {upcoming.length > 0 && (
        <section aria-labelledby="events-heading" className="mt-16">
          <h2 id="events-heading" className="mt-0! mb-6! text-2xl">Special events</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section aria-labelledby="past-heading" className="mt-16">
          <h2 id="past-heading" className="mt-0! mb-6! text-2xl text-ink/60!">Past events</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {past.map((event) => (
              <EventCard key={event.id} event={event} past />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default CalendarSchedule;
