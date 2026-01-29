import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ExternalLink, Github, ArrowRight } from 'lucide-react';
import { projects, type Project } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'All' | 'Web Development' | 'Graphic Design' | 'UI/UX Design'>('All');
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when filter changes
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
          }
        );
      }
    });
  }, [filter]);

  const categories = ['All', 'Web Development', 'Graphic Design', 'UI/UX Design'] as const;

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="py-20 md:py-32 w-full relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div ref={titleRef} className="text-center mb-12">
            <span className="micro-text text-orange-400 mb-4 block">My Work</span>
            <h2 className="headline-lg text-white mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="body-text text-white/60 max-w-2xl mx-auto">
              A collection of projects showcasing my expertise in web development, 
              graphic design, and UI/UX design.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={el => { cardsRef.current[index] = el; }}
                className="project-card group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-card-image w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e] via-[#1a0a2e]/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Hover Content */}
                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className={`tag mb-2 ${
                        project.category === 'Web Development' ? 'tag-purple' :
                        project.category === 'Graphic Design' ? 'tag-orange' : 'tag-cyan'
                      }`}>
                        {project.category}
                      </span>
                      <h3 className="text-xl font-display font-semibold text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-2">
                        {project.shortDescription}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        View Project <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="max-h-[90vh] overflow-y-auto">
              {/* Modal Header Image */}
              <div className="relative h-48 md:h-64">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e] to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className={`tag mb-2 ${
                    selectedProject.category === 'Web Development' ? 'tag-purple' :
                    selectedProject.category === 'Graphic Design' ? 'tag-orange' : 'tag-cyan'
                  }`}>
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-display font-semibold text-white mb-3">
                    About the Project
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-lg font-display font-semibold text-white mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Roadmap */}
                <div className="mb-8">
                  <h3 className="text-lg font-display font-semibold text-white mb-4">
                    Project Roadmap
                  </h3>
                  <div className="space-y-0">
                    {selectedProject.roadmap.map((item, index) => (
                      <div key={index} className="roadmap-item">
                        <span className="text-purple-400 text-sm font-medium">{item.phase}</span>
                        <h4 className="text-white font-medium mt-1">{item.title}</h4>
                        <p className="text-white/60 text-sm mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2"
                    >
                      <ExternalLink size={18} />
                      View Live
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Github size={18} />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
