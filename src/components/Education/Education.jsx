import React, { useRef, useState, useEffect } from 'react';
import './style.css';

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

const timeline = [
  {
    year: '2023',
    title: 'STARTED PROGRAMMING JOURNEY',
    sub: 'HTML, CSS, JavaScript fundamentals',
    icon: '🚦',
    desc: 'First lines of code. The race begins.',
    type: 'START',
  },
  {
    year: '2023',
    title: 'ENROLLED AT IFPR',
    sub: 'Instituto Federal do Paraná — Curitiba',
    icon: '🏫',
    desc: 'Technical High School — Internet Informatics program. Year 1.',
    type: 'ACADEMY',
  },
  {
    year: '2024',
    title: 'BACKEND EXPANSION',
    sub: 'Node.js, PHP, SQL, Databases',
    icon: '⚙️',
    desc: 'Moved into server-side development. Databases, APIs, authentication.',
    type: 'UPGRADE',
  },
  {
    year: '2025',
    title: 'FULL STACK DEBUT',
    sub: 'React, PostgreSQL, Docker, DevBurger',
    icon: '🏎️',
    desc: 'First complete full-stack projects. React + Node + PostgreSQL. Docker containerization.',
    type: 'PODIUM',
  },
  {
    year: '2026',
    title: '4TH YEAR — FINAL SEASON',
    sub: 'IFPR — Advanced Modules',
    icon: '🏁',
    desc: 'Completing the technical program. Seeking internship and real-world experience.',
    type: 'RACE',
    current: true,
  },
];

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="education" className="education section" ref={ref}>
      <div className="education__container">
        <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
          <span className="section-header__tag mono">SECTION 05</span>
          <h2 className="section-header__title display">RACE ACADEMY</h2>
          <div className="section-header__line" />
        </div>

        {/* Main education card */}
        <div className={`education__main ${inView ? 'education__main--visible' : ''}`}>
          <div className="education__main-badge mono">CURRENT</div>
          <div className="education__main-content">
            <div className="education__main-logo display">IFPR</div>
            <div>
              <h3 className="education__main-title display">Instituto Federal do Paraná</h3>
              <div className="education__main-sub mono">TECHNICAL HIGH SCHOOL — INTERNET INFORMATICS</div>
              <p className="education__main-desc">
                4-year integrated technical program combining high school with professional IT certification.
                Covering web development, databases, networks, and software engineering fundamentals.
              </p>
              <div className="education__main-meta">
                <div className="education__main-meta-item mono">
                  <span className="education__meta-label">LOCATION</span>
                  <span className="education__meta-value">TELÊMACO BORBA, PARANÁ — BRAZIL</span>
                </div>
                <div className="education__main-meta-item mono">
                  <span className="education__meta-label">YEAR</span>
                  <span className="education__meta-value">4TH YEAR (2023–2026)</span>
                </div>
                <div className="education__main-meta-item mono">
                  <span className="education__meta-label">STATUS</span>
                  <span className="education__meta-value" style={{ color: '#00e676' }}>IN PROGRESS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="education__timeline">
          <div className="education__timeline-track" />
          {timeline.map((item, i) => (
            <div
              key={i}
              className={`education__event ${inView ? 'education__event--visible' : ''} ${item.current ? 'education__event--current' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="education__event-year mono">{item.year}</div>
              <div className="education__event-dot">
                <span>{item.icon}</span>
              </div>
              <div className="education__event-content">
                <div className="education__event-type mono">{item.type}</div>
                <h4 className="education__event-title display">{item.title}</h4>
                <div className="education__event-sub mono">{item.sub}</div>
                <p className="education__event-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
