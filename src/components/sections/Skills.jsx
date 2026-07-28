import { cv } from '../../data/cv'
import { useInView } from '../../hooks/useInView'

function SkillBar({ skill }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`reveal${inView ? ' in-view' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--paper-dim)' }}>{skill.label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brass)' }}>{skill.value}</span>
      </div>
      <div style={{ height: 1, background: 'var(--line)' }}>
        <div style={{ height: '100%', width: inView ? `${skill.value}%` : '0%', background: 'var(--brass)', transition: 'width 1s ease 0.15s' }} />
      </div>
    </div>
  )
}

const TIER_LABEL = { mastered: 'Maîtrisé', in_progress: 'En formation', planned: 'Prévu' }

function TechGroup({ tier, items }) {
  if (!items.length) return null
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-faint)', marginBottom: 10 }}>
        {TIER_LABEL[tier]}
      </p>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none' }}>
        {items.map((s) => (
          <li key={s.id} title={s.description} style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, color: tier === 'planned' ? 'var(--paper-faint)' : 'var(--paper)',
            border: '1px solid var(--line)', borderRadius: 2, padding: '5px 11px',
            opacity: tier === 'planned' ? 0.6 : 1,
          }}>
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  const [titleRef, titleInView] = useInView()
  const byTier = (t) => cv.techSkills.filter((s) => s.tier === t)

  return (
    <section id="competences" style={{ padding: '80px clamp(20px, 5vw, 56px)', maxWidth: 1040, margin: '0 auto' }}>
      <h2 ref={titleRef} className={`reveal${titleInView ? ' in-view' : ''}`} style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontStyle: 'italic', color: 'var(--paper)', marginBottom: 48 }}>
        Compétences
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28, marginBottom: 64 }}>
        {cv.skillCategories.map((cat) => (
          <div key={cat.id}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brass)', marginBottom: 12 }}>
              {cat.label}
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 6, listStyle: 'none' }}>
              {cat.tools.map((t) => (
                <li key={t} style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--paper-dim)' }}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(24px, 5vw, 72px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-faint)' }}>
            Savoir-être
          </p>
          {cv.softSkills.map((s) => <SkillBar key={s.id} skill={s} />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <TechGroup tier="mastered" items={byTier('mastered')} />
          <TechGroup tier="in_progress" items={byTier('in_progress')} />
          <TechGroup tier="planned" items={byTier('planned')} />
        </div>
      </div>
    </section>
  )
}
