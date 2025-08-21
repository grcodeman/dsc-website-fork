import React from 'react';
import ProjectCard from '../cards/ProjectCard';
import Link from 'next/link';

const Projects = () => {
  // Sample project data (empty placeholders as requested)
  const projects = [
    {
      name: "Autonomous Vehicle RC",
      thumbnail: "",
      githubUrl: "#",
      contributors: []
    },
    {
      name: "IOT Security Modeling",
      thumbnail: "",
      githubUrl: "#",
      contributors: []
    },
    {
      name: "Finance Assistant",
      thumbnail: "",
      githubUrl: "#",
      contributors: []
    },
    {
      name: "Strep Throat Detector",
      thumbnail: "",
      githubUrl: "#",
      contributors: []
    }
  ];

  return (
    <section id="projects" className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading text-teal mb-4">Key Projects</h2>
        <p className="text-offwhite/70 max-w-2xl mx-auto">
          Explore current projects from the Data Science Club at WMU. 
          These projects provide hands-on experience and real-world applications of data science.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            name={project.name}
            thumbnail={project.thumbnail}
            githubUrl={project.githubUrl}
            contributors={project.contributors}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <Link 
          href="#join"
          className="px-6 py-3 bg-gradient-to-r from-teal to-teal/80 text-charcoal font-bold rounded-md hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          Join the Club
        </Link>
        <Link 
          href="mailto:wmu.datascienceclub@gmail.com?subject=Project%20Request"
          className="px-6 py-3 bg-transparent border border-teal/70 text-teal font-bold rounded-md hover:bg-teal/10 hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          Request a Project
        </Link>
      </div>
    </section>
  );
};

export default Projects;
