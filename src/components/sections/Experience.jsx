import { cv } from '../../data/cv'
import { useInView } from '../../hooks/useInView'

function ExperienceItem({ item }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`reveal${inView ? ' in-view' : ''}`} style={{
      display: 'grid', gridTemplateColumns: '160px 1fr', gap: 'clamp(16px, 3vw, 40px)',
      padding: '30px 0', borderTop: '1px solid var(--line)',
    }}>
      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brass)', letterSpacing: '0.04em' }}>{item.period}</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--paper-faint)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>
          {item.kind === 'job' ? 'Poste' : 'Projet personnel'}
        </p>
      </div>
      <div>
        <h3 style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', color: 'var(--paper)', fontWeight: 500 }}>
          {item.company}
        </h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-dim)', marginTop: 4, letterSpacing: '0.02em' }}>
          {item.role}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, lineHeight: 1.7, color: 'var(--paper-dim)', marginTop: 14, maxWidth: '58ch' }}>
          {item.summary}
        </p>
        <ul style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {item.highlights.map((h, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--paper-dim)' }}>
              <span style={{ color: 'var(--brass)', flexShrink: 0 }}>—</span>{h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Experience() {
  const [titleRef, titleInView] = useInView()
  return (
    <section id="experience" style={{ padding: '80px clamp(20px, 5vw, 56px)', maxWidth: 920, margin: '0 auto' }}>
      <h2 ref={titleRef} className={`reveal${titleInView ? ' in-view' : ''}`} style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontStyle: 'italic', color: 'var(--paper)' }}>
        Expérience &amp; Projets
      </h2>
      <div>
        {cv.experience.map((item) => <ExperienceItem key={item.id} item={item} />)}
      </div>
    </section>
  )
}
