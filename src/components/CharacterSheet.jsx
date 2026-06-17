import { useState, useEffect, useRef } from 'react'
import { characterSheetData as D } from '../data/characterSheet'

// ─── Palette ───────────────────────────────────────────────────────
const P = {
  bg:      '#060608',
  surface: 'rgba(10,10,16,0.92)',
  crimson: '#2e0e10',
  red:     '#8a3a3f',
  teal:    '#2fe6d8',
  magenta: '#e91e8c',
  gold:    '#f2c14e',
  blue:    '#4a90d9',
  purple:  '#9632c8',
  gray:    '#4a4a5a',
  muted:   '#606070',
  text:    '#e8e8e8',
}

const RARITY_COLOR = { gold: P.gold, blue: P.blue, purple: P.purple, gray: P.gray }

// ─── Avatar SVG ────────────────────────────────────────────────────
function AvatarSVG() {
  return (
    <svg viewBox="0 0 200 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="flr" cx="50%" cy="100%" r="55%">
          <stop offset="0%"   stopColor="#c87c10" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#c87c10" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="gem" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#e91e8c" stopOpacity="0.9"/>
          <stop offset="55%"  stopColor="#e91e8c" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#e91e8c" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="clk" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%"   stopColor="#22285a"/>
          <stop offset="100%" stopColor="#141840"/>
        </linearGradient>
        <linearGradient id="hd" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#1c2048"/>
          <stop offset="100%" stopColor="#10142e"/>
        </linearGradient>
        <linearGradient id="sh" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#2c3070"/>
          <stop offset="100%" stopColor="#1c2050"/>
        </linearGradient>
        <linearGradient id="cp" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#20245a"/>
          <stop offset="100%" stopColor="#161a48"/>
        </linearGradient>
        <linearGradient id="rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#2fe6d8" stopOpacity="0.22"/>
          <stop offset="35%"  stopColor="#2fe6d8" stopOpacity="0"/>
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="395" rx="120" ry="55" fill="url(#flr)"/>
      <ellipse cx="100" cy="330" rx="100" ry="70" fill="rgba(160,110,30,0.1)"/>

      <path d="M34 154 Q20 272 14 400 L186 400 Q180 272 166 154 Z" fill="url(#clk)" stroke="rgba(50,55,110,0.7)" strokeWidth="1.2"/>
      <path d="M34 154 Q20 272 14 400 L38 400 Q30 272 48 162 Z" fill="url(#rim)"/>
      <path d="M100 162 L88 400"  stroke="rgba(47,230,216,0.3)" strokeWidth="1.1"/>
      <path d="M100 162 L112 400" stroke="rgba(47,230,216,0.3)" strokeWidth="1.1"/>
      <path d="M80 205 L62 400"   stroke="rgba(50,55,110,0.55)" strokeWidth="0.8"/>
      <path d="M120 205 L138 400" stroke="rgba(50,55,110,0.55)" strokeWidth="0.8"/>
      <path d="M28 242 Q100 252 172 242" stroke="rgba(40,46,100,0.5)" strokeWidth="0.9" fill="none"/>
      <path d="M22 308 Q100 316 178 308" stroke="rgba(40,46,100,0.4)" strokeWidth="0.7" fill="none"/>

      <polygon points="8,154 52,132 64,158 24,164" fill="url(#sh)" stroke="rgba(50,55,120,0.65)" strokeWidth="1"/>
      <line x1="8"  y1="158" x2="52"  y2="136" stroke={P.gold} strokeWidth="2" opacity="0.6"/>
      <line x1="24" y1="164" x2="64"  y2="158" stroke="rgba(47,230,216,0.4)" strokeWidth="0.9"/>
      <polygon points="192,154 148,132 136,158 176,164" fill="url(#sh)" stroke="rgba(50,55,120,0.65)" strokeWidth="1"/>
      <line x1="192" y1="158" x2="148" y2="136" stroke={P.gold} strokeWidth="2" opacity="0.6"/>
      <line x1="176" y1="164" x2="136" y2="158" stroke="rgba(47,230,216,0.4)" strokeWidth="0.9"/>

      <path d="M50 154 L150 154 L158 204 L42 204 Z" fill="url(#cp)" stroke="rgba(50,55,120,0.6)" strokeWidth="1"/>
      <line x1="100" y1="154" x2="100" y2="204" stroke="rgba(47,230,216,0.5)" strokeWidth="1.4"/>
      <line x1="44"  y1="178" x2="156" y2="178" stroke="rgba(47,230,216,0.3)" strokeWidth="0.9"/>
      <line x1="50"  y1="154" x2="42"  y2="178" stroke="rgba(47,230,216,0.18)" strokeWidth="0.7"/>
      <line x1="150" y1="154" x2="158" y2="178" stroke="rgba(47,230,216,0.18)" strokeWidth="0.7"/>

      <circle cx="100" cy="174" r="24" fill="url(#gem)" opacity="0.55"/>
      <circle cx="100" cy="174" r="14" fill="rgba(233,30,140,0.15)"/>
      <circle cx="100" cy="174" r="13" stroke="#e91e8c" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <circle cx="100" cy="174" r="8"  fill="#060410"/>
      <circle cx="100" cy="174" r="6"  fill="#e91e8c" opacity="0.82"/>
      <circle cx="100" cy="174" r="3"  fill={P.gold} opacity="0.95"/>
      <circle cx="99"  cy="173" r="1"  fill="white"  opacity="0.7"/>

      <rect x="58"  y="206" width="84" height="14" rx="3" fill="#1e2252" stroke="rgba(50,55,110,0.5)" strokeWidth="0.9"/>
      <rect x="86"  y="204" width="28" height="18" rx="3" fill="#24285e" stroke="rgba(50,55,110,0.4)" strokeWidth="0.8"/>
      <rect x="93"  y="209" width="14" height="8"  rx="1.5" fill={P.gold} opacity="0.38"/>
      <rect x="97"  y="211" width="6"  height="4"  rx="1"   fill={P.gold} opacity="0.65"/>

      <path d="M80 154 L120 154 L115 122 L85 122 Z" fill="#1a1e48"/>
      <path d="M22 92 Q100 4 178 92 Q194 134 184 156 L16 156 Q6 134 22 92 Z" fill="url(#hd)" stroke="rgba(50,55,110,0.7)" strokeWidth="1.2"/>
      <path d="M24 94 Q100 10 176 94" stroke={P.gold} strokeWidth="2.8" fill="none" opacity="0.7"/>
      <path d="M32 104 Q100 26 168 104" stroke={P.gold} strokeWidth="1" fill="none" opacity="0.28"/>
      <path d="M22 92 Q13 120 16 154" stroke="rgba(50,55,110,0.7)" strokeWidth="1" fill="none"/>
      <path d="M178 92 Q187 120 184 154" stroke="rgba(50,55,110,0.7)" strokeWidth="1" fill="none"/>

      <ellipse cx="100" cy="116" rx="45" ry="54" fill="#03030c"/>
      <ellipse cx="100" cy="120" rx="35" ry="44" fill="#020209"/>
      <ellipse cx="100" cy="116" rx="45" ry="54" stroke="rgba(35,40,90,0.5)" strokeWidth="2.5" fill="none"/>
    </svg>
  )
}

// ─── SVG icon library ──────────────────────────────────────────────
const ICONS = {
  kinetic: (c) => (
    <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
      <polygon points="14,3 25,9 25,19 14,25 3,19 3,9" stroke={c} strokeWidth="1.4" fill={c+'18'}/>
      <line x1="14" y1="3" x2="14" y2="25" stroke={c} strokeWidth="0.7" opacity="0.4"/>
      <circle cx="14" cy="14" r="4" fill={c} opacity="0.5"/>
    </svg>
  ),
  energy: (c) => (
    <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
      <circle cx="14" cy="14" r="10"  stroke={c} strokeWidth="1.4" fill="none"/>
      <ellipse cx="14" cy="14" rx="5"  ry="10" stroke={c} strokeWidth="0.9" fill="none" opacity="0.6"/>
      <ellipse cx="14" cy="14" rx="10" ry="3.5" stroke={c} strokeWidth="0.9" fill="none" opacity="0.6"/>
      <circle cx="14" cy="14" r="2.5"  fill={c} opacity="0.85"/>
    </svg>
  ),
  heavy: (c) => (
    <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
      <rect x="4"  y="9"  width="20" height="10" rx="2" stroke={c} strokeWidth="1.2" fill={c+'14'}/>
      <rect x="4"  y="13" width="20" height="3.5" stroke={c} strokeWidth="0.4" fill={c+'20'}/>
      {[7,12,17,22].map(x => <line key={x} x1={x} y1="9" x2={x} y2="19" stroke={c} strokeWidth="0.6" opacity="0.5"/>)}
      <rect x="12" y="5" width="4" height="4" rx="1" stroke={c} strokeWidth="0.9" fill="none"/>
    </svg>
  ),
  helmet: (c) => (
    <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
      <path d="M6 19 Q6 9 14 7 Q22 9 22 19 L20 23 L8 23 Z" stroke={c} strokeWidth="1.3" fill={c+'12'}/>
      <line x1="8" y1="17" x2="20" y2="17" stroke={c} strokeWidth="0.7" opacity="0.5"/>
      <rect x="10" y="14" width="8" height="4" rx="1" fill={c+'28'}/>
    </svg>
  ),
  arms: (c) => (
    <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
      <path d="M7 7 L7 21"  stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M7 12 L17 8" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M7 17 L19 21" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="19" cy="8"  r="2" fill={c} opacity="0.5"/>
      <circle cx="21" cy="21" r="2" fill={c} opacity="0.5"/>
    </svg>
  ),
  chest: (c) => (
    <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
      <rect x="6" y="6" width="16" height="16" rx="2" stroke={c} strokeWidth="1.3" fill={c+'12'}/>
      <polyline points="10,14 13,17 18,11" stroke={P.teal} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  legs: (c) => (
    <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
      <path d="M9 6 L9 20 L12 26"  stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M19 6 L19 20 L16 26" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <line x1="9" y1="14" x2="19" y2="14" stroke={c} strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  class: (c) => (
    <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
      <polygon points="14,5 24,20 4,20"  stroke={c} strokeWidth="1.4" fill={c+'14'}/>
      <polygon points="14,10 20,18 8,18" stroke={c} strokeWidth="0.7" fill={c+'10'}/>
    </svg>
  ),
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

// ─── Equipment slot — icon-only, D2 style ──────────────────────────
function EquipSlot({ item, side = 'right' }) {
  const [hovered, setHovered] = useState(false)
  const color = RARITY_COLOR[item.rarity] || P.gray
  const Icon  = ICONS[item.slot]

  return (
    <div className="relative" style={{ zIndex: hovered ? 30 : 'auto' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{
        width: 62, height: 62,
        background: 'rgba(4,4,10,0.95)',
        border: `1px solid ${color}${hovered ? 'dd' : '55'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', cursor: 'pointer',
        boxShadow: hovered ? `0 0 18px ${color}22, inset 0 0 12px ${color}0a` : 'none',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}>
        {Icon ? Icon(color) : <div style={{ width: 26, height: 26, border: `1px solid ${color}44`, borderRadius: 2 }}/>}
        {item.power && (
          <span style={{
            position: 'absolute', bottom: 2, right: 4,
            fontFamily: '"Share Tech Mono",monospace', fontSize: 9,
            color: P.gold, lineHeight: 1,
            textShadow: '0 0 6px rgba(242,193,78,0.45)',
          }}>
            {item.power}
          </span>
        )}
      </div>

      {hovered && (
        <div style={{
          position: 'absolute',
          ...(side === 'right' ? { left: '100%', marginLeft: 8 } : { right: '100%', marginRight: 8 }),
          top: 0, zIndex: 60, width: 212,
          background: 'rgba(4,4,10,0.98)', backdropFilter: 'blur(14px)',
          border: `1px solid rgba(255,255,255,0.05)`,
          borderLeft: side === 'right' ? `2px solid ${color}` : undefined,
          borderRight: side === 'left'  ? `2px solid ${color}` : undefined,
          borderRadius: 3, padding: '10px 12px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.9)',
          pointerEvents: 'none',
        }}>
          <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {item.label}
          </div>
          <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 9, color: P.teal, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 1 }}>
            {item.sublabel}
          </div>
          {item.power && (
            <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 9, color: P.gold, marginTop: 2 }}>
              ◆ {item.power} Power
            </div>
          )}
          <div style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 11, color: P.muted, marginTop: 6, lineHeight: 1.55 }}>
            {item.description}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Stat — D2 dot-tier display ────────────────────────────────────
function StatDots({ stat, delay = 0 }) {
  const [filled, setFilled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef()
  const tiers = Math.floor(stat.value / 10)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setFilled(true), delay) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} className="relative" style={{ paddingBottom: 1 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex justify-between items-center" style={{ marginBottom: 3 }}>
        <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 9.5, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          {stat.label}
        </span>
        <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 12, color: P.text, lineHeight: 1 }}>
          {stat.value}
        </span>
      </div>
      <div className="flex gap-px">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 1,
            background: filled && i < tiers ? (i >= 8 ? P.gold : P.teal) : 'rgba(255,255,255,0.05)',
            boxShadow: filled && i < tiers ? `0 0 4px ${i >= 8 ? P.gold : P.teal}55` : 'none',
            transition: `background 0.05s linear ${delay / 1000 + i * 0.04}s`,
          }}/>
        ))}
      </div>
      {hovered && (
        <div style={{
          position: 'absolute', right: 0, bottom: '130%', zIndex: 50, whiteSpace: 'nowrap',
          background: 'rgba(4,4,10,0.98)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 3, padding: '5px 9px',
          fontFamily: 'Inter,system-ui,sans-serif', fontSize: 10, color: P.muted,
          boxShadow: '0 4px 14px rgba(0,0,0,0.8)',
        }}>
          {stat.description}
        </div>
      )}
    </div>
  )
}

// ─── Active Effects — buff icons (left of character) ───────────────
const EFFECT_DEFS = [
  { label: 'Available',    color: P.teal,   sym: '◆' },
  { label: 'Remote · 2d', color: P.blue,   sym: '⌘' },
  { label: 'HETIC M2',    color: P.gold,   sym: '◉' },
  { label: 'Sept 2026',   color: P.purple, sym: '↗' },
]

function ActiveEffects() {
  return (
    <div className="flex flex-col gap-1" style={{ marginTop: 8 }}>
      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7.5, color: '#282840', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 2 }}>
        Active Effects
      </div>
      {EFFECT_DEFS.map(e => (
        <div key={e.label} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: `${e.color}0a`, border: `1px solid ${e.color}25`,
          borderRadius: 2, padding: '3px 7px',
        }}>
          <span style={{ color: e.color, fontSize: 8, lineHeight: 1, flexShrink: 0 }}>{e.sym}</span>
          <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 8, color: e.color, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1 }}>
            {e.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Champion Overview — 3 D2-style type icons ─────────────────────
const CHAMP_DEFS = [
  {
    shortLabel: 'Legacy',
    color: P.gold,
    icon: (c) => (
      <svg viewBox="0 0 22 22" width="16" height="16" fill="none">
        <path d="M11 2 L18 6 L18 13 Q18 18 11 20 Q4 18 4 13 L4 6 Z" stroke={c} strokeWidth="1.1" fill={c+'10'}/>
        <line x1="11" y1="7"  x2="11" y2="15" stroke={c} strokeWidth="1.4"/>
        <line x1="7"  y1="11" x2="15" y2="11" stroke={c} strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    shortLabel: 'Deadline',
    color: P.teal,
    icon: (c) => (
      <svg viewBox="0 0 22 22" width="16" height="16" fill="none">
        <polygon points="11,2 20,11 11,20 2,11" stroke={c} strokeWidth="1.1" fill={c+'10'}/>
        <path d="M11 6 L8.5 11 L11 11 L11 16 L13.5 11 L11 11 Z" fill={c+'40'} stroke={c} strokeWidth="0.6"/>
      </svg>
    ),
  },
  {
    shortLabel: 'Collab',
    color: P.purple,
    icon: (c) => (
      <svg viewBox="0 0 22 22" width="16" height="16" fill="none">
        <polygon points="11,3 19,18 3,18" stroke={c} strokeWidth="1.1" fill={c+'10'}/>
        <circle cx="11" cy="13" r="2" stroke={c} strokeWidth="0.9" fill="none"/>
      </svg>
    ),
  },
]

function ChampionOverview() {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7.5, color: '#282840', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 4, textAlign: 'center' }}>
        Champion Overview
      </div>
      <div className="flex gap-1.5 justify-center">
        {D.champions.map((champ, i) => {
          const def = CHAMP_DEFS[i]
          return (
            <div key={i} title={champ} style={{
              width: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: `${def.color}08`, border: `1px solid ${def.color}25`,
              borderRadius: 2, padding: '6px 4px', cursor: 'default',
            }}>
              {def.icon(def.color)}
              <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7, color: def.color, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.2 }}>
                {def.shortLabel}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Clan Banner ───────────────────────────────────────────────────
function ClanBanner() {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ marginTop: 10 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7.5, color: '#282840', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 4 }}>
        Clan Banner
      </div>
      <div style={{
        display: 'flex', alignItems: 'stretch',
        background: 'rgba(4,4,10,0.88)', border: `1px solid rgba(138,58,63,0.28)`,
        boxShadow: hovered ? `0 0 14px rgba(138,58,63,0.16)` : 'none',
        transition: 'box-shadow 0.2s',
      }}>
        <div style={{ width: 3, background: `linear-gradient(180deg, ${P.gold}88 0%, ${P.red} 100%)`, flexShrink: 0 }}/>
        <div style={{ padding: '5px 10px', flex: 1 }}>
          {D.teams.map((t, i) => (
            <div key={t.name} style={{ marginBottom: i < D.teams.length - 1 ? 6 : 0 }}>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 10, color: i === 0 ? P.text : P.muted, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: i === 0 ? 700 : 400 }}>
                {t.name}
              </div>
              <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8, color: P.muted }}>
                {t.note}
              </div>
            </div>
          ))}
        </div>
      </div>
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
      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 9, color: '#303048', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 2 }}>
        Power
      </div>
      <div className="flex items-center justify-center gap-1">
        <span style={{ color: P.gold, fontSize: 12 }}>◆</span>
        <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 44, color: P.gold, fontWeight: 700, lineHeight: 1, minWidth: 52, textAlign: 'right' }}>
          {count}
        </span>
      </div>
      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 8.5, color: P.muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 1 }}>
        Months XP
      </div>
      <div style={{ marginTop: 6, fontFamily: '"Share Tech Mono",monospace', fontSize: 8.5 }}>
        <div style={{ color: P.muted }}>Prod <span style={{ color: P.teal }}>{production}</span></div>
        <div style={{ color: P.muted }}>+Growth <span style={{ color: P.purple }}>{growth}</span></div>
      </div>
    </div>
  )
}

// ─── Guardian rank badge ───────────────────────────────────────────
function RankBadge() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: 62, height: 62 }}>
        <svg viewBox="0 0 62 62" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <linearGradient id="rring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#e91e8c"/>
              <stop offset="100%" stopColor="#9632c8"/>
            </linearGradient>
          </defs>
          <circle cx="31" cy="31" r="28" stroke="url(#rring)" strokeWidth="1.5" fill="rgba(6,6,12,0.92)"/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7.5, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.35, textAlign: 'center' }}>
            Alt.<br/>→ Full<br/>Stack<br/>'26
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Subclass icon ─────────────────────────────────────────────────
function SubclassIcon() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
      <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.18) 0%, transparent 70%)' }}/>
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(6,6,14,0.96)',
        border: `1px solid ${P.magenta}55`,
        boxShadow: `0 0 18px rgba(233,30,140,0.18)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
      }}>
        <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
          <polygon points="16,4 28,11 28,21 16,28 4,21 4,11" stroke={P.magenta} strokeWidth="1.4" fill={P.magenta+'18'}/>
          <polygon points="16,9 23,13 23,19 16,23 9,19 9,13" stroke={P.magenta} strokeWidth="0.8" fill={P.magenta+'10'} opacity="0.7"/>
          <circle cx="16" cy="16" r="3.5" fill={P.magenta} opacity="0.65"/>
        </svg>
        <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7, color: P.magenta, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Fullstack
        </span>
      </div>
      <div style={{
        position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        background: 'rgba(6,6,12,0.95)',
        border: `1px solid rgba(150,50,200,0.3)`,
        borderRadius: 2, padding: '1px 7px',
        fontFamily: 'Rajdhani,sans-serif', fontSize: 7.5, color: P.purple,
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
        width: 62, height: 62,
        background: 'rgba(4,4,10,0.95)',
        border: `1px dashed rgba(150,50,200,0.28)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
        cursor: 'default',
      }}>
        {ICONS.ghost(P.purple)}
        <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7, color: P.purple, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2 }}>
          {D.motto.text}
        </span>
      </div>
      {hovered && (
        <div style={{
          position: 'absolute', left: '100%', marginLeft: 8, top: 0, zIndex: 50,
          width: 176, background: 'rgba(4,4,10,0.98)',
          border: `1px solid rgba(150,50,200,0.2)`,
          borderLeft: `2px solid ${P.purple}`,
          borderRadius: 3, padding: '8px 12px',
          boxShadow: '0 4px 18px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
        }}>
          <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: P.purple, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{D.motto.text}</div>
          <div style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 10, color: P.muted, marginTop: 4, lineHeight: 1.5 }}>{D.motto.note}</div>
        </div>
      )}
    </div>
  )
}

// ─── Status badge ──────────────────────────────────────────────────
function StatusBadge({ text }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: 'rgba(47,230,216,0.05)', border: '1px solid rgba(47,230,216,0.18)',
      borderRadius: 2, padding: '2px 7px',
      fontFamily: 'Rajdhani,sans-serif', fontSize: 9, color: P.teal,
      textTransform: 'uppercase', letterSpacing: '0.1em',
    }}>
      <div style={{ width: 3, height: 3, borderRadius: '50%', background: P.teal, flexShrink: 0 }}/>
      {text}
    </div>
  )
}

// ─── Artifact tiles ────────────────────────────────────────────────
const TIER = {
  mastered:    { pulse: false },
  in_progress: { pulse: true  },
  locked:      { pulse: false },
}

const SKILL_COLUMNS = [
  { label: 'Backend',  ids: ['php', 'symfony', 'api-platform'] },
  { label: 'Frontend', ids: ['react', 'vue', 'react-native']   },
  { label: 'Infra',    ids: ['docker', 'github-actions']        },
  { label: 'Training', ids: ['java', 'spring-boot']             },
  { label: 'Planned',  ids: ['nextjs', 'kubernetes']            },
]

function ArtifactTile({ skill }) {
  const [hovered, setHovered] = useState(false)
  const Icon    = ICONS[skill.id]
  const isLocked      = skill.tier === 'locked'
  const isMastered    = skill.tier === 'mastered'
  const isInProgress  = skill.tier === 'in_progress'
  const iColor  = isLocked ? '#1e1e30' : P.teal
  const borderColor   = isLocked ? 'rgba(30,30,55,0.5)' : isMastered ? P.teal + 'cc' : P.teal + '55'
  const glowShadow    = isMastered
    ? `0 0 0 1px ${P.teal}66, 0 0 14px ${P.teal}33, inset 0 0 8px ${P.teal}14`
    : isInProgress ? `0 0 0 1px ${P.teal}44, 0 0 7px ${P.teal}22` : 'none'

  return (
    <div className="relative" style={{ zIndex: hovered ? 50 : 'auto' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div
        className={isInProgress ? 'animate-tile-pulse' : ''}
        style={{
          width: 54, height: 54,
          background: isLocked ? 'rgba(4,4,10,0.7)' : 'rgba(8,10,24,0.94)',
          border: `1px solid ${borderColor}`,
          borderStyle: isLocked ? 'dashed' : 'solid',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
          cursor: isLocked ? 'default' : 'pointer',
          opacity: isLocked ? 0.35 : 1,
          boxShadow: hovered && !isLocked ? glowShadow.replace('33','55').replace('22','40') : glowShadow,
          transition: 'box-shadow 0.2s, transform 0.15s',
          transform: hovered && !isLocked ? 'scale(1.08)' : 'scale(1)',
          position: 'relative',
        }}
      >
        {isLocked ? (
          <svg viewBox="0 0 22 22" width="16" height="16" fill="none">
            {[[2,2],[12,2],[2,12],[12,12]].map(([x,y]) => (
              <rect key={`${x}${y}`} x={x} y={y} width="8" height="8" stroke="#1e1e30" strokeWidth="0.8" fill="none" strokeDasharray="2,2"/>
            ))}
          </svg>
        ) : Icon ? Icon(iColor) : (
          <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 9, color: iColor }}>{skill.label.slice(0,3)}</span>
        )}
        <span style={{
          fontFamily: 'Rajdhani,sans-serif', fontSize: 7,
          color: isLocked ? '#1e1e30' : 'rgba(47,230,216,0.65)',
          textTransform: 'uppercase', letterSpacing: '0.04em',
          textAlign: 'center', lineHeight: 1, maxWidth: 50,
        }}>
          {skill.label}
        </span>
        {isMastered && (
          <div style={{ position: 'absolute', top: 3, right: 3, width: 4, height: 4, background: P.gold, borderRadius: '50%', boxShadow: `0 0 4px ${P.gold}` }}/>
        )}
      </div>
      {isInProgress && (
        <div style={{ position: 'absolute', top: -3, right: -3, width: 6, height: 6, borderRadius: '50%', background: P.teal, boxShadow: `0 0 6px ${P.teal}` }}/>
      )}
      {hovered && !isLocked && (
        <div style={{
          position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
          marginBottom: 8, zIndex: 80, width: 216, whiteSpace: 'normal', pointerEvents: 'none',
          background: 'rgba(4,4,10,0.98)', backdropFilter: 'blur(14px)',
          border: `1px solid rgba(47,230,216,0.15)`,
          borderTop: `2px solid ${isMastered ? P.gold : P.teal}`,
          borderRadius: 3, padding: '10px 13px',
          boxShadow: '0 -6px 24px rgba(0,0,0,0.85)',
        }}>
          <div className="flex items-center gap-2 mb-1.5">
            <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: isMastered ? P.gold : P.teal, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {skill.label}
            </span>
            <span style={{
              fontFamily: 'Rajdhani,sans-serif', fontSize: 8, borderRadius: 2, padding: '1px 5px',
              color: isMastered ? P.gold : P.teal,
              background: isMastered ? `${P.gold}14` : `${P.teal}14`,
              border: `1px solid ${isMastered ? P.gold : P.teal}35`,
              textTransform: 'uppercase', letterSpacing: '0.07em',
            }}>
              {isMastered ? 'Mastered' : 'Training'}
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

// ─── Artifact / skills panel ───────────────────────────────────────
function SkillsPanel() {
  const skillMap   = Object.fromEntries(D.skills.map(s => [s.id, s]))
  const mastered   = D.skills.filter(s => s.tier === 'mastered').length
  const inProgress = D.skills.filter(s => s.tier === 'in_progress').length
  const unlocked   = mastered + inProgress

  return (
    <div style={{
      background: 'rgba(4,4,10,0.94)',
      borderTop: `2px solid rgba(47,230,216,0.45)`,
      padding: '11px 20px 13px',
    }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 11 }}>
        <div className="flex items-center gap-3">
          <div style={{ width: 30, height: 30, background: 'rgba(47,230,216,0.08)', border: `1px solid rgba(47,230,216,0.3)`, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
              <polygon points="10,2 18,7 18,13 10,18 2,13 2,7" stroke="#2fe6d8" strokeWidth="1.1" fill="rgba(47,230,216,0.07)"/>
              <circle cx="10" cy="10" r="2.8" stroke="#2fe6d8" strokeWidth="0.9" fill="rgba(47,230,216,0.12)"/>
              <circle cx="10" cy="10" r="1.1" fill="#2fe6d8"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: P.text, textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700 }}>
              Seasonal Artifact
            </div>
            <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8.5, color: P.muted }}>
              Artifact Unlocks: <span style={{ color: P.teal }}>{unlocked}</span>/{D.skills.length}
            </div>
          </div>
        </div>
        <div style={{
          background: 'rgba(242,193,78,0.10)', border: `1px solid rgba(242,193,78,0.28)`,
          borderRadius: 2, padding: '5px 12px',
          fontFamily: '"Share Tech Mono",monospace', fontSize: 14, color: P.gold, fontWeight: 700,
        }}>
          +{mastered} <span style={{ fontSize: 8.5, fontFamily: 'Rajdhani,sans-serif', color: P.muted, letterSpacing: '0.1em' }}>POWER BONUS</span>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        {SKILL_COLUMNS.map(col => (
          <div key={col.label} className="flex flex-col items-center" style={{ gap: 0 }}>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 8.5, color: 'rgba(47,230,216,0.4)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6, textAlign: 'center' }}>
              {col.label}
            </div>
            {col.ids.map((id, idx) => {
              const skill = skillMap[id]
              if (!skill) return null
              return (
                <div key={id} className="flex flex-col items-center">
                  {idx > 0 && (
                    <div style={{ width: 1, height: 7, background: skill.tier === 'locked' ? 'rgba(30,30,55,0.4)' : 'rgba(47,230,216,0.35)' }}/>
                  )}
                  <ArtifactTile skill={skill}/>
                </div>
              )
            })}
          </div>
        ))}

        <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.04)', margin: '0 4px' }}/>

        <div className="flex flex-col justify-between self-stretch" style={{ paddingTop: 18 }}>
          <div className="flex flex-col gap-2">
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 8, color: P.muted, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Stack Progress
            </div>
            <div className="flex gap-0.5">
              {D.skills.map(s => (
                <div key={s.id} style={{
                  width: 7, height: 18, borderRadius: 1,
                  background: s.tier === 'mastered' ? P.teal : s.tier === 'in_progress' ? 'rgba(47,230,216,0.38)' : 'rgba(20,22,45,0.8)',
                  border: `1px solid ${s.tier === 'locked' ? 'rgba(30,32,60,0.4)' : 'transparent'}`,
                  boxShadow: s.tier === 'mastered' ? `0 0 4px ${P.teal}77` : 'none',
                  opacity: s.tier === 'locked' ? 0.3 : 1,
                }}/>
              ))}
            </div>
            <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 9.5, color: P.teal }}>
              {mastered} / {D.skills.length}
            </div>
          </div>
          <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7.5, color: 'rgba(255,255,255,0.1)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 'auto' }}>
            [ R ] Reset Artifact
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main layout ───────────────────────────────────────────────────
export default function CharacterSheet() {
  return (
    <div style={{ background: P.bg, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Inter,system-ui,sans-serif', position: 'relative' }}>

      {/* Scanline overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0px, rgba(0,0,0,0.07) 1px, transparent 1px, transparent 2px)',
      }}/>

      {/* ── Header ── */}
      <div style={{ background: `linear-gradient(135deg, ${P.crimson} 0%, #1c0608 100%)`, padding: '9px 20px', flexShrink: 0, position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 8px)', pointerEvents: 'none' }}/>
        <div className="flex items-center justify-between relative">
          <div>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 21, letterSpacing: '0.12em', color: P.text, textTransform: 'uppercase' }}>
              {D.name}
            </div>
            <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 9.5, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 1 }}>
              // {D.role} · {D.subRole}
            </div>
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: 'Years Coding',     value: `${D.careerStats.years}+` },
              { label: 'Projects Shipped', value: D.careerStats.projects    },
              { label: 'Status',           value: D.careerStats.status      },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 15, color: P.gold, fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 8.5, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 0%, ${P.teal}88 15%, ${P.teal}88 85%, transparent 100%)` }}/>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative', zIndex: 1 }}>

        {/* ── 3-column grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 200px', gap: 0, padding: '10px 14px' }}>

          {/* LEFT: subclass + weapons + active effects + ghost */}
          <div className="flex flex-col gap-2.5" style={{ paddingRight: 10, paddingTop: 4 }}>
            <div className="flex justify-center" style={{ paddingBottom: 22 }}>
              <SubclassIcon/>
            </div>

            <div className="flex flex-col gap-1">
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7.5, color: '#282840', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 2 }}>Core Stack</div>
              {D.stack.map(item => <EquipSlot key={item.id} item={item} side="right"/>)}
            </div>

            <ActiveEffects/>

            <div className="flex flex-col gap-1">
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7.5, color: '#282840', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Principle</div>
              <GhostSlot/>
            </div>
          </div>

          {/* CENTER: avatar + title + champion overview + clan banner */}
          <div className="flex flex-col items-center justify-end relative" style={{ minHeight: 450, paddingBottom: 8 }}>
            {/* Atmospheric glow behind character */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `
                radial-gradient(ellipse 80% 40% at 50% 98%, rgba(190,130,35,0.4) 0%, transparent 65%),
                radial-gradient(ellipse 60% 50% at 50% 76%, rgba(140,100,25,0.18) 0%, transparent 65%),
                radial-gradient(ellipse 45% 55% at 50% 50%, rgba(20,16,60,0.3) 0%, transparent 70%),
                radial-gradient(ellipse 25% 30% at 22% 58%, rgba(47,230,216,0.05) 0%, transparent 60%)
              `
            }}/>

            {/* status badges */}
            <div className="absolute top-0 left-0 right-0 flex flex-wrap gap-1.5 justify-center" style={{ paddingTop: 2 }}>
              {D.status.map(s => <StatusBadge key={s} text={s}/>)}
            </div>

            {/* avatar */}
            <div style={{ width: 225, height: 395, position: 'relative', marginTop: 34 }}>
              <AvatarSVG/>
            </div>

            {/* title plate */}
            <div style={{
              background: 'rgba(50,18,90,0.55)',
              border: '1px solid rgba(120,50,190,0.28)',
              borderLeft: `2px solid ${P.teal}`,
              padding: '8px 26px',
              textAlign: 'center',
              marginTop: -6, position: 'relative',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 18, fontWeight: 700, letterSpacing: '0.26em', color: P.text, textTransform: 'uppercase' }}>
                {D.title}
              </div>
              <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8.5, color: P.teal, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 2 }}>
                {D.role}
              </div>
            </div>

            {/* Champion overview */}
            <ChampionOverview/>

            {/* Clan banner */}
            <ClanBanner/>
          </div>

          {/* RIGHT: power + rank + stats (dot tiers) + armor */}
          <div className="flex flex-col gap-2.5" style={{ paddingLeft: 10 }}>
            <div className="flex items-start gap-2.5" style={{ paddingTop: 4 }}>
              <PowerLevel production={D.monthsProduction} growth={D.monthsGrowth}/>
              <RankBadge/>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.04)' }}/>

            {/* Stat dots */}
            <div className="flex flex-col gap-2.5">
              {D.stats.map((s, i) => <StatDots key={s.id} stat={s} delay={i * 80}/>)}
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.04)' }}/>

            {/* Armor slots */}
            <div>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 7.5, color: '#282840', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 4 }}>
                Working Style
              </div>
              <div className="flex flex-col gap-1">
                {D.armor.map(item => <EquipSlot key={item.id} item={item} side="left"/>)}
              </div>
            </div>
          </div>
        </div>

        {/* ── Artifact / skills panel ── */}
        <SkillsPanel/>

        {/* ── Keyboard hints ── */}
        <div className="flex justify-end gap-4" style={{ padding: '6px 20px', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
          {[['Esc','Close'], ['Tab','Toggle View'], ['G','GitHub'], ['D','Download CV']].map(([k, label]) => (
            <div key={k} className="flex items-center gap-1.5" style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 9, color: P.muted }}>
              <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2, padding: '1px 5px', fontSize: 8 }}>{k}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
