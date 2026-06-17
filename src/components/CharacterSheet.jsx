import { useState, useEffect, useRef } from 'react'
import { characterSheetData as D } from '../data/characterSheet'

// ─── Palette constants (mirrors tailwind d2-* colors) ─────────────
const P = {
  bg:      '#0b0b10',
  surface: 'rgba(20,20,26,0.85)',
  crimson: '#3a1418',
  red:     '#8a3a3f',
  teal:    '#2fe6d8',
  magenta: '#e91e8c',
  gold:    '#f2c14e',
  blue:    '#4a90d9',
  purple:  '#9632c8',
  gray:    '#4a4a5a',
  muted:   '#8a8a9a',
  text:    '#e8e8e8',
}

const RARITY_COLOR = { gold: P.gold, blue: P.blue, purple: P.purple, gray: P.gray }

// ─── Avatar SVG — original flat geometric silhouette ──────────────
function AvatarSVG() {
  return (
    <svg viewBox="0 0 200 380" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ag" cx="50%" cy="45%" r="55%">
          <stop offset="0%"   stopColor="#e91e8c" stopOpacity="0.14"/>
          <stop offset="100%" stopColor="#e91e8c" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="cg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#e91e8c" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#e91e8c" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="clk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#1d1d38"/>
          <stop offset="100%" stopColor="#0e0e1e"/>
        </linearGradient>
        <linearGradient id="hd" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#232342"/>
          <stop offset="100%" stopColor="#141428"/>
        </linearGradient>
        <linearGradient id="sp" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#282848"/>
          <stop offset="100%" stopColor="#1a1a32"/>
        </linearGradient>
      </defs>

      {/* ambient glow behind figure */}
      <ellipse cx="100" cy="185" rx="92" ry="135" fill="url(#ag)"/>

      {/* ── Cloak ── */}
      <path d="M32 150 Q18 265 12 380 L188 380 Q182 265 168 150 Z" fill="url(#clk)"/>

      {/* cloak seam lines */}
      <path d="M100 158 L82 380"  stroke="#242450" strokeWidth="1.2" opacity="0.55"/>
      <path d="M100 158 L118 380" stroke="#242450" strokeWidth="1.2" opacity="0.55"/>
      <path d="M78 222 L58 380"   stroke="#242450" strokeWidth="0.6" opacity="0.3"/>
      <path d="M122 222 L142 380" stroke="#242450" strokeWidth="0.6" opacity="0.3"/>

      {/* fabric creases */}
      <path d="M30 238 Q100 246 170 238" stroke="#242450" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M26 300 Q100 307 174 300" stroke="#242450" strokeWidth="0.6" fill="none" opacity="0.3"/>

      {/* ── Shoulder pauldrons ── */}
      <polygon points="10,150 48,132 58,155 24,160" fill="url(#sp)"/>
      <line x1="10" y1="154" x2="48" y2="136" stroke={P.gold} strokeWidth="1" opacity="0.4"/>
      <line x1="24" y1="160" x2="58" y2="155" stroke="#252550" strokeWidth="0.8" opacity="0.6"/>

      <polygon points="190,150 152,132 142,155 176,160" fill="url(#sp)"/>
      <line x1="190" y1="154" x2="152" y2="136" stroke={P.gold} strokeWidth="1" opacity="0.4"/>
      <line x1="176" y1="160" x2="142" y2="155" stroke="#252550" strokeWidth="0.8" opacity="0.6"/>

      {/* ── Chest armor plate ── */}
      <path d="M52 150 L148 150 L156 198 L44 198 Z" fill="#18183a"/>
      <line x1="100" y1="150" x2="100" y2="198" stroke="#2a2a56" strokeWidth="1.5" opacity="0.7"/>
      <line x1="46"  y1="172" x2="154" y2="172" stroke="#2a2a56" strokeWidth="0.8" opacity="0.5"/>

      {/* chest core gem */}
      <circle cx="100" cy="170" r="11"  fill="#08081a"/>
      <circle cx="100" cy="170" r="9"   fill="url(#cg)"/>
      <circle cx="100" cy="170" r="5"   fill="#e91e8c" opacity="0.65"/>
      <circle cx="100" cy="170" r="2.5" fill={P.gold}  opacity="0.9"/>

      {/* ── Belt ── */}
      <rect x="56"  y="200" width="88" height="14" rx="3" fill="#1c1c3e"/>
      <rect x="86"  y="198" width="28" height="18" rx="3" fill="#242448"/>
      <rect x="93"  y="203" width="14" height="8"  rx="1" fill={P.gold}  opacity="0.22"/>

      {/* ── Collar ── */}
      <path d="M80 150 L120 150 L116 120 L84 120 Z" fill="#1a1a3a"/>

      {/* ── Hood outer ── */}
      <path d="M24 90 Q100 4 176 90 Q192 132 182 154 L18 154 Q8 132 24 90 Z" fill="url(#hd)"/>

      {/* hood trim */}
      <path d="M26 92 Q100 10 174 92" stroke={P.gold} strokeWidth="1.5" fill="none" opacity="0.32"/>

      {/* side fold lines */}
      <path d="M24 90 Q15 118 18 152" stroke="#26265a" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <path d="M176 90 Q185 118 182 152" stroke="#26265a" strokeWidth="0.8" fill="none" opacity="0.6"/>

      {/* inner fold */}
      <path d="M68 94 Q100 80 132 94" stroke="#2a2a5a" strokeWidth="0.7" fill="none" opacity="0.5"/>

      {/* ── Face void ── */}
      <ellipse cx="100" cy="115" rx="44" ry="52" fill="#04040c"/>
      <ellipse cx="100" cy="119" rx="32" ry="40" fill="#020208"/>

      {/* subtle inner shadow */}
      <ellipse cx="100" cy="112" rx="36" ry="44" fill="none" stroke="#0a0a20" strokeWidth="4" opacity="0.5"/>

      {/* ── Class glyph on chest (small, decorative) ── */}
      <polygon points="100,157 107,168 93,168" fill={P.gold} opacity="0.18"/>
    </svg>
  )
}

// ─── Inline SVG icons — original geometric designs ────────────────
const ICONS = {
  kinetic: (c) => (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none">
      <polygon points="14,3 25,9 25,19 14,25 3,19 3,9" stroke={c} strokeWidth="1.4" fill={c+'18'}/>
      <line x1="14" y1="3" x2="14" y2="25" stroke={c} strokeWidth="0.7" opacity="0.4"/>
      <circle cx="14" cy="14" r="4" fill={c} opacity="0.5"/>
    </svg>
  ),
  energy: (c) => (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none">
      <circle cx="14" cy="14" r="10"  stroke={c} strokeWidth="1.4" fill="none"/>
      <ellipse cx="14" cy="14" rx="5"  ry="10" stroke={c} strokeWidth="0.9" fill="none" opacity="0.6"/>
      <ellipse cx="14" cy="14" rx="10" ry="3.5" stroke={c} strokeWidth="0.9" fill="none" opacity="0.6"/>
      <circle cx="14" cy="14" r="2.5"  fill={c} opacity="0.85"/>
    </svg>
  ),
  heavy: (c) => (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none">
      <rect x="4"  y="9"  width="20" height="10" rx="2" stroke={c} strokeWidth="1.2" fill={c+'14'}/>
      <rect x="4"  y="13" width="20" height="3.5" stroke={c} strokeWidth="0.4" fill={c+'20'}/>
      {[7,12,17,22].map(x => <line key={x} x1={x} y1="9" x2={x} y2="19" stroke={c} strokeWidth="0.6" opacity="0.5"/>)}
      <rect x="12" y="5" width="4" height="4" rx="1" stroke={c} strokeWidth="0.9" fill="none"/>
    </svg>
  ),
  helmet: (c) => (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none">
      <path d="M6 19 Q6 9 14 7 Q22 9 22 19 L20 23 L8 23 Z" stroke={c} strokeWidth="1.3" fill={c+'12'}/>
      <line x1="8" y1="17" x2="20" y2="17" stroke={c} strokeWidth="0.7" opacity="0.5"/>
      <rect x="10" y="14" width="8" height="4" rx="1" fill={c+'28'}/>
    </svg>
  ),
  arms: (c) => (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none">
      <path d="M7 7 L7 21"  stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M7 12 L17 8" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M7 17 L19 21" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="19" cy="8"  r="2" fill={c} opacity="0.5"/>
      <circle cx="21" cy="21" r="2" fill={c} opacity="0.5"/>
    </svg>
  ),
  chest: (c) => (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none">
      <rect x="6" y="6" width="16" height="16" rx="2" stroke={c} strokeWidth="1.3" fill={c+'12'}/>
      <polyline points="10,14 13,17 18,11" stroke="#2fe6d8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  legs: (c) => (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none">
      <path d="M9 6 L9 20 L12 26"  stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M19 6 L19 20 L16 26" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <line x1="9" y1="14" x2="19" y2="14" stroke={c} strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  class: (c) => (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none">
      <polygon points="14,5 24,20 4,20"  stroke={c} strokeWidth="1.4" fill={c+'14'}/>
      <polygon points="14,10 20,18 8,18" stroke={c} strokeWidth="0.7" fill={c+'10'}/>
    </svg>
  ),
  // Skill icons
  php: (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <rect x="3" y="9" width="22" height="10" rx="3" stroke={c} strokeWidth="1.2" fill={c+'10'}/>
      <text x="5.5" y="18" fontFamily="Rajdhani,sans-serif" fontSize="9" fill={c} fontWeight="700" letterSpacing="0.5">PHP</text>
    </svg>
  ),
  symfony: (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <path d="M14 4 Q22 4 22 11 Q22 16 16 16 Q10 16 10 20 Q10 24 14 24" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="14" cy="4" r="1.8" fill={c} opacity="0.8"/>
    </svg>
  ),
  react: (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <ellipse cx="14" cy="14" rx="10" ry="4"  stroke={c} strokeWidth="1.1" fill="none"/>
      <ellipse cx="14" cy="14" rx="10" ry="4"  stroke={c} strokeWidth="1.1" fill="none" transform="rotate(60  14 14)"/>
      <ellipse cx="14" cy="14" rx="10" ry="4"  stroke={c} strokeWidth="1.1" fill="none" transform="rotate(120 14 14)"/>
      <circle  cx="14" cy="14" r="2.2" fill={c}/>
    </svg>
  ),
  vue: (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <polygon points="14,21 3,5 8,5 14,15 20,5 25,5" stroke={c} strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
      <polygon points="14,15 9,8 19,8" stroke={c} strokeWidth="0.8" fill="none" strokeLinejoin="round" opacity="0.7"/>
    </svg>
  ),
  'api-platform': (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <rect x="3" y="8" width="22" height="12" rx="2" stroke={c} strokeWidth="1.2" fill={c+'10'}/>
      {[7,11,15,19].map(x => <line key={x} x1={x} y1="11" x2={x} y2="17" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>)}
      <path d="M7 8 L7 5 M21 8 L21 5" stroke={c} strokeWidth="0.9" strokeDasharray="1.5,1.5"/>
    </svg>
  ),
  docker: (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <rect x="3" y="14" width="22" height="8" rx="2" stroke={c} strokeWidth="1.2" fill={c+'10'}/>
      {[4,8.5,13,17.5].map(x => <rect key={x} x={x} y="9" width="3.5" height="5" rx="0.5" stroke={c} strokeWidth="0.8" fill="none"/>)}
      {[7,11.5].map(x => <rect key={x} x={x} y="4" width="3.5" height="5" rx="0.5" stroke={c} strokeWidth="0.8" fill="none"/>)}
    </svg>
  ),
  'github-actions': (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <circle cx="6"  cy="8"  r="2.8" stroke={c} strokeWidth="1.2" fill="none"/>
      <circle cx="22" cy="8"  r="2.8" stroke={c} strokeWidth="1.2" fill="none"/>
      <circle cx="14" cy="20" r="2.8" stroke={c} strokeWidth="1.2" fill="none"/>
      <path d="M8.8 8 L19.2 8 M6 10.8 L14 17.2 M22 10.8 L14 17.2" stroke={c} strokeWidth="1"/>
    </svg>
  ),
  'react-native': (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <ellipse cx="14" cy="12" rx="9" ry="3.5" stroke={c} strokeWidth="1.1" fill="none"/>
      <ellipse cx="14" cy="12" rx="9" ry="3.5" stroke={c} strokeWidth="1.1" fill="none" transform="rotate(60  14 12)"/>
      <ellipse cx="14" cy="12" rx="9" ry="3.5" stroke={c} strokeWidth="1.1" fill="none" transform="rotate(120 14 12)"/>
      <circle  cx="14" cy="12" r="2"   fill={c}/>
      <rect x="12" y="22" width="4" height="3" rx="0.5" stroke={c} strokeWidth="0.8" fill="none"/>
    </svg>
  ),
  java: (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <path d="M12 4 Q12 13 16 13 Q21 13 21 17 Q21 22 14 23" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M8 20 Q10 24 14 23 Q18 22 20 19"  stroke={c} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.65"/>
    </svg>
  ),
  'spring-boot': (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <path d="M14 4 Q22 4 22 13 Q22 22 14 22 Q7 22 5 16 Q5 9 14 4 Z" stroke={c} strokeWidth="1.2" fill={c+'10'}/>
      <polyline points="10,13 13,16 19,10" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  nextjs: (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <circle cx="14" cy="14" r="10" stroke={c} strokeWidth="1.2" fill="none"/>
      <path d="M10 9 L10 19 M10 9 L20 19" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  kubernetes: (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <polygon points="14,3 23,8 23,20 14,25 5,20 5,8" stroke={c} strokeWidth="1.2" fill="none"/>
      <circle cx="14" cy="14" r="3.5" stroke={c} strokeWidth="1" fill="none"/>
      {[0,60,120,180,240,300].map(d => {
        const r = Math.PI * d / 180
        return <line key={d} x1="14" y1="14" x2={14 + 6 * Math.cos(r)} y2={14 + 6 * Math.sin(r)} stroke={c} strokeWidth="0.7" opacity="0.6"/>
      })}
    </svg>
  ),
  ghost: (c) => (
    <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
      <path d="M14 4 Q20 4 20 11 Q20 18 14 24 Q8 18 8 11 Q8 4 14 4 Z" stroke={c} strokeWidth="1.2" fill={c+'10'}/>
      <circle cx="14" cy="13" r="4"   stroke={c} strokeWidth="0.8" fill="none"/>
      <circle cx="14" cy="13" r="1.5" fill={c} opacity="0.6"/>
    </svg>
  ),
}

// ─── Equipment tile ────────────────────────────────────────────────
function EquipSlot({ item, side = 'right' }) {
  const [hovered, setHovered] = useState(false)
  const color  = RARITY_COLOR[item.rarity] || P.gray
  const Icon   = ICONS[item.slot]

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div
        style={{
          width: 64, height: 64,
          background: P.surface,
          border: `2px solid ${color}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
          cursor: 'pointer',
          transition: 'transform 0.15s, box-shadow 0.15s',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          boxShadow: hovered ? `0 0 18px ${color}44` : 'none',
        }}
      >
        {Icon ? Icon(color) : <div style={{ width: 24, height: 24, border: `1px solid ${color}`, borderRadius: 2, opacity: 0.4 }}/>}
        <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'center', lineHeight: 1 }}>
          {item.slot}
        </span>
      </div>

      {hovered && (
        <div style={{
          position: 'absolute',
          [side === 'right' ? 'left' : 'right']: '100%',
          [side === 'right' ? 'marginLeft' : 'marginRight']: 8,
          ...(side === 'right' ? { left: '100%', marginLeft: 8 } : { right: '100%', marginRight: 8 }),
          top: 0, zIndex: 60,
          width: 210,
          background: 'rgba(10,10,18,0.96)',
          border: `1px solid rgba(255,255,255,0.08)`,
          borderLeft: side === 'right' ? `2px solid ${color}` : undefined,
          borderRight: side === 'left'  ? `2px solid ${color}` : undefined,
          borderRadius: 4,
          padding: '10px 12px',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        }}>
          <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</div>
          <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 9, color: P.teal, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>{item.sublabel}</div>
          <div style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 11, color: P.muted, marginTop: 7, lineHeight: 1.55 }}>{item.description}</div>
        </div>
      )}
    </div>
  )
}

// ─── Animated stat bar ─────────────────────────────────────────────
function StatBar({ stat, delay = 0 }) {
  const [filled, setFilled]   = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setFilled(true), delay) },
      { threshold: 0.4 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex justify-between items-center mb-1">
        <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 10, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {stat.label}
        </span>
        <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 12, color: P.gold, fontWeight: 700 }}>
          {stat.value}
        </span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: filled ? `${stat.value}%` : '0%',
          background: `linear-gradient(90deg, ${P.teal}, ${P.gold})`,
          borderRadius: 2,
          transition: 'width 0.85s cubic-bezier(0.4,0,0.2,1)',
        }}/>
      </div>

      {hovered && (
        <div style={{
          position: 'absolute', right: 0, bottom: '110%', zIndex: 50,
          background: 'rgba(10,10,18,0.96)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 4, padding: '6px 10px',
          whiteSpace: 'nowrap',
          fontFamily: 'Inter,system-ui,sans-serif', fontSize: 11, color: P.muted,
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}>
          {stat.description}
        </div>
      )}
    </div>
  )
}

// ─── Power level count-up ──────────────────────────────────────────
function PowerLevel({ production, growth }) {
  const [count, setCount] = useState(0)
  const total = production + growth

  useEffect(() => {
    let n = 0
    const step = Math.max(1, Math.ceil(total / 36))
    const iv = setInterval(() => {
      n = Math.min(n + step, total)
      setCount(n)
      if (n >= total) clearInterval(iv)
    }, 42)
    return () => clearInterval(iv)
  }, [total])

  return (
    <div className="text-center">
      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 10, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 2 }}>
        Power
      </div>
      <div className="flex items-center justify-center gap-1">
        <span style={{ color: P.gold, fontSize: 13 }}>◆</span>
        <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 46, color: P.gold, fontWeight: 700, lineHeight: 1, minWidth: 54, textAlign: 'right' }}>
          {count}
        </span>
      </div>
      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 9, color: P.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2 }}>
        Months XP
      </div>
      <div style={{ marginTop: 8, fontFamily: '"Share Tech Mono",monospace', fontSize: 9 }}>
        <div style={{ color: P.muted }}>Prod <span style={{ color: P.teal }}>{production}</span></div>
        <div style={{ color: P.muted }}>Growth +<span style={{ color: P.purple }}>{growth}</span></div>
      </div>
    </div>
  )
}

// ─── Rank badge ────────────────────────────────────────────────────
function RankBadge() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: 66, height: 66 }}>
        <svg viewBox="0 0 66 66" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <linearGradient id="rring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#e91e8c"/>
              <stop offset="100%" stopColor="#9632c8"/>
            </linearGradient>
          </defs>
          <circle cx="33" cy="33" r="30" stroke="url(#rring)" strokeWidth="2.5" fill="rgba(14,14,22,0.92)"/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 8, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.3, textAlign: 'center' }}>
            Alternant<br/>→ Fullstack<br/>Eng. '26
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Subclass icon ─────────────────────────────────────────────────
function SubclassIcon() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 82, height: 82 }}>
      <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.22) 0%, transparent 70%)' }}/>
      <div style={{
        width: 82, height: 82, borderRadius: '50%',
        background: 'rgba(16,16,28,0.95)',
        border: `2px solid ${P.magenta}`,
        boxShadow: `0 0 22px rgba(233,30,140,0.28)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
      }}>
        <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
          <polygon points="16,4 28,11 28,21 16,28 4,21 4,11" stroke={P.magenta} strokeWidth="1.4" fill={P.magenta+'18'}/>
          <polygon points="16,9 23,13 23,19 16,23 9,19 9,13" stroke={P.magenta} strokeWidth="0.8" fill={P.magenta+'10'} opacity="0.7"/>
          <circle cx="16" cy="16" r="3.5" fill={P.magenta} opacity="0.65"/>
        </svg>
        <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7.5, color: P.magenta, textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'center', lineHeight: 1 }}>
          Fullstack
        </span>
      </div>
      {/* training badge */}
      <div style={{
        position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        background: 'rgba(14,14,22,0.95)',
        border: `1px solid rgba(150,50,200,0.4)`,
        borderRadius: 2, padding: '2px 7px',
        fontFamily: 'Rajdhani,sans-serif', fontSize: 8, color: P.purple,
        textTransform: 'uppercase', letterSpacing: '0.07em',
      }}>
        + Java / Spring
      </div>
    </div>
  )
}

// ─── Ghost / motto slot ────────────────────────────────────────────
function GhostSlot() {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{
        width: 64, height: 64,
        background: 'rgba(12,12,20,0.7)',
        border: `1px dashed rgba(150,50,200,0.35)`,
        borderRadius: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
        cursor: 'default',
      }}>
        {ICONS.ghost(P.purple)}
        <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7.5, color: P.purple, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2 }}>
          {D.motto.text}
        </span>
      </div>
      {hovered && (
        <div style={{
          position: 'absolute', left: '100%', marginLeft: 8, top: 0, zIndex: 50,
          width: 180, background: 'rgba(10,10,18,0.96)',
          border: `1px solid rgba(150,50,200,0.3)`,
          borderLeft: `2px solid ${P.purple}`,
          borderRadius: 4, padding: '8px 12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}>
          <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: P.purple, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{D.motto.text}</div>
          <div style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 11, color: P.muted, marginTop: 4, lineHeight: 1.5 }}>{D.motto.note}</div>
        </div>
      )}
    </div>
  )
}

// ─── Status badge ──────────────────────────────────────────────────
function StatusBadge({ text }) {
  return (
    <div className="inline-flex items-center gap-1.5" style={{
      background: 'rgba(47,230,216,0.07)',
      border: '1px solid rgba(47,230,216,0.22)',
      borderRadius: 2, padding: '3px 8px',
      fontFamily: 'Rajdhani,sans-serif', fontSize: 9.5, color: P.teal,
      textTransform: 'uppercase', letterSpacing: '0.1em',
    }}>
      <div style={{ width: 4, height: 4, borderRadius: '50%', background: P.teal, flexShrink: 0 }}/>
      {text}
    </div>
  )
}

// ─── Skill tile ────────────────────────────────────────────────────
const TIER = {
  mastered:    { border: P.gold,    label: P.text,  badge: 'Mastered',    dotColor: P.gold,  pulse: false, dim: false },
  in_progress: { border: P.teal,   label: P.teal,  badge: 'In Progress', dotColor: P.teal,  pulse: true,  dim: false },
  locked:      { border: '#2a2a38', label: P.gray,  badge: null,          dotColor: null,    pulse: false, dim: true  },
}

function SkillTile({ skill }) {
  const [hovered, setHovered] = useState(false)
  const t     = TIER[skill.tier]
  const Icon  = ICONS[skill.id]
  const iColor = skill.tier === 'mastered' ? P.gold : skill.tier === 'in_progress' ? P.teal : '#333'

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div
        className={skill.tier === 'in_progress' ? 'animate-tile-pulse' : ''}
        style={{
          width: 54, height: 54,
          background: skill.tier === 'locked' ? 'rgba(14,14,20,0.5)' : P.surface,
          border: `2px solid ${t.border}`,
          borderStyle: skill.tier === 'locked' ? 'dashed' : 'solid',
          borderRadius: 4,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
          cursor: skill.tier === 'locked' ? 'default' : 'pointer',
          opacity: skill.tier === 'locked' ? 0.45 : 1,
          transition: 'transform 0.15s',
          transform: hovered && skill.tier !== 'locked' ? 'scale(1.12)' : 'scale(1)',
          boxShadow: skill.tier === 'mastered' && hovered ? `0 0 14px ${P.gold}44` : 'none',
        }}
      >
        {skill.tier === 'locked' ? (
          /* dotted 2×2 placeholder grid for locked slots */
          <svg viewBox="0 0 22 22" width="18" height="18" fill="none">
            {[[2,2],[12,2],[2,12],[12,12]].map(([x,y]) => (
              <rect key={`${x}${y}`} x={x} y={y} width="8" height="8" stroke="#333" strokeWidth="0.7" fill="none" strokeDasharray="1.5,1.5"/>
            ))}
          </svg>
        ) : Icon ? Icon(iColor) : (
          <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 8, color: iColor, textTransform: 'uppercase' }}>{skill.label.slice(0,3)}</span>
        )}
        <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7, color: t.label, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1, maxWidth: 50 }}>
          {skill.label}
        </span>
      </div>

      {/* in_progress dot indicator */}
      {skill.tier === 'in_progress' && (
        <div style={{ position: 'absolute', top: -3, right: -3, width: 7, height: 7, borderRadius: '50%', background: P.teal, boxShadow: `0 0 6px ${P.teal}` }}/>
      )}

      {/* tooltip */}
      {hovered && skill.tier !== 'locked' && (
        <div style={{
          position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
          marginBottom: 10, zIndex: 70,
          width: 214,
          background: 'rgba(10,10,18,0.98)',
          border: `1px solid rgba(255,255,255,0.08)`,
          borderTop: `2px solid ${t.border}`,
          borderRadius: 4, padding: '10px 12px',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 -6px 22px rgba(0,0,0,0.65)',
          whiteSpace: 'normal',
          pointerEvents: 'none',
        }}>
          <div className="flex items-center gap-2 mb-1.5">
            <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: t.border, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {skill.label}
            </span>
            <span style={{
              fontFamily: 'Rajdhani,sans-serif', fontSize: 8,
              color: t.border,
              background: `${t.border}18`,
              border: `1px solid ${t.border}44`,
              borderRadius: 2, padding: '1px 5px',
              textTransform: 'uppercase', letterSpacing: '0.07em',
            }}>
              {t.badge}
            </span>
          </div>
          <div style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 11, color: P.muted, lineHeight: 1.55 }}>
            {skill.description}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Skills panel (artifact UI) ────────────────────────────────────
function SkillsPanel() {
  const mastered    = D.skills.filter(s => s.tier === 'mastered').length
  const inProgress  = D.skills.filter(s => s.tier === 'in_progress').length

  return (
    <div style={{
      background: 'rgba(10,10,18,0.88)',
      borderTop: `2px solid ${P.teal}`,
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      padding: '14px 20px',
      backdropFilter: 'blur(8px)',
    }}>
      <div className="flex justify-between items-center mb-3">
        <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 11, color: P.teal, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
          ⬡ Skill Tree — Artifact Unlocks
        </span>
        <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 10, color: P.muted }}>
          <span style={{ color: P.gold }}>{mastered}</span> mastered
          <span style={{ color: 'rgba(255,255,255,0.2)' }}> · </span>
          <span style={{ color: P.teal }}>{inProgress}</span> in progress
          <span style={{ color: 'rgba(255,255,255,0.2)' }}> · </span>
          {D.skills.length} total
        </span>
      </div>

      <div className="flex flex-wrap items-start gap-2">
        {D.skills.map(s => <SkillTile key={s.id} skill={s}/>)}

        {/* progress bar strip at end */}
        <div className="ml-auto flex flex-col items-end justify-center gap-1.5 self-center">
          <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 9, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Stack Progress
          </div>
          <div className="flex gap-0.5">
            {D.skills.map(s => (
              <div key={s.id} style={{
                width: 9, height: 18, borderRadius: 1,
                background: s.tier === 'mastered' ? P.gold : s.tier === 'in_progress' ? P.teal : '#1a1a28',
                border: `1px solid ${s.tier === 'locked' ? '#2a2a38' : 'transparent'}`,
                opacity: s.tier === 'locked' ? 0.4 : 1,
              }}/>
            ))}
          </div>
          <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 11, color: P.gold }}>
            {mastered}/{D.skills.length}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main layout ───────────────────────────────────────────────────
export default function CharacterSheet() {
  return (
    <div style={{ background: P.bg, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Inter,system-ui,sans-serif' }}>

      {/* ── Header bar ── */}
      <div style={{ background: `linear-gradient(135deg, ${P.crimson} 0%, ${P.red} 100%)`, padding: '10px 20px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        {/* diagonal texture overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.016) 0px, rgba(255,255,255,0.016) 1px, transparent 1px, transparent 8px)', pointerEvents: 'none' }}/>

        <div className="flex items-center justify-between relative">
          <div>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 22, letterSpacing: '0.12em', color: P.text, textTransform: 'uppercase' }}>
              {D.name}
            </div>
            <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2 }}>
              // {D.role} · {D.subRole}
            </div>
          </div>

          {/* career stat row */}
          <div className="flex items-center gap-6">
            {[
              { label: 'Years Coding',     value: `${D.careerStats.years}+` },
              { label: 'Projects Shipped', value: D.careerStats.projects    },
              { label: 'Status',           value: D.careerStats.status      },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 16, color: P.gold, fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* teal progress bar at bottom edge */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent 0%, ${P.teal} 15%, ${P.teal} 85%, transparent 100%)` }}/>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* ── Main 3-column grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 210px', gap: 0, padding: '14px 16px' }}>

          {/* LEFT: subclass + weapon slots + ghost */}
          <div className="flex flex-col gap-3" style={{ paddingRight: 10, paddingTop: 4 }}>
            <div className="flex justify-center" style={{ paddingBottom: 22 }}>
              <SubclassIcon/>
            </div>

            <div className="flex flex-col gap-1">
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 8.5, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 3 }}>Core Stack</div>
              {D.stack.map(item => <EquipSlot key={item.id} item={item} side="right"/>)}
            </div>

            <div className="flex flex-col items-start gap-1" style={{ marginTop: 4 }}>
              <GhostSlot/>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 8, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.09em' }}>Guiding Principle</div>
            </div>
          </div>

          {/* CENTER: avatar + status + title + champions */}
          <div className="flex flex-col items-center justify-end relative" style={{ minHeight: 420, paddingBottom: 8 }}>
            {/* background vignette */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 60% at 50% 52%, rgba(233,30,140,0.04) 0%, transparent 70%)', pointerEvents: 'none' }}/>

            {/* status badges */}
            <div className="absolute top-0 left-0 right-0 flex flex-wrap gap-1.5 justify-center" style={{ paddingTop: 2 }}>
              {D.status.map(s => <StatusBadge key={s} text={s}/>)}
            </div>

            {/* avatar */}
            <div style={{ width: 190, height: 340, position: 'relative', marginTop: 44 }}>
              <AvatarSVG/>
            </div>

            {/* title plate */}
            <div style={{
              background: 'rgba(80,30,130,0.65)',
              border: '1px solid rgba(140,70,210,0.38)',
              borderLeft: `3px solid ${P.teal}`,
              padding: '9px 28px',
              textAlign: 'center',
              marginTop: -8,
              position: 'relative',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 0 30px rgba(120,40,200,0.22)',
            }}>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 19, fontWeight: 700, letterSpacing: '0.26em', color: P.text, textTransform: 'uppercase' }}>
                {D.title}
              </div>
              <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 9, color: P.teal, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 2 }}>
                {D.role}
              </div>
            </div>

            {/* champion problems (3 icons) */}
            <div className="flex flex-wrap justify-center gap-3" style={{ marginTop: 10 }}>
              {D.champions.map((c, i) => (
                <div key={i} className="flex items-center gap-1.5" style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 9, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.09em' }}>
                  <div style={{ width: 6, height: 6, borderRadius: 1, background: [P.gold, P.teal, P.purple][i], opacity: 0.8, flexShrink: 0 }}/>
                  {c}
                </div>
              ))}
            </div>

            {/* clan banner (teams) */}
            <div className="flex gap-4 flex-wrap justify-center" style={{ marginTop: 8 }}>
              {D.teams.map(t => (
                <div key={t.name} className="flex items-center gap-2">
                  <div style={{ width: 3, height: 14, background: P.crimson, borderRadius: 1 }}/>
                  <div>
                    <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 10, color: P.text, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{t.name}</div>
                    <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8, color: P.muted }}>{t.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: power level + rank + stats + armor */}
          <div className="flex flex-col gap-3" style={{ paddingLeft: 10 }}>
            {/* power + rank */}
            <div className="flex items-start gap-3" style={{ paddingTop: 4 }}>
              <PowerLevel production={D.monthsProduction} growth={D.monthsGrowth}/>
              <RankBadge/>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }}/>

            {/* stat bars */}
            <div className="flex flex-col gap-2">
              {D.stats.map((s, i) => <StatBar key={s.id} stat={s} delay={i * 90}/>)}
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }}/>

            {/* armor slots */}
            <div>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 8.5, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 5 }}>
                Working Style
              </div>
              <div className="flex flex-col gap-1">
                {D.armor.map(item => <EquipSlot key={item.id} item={item} side="left"/>)}
              </div>
            </div>
          </div>
        </div>

        {/* ── Skills panel (full-width) ── */}
        <SkillsPanel/>

        {/* ── Keyboard hints ── */}
        <div className="flex justify-end gap-4" style={{ padding: '7px 20px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {[['Esc','Close'], ['Tab','Toggle View'], ['G','GitHub'], ['D','Download CV']].map(([k, label]) => (
            <div key={k} className="flex items-center gap-1.5" style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 9.5, color: P.muted }}>
              <span style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 2, padding: '1px 5px', fontSize: 8.5 }}>{k}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
