"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTheme } from "next-themes"
import type * as THREE from "three"

function LiquidMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()
  const { mouse } = useThree()
  const positionRef = useRef(new Float32Array())
  const originalPositionRef = useRef(new Float32Array())

  useEffect(() => {
    if (!meshRef.current) return

    const geometry = meshRef.current.geometry as THREE.BufferGeometry
    const positions = geometry.attributes.position.array as Float32Array

    positionRef.current = new Float32Array(positions)
    originalPositionRef.current = new Float32Array(positions)
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const geometry = meshRef.current.geometry as THREE.BufferGeometry
    const positions = geometry.attributes.position.array as Float32Array
    const original = originalPositionRef.current

    // Mouse interaction
    const mouseX = mouse.x * 2
    const mouseY = mouse.y * 2

    for (let i = 0; i < positions.length; i += 3) {
      const x = original[i]
      const y = original[i + 1]
      const z = original[i + 2]

      // Distance from mouse
      const dx = x - mouseX
      const dy = y - mouseY
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Wave effect
      const wave = Math.sin(clock.elapsedTime + distance * 2) * 0.1
      const mouseInfluence = Math.max(0, 1 - distance / 3) * 0.3

      positions[i] = x + Math.sin(clock.elapsedTime * 0.5 + x) * 0.05 + mouseInfluence * dx * 0.1 + wave
      positions[i + 1] = y + Math.cos(clock.elapsedTime * 0.5 + y) * 0.05 + mouseInfluence * dy * 0.1 + wave
      positions[i + 2] = z + Math.sin(clock.elapsedTime * 0.3) * 0.05
    }

    geometry.attributes.position.needsUpdate = true
  })

  const accentColor = theme === "dark" ? "#0066ff" : "#0066ff"

  return (
    <mesh ref={meshRef} scale={2}>
      <icosahedronGeometry args={[1, 6]} />
      <meshPhongMaterial
        color={accentColor}
        emissive={accentColor}
        emissiveIntensity={0.3}
        wireframe={false}
        shininess={100}
      />
    </mesh>
  )
}

export function LiquidMeshScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 75 }} className="w-full h-full" dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#0066ff" />
      <LiquidMesh />
    </Canvas>
  )
}
