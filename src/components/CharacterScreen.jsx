import { projects } from '../data/projects'
import { skillCategories, stats } from '../data/skills'
import SlotCard from './SlotCard'
import StatBar from './StatBar'
import CharacterCanvas from './CharacterCanvas'

export default function CharacterScreen() {
  return (
    <div className="character-screen">

      {/* Three.js canvas — fills entire area, transparent bg */}
      <CharacterCanvas />

      {/* Name banner — SAVIOR-style */}
      <div className="name-banner">
        <span className="char-name">KADER BAKAYOKO</span>
        <span className="char-title">DÉVELOPPEUR FULL-STACK</span>
      </div>

      {/* LEFT — project weapon slots */}
      <div className="panel-left">
        {projects.map((p) => (
          <SlotCard key={p.id} item={p} side="left" />
        ))}
      </div>

      {/* POWER + STATS — right of character */}
      <div className="panel-stats">
        <div className="power-display">
          <span className="power-label">POWER</span>
          <span className="power-value">
            <span className="power-diamond">◆ </span>4
          </span>
          <span className="power-unit">ANS XP</span>
        </div>
        <div className="stats-sep" />
        {stats.map((s) => (
          <StatBar key={s.name} stat={s} />
        ))}
      </div>

      {/* RIGHT — skill armor slots */}
      <div className="panel-right">
        {skillCategories.map((s) => (
          <SlotCard key={s.id} item={s} side="right" isSkill />
        ))}
      </div>
    </div>
  )
}
