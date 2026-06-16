import { useState, useEffect } from 'react'

function valueClass(v) {
  if (v >= 85) return 'high'
  if (v >= 65) return 'mid'
  return 'low'
}

export default function StatBar({ stat }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = null
    const duration = 1400
    let rafId

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * stat.value))
      if (progress < 1) rafId = requestAnimationFrame(step)
    }

    const timeout = setTimeout(() => {
      rafId = requestAnimationFrame(step)
    }, stat.delay ?? 0)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(rafId)
    }
  }, [stat.value, stat.delay])

  return (
    <div className="stat-row">
      <span className="stat-icon-col">{stat.icon}</span>
      <span className={`stat-number ${valueClass(stat.value)}`}>{display}</span>
      <span className="stat-label">{stat.name}</span>
    </div>
  )
}
