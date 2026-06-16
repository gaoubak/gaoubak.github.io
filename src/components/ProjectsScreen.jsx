import { projects } from '../data/projects'

export default function ProjectsScreen() {
  return (
    <div className="projects-screen">
      <div className="projects-screen-title">// INVENTORY · PROJETS</div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={`project-card project-card--${p.rarity}`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="project-card-header">
              <span className="project-card-icon">{p.icon}</span>
              <span className="project-card-name">{p.name}</span>
              <span className="project-card-period">{p.period}</span>
            </div>
            <div className="project-card-subtitle">{p.subtitle}</div>
            <p className="project-card-desc">{p.description}</p>
            <div className="project-card-tags">
              {p.tags.map((t) => (
                <span key={t} className="project-card-tag">{t}</span>
              ))}
            </div>
            <div className="project-card-rarity">{p.rarityLabel}</div>
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="project-card-github"
              >
                ◆ GITHUB [↗]
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
