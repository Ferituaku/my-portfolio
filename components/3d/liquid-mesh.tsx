"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Hook to track scroll progress
function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollProgress;
}

// Floating particles that react to mouse and scroll
function Particles({
  count = 100,
  scrollProgress,
}: {
  count?: number;
  scrollProgress: number;
}) {
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

    // Spread particles based on scroll
    const spread = 1 + scrollProgress * 9;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];

      // Wave effect that changes with scroll
      positions[i3 + 2] =
        Math.sin(clock.elapsedTime * (0.5 + scrollProgress) + x * 0.5) * 0.5 +
        Math.cos(clock.elapsedTime * (0.3 + scrollProgress) + y * 0.5) * 0.5;

      // Mouse interaction
      const dx = x - mouse.x * 5;
      const dy = y - mouse.y * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 1 - dist / 3);

      positions[i3] +=
        (Math.random() - 0.5) * 0.01 + (mouse.x - x) * force * 0.01;
      positions[i3 + 1] +=
        (Math.random() - 0.5) * 0.01 + (mouse.y - y) * force * 0.01;

      // Boundary check with scroll-based spread
      const maxSpread = 5 * spread;
      if (Math.abs(positions[i3]) > maxSpread) positions[i3] *= 0.95;
      if (Math.abs(positions[i3 + 1]) > maxSpread) positions[i3 + 1] *= 0.95;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  // Color changes with scroll
  const particleColor = useMemo(() => {
    return new THREE.Color().setHSL(0.6 - scrollProgress * 0.3, 1, 0.5);
  }, [scrollProgress]);

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
        size={0.05 * (1 + scrollProgress * 0.5)}
        color={particleColor}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main animated mesh with morphing and scroll reactivity
function AnimatedMesh({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { mouse, viewport } = useThree();
  const [hovered, setHovered] = useState(false);
  const targetRotation = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });

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

    // Rotation speed changes with scroll
    const rotationSpeed = 0.15 * (1 + scrollProgress * 2);
    meshRef.current.rotation.x =
      time * rotationSpeed + targetRotation.current.x;
    meshRef.current.rotation.y =
      time * (rotationSpeed * 1.3) + targetRotation.current.y;
    meshRef.current.rotation.z = time * 0.05 * (1 + scrollProgress);

    // Dynamic position based on mouse and scroll
    targetPosition.current.x = THREE.MathUtils.lerp(
      targetPosition.current.x,
      pointer.x * 0.3,
      0.03
    );
    targetPosition.current.y = THREE.MathUtils.lerp(
      targetPosition.current.y,
      pointer.y * 0.3 + scrollProgress * 2,
      0.03
    );

    meshRef.current.position.x = targetPosition.current.x;
    meshRef.current.position.y = targetPosition.current.y;

    // Scale changes with scroll
    const baseScale = 2 - scrollProgress * 0.5;
    const targetScale = hovered ? baseScale * 1.15 : baseScale;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Morphing vertices with scroll influence
    if (geometryRef.current && originalPositions.current) {
      const positions = geometryRef.current.attributes.position
        .array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions.current[i];
        const y = originalPositions.current[i + 1];
        const z = originalPositions.current[i + 2];

        const distance = Math.sqrt(x * x + y * y + z * z);

        // Wave intensity increases with scroll
        const waveIntensity = 0.08 * (1 + scrollProgress * 2);
        const wave =
          Math.sin(distance * (3 + scrollProgress * 2) - time * 2) *
          waveIntensity;
        const wave2 =
          Math.cos(distance * 2 + time * 1.5) * (0.05 + scrollProgress * 0.1);

        // Mouse influence
        const mouseInfluence = Math.max(
          0,
          1 - Math.abs(pointer.x * viewport.width - x) / 2
        );

        // Scroll creates more dramatic deformation
        const scrollDeform =
          Math.sin(time + scrollProgress * 10) * scrollProgress * 0.15;

        positions[i] =
          x * (1 + wave + wave2 + mouseInfluence * 0.1 + scrollDeform);
        positions[i + 1] =
          y * (1 + wave + wave2 + mouseInfluence * 0.1 + scrollDeform);
        positions[i + 2] =
          z * (1 + wave + wave2 + mouseInfluence * 0.1 + scrollDeform);
      }

      geometryRef.current.attributes.position.needsUpdate = true;
      geometryRef.current.computeVertexNormals();
    }

    // Material properties change with scroll
    materialRef.current.emissiveIntensity =
      0.3 +
      Math.sin(time * 1.5) * 0.2 +
      (hovered ? 0.3 : 0) +
      scrollProgress * 0.4;
    materialRef.current.metalness =
      0.8 + Math.sin(time * 0.5) * 0.1 + scrollProgress * 0.2;
    materialRef.current.roughness = 0.2 - scrollProgress * 0.15;
  });

  // Color transitions with scroll
  const meshColor = useMemo(() => {
    return new THREE.Color().setHSL(0.6 - scrollProgress * 0.3, 1, 0.5);
  }, [scrollProgress]);

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
        color={meshColor}
        emissive={meshColor}
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

// Animated ring that reacts to scroll
// function Ring({ scrollProgress }: { scrollProgress: number }) {
//   const ringRef = useRef<THREE.Mesh>(null);

//   useFrame(({ clock }) => {
//     if (!ringRef.current) return;

//     const time = clock.elapsedTime;

//     // Rotation speed increases with scroll
//     ringRef.current.rotation.x = time * (0.1 + scrollProgress * 0.3);
//     ringRef.current.rotation.y = time * (0.15 + scrollProgress * 0.4);

//     // Scale pulses with scroll influence
//     const scale =
//       (1 + Math.sin(time * 1.5) * 0.15) * (1 + scrollProgress * 0.5);
//     ringRef.current.scale.set(scale, scale, 0.05);

//     // Move ring based on scroll
//     ringRef.current.position.z = -1 - scrollProgress * 2;
//   });

//   const ringColor = useMemo(() => {
//     return new THREE.Color().setHSL(0.6 - scrollProgress * 0.3, 1, 0.5);
//   }, [scrollProgress]);

//   return (
//     <mesh ref={ringRef} position={[0, 0, -1]}>
//       <torusGeometry args={[2 + scrollProgress * 0.5, 0.05, 16, 100]} />
//       <meshBasicMaterial
//         color={ringColor}
//         transparent
//         opacity={0.3 + scrollProgress * 0.2}
//         wireframe
//       />
//     </mesh>
//   );
// }

// Camera controller for scroll-based movement
function ScrollCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Camera zooms out and moves as you scroll
    const targetZ = 5 + scrollProgress * 3;
    const targetY = scrollProgress * -2;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);

    // Look at changes slightly with scroll
    camera.lookAt(0, scrollProgress * 0.5, 0);
  });

  return null;
}

// Scene component that receives scroll progress
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      {/* Lighting setup with scroll-reactive intensity */}
      <ambientLight intensity={0.4 + scrollProgress * 0.3} />
      <pointLight
        position={[10, 10, 10]}
        intensity={1.2 + scrollProgress * 0.5}
        color="#ffffff"
      />
      <pointLight
        position={[-10, -10, 10]}
        intensity={0.8 + scrollProgress * 0.4}
        color={new THREE.Color().setHSL(0.6 - scrollProgress * 0.3, 1, 0.5)}
      />
      <pointLight
        position={[0, 0, -10]}
        intensity={0.5 + scrollProgress * 0.3}
        color={new THREE.Color().setHSL(0.55 - scrollProgress * 0.2, 1, 0.6)}
      />
      <spotLight
        position={[5, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={1 + scrollProgress * 0.5}
        castShadow
      />

      {/* Scene elements */}
      <ScrollCamera scrollProgress={scrollProgress} />
      {/* <Ring scrollProgress={scrollProgress} /> */}
      {/* <AnimatedMesh scrollProgress={scrollProgress} /> */}
      <Particles count={150} scrollProgress={scrollProgress} />

      {/* Fog that intensifies with scroll */}
      <fog
        attach="fog"
        args={["#000000", 5 + scrollProgress * 2, 15 + scrollProgress * 5]}
      />
    </>
  );
}

export function LiquidMeshScene() {
  const [mounted, setMounted] = useState(false);
  const scrollProgress = useScrollProgress();

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
      <Scene scrollProgress={scrollProgress} />
    </Canvas>
  );
}
