import { cv } from '../../data/cv'
import { useInView } from '../../hooks/useInView'

export default function Contact() {
  const [ref, inView] = useInView()
  return (
    <section id="contact" style={{ padding: '96px clamp(20px, 5vw, 56px) 64px', borderTop: '1px solid var(--line)' }}>
      <div ref={ref} className={`reveal${inView ? ' in-view' : ''}`} style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 36px)', fontStyle: 'italic', color: 'var(--paper)' }}>
          Discutons de votre prochain projet
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, color: 'var(--paper-dim)', marginTop: 16 }}>
          {cv.contact.location}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 32 }}>
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
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 56, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-faint)', marginBottom: 8 }}>Formation</p>
            {cv.education.map((e) => (
              <p key={e.degree} style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--paper-dim)' }}>{e.degree} <span style={{ color: 'var(--paper-faint)' }}>· {e.period}</span></p>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-faint)', marginBottom: 8 }}>Langues</p>
            {cv.languages.map((l) => (
              <p key={l.name} style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--paper-dim)' }}>{l.name} <span style={{ color: 'var(--paper-faint)' }}>· {l.level}</span></p>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-faint)', marginBottom: 8 }}>Loisirs</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--paper-dim)' }}>{cv.hobbies.join(' · ')}</p>
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--paper-faint)', marginTop: 64 }}>
          © {new Date().getFullYear()} {cv.name}
        </p>
      </div>
    </section>
  )
}
