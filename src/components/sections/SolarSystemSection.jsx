import SolarSystem3D from '../SolarSystem3D'
import { useInView } from '../../hooks/useInView'

export default function SolarSystemSection() {
  const [ref, inView] = useInView(0.05)
  return (
    <section id="univers" style={{ padding: '80px 0 40px' }}>
      <div ref={ref} className={`reveal${inView ? ' in-view' : ''}`} style={{ padding: '0 clamp(20px, 5vw, 56px)', maxWidth: 1040, margin: '0 auto 32px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontStyle: 'italic', color: 'var(--paper)' }}>
          Un système à explorer
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, color: 'var(--paper-dim)', marginTop: 12, maxWidth: '58ch' }}>
          Chaque planète représente une compétence ou un projet personnel. Faites glisser pour tourner autour du système, la molette pour vous rapprocher, et cliquez sur une planète pour en lire le détail.
        </p>
      </div>
      <div style={{ height: 'min(80vh, 720px)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <SolarSystem3D />
      </div>
    </section>
  )
}
