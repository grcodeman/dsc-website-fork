"use client";

import React, { useState } from 'react';

interface FlipCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  color: 'teal' | 'violet';
  emoji: string;
  linkType: 'github' | 'pdf';
}

const FlipCard = ({ title, description, buttonText, buttonLink, color, emoji, linkType }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="h-64 relative"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`flip-card-inner w-full h-full relative ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side */}
        <div className="flip-card-front w-full h-full absolute bg-charcoal/30 rounded-lg border border-teal/20 overflow-hidden">
          {/* Image placeholder */}
          <div className="h-1/3 w-full bg-gradient-to-br from-violet/20 to-teal/20"></div>
          
          <div className="p-4">
            <h3 className="text-xl font-heading mb-2 text-teal">{title}</h3>
            <p className="text-offwhite/80 text-sm line-clamp-2">{description}</p>
          </div>
          

        </div>
        
        {/* Back Side */}
        <div className="flip-card-back w-full h-full absolute bg-charcoal/40 rounded-lg border border-violet/30 flex flex-col items-center justify-center p-4 text-center">
          <div className="text-3xl mb-2">{emoji}</div>
          <h3 className="text-lg font-heading mb-2 text-teal">{title}</h3>
          

          
          <a 
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`py-2 px-4 rounded-md bg-gradient-to-r ${color === 'teal' ? 'from-teal to-teal/70' : 'from-violet to-violet/70'} text-charcoal font-heading text-sm uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-1`}
          >
            {linkType === 'github' ? <span>🌐</span> : <span>📁</span>} {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

const Resources = () => {
  return (
    <section id="resources" className="py-16 bg-charcoal/50">
      <style jsx global>{`
        .flip-card-inner {
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card-front, .flip-card-back {
          backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
      `}</style>
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
          Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Python Data Science Tutorial */}
          <FlipCard 
            title="Python DSC Onboarding Repo" 
            description="Learn essential Python tools for data science including NumPy, Pandas, Matplotlib and Scikit-Learn."
            buttonText="View on GitHub"
            buttonLink="https://github.com/Data-Science-Club-at-WMU/Python-Data-Science-Onboarding"
            color="teal"
            emoji="🐍"
            linkType="github"
          />
          
          {/* Machine Learning Tutorials */}
          <FlipCard 
            title="Machine Learning Tutorials" 
            description="Explore machine learning concepts and techniques through hands-on tutorials and practical examples."
            buttonText="View on GitHub"
            buttonLink="https://github.com/Data-Science-Club-at-WMU/Machine-Learning-Tutorials"
            color="violet"
            emoji="🤖"
            linkType="github"
          />
        </div>
      </div>
    </section>
  );
};

export default Resources;
