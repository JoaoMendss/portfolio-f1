import React, { useEffect, useRef, useState } from 'react';
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

const skillGroups = [
  {
    category: 'FRONTEND',
    color: '#E8002D',
    skills: [
      { name: 'HTML5', level: 90, laps: '180' },
      { name: 'CSS3', level: 88, laps: '175' },
      { name: 'JavaScript', level: 82, laps: '164' },
      { name: 'React', level: 78, laps: '156' },
    ],
  },
  {
    category: 'BACKEND',
    color: '#ff6b35',
    skills: [
      { name: 'Node.js', level: 76, laps: '152' },
      { name: 'PHP', level: 72, laps: '144' },
      { name: 'Express', level: 75, laps: '150' },
      { name: 'Sequelize', level: 68, laps: '136' },
    ],
  },
  {
    category: 'DATABASE',
    color: '#ffd700',
    skills: [
      { name: 'PostgreSQL', level: 74, laps: '148' },
      { name: 'MongoDB', level: 70, laps: '140' },
      { name: 'SQL', level: 78, laps: '156' },
    ],
  },
  {
    category: 'TOOLS',
    color: '#aaa',
    skills: [
      { name: 'Git / GitHub', level: 84, laps: '168' },
      { name: 'Docker', level: 65, laps: '130' },
      { name: 'VS Code', level: 92, laps: '184' },
      { name: 'Yarn', level: 80, laps: '160' },
    ],
  },
];

const SkillBar = ({ skill, color, inView, delay }) => {
  return (
    <div className="skill-row mono" style={{ animationDelay: `${delay}s`, opacity: inView ? 1 : 0 }}>
      <div className="skill-row__header">
        <span className="skill-row__name">{skill.name}</span>
        <div className="skill-row__meta">
          <span className="skill-row__laps">LAP {skill.laps}</span>
          <span className="skill-row__pct" style={{ color }}>{skill.level}%</span>
        </div>
      </div>
      <div className="skill-row__track">
        <div
          className="skill-row__fill"
          style={{
            width: inView ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
            transitionDelay: `${delay + 0.1}s`,
          }}
        />
        <div className="skill-row__tick-overlay">
          {[25, 50, 75, 100].map(t => (
            <div key={t} className="skill-row__tick" style={{ left: `${t}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="skills" className="skills section" ref={ref}>
      <div className="skills__container">
        <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
          <span className="section-header__tag mono">SECTION 03</span>
          <h2 className="section-header__title display">TELEMETRY DATA</h2>
          <div className="section-header__line" />
        </div>

        <div className="skills__hud mono">
          <div className="skills__hud-item">
            <span className="skills__hud-label">DRIVER</span>
            <span className="skills__hud-value">J. MENDES</span>
          </div>
          <div className="skills__hud-item">
            <span className="skills__hud-label">SESSION</span>
            <span className="skills__hud-value">QUALIFYING</span>
          </div>
          <div className="skills__hud-item">
            <span className="skills__hud-label">STATUS</span>
            <span className="skills__hud-value" style={{ color: '#00e676' }}>LEARNING</span>
          </div>
          <div className="skills__hud-item">
            <span className="skills__hud-label">TOTAL TECH</span>
            <span className="skills__hud-value">15+</span>
          </div>
        </div>

        <div className="skills__grid">
          {skillGroups.map((group, gi) => (
            <div key={group.category} className={`skills__group ${inView ? 'skills__group--visible' : ''}`} style={{ transitionDelay: `${gi * 0.1}s` }}>
              <div className="skills__group-header mono">
                <div className="skills__group-dot" style={{ background: group.color }} />
                <span style={{ color: group.color }}>{group.category}</span>
                <div className="skills__group-line" style={{ background: group.color }} />
              </div>
              <div className="skills__bars">
                {group.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={group.color}
                    inView={inView}
                    delay={gi * 0.15 + i * 0.08}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Lap time display */}
        <div className={`skills__laptimes ${inView ? 'skills__laptimes--visible' : ''}`}>
          <div className="skills__lap mono">
            <span className="skills__lap-label">BEST LAP</span>
            <span className="skills__lap-time display">1:23.450</span>
            <span className="skills__lap-sub">REACT / NODE FULL STACK</span>
          </div>
          <div className="skills__lap mono">
            <span className="skills__lap-label">SECTOR 1</span>
            <span className="skills__lap-time display">28.120</span>
            <span className="skills__lap-sub">FRONTEND</span>
          </div>
          <div className="skills__lap mono">
            <span className="skills__lap-label">SECTOR 2</span>
            <span className="skills__lap-time display">27.890</span>
            <span className="skills__lap-sub">BACKEND</span>
          </div>
          <div className="skills__lap mono">
            <span className="skills__lap-label">SECTOR 3</span>
            <span className="skills__lap-time display">27.440</span>
            <span className="skills__lap-sub">DATABASE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
