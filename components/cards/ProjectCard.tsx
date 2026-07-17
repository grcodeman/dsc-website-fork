import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  name: string;
  description: string;
  lead?: string;
  thumbnail?: string;
  githubUrl?: string;
  icon?: React.ReactNode;
}

const ProjectCard = ({ name, description, lead, thumbnail, githubUrl, icon }: ProjectCardProps) => {
  return (
    <div className="group bg-white border border-lavender rounded-lg overflow-hidden shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)] hover:shadow-[0_16px_32px_-12px_rgba(37,25,122,0.25)] transition-all hover:border-violet/40 hover:-translate-y-1 h-full flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${name} thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, 432px"
            className="object-cover object-top transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet/10 via-cream to-ink/5">
            <span className="text-violet/70 text-5xl transition-transform group-hover:scale-110 duration-300">{icon}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-heading text-ink mb-2">{name}</h3>
        <p className="text-ink/70 text-sm leading-relaxed mb-4 flex-grow">{description}</p>

        <div className="flex justify-between items-center">
          {lead ? (
            <span className="text-xs font-medium text-violet bg-violet/10 border border-violet/20 rounded-full px-3 py-1">
              Lead: {lead}
            </span>
          ) : (
            <span />
          )}

          {githubUrl && (
            <Link href={githubUrl}
                  className="text-sm text-ink/70 hover:text-violet transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
