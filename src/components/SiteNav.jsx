const LINKS = [
  ['#profil', 'Profil'],
  ['#experience', 'Expérience'],
  ['#competences', 'Compétences'],
  ['#univers', 'Univers'],
  ['#contact', 'Contact'],
]

export default function SiteNav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px clamp(20px, 5vw, 56px)',
      background: 'rgba(10,13,26,0.82)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--line)',
    }}>
      <a href="#profil" style={{ fontFamily: 'var(--font-display)', fontSize: 17, letterSpacing: '0.02em', color: 'var(--paper)' }}>
        K. Bakayoko
      </a>
      <nav style={{ display: 'flex', gap: 'clamp(14px, 3vw, 30px)' }}>
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em',
            color: 'var(--paper-dim)', textTransform: 'uppercase',
          }}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
