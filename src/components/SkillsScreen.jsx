import { skillCategories } from '../data/skills'

export default function SkillsScreen() {
  return (
    <div className="skills-screen">
      <div className="skills-screen-title">// COLLECTIONS · COMPÉTENCES</div>
      <div className="skills-grid">
        {skillCategories.map((group, i) => (
          <div
            key={group.id}
            className={`skill-group skill-group--${group.rarity}`}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="skill-group-header">
              <span className="skill-group-icon">{group.icon}</span>
              <span className="skill-group-name">{group.name}</span>
            </div>
            <div className="skill-tags">
              {group.items.map((item) => (
                <span key={item} className="skill-tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
