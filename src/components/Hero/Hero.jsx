import React, { useEffect, useRef, useState } from 'react';
import './style.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const [typed, setTyped] = useState('');
  const [showSub, setShowSub] = useState(false);
  const fullText = 'JOÃO MENDES';

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setTyped(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
          setTimeout(() => setShowSub(true), 300);
        }
      }, 80);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(delay);
  }, []);

  // Animated speed lines on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const lines = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: Math.random() * 200 + 50,
      speed: Math.random() * 8 + 4,
      alpha: Math.random() * 0.3 + 0.05,
      width: Math.random() * 1 + 0.3,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x - line.len, line.y);
        ctx.strokeStyle = `rgba(232,0,45,${line.alpha})`;
        ctx.lineWidth = line.width;
        ctx.stroke();
        line.x -= line.speed;
        if (line.x + line.len < 0) {
          line.x = canvas.width + line.len;
          line.y = Math.random() * canvas.height;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero section">
      <canvas ref={canvasRef} className="hero__canvas" />

      <div className="hero__bg-text display">F1</div>

      {/* Top HUD */}
      <div className="hero__hud hero__hud--top">
        <div className="hero__hud-item mono">
          <span className="hero__hud-label">STATUS</span>
          <span className="hero__hud-value hero__hud-value--green">AVAILABLE</span>
        </div>
        <div className="hero__hud-item mono">
          <span className="hero__hud-label">POSITION</span>
          <span className="hero__hud-value">FULL STACK DEV</span>
        </div>
        <div className="hero__hud-item mono">
          <span className="hero__hud-label">TEAM</span>
          <span className="hero__hud-value">FREELANCE / OPEN</span>
        </div>
      </div>

      {/* Main content */}
      <div className="hero__content">
        <div className="hero__tag mono">
          <span className="hero__tag-dot" />
          DRIVER PROFILE — #15
        </div>

        <h1 className="hero__name display">
          {typed}
          <span className="hero__cursor" />
        </h1>

        <div className={`hero__subs ${showSub ? 'hero__subs--visible' : ''}`}>
          <div className="hero__role mono">
            <span className="hero__role-accent">_</span>
            FULL STACK DEVELOPER
            <span className="hero__role-accent">_</span>
          </div>
          <p className="hero__desc">
            Building digital circuits — from pixel-perfect frontends to high-performance backends.
            Based in Telêmaco Borba, Brazil. Studying at IFPR.
          </p>
        </div>

        <div className={`hero__actions ${showSub ? 'hero__actions--visible' : ''}`}>
          <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('projects')}>
            <span>ENTER GARAGE</span>
            <div className="hero__btn-arrow">→</div>
          </button>
          <button className="hero__btn hero__btn--secondary" onClick={() => scrollTo('contact')}>
            <span>CONTACT TEAM</span>
          </button>
        </div>
      </div>

      {/* Right side speedometer */}
      <div className="hero__speedo">
        <Speedometer value={97} label="CODE VELOCITY" />
      </div>

      {/* Bottom stats */}
      <div className="hero__stats">
        {[
          { label: 'PROJECTS', value: '10+' },
          { label: 'TECHNOLOGIES', value: '15+' },
          { label: 'SEASON', value: '2025' },
          { label: 'NATIONALITY', value: 'BRA' },
        ].map(s => (
          <div key={s.label} className="hero__stat">
            <span className="hero__stat-value display">{s.value}</span>
            <span className="hero__stat-label mono">{s.label}</span>
          </div>
        ))}
      </div>

      {/* DRS Strip */}
      <div className="hero__drs mono">
        {'DRS ENABLED — OPEN POSITIONS — INTERNSHIP · FREELANCE · JUNIOR DEV — '.repeat(6)}
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll mono" onClick={() => scrollTo('about')}>
        <span>SCROLL TO START</span>
        <div className="hero__scroll-bar" />
      </div>
    </section>
  );
};

/* Mini speedometer SVG */
const Speedometer = ({ value, label }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let start = null;
    const duration = 2000;
    const animate = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setCurrent(Math.round(ease * value));
      if (prog < 1) requestAnimationFrame(animate);
    };
    const t = setTimeout(() => requestAnimationFrame(animate), 1000);
    return () => clearTimeout(t);
  }, [value]);

  const angle = -135 + (current / 100) * 270;
  const r = 70;
  const cx = 90, cy = 90;
  const toXY = (deg, radius) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const arcPath = (startDeg, endDeg, r) => {
    const s = toXY(startDeg, r);
    const e = toXY(endDeg, r);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const needle = toXY(angle, 52);

  return (
    <div className="speedo">
      <svg viewBox="0 0 180 180" className="speedo__svg">
        {/* Background arc */}
        <path d={arcPath(-135, 135, r)} fill="none" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" />
        {/* Red fill arc */}
        <path
          d={arcPath(-135, -135 + (current / 100) * 270, r)}
          fill="none"
          stroke="var(--red)"
          strokeWidth="8"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 6px var(--red))' }}
        />
        {/* Tick marks */}
        {Array.from({ length: 11 }).map((_, i) => {
          const deg = -135 + i * 27;
          const inner = toXY(deg, 56);
          const outer = toXY(deg, 64);
          return <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="#333" strokeWidth="1.5" />;
        })}
        {/* Needle */}
        <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="4" fill="var(--red)" />
        {/* Value */}
        <text x={cx} y={cy + 22} textAnchor="middle" fill="white" fontSize="20" fontFamily="Orbitron" fontWeight="700">{current}</text>
        <text x={cx} y={cy + 36} textAnchor="middle" fill="#666" fontSize="7" fontFamily="Share Tech Mono" letterSpacing="1">{label}</text>
      </svg>
    </div>
  );
};

export default Hero;
