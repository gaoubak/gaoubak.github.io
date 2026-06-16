import { formations } from '../data/experience'

export default function AboutScreen() {
  return (
    <div className="about-screen">
      <div className="lore-card">
        <div className="lore-title">KADER BAKAYOKO</div>
        <div className="lore-subtitle">DÉVELOPPEUR FULL-STACK · PHP/SYMFONY · VUE.JS / REACT</div>
        <div className="lore-divider" />

        <p className="lore-text">
          Développeur Full-Stack avec <em>4 ans d'expérience</em> dans la conception
          d'applications web et d'APIs performantes. Maîtrise du backend{' '}
          <em>PHP/Symfony</em>, expérience en <em>Java/Spring Boot</em>,{' '}
          <em>Vue.js</em> et WordPress (thèmes &amp; plugins custom).
        </p>
        <p className="lore-text">
          À l'aise sur des projets construits <em>from scratch</em>, les intégrations
          tierces complexes et les architectures découplées. Curieux, autonome, habitué
          aux environnements <em>Agile</em> et à la collaboration avec les équipes métier.
        </p>
        <p className="lore-text">
          Passionné de basket (<em>New York Knicks</em>), de manga et de jeux vidéo —
          où j'ai appris ce que c'est que la patience.
        </p>

        <div className="lore-section-title">// FORMATION</div>
        {formations.map((f) => (
          <div key={f.degree} className="lore-formation-row">
            <div>
              <div className="lore-formation-name">{f.degree}</div>
              <div className="lore-formation-school">{f.school} · {f.location}</div>
            </div>
            <div className="lore-formation-period">{f.period}</div>
          </div>
        ))}

        <div className="lore-section-title" style={{ marginTop: '24px' }}>// LANGUES</div>
        <div className="lore-lang-row">
          <div className="lore-lang-item">
            <span className="lore-lang-name">FRANÇAIS</span>
            <span className="lore-lang-level">NATIF</span>
          </div>
          <div className="lore-lang-item">
            <span className="lore-lang-name">ANGLAIS</span>
            <span className="lore-lang-level">PROFESSIONNEL</span>
          </div>
        </div>
      </div>
    </div>
  )
}
