export default function HudBar({ activeTab, onTabChange, tabs }) {
  return (
    <header className="hud-bar">
      <div className="hud-left">
        <div className="hud-season-box">4</div>
        <div className="hud-rank">
          <span className="hud-rank-line1">
            <span className="blink">//</span> MASTER HETIC
          </span>
          <span className="hud-rank-line2">
            <span className="gold">◆</span> PHP/SYMFONY &nbsp;/&nbsp; <span className="gold">◆</span> VUE.JS &nbsp;/&nbsp; <span className="gold">≡</span> 4 ANS
          </span>
        </div>
      </div>

      <div className="hud-spacer" />

      <div className="hud-currencies">
        <div className="hud-currency hud-currency--gold">
          <span className="hud-currency-icon">◆</span>
          <span>PHP/SYMFONY</span>
        </div>
        <div className="hud-currency hud-currency--cyan">
          <span className="hud-currency-icon">⬡</span>
          <span>FULLSTACK</span>
        </div>
        <div className="hud-currency">
          <span className="hud-currency-icon">◎</span>
          <span>FREELANCE</span>
        </div>
      </div>

      <nav className="hud-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`hud-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="hud-actions">
        <a href="mailto:kader.bakayoko@yahoo.com" className="hud-icon-btn" title="Email">✉</a>
        <a
          href="https://www.linkedin.com/in/kader-bakayoko-341b53190/"
          target="_blank"
          rel="noreferrer"
          className="hud-icon-btn"
          title="LinkedIn"
        >
          in
        </a>
      </div>
    </header>
  )
}
