"use client";

import React from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { BUILD_SESSION } from '@/lib/events';
import { useNow } from '@/lib/useNow';
import {
  SESSION_PLACE,
  SESSION_TIME,
  clubClock,
  formatDayOfMonth,
  formatLongDate,
  formatMonthShort,
  formatWeekdayShort,
  nextSession,
  relativeDay,
  sessionsAt,
  upcomingEvents,
  type Session,
} from '@/lib/schedule';
import {
  Badge,
  CalendarFileLink,
  EventCard,
  GOOGLE_CALENDAR_NOTE,
  GoogleCalendarLink,
} from '@/components/schedule/ScheduleBits';

const FRIDAYS_SHOWN = 4;

const FridayCard = ({ session, clock, isNext }: { session: Session; clock: string; isNext: boolean }) => {
  const live = session.status === 'live';
  const flag = live ? (
    <Badge tone="live">Happening now</Badge>
  ) : isNext ? (
    <Badge tone="next">{relativeDay(clock, session.date, session.start) ?? 'Next up'}</Badge>
  ) : session.roomChange ? (
    <Badge tone="change">Room change</Badge>
  ) : null;

  const tone = session.noSession
    ? 'border-dashed border-ink/25 bg-transparent text-ink/50'
    : isNext
      ? 'border-violet bg-white text-ink ring-1 ring-violet shadow-[0_16px_32px_-14px_rgba(114,67,193,0.55)]'
      : 'border-lavender bg-white text-ink shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)]';

  return (
    <li className={`relative flex flex-col rounded-xl border px-4 pb-4 pt-5 ${tone}`}>
      {/* Solid backing so the tinted pill hides the border it sits on */}
      {flag && <div className="absolute -top-3 left-4 rounded-full bg-white">{flag}</div>}
      <p className="sr-only">{formatLongDate(session.date)}</p>
      <div aria-hidden>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-70">
          {formatWeekdayShort(session.date)} · {formatMonthShort(session.date)}
        </p>
        <p className="mt-1.5 font-heading text-4xl font-bold leading-none tabular-nums">
          {formatDayOfMonth(session.date)}
        </p>
      </div>
      <div className="mt-4 text-sm leading-relaxed">
        {session.noSession ? (
          <>
            <p className="font-medium text-ink/60">No session</p>
            {session.note && <p>{session.note}</p>}
          </>
        ) : (
          <>
            <p className="text-ink/75">{SESSION_TIME}</p>
            <p className={session.roomChange ? 'font-medium text-ink' : 'text-ink/75'}>
              {session.roomChange ? (
                <mark className="rounded bg-gold/30 px-1 text-ink">Room {session.room}</mark>
              ) : (
                `Room ${session.room}`
              )}
            </p>
          </>
        )}
      </div>
    </li>
  );
};

const Schedule = ({ now }: { now: number }) => {
  const clock = clubClock(useNow(now));
  const sessions = sessionsAt(clock);
  const next = nextSession(sessions)?.session;
  const fridays = sessions.filter((s) => s.status !== 'past').slice(0, FRIDAYS_SHOWN);
  const events = upcomingEvents(clock);

  return (
    <section id="events" className="py-16 cv-auto">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-ink">
          Schedule
        </h2>
        <p className="mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center gap-x-6 gap-y-2 text-lg text-ink/80 sm:flex-row">
          <span className="inline-flex items-center gap-2">
            <FaRegClock className="text-violet" aria-hidden />
            Every {BUILD_SESSION.weekday}, {SESSION_TIME}
          </span>
          <span className="inline-flex items-center gap-2">
            <FaMapMarkerAlt className="text-violet" aria-hidden />
            {SESSION_PLACE}
          </span>
        </p>

        {fridays.length > 0 ? (
          <>
            <h3 className="mt-0! mb-6! text-sm text-ink/70!">Upcoming build sessions</h3>
            <ol className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
              {fridays.map((session) => (
                <FridayCard
                  key={session.date}
                  session={session}
                  clock={clock}
                  isNext={session.date === next?.date}
                />
              ))}
            </ol>
          </>
        ) : (
          <p className="rounded-xl border border-dashed border-lavender p-6 text-center text-ink/70">
            Build sessions are on break. Next semester&apos;s dates will be posted on the calendar.
          </p>
        )}

        {events.length > 0 && (
          <>
            <h3 className="mt-14! mb-6! text-sm text-ink/70!">Special events</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {events.map((event) => (
                <EventCard key={event.id} event={event} titleAs="h4" />
              ))}
            </div>
          </>
        )}

        <div className="mt-12 flex flex-col items-center justify-center gap-3 md:flex-row">
          <Link
            href="/calendar"
            className="w-full rounded-md bg-violet px-6 py-3 text-center font-bold text-white shadow-[0_8px_24px_-8px_rgba(114,67,193,0.6)] transition-colors hover:bg-ink md:w-auto"
          >
            See the full calendar
          </Link>
          <GoogleCalendarLink className="w-full border border-violet/40 px-6 py-3 text-violet hover:bg-violet/5 md:w-auto" />
          <CalendarFileLink className="w-full border border-violet/40 px-6 py-3 text-violet hover:bg-violet/5 md:w-auto" />
        </div>
        <p className="mx-auto mt-4 max-w-md text-center text-xs leading-relaxed text-ink/55">{GOOGLE_CALENDAR_NOTE}</p>
      </div>
    </section>
  );
};

export default Schedule;
