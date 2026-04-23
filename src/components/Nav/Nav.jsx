import React, { useState, useEffect } from 'react';
import './style.css';

const navItems = [
  { id: 'hero', label: 'HOME', short: 'HM' },
  { id: 'about', label: 'DRIVER', short: 'DRV' },
  { id: 'skills', label: 'TELEMETRY', short: 'TEL' },
  { id: 'projects', label: 'GARAGE', short: 'GRG' },
  { id: 'education', label: 'ACADEMY', short: 'ACD' },
  { id: 'contact', label: 'PODIUM', short: 'PDM' },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navItems.map(i => document.getElementById(i.id));
      const current = sections.reduce((acc, el) => {
        if (!el) return acc;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) return el.id;
        return acc;
      }, 'hero');
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__logo" onClick={() => scrollTo('hero')}>
          <span className="nav__logo-num display">15</span>
          <div className="nav__logo-text">
            <span className="display">JM</span>
            <span className="mono nav__logo-sub">FULL STACK</span>
          </div>
        </div>

        <div className="nav__links">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              className={`nav__link mono ${active === item.id ? 'nav__link--active' : ''}`}
              onClick={() => scrollTo(item.id)}
            >
              <span className="nav__link-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="nav__link-label">{item.label}</span>
              <div className="nav__link-line" />
            </button>
          ))}
        </div>

        <button className="nav__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </nav>

      <div className={`nav__mobile ${menuOpen ? 'nav__mobile--open' : ''}`}>
        {navItems.map((item, i) => (
          <button
            key={item.id}
            className={`nav__mobile-link mono ${active === item.id ? 'active' : ''}`}
            onClick={() => scrollTo(item.id)}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <span className="nav__mobile-num">{String(i + 1).padStart(2, '0')}</span>
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Nav;
