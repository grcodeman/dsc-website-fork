import React from 'react';
import { FaCalendarPlus, FaExternalLinkAlt } from 'react-icons/fa';
import type { ClubEvent } from '@/lib/events';
import {
  eventWhen,
  formatDayOfMonth,
  formatMonthShort,
  formatWeekdayShort,
} from '@/lib/schedule';

// Small pieces shared by the hero card, the landing Schedule section, and the
// calendar page so a session looks the same everywhere it appears.

type TileTone = 'default' | 'highlight' | 'muted' | 'off';

const TILE_TONES: Record<TileTone, string> = {
  default: 'bg-white border-lavender text-ink',
  highlight: 'bg-ink border-ink text-white',
  muted: 'bg-transparent border-lavender text-ink/45',
  off: 'bg-transparent border-dashed border-ink/30 text-ink/45',
};

/** Tear-off calendar tile: weekday (or month) over the day number. */
export const DateTile = ({
  date,
  tone = 'default',
  label = 'weekday',
}: {
  date: string;
  tone?: TileTone;
  label?: 'weekday' | 'month';
}) => (
  <div
    aria-hidden
    className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg border ${TILE_TONES[tone]}`}
  >
    <span className="font-mono text-[10px] uppercase leading-none tracking-[0.16em] opacity-80">
      {label === 'month' ? formatMonthShort(date) : formatWeekdayShort(date)}
    </span>
    <span className="mt-1 font-heading text-[22px] font-bold leading-none tabular-nums">
      {formatDayOfMonth(date)}
    </span>
  </div>
);

/** Stand-in tile for events that don't have a date yet. */
export const TbaTile = () => (
  <div
    aria-hidden
    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-violet/40 bg-violet/5 font-mono text-[11px] uppercase tracking-[0.16em] text-violet"
  >
    TBA
  </div>
);

/** Status light, borrowed from the footer's circuit-board LEDs. */
export const Led = ({ live = false }: { live?: boolean }) => (
  <span
    aria-hidden
    className={`inline-block h-2 w-2 shrink-0 rounded-full ${live ? 'led-green motion-safe:animate-pulse' : 'led-violet'}`}
  />
);

type BadgeTone = 'next' | 'live' | 'change' | 'muted';

const BADGE_TONES: Record<BadgeTone, string> = {
  next: 'bg-ink text-white border-ink',
  live: 'bg-mint/15 text-ink border-mint/60',
  change: 'bg-gold/25 text-ink border-gold/70',
  muted: 'bg-transparent text-ink/50 border-lavender',
};

export const Badge = ({ tone, children }: { tone: BadgeTone; children: React.ReactNode }) => (
  <span
    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase leading-none tracking-[0.12em] ${BADGE_TONES[tone]}`}
  >
    {tone === 'live' && <Led live />}
    {children}
  </span>
);

/** Downloads every upcoming session and event, ready to import into any calendar app. */
export const AddToCalendarLink = ({ className = '' }: { className?: string }) => (
  <a
    href="/calendar.ics"
    className={`inline-flex items-center justify-center gap-2 rounded-md font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet ${className}`}
  >
    <FaCalendarPlus aria-hidden />
    Add to calendar
  </a>
);

/** A one-off club event, with its date (or TBA) as a tile. */
export const EventCard = ({
  event,
  past = false,
  titleAs: Title = 'h3',
}: {
  event: ClubEvent;
  past?: boolean;
  titleAs?: 'h3' | 'h4';
}) => (
  <article
    className={`flex gap-4 rounded-xl border p-4 sm:p-5 ${
      past
        ? 'border-lavender/80 bg-white/50'
        : 'border-lavender bg-white shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)]'
    }`}
  >
    {event.date ? <DateTile date={event.date} label="month" tone={past ? 'muted' : 'default'} /> : <TbaTile />}
    <div className="min-w-0 flex-1">
      <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${past ? 'text-ink/50' : 'text-violet'}`}>
        {eventWhen(event)}
      </p>
      <Title className={`my-1! text-lg leading-snug ${past ? 'text-ink/70!' : ''}`}>{event.title}</Title>
      {event.location && <p className="text-sm text-ink/65">{event.location}</p>}
      <p className={`mt-2 text-sm leading-relaxed ${past ? 'text-ink/60' : 'text-ink/75'}`}>{event.description}</p>
      {event.link && (
        <a
          href={event.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-md border border-violet/30 bg-violet/10 px-3 py-1.5 text-sm font-bold text-violet transition-colors hover:bg-violet hover:text-white"
        >
          {event.link.label}
          <FaExternalLinkAlt className="text-xs" aria-hidden />
        </a>
      )}
    </div>
  </article>
);
