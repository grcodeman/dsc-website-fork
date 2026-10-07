"use client";

import React from 'react';
import Link from 'next/link';
import { FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa';
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
  formatWeekdayShort,
  nextSession,
  relativeDay,
  sessionsAt,
} from '@/lib/schedule';
import { Badge, Led } from '@/components/schedule/ScheduleBits';

const CARD_CLASSES =
  'group flex w-full max-w-md items-stretch overflow-hidden rounded-xl border border-lavender bg-white/85 text-left shadow-[0_8px_24px_-12px_rgba(37,25,122,0.25)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/50 hover:shadow-[0_16px_32px_-12px_rgba(37,25,122,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet';

// Hero summary of the weekly build session: the standing time and place,
// plus the date of the next one and any change to it.
const NextSessionCard = ({ initialNow, className = '' }: { initialNow: number; className?: string }) => {
  const clock = clubClock(useNow(initialNow));
  const upcoming = nextSession(sessionsAt(clock));

  if (!upcoming) {
    return (
      <Link href="/calendar" className={`${CARD_CLASSES} ${className}`}>
        <div className="flex w-[4.5rem] shrink-0 items-center justify-center bg-ink text-2xl text-white" aria-hidden>
          <FaRegCalendarAlt />
        </div>
        <div className="min-w-0 flex-1 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet">Build sessions</p>
          <p className="mt-1 font-heading text-lg font-bold leading-snug text-ink">On break until next semester</p>
          <p className="text-sm text-ink/70">See the calendar for what&apos;s coming up</p>
        </div>
      </Link>
    );
  }

  const { session, skipped } = upcoming;
  const live = session.status === 'live';
  const status = live
    ? `Happening now · until ${formatTime(session.end)}`
    : `Next session · ${relativeDay(clock, session.date, session.start) ?? formatDate(session.date)}`;

  return (
    <Link href="/calendar" className={`${CARD_CLASSES} ${className}`}>
      <div aria-hidden className="flex w-[4.5rem] shrink-0 flex-col items-center justify-center bg-ink py-3 text-white">
        <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-lavender">
          {formatWeekdayShort(session.date)}
        </span>
        <span className="my-1 font-heading text-[32px] font-bold leading-none tabular-nums">
          {formatDayOfMonth(session.date)}
        </span>
        <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-lavender">
          {formatMonthShort(session.date)}
        </span>
      </div>

      <div className="min-w-0 flex-1 px-4 py-3">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-violet">
          <Led live={live} />
          {status}
          <span className="sr-only">: {formatLongDate(session.date)}</span>
        </p>
        <p className="mt-1 font-heading text-xl font-bold leading-snug text-ink">
          We build every {BUILD_SESSION.weekday}
        </p>
        <p className="text-sm text-ink/70">
          {SESSION_TIME} · {SESSION_PLACE}
        </p>
        {(session.roomChange || skipped.length > 0) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {skipped.map((s) => (
              <Badge key={s.date} tone="muted">No session {formatDate(s.date)}</Badge>
            ))}
            {session.roomChange && <Badge tone="change">Moved to Room {session.room}</Badge>}
          </div>
        )}
      </div>

      <div aria-hidden className="hidden items-center pr-4 text-violet/50 transition-all group-hover:translate-x-0.5 group-hover:text-violet sm:flex">
        <FaChevronRight />
      </div>
    </Link>
  );
};

export default NextSessionCard;
