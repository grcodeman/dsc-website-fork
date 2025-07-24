"use client";

import React from 'react';
import { FaPython, FaRobot, FaGlobe, FaFileAlt } from 'react-icons/fa';

interface ResourceCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  color: 'teal' | 'violet';
  icon: 'python' | 'robot';
  linkType: 'github' | 'pdf';
}

const ResourceCard = ({ title, description, buttonText, buttonLink, color, icon, linkType }: ResourceCardProps) => {
  // Select the appropriate icon component
  const IconComponent = icon === 'python' ? FaPython : FaRobot;
  const LinkIconComponent = linkType === 'github' ? FaGlobe : FaFileAlt;
  return (
    <div className="bg-charcoal/70 rounded-lg border border-teal/20 hover:border-violet/30 overflow-hidden transition-all duration-300 h-full">
      {/* Top gradient area */}
      <div className="h-16 w-full bg-gradient-to-r from-violet/20 to-teal/20 flex items-center justify-start px-4">
        <IconComponent className="text-2xl mr-3 text-white" size={24} />
        <h3 className="text-xl font-heading text-teal dark:text-teal">{title}</h3>
      </div>
      
      {/* Content area */}
      <div className="p-4">
        <p className="text-offwhite/90 mb-4">{description}</p>
        
        <div className="flex justify-end">
          <a 
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`py-2 px-4 rounded-md bg-gradient-to-r ${color === 'teal' ? 'from-emerald-600 to-teal dark:from-teal dark:to-teal/70' : 'from-purple-700 to-violet dark:from-violet dark:to-violet/70'} text-white font-heading text-sm uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-1`}
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
    <section id="resources" className="py-16 bg-charcoal/50">
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
          Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Python Data Science Tutorial */}
          <ResourceCard 
            title="Data/ML Onboarding Repo" 
            description="Learn essential Python tools for data science including NumPy, Pandas, Matplotlib and Scikit-Learn."
            buttonText="GitHub"
            buttonLink="https://github.com/Data-Science-Club-at-WMU/Python-Data-Science-Onboarding"
            color="teal"
            icon="python"
            linkType="github"
          />
          
          {/* Machine Learning Tutorials */}
          <ResourceCard 
            title="Advanced ML Tutorials" 
            description="Explore machine learning concepts and techniques through hands-on tutorials and practical examples."
            buttonText="GitHub"
            buttonLink="https://github.com/Data-Science-Club-at-WMU/Machine-Learning-Tutorials"
            color="violet"
            icon="robot"
            linkType="github"
          />
        </div>
      </div>
    </section>
  );
};

export default Resources;
