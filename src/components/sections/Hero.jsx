import { cv } from '../../data/cv'
import { useInView } from '../../hooks/useInView'

const STARS = [
  [40, 60], [140, 30], [260, 90], [360, 40], [90, 160],
  [220, 190], [320, 150], [180, 110], [50, 220],
]
const LINES = [[0,1],[1,2],[2,3],[1,7],[7,5],[5,6],[4,7],[4,8]]

function Constellation() {
  return (
    <svg viewBox="0 0 400 260" style={{ position: 'absolute', top: 0, right: 0, width: 'min(46vw, 460px)', height: 'auto', opacity: 0.5, pointerEvents: 'none' }}>
      {LINES.map(([a, b], i) => (
        <line key={i} x1={STARS[a][0]} y1={STARS[a][1]} x2={STARS[b][0]} y2={STARS[b][1]} stroke="var(--paper-faint)" strokeWidth="1" />
      ))}
      {STARS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.2 : 1.3} fill="var(--brass)" opacity={i % 3 === 0 ? 0.9 : 0.55} />
      ))}
    </svg>
  )
}

export default function Hero() {
  const [ref, inView] = useInView()

  return (
    <section id="profil" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(64px, 12vh, 140px) clamp(20px, 5vw, 56px) clamp(48px, 8vh, 96px)' }}>
      <Constellation />
      <div ref={ref} className={`reveal${inView ? ' in-view' : ''}`} style={{ maxWidth: 760, position: 'relative' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--brass)', marginBottom: 18 }}>
          {cv.role}
        </p>
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', lineHeight: 1.04, color: 'var(--paper)', fontStyle: 'italic', fontWeight: 480 }}>
          {cv.name}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.6vw, 19px)', lineHeight: 1.7, color: 'var(--paper-dim)', marginTop: 24, maxWidth: '62ch' }}>
          {cv.tagline}
        </p>

        {/* availability */}
        <div style={{ marginTop: 34, maxWidth: 360 }}>
          <div style={{ height: 1, background: 'var(--line)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${cv.availability.percent}%`, background: 'var(--brass)' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--paper-faint)', textTransform: 'uppercase', marginTop: 8 }}>
            {cv.availability.label}
          </p>
        </div>

        {/* differentiators */}
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 32, listStyle: 'none' }}>
          {cv.differentiators.map((d) => (
            <li key={d} style={{
              fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.03em',
              color: 'var(--paper-dim)', border: '1px solid var(--line)', borderRadius: 2,
              padding: '6px 12px',
            }}>
              {d}
            </li>
          ))}
        </ul>

        {/* actions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 40 }}>
          <a href={`mailto:${cv.contact.email}`} style={{
            fontFamily: 'var(--font-mono)', fontSize: 12.5, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--ink)', background: 'var(--brass)', padding: '12px 22px',
          }}>
            {cv.contact.email}
          </a>
          <a href={cv.contact.linkedin} target="_blank" rel="noreferrer" style={{
            fontFamily: 'var(--font-mono)', fontSize: 12.5, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--paper)', border: '1px solid var(--line)', padding: '12px 22px',
          }}>
            LinkedIn
          </a>
          <a href={cv.contact.cvUrl} download style={{
            fontFamily: 'var(--font-mono)', fontSize: 12.5, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--paper)', border: '1px solid var(--line)', padding: '12px 22px',
          }}>
            ↓ CV (PDF)
          </a>
        </div>
      </div>
    </section>
  )
}
