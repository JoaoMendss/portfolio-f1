import React, { useRef, useState, useEffect } from 'react';
import './style.css';

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

const projects = [
  {
    id: 'P01',
    name: 'Smart Collar',
    subtitle: 'PET MONITORING STARTUP',
    desc: 'A full-stack startup concept for smart pet monitoring — IoT device management, real-time health tracking, and owner dashboard. The idea was ahead of its time.',
    tech: ['React', 'Node.js', 'MongoDB', 'IoT', 'Express'],
    status: 'CONCEPT',
    statusColor: '#ffd700',
    position: '01',
    type: 'FULL STACK',
    highlight: true,
  },
  {
    id: 'P02',
    name: 'DevBurger',
    subtitle: 'FULL STACK BURGER APP',
    desc: 'A complete e-commerce burger ordering platform with React frontend, Node.js API, PostgreSQL database, admin panel, and JWT authentication.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Express', 'JWT'],
    status: 'COMPLETED',
    statusColor: '#00e676',
    position: '02',
    type: 'FULL STACK',
    highlight: true,
  },
  {
    id: 'P03',
    name: 'MetaBoost',
    subtitle: 'SUPPLEMENT STORE FRONTEND',
    desc: 'A visually striking frontend for a supplement brand — responsive design, product catalog, performance-optimized images and animations.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    status: 'COMPLETED',
    statusColor: '#00e676',
    position: '03',
    type: 'FRONTEND',
  },
  {
    id: 'P04',
    name: 'Currency Converter',
    subtitle: 'LIVE EXCHANGE RATES',
    desc: 'Real-time currency conversion tool using live exchange rate APIs with clean, minimal interface and instant calculations.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'REST API'],
    status: 'COMPLETED',
    statusColor: '#00e676',
    position: '04',
    type: 'FRONTEND',
  },
  {
    id: 'P05',
    name: 'Relationship Website',
    subtitle: 'PERSONAL PROJECT',
    desc: 'A personal web project — a thoughtfully crafted interactive website celebrating a relationship, with custom animations and dynamic content.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    status: 'PRIVATE',
    statusColor: '#888',
    position: '05',
    type: 'FRONTEND',
  },
  {
    id: 'P06',
    name: 'JS Game Projects',
    subtitle: 'VANILLA JS GAMES',
    desc: 'A collection of browser games built with pure JavaScript — including logic puzzles, arcade clones, and physics simulations.',
    tech: ['JavaScript', 'Canvas API', 'HTML5'],
    status: 'ONGOING',
    statusColor: '#ff6b35',
    position: '06',
    type: 'GAME DEV',
  },
  {
    id: 'P07',
    name: 'UI Lab',
    subtitle: 'DESIGN LEARNING PROJECTS',
    desc: 'An ongoing collection of UI experiments — recreating complex interfaces, exploring CSS animations, and mastering frontend design patterns.',
    tech: ['CSS3', 'HTML5', 'JavaScript', 'React'],
    status: 'ONGOING',
    statusColor: '#ff6b35',
    position: '07',
    type: 'UI/UX',
  },
];

const ProjectCard = ({ project, inView, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`project-card ${project.highlight ? 'project-card--highlight' : ''} ${inView ? 'project-card--visible' : ''} ${hovered ? 'project-card--hovered' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top bar */}
      <div className="project-card__top">
        <div className="project-card__num mono">{project.id}</div>
        <div className="project-card__type mono">{project.type}</div>
        <div className="project-card__status mono" style={{ color: project.statusColor }}>
          <span className="project-card__status-dot" style={{ background: project.statusColor }} />
          {project.status}
        </div>
      </div>

      {/* Race car visual */}
      <div className="project-card__car">
        <div className="project-card__position display">{project.position}</div>
        <svg viewBox="0 0 120 40" className="project-card__car-svg">
          <path d="M12 28 L20 12 L84 12 L104 20 L108 28 Z" fill={project.highlight ? 'var(--red)' : '#2a2a2a'} />
          <path d="M20 12 L28 6 L80 6 L84 12 Z" fill={project.highlight ? '#cc0022' : '#1a1a1a'} />
          <circle cx="28" cy="30" r="8" fill="#111" stroke="#444" strokeWidth="2"/>
          <circle cx="92" cy="30" r="8" fill="#111" stroke="#444" strokeWidth="2"/>
          <path d="M45 12 L45 6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
          <path d="M60 12 L60 6" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        </svg>
        {hovered && (
          <div className="project-card__exhaust">
            {[1,2,3].map(i => <div key={i} className="project-card__exhaust-puff" style={{ '--i': i }} />)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="project-card__content">
        <h3 className="project-card__name display">{project.name}</h3>
        <div className="project-card__subtitle mono">{project.subtitle}</div>
        <p className="project-card__desc">{project.desc}</p>
        <div className="project-card__tech">
          {project.tech.map(t => (
            <span key={t} className="project-card__tech-tag mono">{t}</span>
          ))}
        </div>
      </div>

      {/* Speed line decoration */}
      <div className="project-card__lines">
        {[1,2,3].map(i => <div key={i} className="project-card__line" />)}
      </div>
    </div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="projects" className="projects section grid-bg" ref={ref}>
      <div className="projects__container">
        <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
          <span className="section-header__tag mono">SECTION 04</span>
          <h2 className="section-header__title display">THE GARAGE</h2>
          <div className="section-header__line" />
        </div>

        <div className="projects__meta mono">
          <span>{projects.length} CARS ON GRID</span>
          <span>·</span>
          <span className="projects__meta-highlight">REACT · NODE · PHP · SQL</span>
          <span>·</span>
          <span>SEASON 2023–2026</span>
        </div>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} inView={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
