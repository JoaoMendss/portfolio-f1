import React from 'react';
import './style.css';

const PitStop = ({ label = 'PIT STOP' }) => {
  return (
    <div className="pitstop">
      <div className="pitstop__track">
        <div className="pitstop__line" />
        <div className="pitstop__car">
          <svg viewBox="0 0 80 28" fill="none">
            <path d="M8 20 L14 8 L56 8 L68 14 L72 20 Z" fill="#E8002D" opacity="0.9"/>
            <path d="M14 8 L20 4 L54 4 L56 8 Z" fill="#cc0022"/>
            <circle cx="18" cy="21" r="5" fill="#222" stroke="#555" strokeWidth="1.5"/>
            <circle cx="62" cy="21" r="5" fill="#222" stroke="#555" strokeWidth="1.5"/>
            <path d="M30 8 L30 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
          </svg>
        </div>
        <div className="pitstop__label mono">{label}</div>
      </div>
      <div className="pitstop__sparks">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="pitstop__spark" style={{ '--i': i }} />
        ))}
      </div>
    </div>
  );
};

export default PitStop;
