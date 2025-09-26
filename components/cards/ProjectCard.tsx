import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  name: string;
  thumbnail: string;
  githubUrl: string;
  contributors: Array<{
    name: string;
    avatar: string;
  }>;
}

const ProjectCard = ({ name, thumbnail, githubUrl, contributors }: ProjectCardProps) => {
  return (
    <div className="group backdrop-blur-md bg-white/3 bg-charcoal/10 border border-violet/10 rounded-lg overflow-hidden hover:shadow-[0_4px_20px_rgba(31,38,135,0.2)] transition-all hover:border-violet/20 hover:-translate-y-1 h-full">
      <div className="relative aspect-video w-full overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${name} thumbnail`}
            fill
            className="object-cover object-top transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-charcoal/40 to-violet/10">
            <span className="text-teal text-opacity-50">Project Thumbnail</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-heading text-teal mb-2">{name || "Project Name"}</h3>
        
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {contributors && contributors.length > 0 ? (
              contributors.map((contributor, index) => (
                <div key={index} className="h-8 w-8 rounded-full border-2 border-charcoal overflow-hidden relative">
                  {contributor.avatar ? (
                    <Image
                      src={contributor.avatar}
                      alt={contributor.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-violet/30 flex items-center justify-center text-xs">
                      {contributor.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="h-8 w-8 rounded-full border-2 border-charcoal overflow-hidden relative bg-violet/30 flex items-center justify-center text-xs">
                  <span>P1</span>
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-charcoal overflow-hidden relative bg-violet/30 flex items-center justify-center text-xs">
                  <span>P2</span>
                </div>
              </>
            )}
          </div>
          
          <Link href={githubUrl || "#"} 
                className="text-sm text-offwhite/80 hover:text-teal transition-colors flex items-center gap-1"
                target="_blank" 
                rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
