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

// ─────────────────────────────────────────────
// FORMSPREE SETUP:
// 1. Acesse https://formspree.io e crie uma conta grátis
// 2. Crie um novo form — ele vai gerar um ID tipo "xpwzgkja"
// 3. Substitua SEU_FORM_ID abaixo pelo seu ID
// ─────────────────────────────────────────────
const FORMSPREE_ID = 'xkokpkwr';

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [copied, setCopied] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setSent(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const contacts = [
    {
      label: 'EMAIL',
      value: 'joaoluiizmendes@gmail.com',
      display: 'joaoluiizmendes@gmail.com',
      icon: '✉',
      copy: true,
    },
    {
      label: 'GITHUB',
      value: 'https://github.com/JoaoMendss',
      display: 'github.com/JoaoMendss',
      icon: '⌥',
      link: true,
    },
    {
      label: 'LINKEDIN',
      value: 'https://www.linkedin.com/in/joaolcmendes/',
      display: 'linkedin.com/in/joaolcmendes',
      icon: '◈',
      link: true,
    },
    {
      label: 'LOCATION',
      value: 'Telêmaco Borba, PR — Brazil',
      display: 'Telêmaco Borba, PR — Brazil',
      icon: '◎',
    },
  ];

  return (
    <section id="contact" className="contact section" ref={ref}>
      {inView && (
        <div className="contact__confetti" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="contact__confetti-piece"
              style={{
                '--x': `${Math.random() * 100}%`,
                '--delay': `${Math.random() * 3}s`,
                '--dur': `${2 + Math.random() * 3}s`,
                '--color': ['var(--red)', '#ffd700', 'white', '#ff6b35'][Math.floor(Math.random() * 4)],
                '--size': `${4 + Math.random() * 6}px`,
              }}
            />
          ))}
        </div>
      )}

      <div className="contact__container">
        <div className={`contact__podium ${inView ? 'contact__podium--visible' : ''}`}>
          <div className="contact__flag-row" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className={`contact__flag-square ${i % 2 === 0 ? 'contact__flag-square--white' : ''}`} />
            ))}
          </div>
          <div className="section-header">
            <span className="section-header__tag mono">SECTION 06 — FINAL LAP</span>
            <h2 className="section-header__title display">THE PODIUM</h2>
            <div className="section-header__line" />
          </div>
          <p className="contact__intro">
            Race finished. Ready to join your team. Whether it's an internship, freelance project,
            or a junior dev role — let's talk.
          </p>
        </div>

        <div className="contact__grid">
          <div className={`contact__info ${inView ? 'contact__info--visible' : ''}`}>
            <div className="contact__info-header mono">TEAM RADIO OPEN</div>

            {contacts.map((c, i) => (
              <div
                key={c.label}
                className="contact__item"
                style={{ transitionDelay: `${0.2 + i * 0.08}s`, opacity: inView ? 1 : 0 }}
              >
                <div className="contact__item-top">
                  <span className="contact__item-icon">{c.icon}</span>
                  <span className="contact__item-label mono">{c.label}</span>
                  {c.copy && (
                    <button className="contact__copy mono" onClick={() => handleCopy(c.value, c.label)}>
                      {copied === c.label ? 'COPIED ✓' : 'COPY'}
                    </button>
                  )}
                  {c.link && (
                    <a className="contact__copy mono" href={c.value} target="_blank" rel="noopener noreferrer">
                      VISIT ↗
                    </a>
                  )}
                </div>
                <div className="contact__item-value mono">{c.display}</div>
              </div>
            ))}

            <div className="contact__availability mono">
              <div className="contact__avail-dot" />
              <div>
                <div className="contact__avail-label">DRIVER STATUS</div>
                <div className="contact__avail-value">AVAILABLE FOR HIRE — Q2 2026</div>
              </div>
            </div>

            <div className="contact__podium-blocks">
              <div className="contact__podium-block contact__podium-block--2">
                <span className="display">2</span>
                <span className="mono">FREELANCE</span>
              </div>
              <div className="contact__podium-block contact__podium-block--1">
                <span className="display">1</span>
                <span className="mono">INTERNSHIP</span>
              </div>
              <div className="contact__podium-block contact__podium-block--3">
                <span className="display">3</span>
                <span className="mono">JR DEV</span>
              </div>
            </div>
          </div>

          <div className={`contact__form-wrap ${inView ? 'contact__form-wrap--visible' : ''}`}>
            <div className="contact__form-header mono">SEND TEAM MESSAGE</div>

            {sent ? (
              <div className="contact__sent">
                <div className="contact__sent-icon">🏆</div>
                <div className="contact__sent-title display">MESSAGE SENT!</div>
                <div className="contact__sent-sub mono">TEAM RADIO CONFIRMED — I'LL BE IN TOUCH</div>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__field">
                  <label className="contact__label mono">01 — YOUR NAME</label>
                  <input
                    className="contact__input mono"
                    type="text"
                    placeholder="DRIVER NAME"
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    required
                    disabled={sending}
                  />
                </div>
                <div className="contact__field">
                  <label className="contact__label mono">02 — EMAIL</label>
                  <input
                    className="contact__input mono"
                    type="email"
                    placeholder="TEAM@EMAIL.COM"
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    required
                    disabled={sending}
                  />
                </div>
                <div className="contact__field">
                  <label className="contact__label mono">03 — MESSAGE</label>
                  <textarea
                    className="contact__input contact__textarea mono"
                    placeholder="DESCRIBE YOUR RACE STRATEGY..."
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    rows={5}
                    required
                    disabled={sending}
                  />
                </div>

                {error && (
                  <div className="contact__error mono">
                    ⚠ TRANSMISSION FAILED — PLEASE TRY AGAIN
                  </div>
                )}

                <button type="submit" className="contact__submit" disabled={sending}>
                  <span className="mono">{sending ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}</span>
                  <div className={`contact__submit-light ${sending ? 'contact__submit-light--sending' : ''}`} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className={`contact__footer ${inView ? 'contact__footer--visible' : ''}`}>
          <div className="contact__footer-line" />
          <div className="contact__footer-content mono">
            <span>© 2026 JOÃO MENDES — FULL STACK DEVELOPER</span>
            <span className="contact__footer-sep">|</span>
            <span>TELÊMACO BORBA, BRAZIL</span>
            <span className="contact__footer-sep">|</span>
            <span style={{ color: 'var(--red)' }}>BUILT WITH REACT + PASSION FOR F1</span>
          </div>
          <div className="contact__footer-line" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
