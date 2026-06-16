export default function AvatarCenter() {
  return (
    <div className="panel-center">
      <div className="power-display">
        <span className="power-label">◆ EXP</span>
        <span className="power-value">4</span>
        <span className="power-unit">ANS</span>
      </div>

      <div className="avatar-wrapper">
        <div className="avatar-ring" />
        <div className="avatar-ring" />
        <div className="avatar-ring" />
        <div className="avatar-glow" />
        <div className="avatar-diamond-outer">
          <span className="avatar-initials">KB</span>
        </div>
      </div>

      <div className="name-banner">
        <span className="char-name">KADER BAKAYOKO</span>
        <span className="char-title">DÉVELOPPEUR FULL-STACK</span>
      </div>
    </div>
  )
}
