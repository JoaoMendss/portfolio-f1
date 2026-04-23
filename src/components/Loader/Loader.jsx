import React, { useEffect, useState } from 'react';
import './style.css';

const Loader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0=dark, 1-5=lights on, 6=lights out, 7=done
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timings = [400, 800, 1200, 1600, 2000, 2600, 3200];
    const timeouts = timings.map((t, i) =>
      setTimeout(() => setPhase(i + 1), t)
    );
    const done = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 3800);
    return () => { timeouts.forEach(clearTimeout); clearTimeout(done); };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className={`loader ${phase >= 6 ? 'loader--out' : ''}`}>
      <div className="loader__scanline" />
      <div className="loader__content">
        <div className="loader__label mono">SYSTEM INITIALIZING</div>
        <div className="loader__lights">
          {[1, 2, 3, 4, 5].map(n => (
            <div
              key={n}
              className={`loader__light ${phase >= n && phase < 6 ? 'loader__light--on' : ''} ${phase >= 6 ? 'loader__light--out' : ''}`}
            >
              <div className="loader__light-inner" />
            </div>
          ))}
        </div>
        <div className="loader__status mono">
          {phase === 0 && 'WAITING...'}
          {phase >= 1 && phase < 6 && `LIGHT ${phase} — ARMED`}
          {phase === 6 && 'LIGHTS OUT — GO GO GO!'}
          {phase >= 7 && ''}
        </div>
        <div className="loader__bar">
          <div className="loader__bar-fill" style={{ width: `${Math.min(phase / 5 * 100, 100)}%` }} />
        </div>
        <div className="loader__name display">JOÃO MENDES</div>
        <div className="loader__subtitle mono">FULL STACK DEVELOPER / PORT.v2026</div>
      </div>
      <div className="loader__corner loader__corner--tl">
        <span className="mono">LAP 01 / 06</span>
      </div>
      <div className="loader__corner loader__corner--tr">
        <span className="mono">SYSTEM BOOT</span>
      </div>
      <div className="loader__corner loader__corner--bl">
        <span className="mono">CURITIBA — BR</span>
      </div>
      <div className="loader__corner loader__corner--br">
        <span className="mono">2026 SEASON</span>
      </div>
    </div>
  );
};

export default Loader;
