import React from 'react';
import { FaPython, FaRobot, FaGithub, FaYoutube, FaFileAlt } from 'react-icons/fa';

interface ResourceCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  color: 'violet' | 'ink';
  icon: 'python' | 'robot';
  linkType: 'github' | 'youtube' | 'pdf';
}

const ResourceCard = ({ title, description, buttonText, buttonLink, color, icon, linkType }: ResourceCardProps) => {
  // Select the appropriate icon component
  const IconComponent = icon === 'python' ? FaPython : FaRobot;
  const linkIcons = { github: FaGithub, youtube: FaYoutube, pdf: FaFileAlt };
  const LinkIconComponent = linkIcons[linkType];
  return (
    <div className="bg-white rounded-lg border border-lavender hover:border-violet/40 overflow-hidden transition-all duration-300 h-full shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)]">
      {/* Top gradient area. It grows when the title wraps on phones, and the
          title's margins are zeroed because the global heading margins would
          otherwise push it below the icon. */}
      <div className="min-h-16 w-full bg-gradient-to-r from-violet/10 to-ink/5 flex items-center justify-start px-4 py-3">
        <IconComponent className="text-2xl mr-3 text-violet shrink-0" size={24} />
        <h3 className="my-0! text-xl leading-tight font-heading text-ink">{title}</h3>
      </div>

      {/* Content area */}
      <div className="p-4">
        <p className="text-ink/75 mb-4">{description}</p>

        <div className="flex justify-end">
          <a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`py-2 px-4 rounded-md ${color === 'violet' ? 'bg-violet hover:bg-ink' : 'bg-ink hover:bg-violet'} text-white font-heading text-sm uppercase tracking-wider hover:scale-105 transition-all flex items-center gap-1`}
          >
            <LinkIconComponent className="mr-1" /> {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

const Resources = () => {
  return (
    <section id="resources" className="py-16 bg-white/60 cv-auto">

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-ink">
          Our Favorite Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Maths, CS & AI Compendium */}
          <ResourceCard
            title="Maths, CS & AI Compendium"
            description="Become a cracked AI/ML Research Engineer. A curated learning experience by YC funded AI researcher, covers the basics and gives great entry points into various frontier AI paths."
            buttonText="GitHub"
            buttonLink="https://github.com/HenryNdubuaku/maths-cs-ai-compendium"
            color="violet"
            icon="python"
            linkType="github"
          />

          {/* YC Startup School 2026 */}
          <ResourceCard
            title="YC Startup School 2026"
            description="YC brought together some of the world's best founders, engineers, and researchers, including Jensen Huang (NVIDIA), Sam Altman (OpenAI), Patrick Collison (Stripe), Jeff Dean (Google), Alexandr Wang (Meta), Boris Cherny (Anthropic) and more."
            buttonText="YouTube"
            buttonLink="https://www.youtube.com/playlist?list=PLEb7ftOB0yf0"
            color="ink"
            icon="robot"
            linkType="youtube"
          />
        </div>
      </div>
    </section>
  );
};

export default Resources;
