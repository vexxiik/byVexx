'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Float,
  RoundedBox,
  MeshTransmissionMaterial,
  ContactShadows,
  Edges,
} from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────
   MOUSE TRACKING FOR THE ENTIRE COMPOSITION
───────────────────────────────────────────────────────────── */
function MouseTracker({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse, viewport } = useThree();

  useFrame((state, delta) => {
    // Smoothly rotate the entire composition based on mouse position
    const targetX = (mouse.x * viewport.width) / 15;
    const targetY = (mouse.y * viewport.height) / 15;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetX,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -targetY,
      4,
      delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ─────────────────────────────────────────────────────────────
   MATERIALS
───────────────────────────────────────────────────────────── */
const glassMaterialProps = {
  backside: true,
  samples: 4,
  thickness: 0.2,
  roughness: 0.15,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  transmission: 1,
  ior: 1.5,
  chromaticAberration: 0.02,
  color: '#ffffff',
};

const metalMaterial = new THREE.MeshStandardMaterial({
  color: '#8b94a5', // Sleek, bright titanium/aluminum
  metalness: 1,
  roughness: 0.2,
  envMapIntensity: 1.5,
});

const accentMetalMaterial = new THREE.MeshStandardMaterial({
  color: '#3b82f6', // Vexx blue accent, metallic
  metalness: 0.8,
  roughness: 0.2,
  envMapIntensity: 1.5,
});

/* ─────────────────────────────────────────────────────────────
   ABSTRACT WEBSITE ANATOMY (The "Machine")
───────────────────────────────────────────────────────────── */
function AbstractWebsite() {
  return (
    <group position={[0, 0, 0]}>
      {/* ── BASE: The Canvas (Frosted Glass) ── */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <RoundedBox args={[3.2, 2.2, 0.05]} radius={0.1} smoothness={4} position={[0, 0, -0.2]}>
          <MeshTransmissionMaterial {...glassMaterialProps} />
          {/* Wireframe Outline for the base canvas */}
          <Edges scale={1} threshold={15} color="#c0c5d0" />
        </RoundedBox>
      </Float>

      {/* ── HEADER: Metallic bar ── */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
        <RoundedBox args={[2.8, 0.15, 0.04]} radius={0.05} smoothness={4} position={[0, 0.85, 0.1]}>
          <meshStandardMaterial {...metalMaterial} />
        </RoundedBox>
        {/* Abstract logo dot */}
        <mesh position={[-1.25, 0.85, 0.15]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial {...accentMetalMaterial} />
        </mesh>
        {/* Nav lines */}
        <mesh position={[1, 0.85, 0.12]}>
          <boxGeometry args={[0.4, 0.02, 0.02]} />
          <meshStandardMaterial {...metalMaterial} />
        </mesh>
      </Float>

      {/* ── HERO COMPONENT: Glass Pane + Abstract Data Core ── */}
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={1}>
        <group position={[0, 0.3, 0.3]}>
          <RoundedBox args={[2.8, 0.8, 0.05]} radius={0.08} smoothness={4}>
            <MeshTransmissionMaterial {...glassMaterialProps} roughness={0.05} thickness={0.4} />
          </RoundedBox>
          
          {/* The "Data Core" inside the hero - representing performance/analytics */}
          <Float speed={4} rotationIntensity={1} floatIntensity={0.5}>
            <mesh position={[0.8, 0, 0.15]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
              <icosahedronGeometry args={[0.25, 0]} />
              <meshStandardMaterial {...metalMaterial} wireframe={true} />
            </mesh>
            <mesh position={[0.8, 0, 0.15]}>
              <icosahedronGeometry args={[0.12, 1]} />
              <meshStandardMaterial {...accentMetalMaterial} />
            </mesh>
          </Float>

          {/* Hero UI skeleton lines */}
          <mesh position={[-0.6, 0.15, 0.08]}>
            <boxGeometry args={[1.2, 0.04, 0.02]} />
            <meshStandardMaterial {...metalMaterial} />
          </mesh>
          <mesh position={[-0.8, -0.05, 0.08]}>
            <boxGeometry args={[0.8, 0.02, 0.02]} />
            <meshStandardMaterial {...metalMaterial} />
          </mesh>
          <mesh position={[-0.8, -0.2, 0.08]}>
            <boxGeometry args={[0.8, 0.02, 0.02]} />
            <meshStandardMaterial {...metalMaterial} />
          </mesh>
        </group>
      </Float>

      {/* ── BENTO CARDS (The "Features") ── */}
      {/* Card 1: Left */}
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={1.2}>
        <group position={[-0.75, -0.5, 0.2]}>
          <RoundedBox args={[1.3, 0.6, 0.04]} radius={0.08} smoothness={4}>
            <MeshTransmissionMaterial {...glassMaterialProps} ior={1.3} />
            <Edges scale={1} threshold={15} color="#ffffff" />
          </RoundedBox>
          {/* Metallic data bars inside card */}
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[-0.3 + i * 0.3, -0.1 + i * 0.05, 0.05]}>
              <boxGeometry args={[0.15, 0.2 + i * 0.1, 0.04]} />
              <meshStandardMaterial {...(i === 2 ? accentMetalMaterial : metalMaterial)} />
            </mesh>
          ))}
        </group>
      </Float>

      {/* Card 2: Right */}
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.9}>
        <group position={[0.75, -0.5, 0.4]}>
          <RoundedBox args={[1.3, 0.6, 0.04]} radius={0.08} smoothness={4}>
            <MeshTransmissionMaterial {...glassMaterialProps} />
          </RoundedBox>
          {/* Wireframe sphere representing conversion/target */}
          <mesh position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial {...metalMaterial} wireframe={true} />
          </mesh>
        </group>
      </Float>

      {/* ── MECHANICAL CONNECTORS (The "Machine" aspect) ── */}
      {/* Structural rods connecting layers, showing it's a precision engineered object */}
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
        <mesh position={[-1.2, 0.3, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.6, 8]} />
          <meshStandardMaterial {...metalMaterial} />
        </mesh>
        <mesh position={[1.2, 0.3, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.6, 8]} />
          <meshStandardMaterial {...metalMaterial} />
        </mesh>
        
        {/* Connecting joints */}
        <mesh position={[-1.2, 0.3, 0.35]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial {...accentMetalMaterial} />
        </mesh>
        <mesh position={[1.2, 0.3, 0.35]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial {...accentMetalMaterial} />
        </mesh>
      </Float>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE SETUP
───────────────────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      {/* Environment for glass refractions and metal reflections */}
      <Environment preset="city" />

      {/* Lighting for an elegant, bright, clean look */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#e0e7ff" />
      
      {/* Subtle blue accent light from below */}
      <pointLight position={[0, -5, 2]} intensity={2} color="#3b82f6" distance={10} />

      <MouseTracker>
        <group position={[0, 0.2, 0]} rotation={[0.1, -0.2, 0]}>
          <AbstractWebsite />
        </group>
      </MouseTracker>

      {/* Elegant contact shadow underneath the floating composition */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.3}
        scale={10}
        blur={2}
        far={4}
        color="#8b94a5"
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPORTED CANVAS WRAPPER
───────────────────────────────────────────────────────────── */
export default function HeroSculpture() {
  return (
    <div className="w-full h-full relative cursor-default" style={{ perspective: '1000px' }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
