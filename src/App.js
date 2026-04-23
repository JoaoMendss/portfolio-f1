import React, { useState, useEffect, useRef } from 'react';
import './index.css';

import Loader from './components/Loader/Loader';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import PitStop from './components/PitStop/PitStop';

function App() {
  const [loading, setLoading] = useState(true);
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    if (!cursor || !ring) return;

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let animId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animate();

    // Expand ring on hoverable elements
    const onEnter = () => ring.style.transform = 'translate(-50%, -50%) scale(1.8)';
    const onLeave = () => ring.style.transform = 'translate(-50%, -50%) scale(1)';
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <div className="cursor" ref={cursorRef} />
          <div className="cursor-ring" ref={cursorRingRef} />

          <Nav />

          <main>
            <Hero />
            <PitStop label="ENTERING DRIVER PROFILE" />
            <About />
            <PitStop label="TELEMETRY LOADING" />
            <Skills />
            <PitStop label="ENTERING THE GARAGE" />
            <Projects />
            <PitStop label="ACADEMY FILES" />
            <Education />
            <PitStop label="FINAL LAP — HEADING TO PODIUM" />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}

export default App;
