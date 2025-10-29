"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Floating particles that react to mouse
function Particles({ count = 100 }) {
  const points = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];

      // Wave effect
      positions[i3 + 2] =
        Math.sin(clock.elapsedTime * 0.5 + x * 0.5) * 0.5 +
        Math.cos(clock.elapsedTime * 0.3 + y * 0.5) * 0.5;

      // Mouse interaction
      const dx = x - mouse.x * 5;
      const dy = y - mouse.y * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 1 - dist / 3);

      positions[i3] +=
        (Math.random() - 0.5) * 0.01 + (mouse.x - x) * force * 0.01;
      positions[i3 + 1] +=
        (Math.random() - 0.5) * 0.01 + (mouse.y - y) * force * 0.01;

      // Boundary check
      if (Math.abs(positions[i3]) > 5) positions[i3] *= 0.95;
      if (Math.abs(positions[i3 + 1]) > 5) positions[i3 + 1] *= 0.95;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#0066ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main animated mesh with morphing
function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { mouse, viewport } = useThree();
  const [hovered, setHovered] = useState(false);
  const targetRotation = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });

  // Store original positions for morphing
  const geometryRef = useRef<THREE.IcosahedronGeometry>(null);
  const originalPositions = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (geometryRef.current && !originalPositions.current) {
      const positions = geometryRef.current.attributes.position
        .array as Float32Array;
      originalPositions.current = new Float32Array(positions);
    }
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = clock.elapsedTime;

    // Smooth mouse follow
    targetRotation.current.x = THREE.MathUtils.lerp(
      targetRotation.current.x,
      pointer.y * 0.5,
      0.05
    );
    targetRotation.current.y = THREE.MathUtils.lerp(
      targetRotation.current.y,
      pointer.x * 0.5,
      0.05
    );

    meshRef.current.rotation.x = time * 0.15 + targetRotation.current.x;
    meshRef.current.rotation.y = time * 0.2 + targetRotation.current.y;
    meshRef.current.rotation.z = time * 0.05;

    // Dynamic position based on mouse
    targetPosition.current.x = THREE.MathUtils.lerp(
      targetPosition.current.x,
      pointer.x * 0.3,
      0.03
    );
    targetPosition.current.y = THREE.MathUtils.lerp(
      targetPosition.current.y,
      pointer.y * 0.3,
      0.03
    );

    meshRef.current.position.x = targetPosition.current.x;
    meshRef.current.position.y = targetPosition.current.y;

    // Hover scale effect
    const targetScale = hovered ? 2.3 : 2;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Morphing vertices
    if (geometryRef.current && originalPositions.current) {
      const positions = geometryRef.current.attributes.position
        .array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions.current[i];
        const y = originalPositions.current[i + 1];
        const z = originalPositions.current[i + 2];

        // Create wave displacement
        const distance = Math.sqrt(x * x + y * y + z * z);
        const wave = Math.sin(distance * 3 - time * 2) * 0.08;
        const wave2 = Math.cos(distance * 2 + time * 1.5) * 0.05;

        // Mouse influence
        const mouseInfluence = Math.max(
          0,
          1 - Math.abs(pointer.x * viewport.width - x) / 2
        );

        positions[i] = x * (1 + wave + wave2 + mouseInfluence * 0.1);
        positions[i + 1] = y * (1 + wave + wave2 + mouseInfluence * 0.1);
        positions[i + 2] = z * (1 + wave + wave2 + mouseInfluence * 0.1);
      }

      geometryRef.current.attributes.position.needsUpdate = true;
      geometryRef.current.computeVertexNormals();
    }

    // Animate material properties
    materialRef.current.emissiveIntensity =
      0.3 + Math.sin(time * 1.5) * 0.2 + (hovered ? 0.3 : 0);
    materialRef.current.metalness = 0.8 + Math.sin(time * 0.5) * 0.1;
  });

  return (
    <mesh
      ref={meshRef}
      scale={2}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <icosahedronGeometry ref={geometryRef} args={[1, 4]} />
      <meshPhysicalMaterial
        ref={materialRef}
        color="#0066ff"
        emissive="#0066ff"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.9}
        wireframe={false}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

// Animated ring that pulses
function Ring() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;

    const time = clock.elapsedTime;
    ringRef.current.rotation.x = time * 0.1;
    ringRef.current.rotation.y = time * 0.15;

    const scale = 1 + Math.sin(time * 1.5) * 0.15;
    ringRef.current.scale.set(scale, scale, 0.05);
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -1]}>
      <torusGeometry args={[2, 0.05, 16, 100]} />
      <meshBasicMaterial color="#0066ff" transparent opacity={0.3} wireframe />
    </mesh>
  );
}

export function LiquidMeshScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      className="w-full h-full"
      dpr={[1, 2]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
    >
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#0066ff" />
      <pointLight position={[0, 0, -10]} intensity={0.5} color="#00ffff" />
      <spotLight
        position={[5, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        castShadow
      />

      {/* Scene elements */}
      <Ring />
      <AnimatedMesh />
      <Particles count={150} />

      {/* Fog for depth */}
      <fog attach="fog" args={["#000000", 5, 15]} />
    </Canvas>
  );
}
