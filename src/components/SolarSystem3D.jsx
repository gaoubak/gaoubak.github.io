import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const PLANETS = [
  {
    id: 'symfony', label: 'Symfony / PHP', eyebrow: 'Backend principal', orbit: 3.2, size: 0.85, speed: 0.55,
    style: 'rocky', colorA: '#8a5a48', colorB: '#c9927a', glow: '#e8b18a',
    desc: "Stack backend principale, en production depuis 4 ans chez Siko Mobility et Spin Interactive. API REST Symfony 7 / PHP 8.4, architecture from-scratch, intégrations bancaires complexes.",
    tags: ['PHP 8', 'Symfony 6/7', 'API REST', 'Messenger'],
  },
  {
    id: 'frontend', label: 'React / Vue.js', eyebrow: 'Frontend', orbit: 4.5, size: 0.62, speed: 0.46,
    style: 'bands', colorA: '#1e3a5f', colorB: '#4a90d9', glow: '#7fd0ff',
    desc: "Interfaces découplées en Vue 3 (Composition API, Pinia) et React 18 (hooks, Context) — de Spin Interactive à Siko Mobility.",
    tags: ['Vue.js 3', 'React 18', 'TypeScript', 'Pinia'],
  },
  {
    id: 'api-platform', label: 'API Platform', eyebrow: 'API REST', orbit: 5.7, size: 0.42, speed: 0.39,
    style: 'bands', colorA: '#114a44', colorB: '#2fa89a', glow: '#4fe6d8',
    desc: "Génération d'API REST / JSON-LD avec Symfony : filtres, pagination, JWT, sérialisation, documentation OpenAPI automatique.",
    tags: ['API Platform', 'JSON-LD', 'JWT', 'OpenAPI'],
  },
  {
    id: 'java-spring', label: 'Java / Spring Boot', eyebrow: 'En formation', orbit: 6.9, size: 0.5, speed: 0.34,
    style: 'rocky', colorA: '#5c2314', colorB: '#b8543a', glow: '#e08a6b',
    desc: "Montée en compétence active sur l'écosystème Java : POO, collections, streams, micro-services Spring Boot 3 / Spring Security.",
    tags: ['Java 21', 'Spring Boot 3', 'Spring Security'],
  },
  {
    id: 'devops', label: 'Docker / CI-CD', eyebrow: 'DevOps', orbit: 8.1, size: 0.4, speed: 0.29,
    style: 'rocky', colorA: '#2c3650', colorB: '#9fb3d1', glow: '#9fb3d1',
    desc: "Environnements conteneurisés (Docker Compose, multi-stage builds) et pipelines GitHub Actions pour des déploiements fiables.",
    tags: ['Docker', 'GitHub Actions', 'CI/CD'],
  },
  {
    id: 'database', label: 'MySQL / PostgreSQL', eyebrow: 'Base de données', orbit: 9.3, size: 0.38, speed: 0.26,
    style: 'ice', colorA: '#14314f', colorB: '#6fa8e0', glow: '#6fa8e0',
    desc: "MySQL en production sur l'ensemble des projets professionnels ; veille et premiers tests sur PostgreSQL.",
    tags: ['MySQL', 'PostgreSQL (veille)'],
  },
  {
    id: 'dpp', label: 'Plateforme DPP', eyebrow: 'Projet personnel · 2026', orbit: 10.7, size: 0.58, speed: 0.22, ring: true,
    style: 'bands', colorA: '#6b4b1c', colorB: '#e9c98a', glow: '#e9c98a',
    desc: "Digital Product Passports conforme à la réglementation européenne ESPR : traçabilité et dématérialisation des données produit.",
    tags: ['Java', 'Spring Boot', 'ESPR', 'REST'],
  },
  {
    id: 'messaging', label: 'Client de messagerie', eyebrow: 'Projet personnel · 2025', orbit: 11.9, size: 0.33, speed: 0.19,
    style: 'ice', colorA: '#2c5a72', colorB: '#eaf7ff', glow: '#bfe8ff',
    desc: "Client de messagerie desktop multiplateforme. Architecture MVVM, interface Avalonia, WebSocket, backend Spring Boot.",
    tags: ['C#', 'Avalonia UI', 'WebSocket'],
  },
  {
    id: 'concierge-ia', label: 'Concierge IA Airbnb', eyebrow: 'Projet personnel · 2024', orbit: 13.1, size: 0.3, speed: 0.17,
    style: 'exotic', colorA: '#3a2158', colorB: '#c99af5', glow: '#c99af5',
    desc: "Concierge IA pour locations Airbnb : automatisation des réponses voyageurs via intégration LLM.",
    tags: ['PHP', 'LLM', 'API REST'],
  },
]

const ABOUT = {
  id: null, label: 'Kader Bakayoko', eyebrow: 'Développeur Full-Stack', glow: '#ffb347',
  desc: "4 ans d'expérience (PHP/Symfony, React/Vue.js), actuellement en recherche d'un poste en CDI à partir de septembre 2026.",
  tags: ['PHP/Symfony', 'React/Vue.js', "4 ans d'XP", 'Dispo Sept. 2026'],
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function proceduralTexture(colorA, colorB, style) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size; canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colorA
  ctx.fillRect(0, 0, size, size)

  if (style === 'bands') {
    const bands = 8
    for (let i = 0; i < bands; i++) {
      ctx.globalAlpha = 0.28
      ctx.fillStyle = i % 2 === 0 ? colorB : colorA
      const h = size / bands
      ctx.fillRect(0, i * h, size, h * (0.5 + Math.random() * 0.5))
    }
  } else if (style === 'rocky') {
    for (let i = 0; i < 160; i++) {
      const r = Math.random() * 5 + 1
      ctx.beginPath()
      ctx.arc(Math.random() * size, Math.random() * size, r, 0, Math.PI * 2)
      ctx.fillStyle = colorB
      ctx.globalAlpha = 0.1 + Math.random() * 0.2
      ctx.fill()
    }
  } else {
    for (let i = 0; i < 12; i++) {
      ctx.beginPath()
      ctx.strokeStyle = colorB
      ctx.globalAlpha = 0.22
      ctx.lineWidth = 2 + Math.random() * 3
      const y = Math.random() * size
      ctx.moveTo(0, y)
      ctx.bezierCurveTo(size * 0.3, y + (Math.random() * 40 - 20), size * 0.7, y + (Math.random() * 40 - 20), size, y + (Math.random() * 20 - 10))
      ctx.stroke()
    }
  }
  ctx.globalAlpha = 1
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function makeLabelSprite(text, color) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const fontSize = 40
  ctx.font = `${fontSize}px "Space Mono", monospace`
  const width = Math.ceil(ctx.measureText(text.toUpperCase()).width) + 40
  canvas.width = width; canvas.height = 64
  ctx.font = `${fontSize}px "Space Mono", monospace`
  ctx.fillStyle = color
  ctx.textBaseline = 'middle'
  ctx.globalAlpha = 0.85
  ctx.fillText(text.toUpperCase(), 20, 34)
  const tex = new THREE.CanvasTexture(canvas)
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(width / 64, 1, 1)
  return sprite
}

export default function SolarSystem3D() {
  const mountRef = useRef(null)
  const apiRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [webglFailed, setWebglFailed] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x05070f)
    scene.fog = new THREE.FogExp2(0x05070f, 0.012)

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 300)
    const OVERVIEW_DIST = 19
    camera.position.set(0, 8.5, OVERVIEW_DIST)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true })
    } catch {
      setWebglFailed(true)
      return
    }
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.minDistance = 2
    controls.maxDistance = 30
    controls.maxPolarAngle = Math.PI * 0.85
    controls.enablePan = false

    // lights
    scene.add(new THREE.AmbientLight(0x2a3050, 0.55))
    const sunLight = new THREE.PointLight(0xffd9a0, 3.2, 60, 1.4)
    scene.add(sunLight)

    // starfield
    {
      const starCount = 3200
      const positions = new Float32Array(starCount * 3)
      for (let i = 0; i < starCount; i++) {
        const r = 60 + Math.random() * 140
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = r * Math.cos(phi)
        positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const mat = new THREE.PointsMaterial({ color: 0xece6d6, size: 0.11, sizeAttenuation: true, transparent: true, opacity: 0.75 })
      const stars = new THREE.Points(geo, mat)
      scene.add(stars)
    }

    // sun
    const sunGeo = new THREE.SphereGeometry(1.4, 48, 48)
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffb347 })
    const sunMesh = new THREE.Mesh(sunGeo, sunMat)
    scene.add(sunMesh)
    const glowSprite = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 256
      const ctx = c.getContext('2d')
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
      g.addColorStop(0, 'rgba(255,200,120,0.55)')
      g.addColorStop(1, 'rgba(255,200,120,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 256, 256)
      const tex = new THREE.CanvasTexture(c)
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
      const s = new THREE.Sprite(mat)
      s.scale.set(7, 7, 1)
      return s
    })()
    scene.add(glowSprite)

    // orbit paths + planets
    const orbitGroup = new THREE.Group()
    scene.add(orbitGroup)
    const planetGroup = new THREE.Group()
    scene.add(planetGroup)

    const pivots = PLANETS.map((p) => {
      const orbitCurve = new THREE.EllipseCurve(0, 0, p.orbit, p.orbit, 0, Math.PI * 2)
      const pts = orbitCurve.getPoints(128).map((pt) => new THREE.Vector3(pt.x, 0, pt.y))
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(pts)
      const orbitMat = new THREE.LineDashedMaterial({ color: 0xece6d6, transparent: true, opacity: 0.18, dashSize: 0.22, gapSize: 0.22 })
      const orbitLine = new THREE.Line(orbitGeo, orbitMat)
      orbitLine.computeLineDistances()
      orbitGroup.add(orbitLine)

      const pivot = new THREE.Object3D()
      pivot.rotation.y = Math.random() * Math.PI * 2
      planetGroup.add(pivot)

      const tex = proceduralTexture(p.colorA, p.colorB, p.style)
      const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: p.style === 'ice' ? 0.35 : 0.85, metalness: 0.05 })
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(p.size, 32, 32), mat)
      mesh.position.set(p.orbit, 0, 0)
      mesh.userData.planetId = p.id
      pivot.add(mesh)

      if (p.ring) {
        const ringGeo = new THREE.RingGeometry(p.size * 1.4, p.size * 2.2, 48)
        const ringMat = new THREE.MeshBasicMaterial({ color: p.colorB, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.rotation.x = Math.PI / 2.4
        mesh.add(ring)
      }

      const label = makeLabelSprite(p.label, '#ece6d6')
      label.position.set(p.orbit, p.size + 0.45, 0)
      label.userData.planetId = p.id
      pivot.add(label)

      return { def: p, pivot, mesh, label, angle: pivot.rotation.y }
    })

    // ── interaction state ──────────────────────────────────────────
    let focusId = null
    let transition = { active: false, fromDist: OVERVIEW_DIST, toDist: OVERVIEW_DIST, t: 0, duration: 1.1 }
    let hovered = null
    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    const tmpVec = new THREE.Vector3()

    function focusDistanceFor(id) {
      if (!id) return OVERVIEW_DIST
      const found = pivots.find((pl) => pl.def.id === id)
      return found ? found.def.size * 4.6 + 2.2 : OVERVIEW_DIST
    }

    function startTransition(toDist) {
      transition.fromDist = camera.position.distanceTo(controls.target)
      transition.toDist = toDist
      transition.t = 0
      transition.active = true
    }

    function selectPlanet(def) {
      focusId = def.id
      startTransition(focusDistanceFor(def.id))
      setSelected(def)
    }

    function deselect() {
      focusId = null
      startTransition(OVERVIEW_DIST)
      setSelected(null)
    }

    function showAbout() {
      focusId = null
      startTransition(OVERVIEW_DIST)
      setSelected(ABOUT)
    }

    apiRef.current = { deselect }

    function pick(clientX, clientY) {
      const rect = renderer.domElement.getBoundingClientRect()
      ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1
      ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(ndc, camera)
      const targets = pivots.map((pl) => pl.mesh).concat([sunMesh])
      const hits = raycaster.intersectObjects(targets, false)
      return hits[0]?.object || null
    }

    function onPointerMove(e) {
      const hit = pick(e.clientX, e.clientY)
      if (hit !== hovered) {
        if (hovered && hovered !== sunMesh) hovered.scale.setScalar(1)
        hovered = hit
        if (hovered && hovered !== sunMesh) hovered.scale.setScalar(1.15)
        renderer.domElement.style.cursor = hovered ? 'pointer' : 'grab'
      }
    }

    function onClick(e) {
      const hit = pick(e.clientX, e.clientY)
      if (!hit) { if (focusId) deselect(); return }
      if (hit === sunMesh) { showAbout(); return }
      const entry = pivots.find((pl) => pl.mesh === hit)
      if (entry) selectPlanet(entry.def)
    }

    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('click', onClick)

    function resize() {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    let raf = null
    let last = performance.now()
    function tick(now) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      pivots.forEach((pl) => {
        pl.angle += pl.def.speed * dt * 0.35
        pl.pivot.rotation.y = pl.angle
        pl.mesh.rotation.y += dt * 0.6
      })

      const desiredTarget = focusId ? pivots.find((pl) => pl.def.id === focusId)?.mesh.getWorldPosition(tmpVec) : new THREE.Vector3(0, 0, 0)
      if (desiredTarget) controls.target.lerp(desiredTarget, Math.min(1, dt * 3))

      if (transition.active) {
        transition.t = Math.min(1, transition.t + dt / transition.duration)
        const e = easeInOutCubic(transition.t)
        const dist = THREE.MathUtils.lerp(transition.fromDist, transition.toDist, e)
        const dir = camera.position.clone().sub(controls.target)
        if (dir.lengthSq() < 1e-6) dir.set(0, 0.5, 1)
        dir.normalize()
        camera.position.copy(controls.target).addScaledVector(dir, dist)
        if (transition.t >= 1) transition.active = false
      }

      glowSprite.position.copy(sunMesh.position)
      controls.update()
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('click', onClick)
      controls.dispose()
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((m) => { if (m.map) m.map.dispose(); m.dispose() })
        }
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  if (webglFailed) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: 24 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: 'var(--paper-dim)', maxWidth: '40ch' }}>
          La scène 3D nécessite WebGL, indisponible sur ce navigateur. Le reste du site fonctionne normalement.
        </p>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0, cursor: 'grab' }} />

      {selected && (
        <div style={{
          position: 'absolute', bottom: 'clamp(16px, 4vh, 40px)', left: '50%', transform: 'translateX(-50%)',
          width: 'min(420px, 88vw)', background: 'rgba(10,13,26,0.88)', backdropFilter: 'blur(10px)',
          border: '1px solid var(--line)', borderTop: `2px solid ${selected.glow}`,
          padding: '22px 24px', zIndex: 10,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: selected.glow, marginBottom: 6 }}>
                {selected.eyebrow}
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontStyle: 'italic', color: 'var(--paper)' }}>
                {selected.label}
              </h3>
            </div>
            <button onClick={() => apiRef.current?.deselect()} aria-label="Fermer" style={{
              width: 26, height: 26, border: '1px solid var(--line)', color: 'var(--paper-dim)', fontSize: 15, flexShrink: 0,
            }}>×</button>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--paper-dim)', marginTop: 12 }}>
            {selected.desc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
            {selected.tags.map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--paper)', border: '1px solid var(--line)', padding: '4px 9px' }}>{t}</span>
            ))}
          </div>
        </div>
      )}

      <p style={{
        position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--paper-faint)', pointerEvents: 'none',
      }}>
        Glisser pour tourner · molette pour zoomer · clic sur une planète
      </p>
    </div>
  )
}
