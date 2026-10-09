import React from 'react';
import EboardNetwork, { type EboardLayer } from '../team/EboardNetwork';

// The eboard, drawn as a neural network: each layer feeds the next, and the
// output is the next member. Order within a layer is top to bottom (left to
// right on phones).
const layers: EboardLayer[] = [
  {
    label: 'Leadership',
    members: [
      {
        name: "Dr. Hong",
        role: "Faculty Advisor",
        initials: "H",
        image: "/pfp/hong.webp",
        profile: "https://wmich.edu/computer-science/directory/hong",
      },
      {
        name: "Cody Thornell",
        role: "President",
        initials: "CT",
        image: "/pfp/cody.webp",
        profile: "https://www.linkedin.com/in/codythornell/",
      },
    ],
  },
  {
    label: 'Vice presidents',
    members: [
      {
        name: "Saad Mahmud",
        role: "VP of Operations & Tech",
        initials: "SM",
        image: "/pfp/saad.webp",
        profile: "https://www.linkedin.com/in/saad-mahmud-/",
      },
      {
        name: "Rafia Authoi",
        role: "VP of Marketing & Outreach",
        initials: "RA",
        image: "/pfp/rafia.webp",
        profile: "https://www.linkedin.com/in/rafia-authoi/",
      },
    ],
  },
  {
    label: 'Officers',
    members: [
      {
        name: "Syed Sobhan",
        role: "Finance Officer",
        initials: "SS",
        image: "/pfp/syed.webp",
        profile: "https://www.linkedin.com/in/syed-m-sobhan-4b998a358/",
      },
      {
        name: "Matthew Phinney",
        role: "Research Officer",
        initials: "MP",
        image: "/pfp/matthew.webp",
        profile: "https://www.linkedin.com/in/matt-phinney-851237208/",
      },
      {
        name: "Justin Tan",
        role: "Research Officer",
        initials: "JT",
        image: "/pfp/justin.webp",
        profile: "https://www.linkedin.com/in/justin-tan-02bb8a338/",
      },
      {
        name: "Yulia Baez",
        role: "Socials Officer",
        initials: "YB",
        image: "/pfp/yulia.webp",
        profile: "https://www.linkedin.com/in/yulia-ildeliza-arias-baez-a5110a308/",
      },
    ],
  },
];

// A faint violet grid over soft brand-color washes, like a lab whiteboard.
const BACKDROP_GLOW: React.CSSProperties = {
  background: [
    'radial-gradient(40% 50% at 16% 48%, rgb(114 67 193 / 0.2), transparent 70%)',
    'radial-gradient(34% 44% at 86% 64%, rgb(47 191 143 / 0.14), transparent 70%)',
    'radial-gradient(30% 36% at 60% 18%, rgb(240 180 41 / 0.12), transparent 70%)',
  ].join(', '),
};
const GRID_FADE = 'radial-gradient(ellipse 72% 64% at 50% 55%, #000 35%, transparent 80%)';
const BACKDROP_GRID: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, rgb(114 67 193 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(114 67 193 / 0.08) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
  maskImage: GRID_FADE,
  WebkitMaskImage: GRID_FADE,
};

const Team = () => {
  return (
    <section id="team" className="relative isolate overflow-hidden py-16 cv-auto">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={BACKDROP_GLOW} />
        <div className="absolute inset-0" style={BACKDROP_GRID} />
      </div>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-ink">
          Club Eboard
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-lg text-ink/80 text-balance">
          The people behind DSAIC, wired like a neural network. Each layer feeds the next, and the output is
          you.
        </p>

        <EboardNetwork layers={layers} />
      </div>
    </section>
  );
};

export default Team;
