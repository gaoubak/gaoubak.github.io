import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useRef, useMemo } from 'react'
import { TextureLoader, AdditiveBlending, DoubleSide } from 'three'

/* ─── Shaders ────────────────────────────────────────────────── */
const vs = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Removes the uniform gray background from the Bungie character viewer export
// and adds a radial fade so the character blends into the environment
const fs = /* glsl */ `
  uniform sampler2D mapA;
  uniform sampler2D mapB;
  uniform float mixFactor;
  varying vec2 vUv;

  float isGrayBg(vec3 c) {
    float maxC  = max(c.r, max(c.g, c.b));
    float minC  = min(c.r, min(c.g, c.b));
    float sat   = (maxC - minC) / (maxC + 0.001);
    float lum   = (c.r + c.g + c.b) / 3.0;
    // target neutral gray in [0.55 – 0.82] range
    return step(sat, 0.065) * step(0.55, lum) * step(lum, 0.82);
  }

  void main() {
    vec4 colA = texture2D(mapA, vUv);
    vec4 colB = texture2D(mapB, vUv);
    vec4 col  = mix(colA, colB, mixFactor);

    float bg  = isGrayBg(col.rgb);

    // Soft radial mask – fades edges, hides bg corners
    vec2 c    = vUv - vec2(0.5);
    float rad = 1.0 - smoothstep(0.28, 0.47, length(c * vec2(0.82, 1.06)));

    float alpha = (1.0 - bg) * rad;
    gl_FragColor = vec4(col.rgb, alpha);
  }
`

/* ─── Torus ring ─────────────────────────────────────────────── */
function Ring({ radius, opacity, speed }) {
  const ref = useRef()
  const axis = useMemo(() => {
    const v = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5]
    const len = Math.hypot(...v)
    return v.map(x => x / len)
  }, [])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.x += axis[0] * dt * speed
    ref.current.rotation.y += axis[1] * dt * speed
    ref.current.rotation.z += axis[2] * dt * speed
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.007, 8, 128]} />
      <meshBasicMaterial
        color="#5adaff"
        transparent
        opacity={opacity}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ─── Floating light particles ───────────────────────────────── */
function Particles({ count = 110 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 1.6 + Math.random() * 1.8
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * 0.85 * Math.sin(phi) * Math.sin(theta) + 0.2
      arr[i * 3 + 2] = r * 0.45 * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.0007
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#5adaff"
        transparent
        opacity={0.55}
        blending={AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Warm ambient glow behind character ─────────────────────── */
function CharacterGlow() {
  return (
    <mesh position={[0, 0.4, -0.6]}>
      <circleGeometry args={[2.4, 64]} />
      <meshBasicMaterial
        color="#c8a060"
        transparent
        opacity={0.07}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ─── Character plane (rotating through 4 angles) ───────────── */
function CharacterPlane({ textures }) {
  const matRef  = useRef()
  const meshRef = useRef()
  const t       = useRef(0)

  const uniforms = useMemo(() => ({
    mapA:      { value: textures[0] },
    mapB:      { value: textures[1] },
    mixFactor: { value: 0 },
  }), [textures])

  // Camera parallax ref
  const { camera } = useThree()

  useFrame((state, dt) => {
    t.current += dt

    // Slow auto-rotation: one full cycle every 16 s
    const cycle    = (t.current % 16) / 16
    const idx      = Math.floor(cycle * 4)
    const nextIdx  = (idx + 1) % 4
    const local    = (cycle * 4) % 1
    const mix      = local > 0.78 ? (local - 0.78) / 0.22 : 0

    if (matRef.current) {
      matRef.current.uniforms.mapA.value      = textures[idx]
      matRef.current.uniforms.mapB.value      = textures[nextIdx]
      matRef.current.uniforms.mixFactor.value = mix
    }

    // Idle float
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t.current * 0.65) * 0.045
    }

    // Subtle camera parallax on mouse
    const mx = state.mouse.x
    const my = state.mouse.y
    camera.position.x += (mx * 0.22 - camera.position.x) * 0.04
    camera.position.y += (my * 0.12 + 0.25 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return (
    <mesh ref={meshRef}>
      {/* aspect ratio matches the character portrait photos */}
      <planeGeometry args={[2.0, 3.4]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vs}
        fragmentShader={fs}
        uniforms={uniforms}
        transparent
        side={DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ─── Scene loaded inside Suspense ──────────────────────────── */
function Scene() {
  const textures = useLoader(TextureLoader, [
    '/character-front.jpg',
    '/character-side1.png',
    '/character-back.png',
    '/character-side2.png',
  ])

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 5]}  intensity={0.7} color="#d0c090" />
      <pointLight      position={[0, 2, 4]}   intensity={0.4} color="#5adaff" />
      <pointLight      position={[-3, -1, 2]} intensity={0.2} color="#9060d0" />

      <CharacterGlow />
      <Ring radius={2.9} opacity={0.13} speed={0.14} />
      <Ring radius={2.45} opacity={0.09} speed={0.19} />
      <Ring radius={2.0}  opacity={0.06} speed={0.09} />
      <Particles count={110} />
      <CharacterPlane textures={textures} />
    </>
  )
}

/* ─── Export ─────────────────────────────────────────────────── */
export default function CharacterCanvas() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0.25, 5.8], fov: 38 }}
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
