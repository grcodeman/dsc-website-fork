"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaLinkedinIn, FaUniversity, FaUserPlus } from 'react-icons/fa';

export interface EboardMember {
  name: string;
  role: string;
  initials: string;
  image?: string; // Optional profile image URL
  profile?: string; // Optional LinkedIn or faculty page URL
}

// Members fill the layers in lineup order, three at a time.
const PER_LAYER = 3;

// Layout in px unless noted. From md up the layers run left to right like a
// textbook network diagram; on phones they stack top to bottom.
const WIDE_TOP = 14;
const WIDE_SLOT = 150; // vertical room per node in the tallest layer
const WIDE_BOTTOM = 72; // room for the lowest node's name
const WIDE_FIRST_X = 9; // % of width
const WIDE_LAST_X = 91;
const TALL_ROW = 188;
const TALL_NODE_Y = 56; // node center within its row

const HOP_MS = 650; // how long a signal takes to cross one edge
const MAGNET_RADIUS = 280; // nodes this close to the cursor lean toward it
const REACH_RADIUS = 230; // the cursor sends dashed feelers to nodes this close
const REACHES = 3;
const PULSES = 16; // signal dots that can be in flight at once

type Layout = 'wide' | 'tall';
type Pos = { x: number; y: number }; // x in % of width, y in px

interface NetNode {
  key: string;
  layer: number;
  count: number; // nodes in this layer
  wide: Pos;
  tall: Pos;
  member?: EboardMember; // undefined for the "you" output node
}

const buildNetwork = (members: EboardMember[]) => {
  const layers: EboardMember[][] = [];
  for (let i = 0; i < members.length; i += PER_LAYER) layers.push(members.slice(i, i + PER_LAYER));
  // Every eboard layer, then one output node: you.
  const sizes = [...layers.map((layer) => layer.length), 1];
  const span = Math.max(...sizes) * WIDE_SLOT;
  const nodes: NetNode[] = sizes.flatMap((count, layer) =>
    Array.from({ length: count }, (_, j) => {
      const member = layers[layer]?.[j];
      return {
        key: member?.name ?? 'you',
        layer,
        count,
        member,
        wide: {
          x: WIDE_FIRST_X + (layer * (WIDE_LAST_X - WIDE_FIRST_X)) / (sizes.length - 1),
          y: WIDE_TOP + ((j + 0.5) / count) * span,
        },
        tall: { x: ((j + 0.5) / count) * 100, y: layer * TALL_ROW + TALL_NODE_Y },
      };
    })
  );
  // Fully connected, layer to layer.
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => nodes.forEach((b, k) => { if (b.layer === a.layer + 1) edges.push([i, k]); }));
  return {
    nodes,
    edges,
    sizes,
    wideHeight: WIDE_TOP + span + WIDE_BOTTOM,
    tallHeight: sizes.length * TALL_ROW,
  };
};

const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

// A fixed "trained weight" per edge, 0 to 1, drawn as line thickness and
// opacity. Derived from the node indexes so server and client agree.
const edgeWeight = (a: number, b: number) => ((a * 7 + b * 13 + 3) % 10) / 9;

const EboardNetwork = ({ members }: { members: EboardMember[] }) => {
  const { nodes, edges, sizes, wideHeight, tallHeight } = useMemo(() => buildNetwork(members), [members]);
  const neighbors = useMemo(() => {
    const sets = nodes.map(() => new Set<number>());
    edges.forEach(([a, b]) => { sets[a].add(b); sets[b].add(a); });
    return sets;
  }, [nodes, edges]);

  // The hovered or focused node. Its edges light up and the rest dims.
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);

  const boxRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const nodeEls = useRef<(HTMLElement | null)[]>([]);
  const haloEls = useRef<(HTMLSpanElement | null)[]>([]);
  const lineEls = useRef<Record<Layout, (SVGLineElement | null)[]>>({ wide: [], tall: [] });
  const pulseEls = useRef<Record<Layout, (SVGCircleElement | null)[]>>({ wide: [], tall: [] });
  const reachEls = useRef<Record<Layout, (SVGLineElement | null)[]>>({ wide: [], tall: [] });
  // Set by the animation effect; no-ops when motion is off.
  const sendSignal = useRef<(path: number[]) => void>(() => {});
  const ripple = useRef<(i: number) => void>(() => {});

  const activate = (i: number | null) => {
    activeRef.current = i;
    setActive(i);
    if (i === null) return;
    ripple.current(i);
    edges.forEach(([a, b]) => { if (a === i || b === i) sendSignal.current([a, b]); });
  };

  // Motion: nodes float, lean toward the cursor, and pass signals forward.
  // All of it writes to the DOM directly so React never re-renders per frame.
  useEffect(() => {
    const box = boxRef.current;
    if (!box || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const wideQuery = window.matchMedia('(min-width: 768px)');
    const layoutNow = (): Layout => (wideQuery.matches ? 'wide' : 'tall');

    const offsets = nodes.map(() => ({ x: 0, y: 0, phase: Math.random() * Math.PI * 2 }));
    const pointer = { x: 0, y: 0, inside: false };
    const pulses: { path: number[]; hop: number; t: number; slot: number }[] = [];
    const freeSlots = Array.from({ length: PULSES }, (_, slot) => slot);
    const byLayer = sizes.map((_, layer) => nodes.flatMap((node, i) => (node.layer === layer ? [i] : [])));
    let width = box.clientWidth;

    const home = (i: number, layout: Layout) => ({ x: (nodes[i][layout].x / 100) * width, y: nodes[i][layout].y });
    const at = (i: number, layout: Layout) => {
      const { x, y } = home(i, layout);
      return { x: x + offsets[i].x, y: y + offsets[i].y };
    };

    const fire = (i: number) =>
      haloEls.current[i]?.animate(
        [{ transform: 'scale(1)', opacity: 0.55 }, { transform: 'scale(1.8)', opacity: 0 }],
        { duration: 700, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' }
      );
    ripple.current = fire;

    const draw = () => {
      const layout = layoutNow();
      offsets.forEach((o, i) => {
        const el = nodeEls.current[i];
        if (el) el.style.transform = `translate3d(${o.x.toFixed(2)}px, ${o.y.toFixed(2)}px, 0)`;
      });
      edges.forEach(([a, b], k) => {
        const line = lineEls.current[layout][k];
        if (!line) return;
        const p = at(a, layout);
        const q = at(b, layout);
        line.setAttribute('x1', p.x.toFixed(1));
        line.setAttribute('y1', p.y.toFixed(1));
        line.setAttribute('x2', q.x.toFixed(1));
        line.setAttribute('y2', q.y.toFixed(1));
      });
      const dots = pulseEls.current[layout];
      dots.forEach((dot) => dot?.setAttribute('r', '0'));
      pulses.forEach(({ path, hop, t, slot }) => {
        const dot = dots[slot];
        if (!dot) return;
        const p = at(path[hop], layout);
        const q = at(path[hop + 1], layout);
        const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        dot.setAttribute('cx', (p.x + (q.x - p.x) * e).toFixed(1));
        dot.setAttribute('cy', (p.y + (q.y - p.y) * e).toFixed(1));
        dot.setAttribute('r', '3.5');
      });
      // Dashed feelers from the cursor to the nearest few people.
      // Hidden while a node is hovered, so its own connections stand out.
      const nearest = pointer.inside && activeRef.current === null
        ? nodes
            .map((_, i) => {
              const p = at(i, layout);
              return { i, p, d: Math.hypot(p.x - pointer.x, p.y - pointer.y) };
            })
            .filter(({ d }) => d < REACH_RADIUS)
            .sort((a, b) => a.d - b.d)
            .slice(0, REACHES)
        : [];
      reachEls.current[layout].forEach((line, k) => {
        if (!line) return;
        const hit = nearest[k];
        if (!hit) {
          line.style.opacity = '0';
          return;
        }
        line.setAttribute('x1', pointer.x.toFixed(1));
        line.setAttribute('y1', pointer.y.toFixed(1));
        line.setAttribute('x2', hit.p.x.toFixed(1));
        line.setAttribute('y2', hit.p.y.toFixed(1));
        line.style.opacity = (0.25 + (1 - hit.d / REACH_RADIUS) * 0.75).toFixed(2);
      });
    };

    sendSignal.current = (path) => {
      const slot = freeSlots.pop();
      if (slot !== undefined) pulses.push({ path, hop: 0, t: 0, slot });
    };
    // A forward pass: one node from each layer, ending at you.
    const forwardPass = () => sendSignal.current(byLayer.map((ids) => ids[Math.floor(Math.random() * ids.length)]));

    let frame = 0;
    let last = 0;
    let nextPass = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      // ~30fps is plenty for the idle drift; full rate while the cursor is in.
      if (!pointer.inside && now - last < 30) return;
      const dt = Math.min(now - last, 50);
      last = now;
      const layout = layoutNow();
      const ease = 1 - 0.86 ** (dt / 16.7);
      offsets.forEach((o, i) => {
        // A slow idle float, so the diagram breathes even without a cursor.
        let x = Math.sin(now / 1700 + o.phase) * 2.5;
        let y = Math.cos(now / 2100 + o.phase * 1.3) * 2.5;
        if (pointer.inside) {
          const h = home(i, layout);
          const dx = pointer.x - h.x;
          const dy = pointer.y - h.y;
          const d = Math.hypot(dx, dy);
          if (i === activeRef.current) {
            // The hovered node follows the cursor around.
            x += clamp(dx * 0.3, 22);
            y += clamp(dy * 0.3, 22);
          } else if (d > 1 && d < MAGNET_RADIUS) {
            const pull = (1 - d / MAGNET_RADIUS) ** 2 * 16;
            x += (dx / d) * pull;
            y += (dy / d) * pull;
          }
        }
        o.x += (x - o.x) * ease;
        o.y += (y - o.y) * ease;
      });
      if (now >= nextPass) {
        forwardPass();
        nextPass = now + 1300 + Math.random() * 1300;
      }
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.t += dt / HOP_MS;
        if (pulse.t < 1) continue;
        pulse.hop += 1;
        pulse.t = 0;
        fire(pulse.path[pulse.hop]);
        if (pulse.hop >= pulse.path.length - 1) {
          freeSlots.push(pulse.slot);
          pulses.splice(p, 1);
        }
      }
      draw();
    };

    // Animate only while the diagram is on screen.
    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(box);
    const resize = new ResizeObserver(() => {
      width = box.clientWidth;
      draw();
    });
    resize.observe(box);

    const glow = glowRef.current;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = box.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.inside = true;
      if (glow) {
        // The glow layer overhangs the diagram by 80px on each side.
        glow.style.setProperty('--mx', `${pointer.x + 80}px`);
        glow.style.setProperty('--my', `${pointer.y + 80}px`);
        glow.style.opacity = '1';
      }
    };
    const onLeave = () => {
      pointer.inside = false;
      if (glow) glow.style.opacity = '0';
    };
    box.addEventListener('pointermove', onMove);
    box.addEventListener('pointerleave', onLeave);

    return () => {
      stop();
      visibility.disconnect();
      resize.disconnect();
      box.removeEventListener('pointermove', onMove);
      box.removeEventListener('pointerleave', onLeave);
      sendSignal.current = () => {};
      ripple.current = () => {};
    };
  }, [nodes, edges, sizes]);

  return (
    <div
      ref={boxRef}
      className="relative mx-auto h-(--tall-h) max-w-6xl md:h-(--wide-h)"
      style={{ '--tall-h': `${tallHeight}px`, '--wide-h': `${wideHeight}px` } as React.CSSProperties}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute -inset-20 opacity-0 transition-opacity duration-500"
        style={{ background: 'radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgb(114 67 193 / 0.13), transparent 70%)' }}
      />
      {(['tall', 'wide'] as const).map((layout) => (
        <svg
          key={layout}
          aria-hidden
          className={`pointer-events-none absolute inset-0 size-full overflow-visible ${layout === 'wide' ? 'hidden md:block' : 'md:hidden'}`}
        >
          {edges.map(([a, b], k) => {
            const lit = active !== null && (a === active || b === active);
            return (
              <line
                key={k}
                ref={(el) => { lineEls.current[layout][k] = el; }}
                x1={`${nodes[a][layout].x}%`}
                y1={nodes[a][layout].y}
                x2={`${nodes[b][layout].x}%`}
                y2={nodes[b][layout].y}
                style={{ '--w': edgeWeight(a, b) } as React.CSSProperties}
                className={`stroke-violet transition-[stroke-opacity,stroke-width,opacity] duration-300 ${
                  lit
                    ? '[stroke-opacity:1] [stroke-width:2.25px] [filter:drop-shadow(0_0_3px_rgb(114_67_193/0.6))]'
                    : `[stroke-opacity:calc(0.16+var(--w)*0.3)] [stroke-width:calc(1px+var(--w)*1px)] ${active !== null ? 'opacity-40' : ''}`
                }`}
              />
            );
          })}
          {Array.from({ length: REACHES }, (_, k) => (
            <line
              key={`reach-${k}`}
              ref={(el) => { reachEls.current[layout][k] = el; }}
              className="stroke-violet opacity-0 [stroke-dasharray:4_5] [stroke-linecap:round] [stroke-width:1.75px]"
            />
          ))}
          {Array.from({ length: PULSES }, (_, slot) => (
            <circle
              key={slot}
              ref={(el) => { pulseEls.current[layout][slot] = el; }}
              r={0}
              className="fill-violet [filter:drop-shadow(0_0_5px_rgb(114_67_193/0.9))]"
            />
          ))}
        </svg>
      ))}

      <ul aria-label="DSAIC eboard">
        {nodes.map((node, i) => (
          <li key={node.key}>
            <NetworkNode
              node={node}
              state={active === null ? 'idle' : active === i ? 'active' : neighbors[active].has(i) ? 'near' : 'far'}
              nodeRef={(el) => { nodeEls.current[i] = el; }}
              haloRef={(el) => { haloEls.current[i] = el; }}
              onActivate={(on) => {
                if (on) activate(i);
                else if (activeRef.current === i) activate(null);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const NetworkNode = ({
  node,
  state,
  nodeRef,
  haloRef,
  onActivate,
}: {
  node: NetNode;
  state: 'idle' | 'active' | 'near' | 'far';
  nodeRef: (el: HTMLElement | null) => void;
  haloRef: (el: HTMLSpanElement | null) => void;
  onActivate: (on: boolean) => void;
}) => {
  const { member } = node;
  const onLinkedIn = member?.profile?.includes('linkedin.com');
  const BadgeIcon = !member ? FaArrowRight : onLinkedIn ? FaLinkedinIn : FaUniversity;

  const style = {
    '--wx': `${node.wide.x}%`,
    '--wy': `${node.wide.y}px`,
    '--tx': `${node.tall.x}%`,
    '--ty': `${node.tall.y}px`,
    '--tw': `calc(${100 / node.count}% - 8px)`,
  } as React.CSSProperties;
  // Anchored at the photo's center, which is where the edges meet.
  const className = `group/node absolute left-(--tx) top-(--ty) flex w-(--tw) max-w-[180px] -translate-x-1/2 -translate-y-8 flex-col items-center text-center outline-none transition-opacity duration-300 will-change-transform md:left-(--wx) md:top-(--wy) md:w-44 md:-translate-y-[38px] ${
    state === 'far' ? 'opacity-40' : ''
  }`;
  const handlers = {
    onPointerEnter: () => onActivate(true),
    onPointerLeave: () => onActivate(false),
    onFocus: () => onActivate(true),
    onBlur: () => onActivate(false),
  };

  const content = (
    <>
      <span
        className={`relative rounded-full p-1 shadow-[0_12px_28px_-12px_rgb(114_67_193/0.75)] transition-transform duration-300 group-hover/node:scale-[1.2] group-focus-visible/node:scale-[1.2] group-focus-visible/node:outline-2 group-focus-visible/node:outline-offset-4 group-focus-visible/node:outline-violet motion-reduce:transition-none ${
          state === 'near' ? 'scale-[1.06]' : ''
        }`}
      >
        <span ref={haloRef} aria-hidden className="absolute inset-0 rounded-full bg-violet/50 opacity-0" />
        {member ? (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[conic-gradient(from_210deg,var(--color-violet),var(--color-lavender),#fff,var(--color-violet))] group-hover/node:animate-spin-slow group-focus-visible/node:animate-spin-slow motion-reduce:animate-none!"
          />
        ) : (
          <span aria-hidden className="absolute inset-0 rounded-full border-2 border-dashed border-violet/60 bg-white/60" />
        )}
        {member?.image ? (
          // The name sits right below, so the photo needs no alt text of its own.
          <Image
            src={member.image}
            alt=""
            width={68}
            height={68}
            className="relative block size-14 rounded-full object-cover ring-[3px] ring-white md:size-[68px]"
          />
        ) : (
          <span
            aria-hidden
            className={`relative grid size-14 place-items-center rounded-full md:size-[68px] ${
              member ? 'bg-lavender font-heading text-lg text-ink ring-[3px] ring-white' : 'text-xl text-violet'
            }`}
          >
            {member ? member.initials : <FaUserPlus />}
          </span>
        )}
        <span
          aria-hidden
          className="absolute -bottom-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-violet text-[10px] text-white ring-2 ring-white transition-transform duration-300 group-hover/node:scale-110 md:size-6 md:text-[11px]"
        >
          <BadgeIcon />
        </span>
      </span>

      <span className="mt-2.5 flex flex-col items-center rounded-xl bg-cream/80 px-2 py-1 backdrop-blur-sm transition-[background-color,box-shadow] duration-300 md:bg-transparent md:backdrop-blur-none md:[text-shadow:0_0_2px_var(--color-cream),0_0_6px_var(--color-cream),0_0_10px_var(--color-cream)] md:group-hover/node:bg-white/90 md:group-hover/node:shadow-[0_10px_24px_-12px_rgb(37_25_122/0.35)] md:group-hover/node:[text-shadow:none] md:group-focus-visible/node:bg-white/90 md:group-focus-visible/node:[text-shadow:none]">
        <span className="font-heading text-[12px] font-bold uppercase leading-tight tracking-[0.08em] text-ink text-balance md:text-sm">
          {member ? member.name : 'You?'}
        </span>
        <span className="mt-0.5 font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-violet text-balance">
          {member ? member.role : 'Join the network'}
        </span>
        {/* Grows in on hover, as a call to action */}
        <span
          aria-hidden
          className="hidden grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover/node:grid-rows-[1fr] group-hover/node:opacity-100 group-focus-visible/node:grid-rows-[1fr] group-focus-visible/node:opacity-100 md:grid"
        >
          <span className="overflow-hidden font-mono text-[10px] uppercase tracking-[0.1em] text-ink/60">
            <span className="mt-1 inline-flex items-center gap-1">
              {!member ? 'Join DSAIC' : onLinkedIn ? 'Connect on LinkedIn' : 'Faculty page'} <FaArrowRight className="text-[8px]" />
            </span>
          </span>
        </span>
      </span>
      {member?.profile && (
        <span className="sr-only">{onLinkedIn ? 'LinkedIn profile' : 'Faculty page'} (opens in a new tab)</span>
      )}
    </>
  );

  if (!member) {
    return (
      <Link href="/join" ref={nodeRef} className={className} style={style} {...handlers}>
        {content}
      </Link>
    );
  }
  return member.profile ? (
    <a href={member.profile} target="_blank" rel="noopener noreferrer" ref={nodeRef} className={className} style={style} {...handlers}>
      {content}
    </a>
  ) : (
    <div ref={nodeRef} className={className} style={style} {...handlers}>
      {content}
    </div>
  );
};

export default EboardNetwork;
