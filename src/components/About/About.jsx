import React, { useEffect, useRef, useState } from 'react';
import './style.css';

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

const stats = [
  { label: 'DRIVER NUMBER', value: '#15' },
  { label: 'NATIONALITY', value: 'BRAZILIAN' },
  { label: 'HOME BASE', value: 'Telêmaco Borba, PR' },
  { label: 'TEAM STATUS', value: 'OPEN' },
  { label: 'EXPERIENCE', value: '2+ YEARS' },
  { label: 'ENGLISH LEVEL', value: 'B1+' },
];

const passions = ['FORMULA 1', 'RACING SIMS', 'PERFORMANCE OPT.', 'OPEN SOURCE'];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="about" className="about section grid-bg" ref={ref}>
      <div className="about__container">

        {/* Section header */}
        <div className={`section-header ${inView ? 'section-header--visible' : ''}`}>
          <span className="section-header__tag mono">SECTION 02</span>
          <h2 className="section-header__title display">DRIVER PROFILE</h2>
          <div className="section-header__line" />
        </div>

        <div className="about__grid">
          {/* Left — number plate / visual */}
          <div className={`about__visual ${inView ? 'about__visual--visible' : ''}`}>
            <div className="about__plate">
              <div className="about__plate-top mono">BRASIL</div>
              <div className="about__plate-num display">15</div>
              <div className="about__plate-name display">MENDES</div>
              <div className="about__plate-sub mono">FULL STACK DEVELOPER</div>
              <div className="about__plate-flag">🇧🇷</div>
            </div>

            {/* Telemetry mini readout */}
            <div className="about__telem">
              {passions.map((p, i) => (
                <div key={p} className="about__telem-row mono" style={{ animationDelay: `${0.8 + i * 0.1}s`, opacity: inView ? 1 : 0 }}>
                  <span className="about__telem-key">{String(i).padStart(2, '0')}</span>
                  <div className="about__telem-bar">
                    <div className="about__telem-fill" style={{ width: '100%', transitionDelay: `${0.9 + i * 0.15}s` }} />
                  </div>
                  <span className="about__telem-val">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — bio + stats */}
          <div className={`about__info ${inView ? 'about__info--visible' : ''}`}>
            <div className="about__bio">
              <p>
                Hi, I'm <strong>João Luiz Carvalho Mendes</strong> — a 17-year-old Full Stack Developer
                from Telêmaco Borba, Brazil. Currently in my 4th year of the Technical Internet Informatics
                program at <strong>Instituto Federal do Paraná (IFPR)</strong>.
              </p>
              <p>
                I approach code like an F1 engineer approaches a car: obsessively optimized, meticulously
                tested, and built to perform. Whether it's a slick React interface or a robust Node.js
                backend, I care deeply about the details.
              </p>
              <p>
                Off the keyboard, you'll find me watching lap times, grinding race simulators, or
                thinking about how to shave milliseconds off a render cycle.
              </p>
            </div>

            <div className="about__stats">
              {stats.map((s, i) => (
                <div key={s.label} className="about__stat" style={{ animationDelay: `${0.5 + i * 0.08}s` }}>
                  <span className="about__stat-label mono">{s.label}</span>
                  <span className="about__stat-value display">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="about__seeking mono">
              <span className="about__seeking-dot" />
              CURRENTLY SEEKING: INTERNSHIP · FREELANCE · JUNIOR DEV
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
