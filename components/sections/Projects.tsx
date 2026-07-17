import React from 'react';
import ProjectCard from '../cards/ProjectCard';
import Link from 'next/link';
import { FaCoins, FaCarSide } from 'react-icons/fa';

// 2026-27 active projects, both eboard-led
const projects = [
  {
    name: "Club Finance AI",
    lead: "Rafia",
    icon: <FaCoins />,
    description: "An AI agent that helps run the club's own finances. We're building with agentic tooling like the Claude Agent SDK and custom skills to explore how AI agents handle real, domain-specific work.",
  },
  {
    name: "AV Robot Car",
    lead: "Sandy",
    icon: <FaCarSide />,
    description: "An autonomous robot car built on the SunFounder PiCar-X with a Raspberry Pi. A hands-on entry point into physical AI, with an eye toward tools like the NVIDIA robotics stack.",
  },
];

const pastProjects = [
  "Discord RPG Activity",
  "IOT Security Modeling",
  "Finance Assistant",
  "Strep Throat Detector",
];

const Projects = () => {
  return (
    <section id="projects" className="pt-10 pb-16 container mx-auto px-4">
      <div className="text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-heading text-ink mb-4">Active Projects</h2>
        <p className="text-ink/70 max-w-2xl">
          Explore current projects from the Data Science &amp; AI Club at WMU.
          These projects provide hands-on experience and real-world applications of data science and AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mb-16">
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.description}
            lead={project.lead}
            icon={project.icon}
          />
        ))}
      </div>

      {/* Past Projects */}
      <div className="mb-12">
        <h3 className="text-xl font-heading text-ink/70 mb-4">Past Projects</h3>
        <div className="flex flex-wrap gap-3">
          {pastProjects.map((name) => (
            <span
              key={name}
              className="text-sm text-ink/70 bg-white border border-lavender rounded-full px-4 py-1.5"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <Link
          href="/join"
          className="px-6 py-3 bg-violet text-white font-bold rounded-md hover:bg-ink hover:shadow-lg transition-all hover:-translate-y-0.5 text-center"
        >
          Join the Club
        </Link>
        <Link
          href="mailto:wmu.datascienceclub@gmail.com?subject=Project%20Request"
          className="px-6 py-3 bg-transparent border border-violet/60 text-violet font-bold rounded-md hover:bg-violet/5 hover:shadow-lg transition-all hover:-translate-y-0.5 text-center"
        >
          Request a Project
        </Link>
      </div>
    </section>
  );
};

export default Projects;
