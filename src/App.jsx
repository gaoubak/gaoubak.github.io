import { useState } from 'react'
import HudBar from './components/HudBar'
import CharacterScreen from './components/CharacterScreen'
import AboutScreen from './components/AboutScreen'
import SkillsScreen from './components/SkillsScreen'
import ExperienceScreen from './components/ExperienceScreen'
import ProjectsScreen from './components/ProjectsScreen'

const TABS = ['ABOUT', 'SKILLS', 'EXPERIENCE', 'CHARACTER', 'PROJECTS']

function renderScreen(tab) {
  switch (tab) {
    case 'ABOUT':      return <AboutScreen />
    case 'SKILLS':     return <SkillsScreen />
    case 'EXPERIENCE': return <ExperienceScreen />
    case 'PROJECTS':   return <ProjectsScreen />
    default:           return <CharacterScreen />
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('CHARACTER')

  return (
    <div className="app">
      <HudBar activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} />
      <main className="main-content">
        <div className="screen" key={activeTab}>
          {renderScreen(activeTab)}
        </div>
      </main>
      <footer className="action-bar">
        <a href="mailto:kader.bakayoko@yahoo.com" className="action-btn">
          <span className="action-key">[✉]</span> CONTACT
        </a>
        <a href="/Kader_Bakayoko_CV.pdf" target="_blank" rel="noreferrer" className="action-btn">
          <span className="action-key">[↓]</span> CV
        </a>
        <div className="action-spacer" />
        <a
          href="https://www.linkedin.com/in/kader-bakayoko-341b53190/"
          target="_blank"
          rel="noreferrer"
          className="action-btn action-btn--secondary"
        >
          LINKEDIN <span className="action-key">[↗]</span>
        </a>
      </footer>
    </div>
  )
}
