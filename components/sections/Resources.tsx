"use client";

import React from 'react';
import { FaPython, FaRobot, FaGlobe, FaFileAlt } from 'react-icons/fa';

interface ResourceCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  color: 'violet' | 'ink';
  icon: 'python' | 'robot';
  linkType: 'github' | 'pdf';
}

const ResourceCard = ({ title, description, buttonText, buttonLink, color, icon, linkType }: ResourceCardProps) => {
  // Select the appropriate icon component
  const IconComponent = icon === 'python' ? FaPython : FaRobot;
  const LinkIconComponent = linkType === 'github' ? FaGlobe : FaFileAlt;
  return (
    <div className="bg-white rounded-lg border border-lavender hover:border-violet/40 overflow-hidden transition-all duration-300 h-full shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)]">
      {/* Top gradient area */}
      <div className="h-16 w-full bg-gradient-to-r from-violet/10 to-ink/5 flex items-center justify-start px-4">
        <IconComponent className="text-2xl mr-3 text-violet" size={24} />
        <h3 className="text-xl font-heading text-ink">{title}</h3>
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
    <section id="resources" className="py-16 bg-white/60">

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-ink">
          Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Python Data Science Tutorial */}
          <ResourceCard
            title="Data/ML Onboarding Repo"
            description="Learn essential Python tools for data science including NumPy, Pandas, Matplotlib and Scikit-Learn."
            buttonText="GitHub"
            buttonLink="https://github.com/Data-Science-Club-at-WMU/Python-Data-Science-Onboarding"
            color="violet"
            icon="python"
            linkType="github"
          />

          {/* Machine Learning Tutorials */}
          <ResourceCard
            title="Advanced ML Tutorials"
            description="Explore machine learning concepts and techniques through hands-on tutorials and practical examples."
            buttonText="GitHub"
            buttonLink="https://github.com/Data-Science-Club-at-WMU/Machine-Learning-Tutorials"
            color="ink"
            icon="robot"
            linkType="github"
          />
        </div>
      </div>
    </section>
  );
};

export default Resources;
