import { useState } from 'react'

export default function SlotCard({ item, side = 'left', isSkill = false }) {
  const [hovered, setHovered] = useState(false)
  const cls = `slot-card slot-card--${item.rarity}`

  const shortName = item.name
    .split(' ')
    .slice(0, 2)
    .join('\n')

  return (
    <div
      className={cls}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="slot-icon">{item.icon}</span>
      <span className="slot-name">{item.name.split(' ').slice(0, 3).join(' ')}</span>
      <span className="slot-dot" />

      {hovered && (
        <div className="slot-tooltip">
          <div className="tooltip-name">{item.name}</div>
          <div className="tooltip-sub">
            {isSkill ? item.items.join(' · ') : item.subtitle}
          </div>
          {!isSkill && (
            <>
              <p className="tooltip-desc">{item.description}</p>
              <div className="tooltip-tags">
                {item.tags.map((t) => (
                  <span key={t} className="tooltip-tag">{t}</span>
                ))}
              </div>
            </>
          )}
          {isSkill && (
            <div className="tooltip-tags">
              {item.items.map((t) => (
                <span key={t} className="tooltip-tag">{t}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
