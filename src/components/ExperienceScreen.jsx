import { experiences } from '../data/experience'

export default function ExperienceScreen() {
  return (
    <div className="experience-screen">
      <div className="experience-screen-title">// TRIUMPHS · PARCOURS</div>
      {experiences.map((exp, i) => (
        <div
          key={exp.id}
          className={`triumph-card triumph-card--${exp.rarity}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="triumph-header">
            <div className="triumph-title-block">
              <span className="triumph-title">{exp.title}</span>
              <span className="triumph-type-badge">{exp.type}</span>
            </div>
            <span className="triumph-period">{exp.period}</span>
          </div>
          <div className="triumph-company">{exp.company} · {exp.location}</div>
          <p className="triumph-desc">{exp.description}</p>
          <ul className="triumph-list">
            {exp.triumphs.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
