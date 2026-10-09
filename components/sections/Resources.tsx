import React from 'react';
import { FaArrowRight, FaGithub, FaPython, FaRocket, FaYoutube } from 'react-icons/fa';

interface ResourceCardProps {
  title: string;
  kind: string; // what you get, e.g. "Free curriculum"
  description: string;
  link: string;
  linkText: string;
  icon: 'python' | 'rocket';
  linkType: 'github' | 'youtube';
}

const ICONS = { python: FaPython, rocket: FaRocket };
const LINK_ICONS = { github: FaGithub, youtube: FaYoutube };

// Same glass card as the eboard below it. The button's hit area stretches
// over the whole card, so the card is one big link with the button's name.
const ResourceCard = ({ title, kind, description, link, linkText, icon, linkType }: ResourceCardProps) => {
  const Icon = ICONS[icon];
  const LinkIcon = LINK_ICONS[linkType];
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-white/80 bg-[linear-gradient(150deg,rgb(255_255_255/0.95),rgb(255_255_255/0.6))] p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_14px_36px_-18px_rgb(37_25_122/0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_22px_44px_-18px_rgb(37_25_122/0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet to-ink text-2xl text-white shadow-[0_10px_20px_-10px_rgb(114_67_193/0.8)]"
        >
          <Icon />
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet">{kind}</p>
          <h3 className="my-0! text-xl leading-tight">{title}</h3>
        </div>
      </div>

      <p className="mt-4 flex-1 leading-relaxed text-ink/75">{description}</p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 font-heading text-sm uppercase tracking-wider text-white transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:bg-violet focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
      >
        <LinkIcon aria-hidden />
        {linkText}
        <FaArrowRight aria-hidden className="text-xs transition-transform group-hover:translate-x-0.5" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </article>
  );
};

const Resources = () => {
  return (
    <section id="resources" className="py-16 bg-white/60 cv-auto">

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-ink">
          Our Favorite Resources
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {/* Maths, CS & AI Compendium */}
          <ResourceCard
            title="Maths, CS & AI Compendium"
            kind="Free curriculum"
            description="Become a cracked AI/ML Research Engineer. A curated learning experience by YC funded AI researcher, covers the basics and gives great entry points into various frontier AI paths."
            link="https://github.com/HenryNdubuaku/maths-cs-ai-compendium"
            linkText="Open on GitHub"
            icon="python"
            linkType="github"
          />

          {/* YC Startup School 2026 */}
          <ResourceCard
            title="YC Startup School 2026"
            kind="Talk playlist"
            description="YC brought together some of the world's best founders, engineers, and researchers, including Jensen Huang (NVIDIA), Sam Altman (OpenAI), Patrick Collison (Stripe), Jeff Dean (Google), Alexandr Wang (Meta), Boris Cherny (Anthropic) and more."
            link="https://www.youtube.com/playlist?list=PLEb7ftOB0yf0"
            linkText="Watch on YouTube"
            icon="rocket"
            linkType="youtube"
          />
        </div>
      </div>
    </section>
  );
};

export default Resources;
