'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Cloud, Code2, Globe2, Layers3, Workflow } from 'lucide-react';
import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const walls = [
  { title: 'Software Engineering', short: 'Software', copy: 'Web platforms, mobile apps, and custom architecture shaped around real work.', tags: 'WEB · MOBILE · CUSTOM CODE', icon: Code2, screen: 'Web, mobile & APIs', metric: 'WEB / MOBILE / API', href: '/solutions#services', cta: 'EXPLORE SOFTWARE SERVICES' },
  { title: 'Business Systems & Automation', short: 'Automation', copy: 'School systems, operational workflows, and tools that give teams room to think.', tags: 'WORKFLOWS · INTEGRATIONS · ERP', icon: Workflow, screen: 'Connected operations', metric: 'WORKFLOW / SCHOOL / CRM', href: '/solutions#services', cta: 'EXPLORE AUTOMATION' },
  { title: 'Cloud & Infrastructure', short: 'Cloud', copy: 'Secure, resilient foundations for products that need to keep moving.', tags: 'AWS · FIREBASE · DEPLOYMENT', icon: Cloud, screen: 'Secure cloud architecture', metric: 'AWS / FIREBASE / DATA', href: '/solutions#services', cta: 'EXPLORE CLOUD SERVICES' },
  { title: 'Products & Innovation', short: 'Products', copy: 'Four CODETECHS projects span bean disease detection, e-commerce, institutional voting, and Choplifee food delivery.', tags: 'FLUTTER · REACT · NODE.JS · PAYSTACK · CHOPLIFEE', icon: Layers3, screen: 'Four selected project profiles', metric: 'AGRICULTURE / COMMERCE / VOTING / DELIVERY', href: '/solutions#work', cta: 'VIEW PROJECT PROFILES' },
  { title: 'Global Collaboration', short: 'Global', copy: 'Accra-rooted engineers working across borders, time zones, and industries.', tags: 'GOOGLE · CURSOR · HOSTINGER · AWS · FIREBASE', icon: Globe2, screen: 'Our remote engineering model', metric: 'ACCRA / REMOTE / GLOBAL', href: '/contact', cta: 'START A CONVERSATION' },
];

const panelContent = [
  { eyebrow: 'CAPABILITY / 01', title: 'Software Engineering', summary: 'Build digital products around the way your customers and teams work.', points: ['Web portals that bring services online', 'Flutter apps for customers on the move', 'APIs that connect existing tools and data'], tags: ['WEB', 'MOBILE', 'CUSTOM CODE'] },
  { eyebrow: 'CAPABILITY / 02', title: 'Business Systems', summary: 'Replace disconnected, repetitive tasks with clearer operations.', points: ['School administration in one system', 'Automated hand-offs, reminders, and approvals', 'Shared records across teams and workflows'], tags: ['SCHOOL', 'WORKFLOWS', 'INTEGRATIONS'] },
  { eyebrow: 'CAPABILITY / 03', title: 'Cloud & Infrastructure', summary: 'Plan the foundations that keep products dependable as they grow.', points: ['Cloud hosting and application architecture', 'Authentication, access, and data protection', 'Deployments, backups, and system monitoring'], tags: ['AWS', 'FIREBASE', 'DEPLOYMENT'] },
  { eyebrow: 'SELECTED PROJECTS / 04', title: 'Products & Innovation', summary: 'Four products across agricultural technology, online commerce, institutional voting, and food delivery.', points: ['Bean Disease Detection — cross-platform Flutter app for precision farming', 'E-Commerce Platform — React and Node.js; Vote System — Paystack, SMS, and USSD', 'Choplifee — food delivery application'], tags: ['FLUTTER', 'REACT · NODE.JS', 'PAYSTACK · SMS · USSD'] },
  { eyebrow: 'OUR MODEL / 05', title: 'Global Collaboration', summary: 'Ghana-founded and remote-first, with collaboration built into delivery.', points: ['Accra roots with partners across time zones', 'Shared milestones, reviews, and regular decisions', 'Tools selected to fit each team and project'], tags: ['ACCRA', 'REMOTE', 'GLOBAL'] },
];

function drawWrappedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  let line = '';
  const words = text.split(' ');
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > maxWidth) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else line = next;
  }
  if (line) ctx.fillText(line, x, y);
}

function createPanelTexture(index: number, mobile = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 616;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);
  const content = panelContent[index];
  const background = ctx.createLinearGradient(0, 0, 1024, 616);
  background.addColorStop(0, '#151c1c');
  background.addColorStop(1, '#090e0f');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 1024, 616);
  ctx.strokeStyle = 'rgba(212,175,55,.7)';
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 16, 992, 584);
  ctx.fillStyle = '#d4af37';
  ctx.font = '600 20px Arial, sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText(`CODETECHS   /   ${content.eyebrow}`, 54, 70);
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 48px Arial, sans-serif';
  ctx.letterSpacing = '0px';
  ctx.fillText(content.title, 54, 145);
  ctx.fillStyle = '#c8d0cb';
  ctx.font = '26px Arial, sans-serif';
  drawWrappedText(ctx, content.summary, 54, 198, 820, 32);
  ctx.strokeStyle = 'rgba(255,255,255,.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(54, 232);
  ctx.lineTo(970, 232);
  ctx.stroke();
  ctx.font = '22px Arial, sans-serif';
  (mobile ? content.points.slice(0, 1) : content.points).forEach((point, i) => {
    const y = 290 + i * 78;
    ctx.fillStyle = i === 0 ? '#e6c458' : '#8fc7bb';
    ctx.beginPath();
    ctx.arc(66, y - 8, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e9ece8';
    drawWrappedText(ctx, point, 88, y, 650, 28);
  });
  let x = 54;
  ctx.font = '600 16px Arial, sans-serif';
  for (const tag of (mobile ? content.tags.slice(0, 2) : content.tags)) {
    const width = ctx.measureText(tag).width + 30;
    ctx.fillStyle = 'rgba(212,175,55,.12)';
    ctx.fillRect(x, 520, width, 38);
    ctx.strokeStyle = 'rgba(212,175,55,.55)';
    ctx.strokeRect(x, 520, width, 38);
    ctx.fillStyle = '#ead69b';
    ctx.fillText(tag, x + 15, 545);
    x += width + 12;
  }
  ctx.fillStyle = '#9ca8a2';
  ctx.font = '14px Arial, sans-serif';
  ctx.fillText(index === 3 ? 'PROJECT FOCUS ONLY  ·  CLIENT SYSTEMS AND SOURCE CODE STAY PRIVATE' : 'CUSTOM SOFTWARE  ·  BUILT WITH CLIENTS  ·  DESIGNED TO SHIP', 54, 580);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function CodeFall() {
  const ref = useRef<THREE.Points>(null);
  const points = useMemo(() => {
    const count = 760, pos = new Float32Array(count * 3), colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { pos[i * 3] = (Math.random() - .5) * 20; pos[i * 3 + 1] = Math.random() * 13 - 3; pos[i * 3 + 2] = (Math.random() - .5) * 11 + 7; const gold = Math.random() > .45; colors[i * 3] = gold ? .83 : .75; colors[i * 3 + 1] = gold ? .65 : .79; colors[i * 3 + 2] = gold ? .28 : .88; }
    return { pos, colors };
  }, []);
  useFrame((_, dt) => { if (!ref.current) return; const a = ref.current.geometry.attributes.position as THREE.BufferAttribute; for (let i = 0; i < a.count; i++) { let y = a.getY(i) - dt * (1.3 + (i % 7) * .11); if (y < -6) y = 10; a.setY(i, y); } a.needsUpdate = true; });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[points.pos, 3]} /><bufferAttribute attach="attributes-color" args={[points.colors, 3]} /></bufferGeometry><pointsMaterial size={.045} vertexColors transparent opacity={.92} depthWrite={false} /></points>;
}

function ScreenPanels({ active, mobile }: { active: number; mobile: boolean }) {
  const textures = useMemo(() => panelContent.map((_, i) => createPanelTexture(i, mobile)), [mobile]);
  const angles = [-.3, -1.0, -1.7, -2.4, -3.1];
  return <group>{angles.map((angle, i) => { const tex = textures[i % textures.length]; return <group key={i} position={[Math.sin(angle) * 9.6, 1.9, Math.cos(angle) * 9.6]} rotation={[0, angle + Math.PI, 0]} scale={mobile ? .86 : 1}>
    <mesh position={[0, 0, -.11]}><boxGeometry args={[4.55, 2.85, .18]} /><meshStandardMaterial color="#343834" metalness={.28} roughness={.48} emissive="#171b19" emissiveIntensity={.45} /></mesh>
    <mesh position={[0, 0, -.005]}><planeGeometry args={[4.28, 2.58]} /><meshBasicMaterial map={tex} color={active === i ? '#ffffff' : '#e5eee9'} transparent opacity={active === i ? 1 : .88} side={THREE.DoubleSide} toneMapped={false} /></mesh>
    {[-1, 1].map(side => <mesh key={`edge-${side}`} position={[side * 2.17, 0, .012]}><planeGeometry args={[.025, 2.62]} /><meshBasicMaterial color={active === i ? '#f0c653' : '#b6c8bc'} toneMapped={false} /></mesh>)}
    {[-1, 1].map(side => <mesh key={`rail-${side}`} position={[0, side * 1.31, .012]}><planeGeometry args={[4.35, .025]} /><meshBasicMaterial color={active === i ? '#f0c653' : '#b6c8bc'} toneMapped={false} /></mesh>)}
    <group position={[1.55, .08, .1]} scale={.76}><DivisionVisual division={i} /></group>
    <pointLight position={[0, 0, .45]} color={active === i ? '#f1c95b' : '#b7d0cc'} intensity={active === i ? 7 : 1.8} distance={8} />
  </group>; })}</group>;
}

function DivisionVisual({ division }: { division: number }) {
  if (division === 0) return <group position={[0, .14, .1]}>{[-1.05, 0, 1.05].map((x, i) => <group key={x} position={[x, 0, 0]}><mesh><boxGeometry args={[i === 1 ? 1.05 : .68, i === 1 ? .66 : 1.12, .055]} /><meshStandardMaterial color="#0c1212" metalness={.45} roughness={.3} emissive="#17302d" emissiveIntensity={.22} /></mesh>{Array.from({ length: i === 1 ? 5 : 3 }, (_, n) => <mesh key={n} position={[0, (i === 1 ? .21 : .39) - n * .105, .036]}><boxGeometry args={[i === 1 ? .77 : .45, .018, .008]} /><meshBasicMaterial color={n === 0 ? '#d4af37' : '#76bbb2'} /></mesh>)}</group>)}</group>;
  if (division === 1) return <group position={[0, .2, .1]}>{[-1.22, -.42, .42, 1.22].map((x, i) => <group key={x} position={[x, i % 2 ? .22 : 0, 0]}><mesh><boxGeometry args={[.43, .32, .05]} /><meshStandardMaterial color="#101515" emissive="#183d38" emissiveIntensity={.32} /></mesh><mesh position={[0, -.22, 0]}><sphereGeometry args={[.055, 12, 12]} /><meshBasicMaterial color={i === 2 ? '#d4af37' : '#8fcac0'} /></mesh></group>)}{[-.82, 0, .82].map((x, i) => <mesh key={x} position={[x, .16 + (i % 2) * .22, -.02]}><boxGeometry args={[.72, .012, .012]} /><meshBasicMaterial color="#d4af37" /></mesh>)}</group>;
  if (division === 2) return <group position={[0, .2, .1]}>{[-1, 0, 1].map((x, i) => <group key={x} position={[x, 0, 0]}>{Array.from({ length: 3 }, (_, n) => <mesh key={n} position={[0, -.3 + n * .29, 0]}><boxGeometry args={[.45, .2, .12]} /><meshStandardMaterial color="#171d1e" metalness={.65} emissive="#172321" emissiveIntensity={.4} /></mesh>)}</group>)}{[-.53, .53].map(x => <mesh key={x} position={[x, 0, -.02]}><boxGeometry args={[.55, .015, .015]} /><meshBasicMaterial color="#c7ab65" /></mesh>)}</group>;
  if (division === 3) return <group position={[0, .18, .1]}>{[-1.15, 0, 1.15].map((x, i) => <group key={x} position={[x, 0, 0]}><mesh><boxGeometry args={[.88, .9, .05]} /><meshStandardMaterial color="#101515" metalness={.35} emissive={i === 1 ? '#2c2618' : '#172422'} emissiveIntensity={.4} /></mesh><mesh position={[0, .17, .032]}><boxGeometry args={[.66, .28, .012]} /><meshBasicMaterial color={i === 1 ? '#8c7441' : '#345752'} /></mesh>{[-.06, -.17, -.28].map((y, j) => <mesh key={y} position={[0, y, .04]}><boxGeometry args={[.58 - j * .1, .018, .008]} /><meshBasicMaterial color={j === 0 ? '#d4af37' : '#8fa7a2'} /></mesh>)}</group>)}</group>;
  return <group position={[0, .19, .08]}><mesh><icosahedronGeometry args={[.48, 2]} /><meshBasicMaterial color="#8c7a4d" wireframe transparent opacity={.9} /></mesh>{Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return <group key={i}><mesh position={[Math.cos(a) * (.85 + (i % 2) * .22), Math.sin(a * 2) * .25, .04]}><sphereGeometry args={[.045, 10, 10]} /><meshBasicMaterial color={i % 3 ? '#d4af37' : '#a7d3ca'} /></mesh><mesh position={[Math.cos(a) * .43, Math.sin(a) * .18, 0]} rotation={[0, 0, a]}><boxGeometry args={[.82, .008, .008]} /><meshBasicMaterial color="#b5a064" transparent opacity={.6} /></mesh></group>; })}</group>;
}

/** Lightweight, instanced entrance masonry that parts in a staggered wave. */
function MovingWallBricks({ progress, mobile }: { progress: React.MutableRefObject<number>; mobile: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const bricks = useMemo(() => {
    const result: Array<{ side: number; row: number; column: number; x: number; y: number; z: number }> = [];
    const columns = mobile ? 4 : 6;
    for (const side of [-1, 1]) {
      for (let row = 0; row < 4; row++) {
        for (let column = 0; column < columns; column++) {
          result.push({
            side, row, column,
            x: side * 5.82,
            y: .48 + row * .86,
            z: 8.8 + column * (mobile ? 3.15 : 2.45) + (row % 2) * .55,
          });
        }
      }
    }
    return result;
  }, [mobile]);

  useFrame(() => {
    if (!mesh.current) return;
    const p = progress.current;
    for (let i = 0; i < bricks.length; i++) {
      const brick = bricks[i];
      const stagger = (brick.column * 4 + brick.row * 2 + (brick.side > 0 ? 1 : 0)) * .012;
      const open = THREE.MathUtils.smoothstep(p, .045 + stagger, .31 + stagger);
      const sway = Math.sin(open * Math.PI + brick.column * .75 + brick.row) * .055 * open;
      dummy.position.set(
        brick.x + brick.side * open * (.34 + (brick.row % 2) * .08),
        brick.y + sway,
        brick.z + (brick.column % 2 ? 1 : -1) * open * .16,
      );
      dummy.rotation.set(0, brick.side * (Math.PI / 2 + open * .08), (brick.row % 2 ? 1 : -1) * open * .025);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={mesh} args={[undefined, undefined, bricks.length]} frustumCulled={false}>
    <boxGeometry args={[1.02, .72, .18]} />
    <meshStandardMaterial color="#343a38" metalness={.52} roughness={.4} emissive="#80672c" emissiveIntensity={.16} />
  </instancedMesh>;
}

function Room({ progress, active, mobile = false }: { progress: React.MutableRefObject<number>; active: number; mobile?: boolean }) {
  const { camera } = useThree();
  const smooth = useRef(0), irisRef = useRef<THREE.Group>(null), cameraGoal = useMemo(() => new THREE.Vector3(), []), targetGoal = useMemo(() => new THREE.Vector3(), []), contactPosition = useMemo(() => new THREE.Vector3(0, 1.6, -4.1), []), contactTarget = useMemo(() => new THREE.Vector3(0, 1.8, -10), []);
  useFrame((state, dt) => {
    const p = progress.current; smooth.current = THREE.MathUtils.damp(smooth.current, p, 2.1, dt);
    const q = smooth.current;
    if (mobile && camera instanceof THREE.PerspectiveCamera) {
      const roomReveal = THREE.MathUtils.smoothstep(q, .24, .5);
      const nextFov = THREE.MathUtils.lerp(58, 88, roomReveal);
      if (Math.abs(camera.fov - nextFov) > .08) { camera.fov = nextFov; camera.updateProjectionMatrix(); }
    }
    const fly = THREE.MathUtils.smoothstep(q, .13, .43);
    const orbit = THREE.MathUtils.smoothstep(q, .39, .69);
    const wallTravel = THREE.MathUtils.clamp((q - .48) / .4 * 4, 0, 4);
    const angle = THREE.MathUtils.lerp(-.3, -3.1, wallTravel / 4);
    const radius = THREE.MathUtils.lerp(0, mobile ? 2.5 : 6.25, orbit);
    // Portrait viewports need more distance at the gate and a more central
    // boardroom path so overhead rings and wall screens stay inside the frame.
    const entranceZ = mobile ? 36 : 17, boardroomZ = mobile ? 3.2 : 8.4;
    cameraGoal.set(Math.sin(angle) * radius, (mobile ? 2.45 : 2.05) + orbit * .35, THREE.MathUtils.lerp(entranceZ, boardroomZ, fly) * (1 - orbit) + Math.cos(angle) * radius * orbit);
    const finish = THREE.MathUtils.smoothstep(q, .93, .99);
    cameraGoal.lerp(contactPosition, finish);
    camera.position.lerp(cameraGoal, 1 - Math.exp(-dt * 2.1));
    const wallFocus = THREE.MathUtils.smoothstep(q, .48, .56);
    const targetRadius = 9.25 * wallFocus;
    targetGoal.set(Math.sin(angle) * targetRadius, THREE.MathUtils.lerp(1.05, 1.9, wallFocus), Math.cos(angle) * targetRadius);
    targetGoal.lerp(contactTarget, finish);
    camera.lookAt(targetGoal);
    const open = THREE.MathUtils.smoothstep(q, .025, .27);
    irisRef.current?.children.forEach((leaf, i) => { if (i < 8) { const m = leaf as THREE.Mesh; const a = i * Math.PI / 4; m.position.x = Math.cos(a) * open * 5.3; m.position.y = Math.sin(a) * open * 5.3; const material = m.material as THREE.MeshStandardMaterial; material.emissiveIntensity = .08 + THREE.MathUtils.smoothstep(q, .02, .12) * .45 * (1 - open); } });
  });
  return <>
    <color attach="background" args={['#111515']} /><fog attach="fog" args={['#111515', 25, 52]} />
    <ambientLight intensity={2.15} /><hemisphereLight args={['#f0f4ee', '#32302a', 1.7]} /><directionalLight position={[-5, 9, 7]} intensity={4.2} color="#f3ebd7" /><pointLight position={[0, 4, 1]} intensity={62} color="#f0c95a" distance={38} /><pointLight position={[0, 3, -6]} intensity={54} color="#b4d5d3" distance={38} /><pointLight position={[8, 3, -2]} intensity={28} color="#d4af37" distance={30} /><pointLight position={[-8, 3, 1]} intensity={24} color="#bfd8d5" distance={28} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.12, 0]}><circleGeometry args={[11, 96]} /><meshStandardMaterial color="#303536" metalness={.2} roughness={.55} /></mesh>
    <mesh position={[0, 2.35, 0]}><cylinderGeometry args={[10.35, 10.35, 4.7, 96, 1, true, .5, Math.PI * 2 - 1]} /><meshStandardMaterial color="#34393a" metalness={.12} roughness={.62} side={THREE.DoubleSide} emissive="#111515" emissiveIntensity={.3} /></mesh>
    <mesh position={[0, 4.75, 0]}><cylinderGeometry args={[10.4, 10.4, .16, 96]} /><meshStandardMaterial color="#111313" metalness={.7} roughness={.3} /></mesh>
    <group>
      <mesh position={[0, -.19, 17]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[12, 18]} /><meshStandardMaterial color="#111313" metalness={.55} roughness={.32} /></mesh>
      {[-1, 1].map(side => <group key={side} position={[side * 6, 2.25, 17]}><mesh><boxGeometry args={[.28, 4.8, 18]} /><meshStandardMaterial color="#171a1a" metalness={.68} roughness={.3} /></mesh>{[-1.5, -.7, .1, .9, 1.7].map((x, i) => <mesh key={i} position={[side * -.17, x, -5 + i * 2.5]}><boxGeometry args={[.025, .035, 1.45]} /><meshBasicMaterial color={i === 2 ? '#d4af37' : '#686554'} /></mesh>)}</group>)}
      {[10, 13, 16, 19, 22].map((z, i) => <group key={z} position={[0, 4.35, z]}><mesh><boxGeometry args={[12, .16, .16]} /><meshStandardMaterial color="#3b403d" metalness={.32} roughness={.5} /></mesh><mesh position={[0, -.12, 0]}><boxGeometry args={[11.7, .035, .1]} /><meshBasicMaterial color={i % 2 ? '#d0ad4f' : '#d3e5df'} /></mesh></group>)}
      <MovingWallBricks progress={progress} mobile={mobile} />
      <group position={[0, 2.3, 10.65]}><mesh><circleGeometry args={[.48, 6]} /><meshBasicMaterial color="#101313" /></mesh><mesh><ringGeometry args={[.5, .53, 6]} /><meshBasicMaterial color="#d4af37" /></mesh><pointLight intensity={1.4} color="#d4af37" distance={3} /></group>
    </group>
    {[3.6, 4.1, 4.35, 4.6, 5.05].map((r, i) => <group key={r}><mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.7 + i * .13, 0]}><torusGeometry args={[r, i === 2 ? .075 : .034, 10, 160]} /><meshBasicMaterial color={i === 2 ? '#edbd3f' : '#c9d4d1'} /></mesh><pointLight position={[0, 3.6 + i * .13, 0]} color={i === 2 ? '#e8bd46' : '#c8e1dc'} intensity={i === 2 ? 3.2 : 1.4} distance={12} /></group>)}
    {Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3 + Math.PI / 6; return <group key={i} position={[Math.sin(a) * 9.25, 0, Math.cos(a) * 9.25]}><mesh position={[0, 1.9, 0]}><boxGeometry args={[.13, 3.8, .13]} /><meshStandardMaterial color="#535650" metalness={.38} roughness={.48} emissive="#282619" emissiveIntensity={.42} /></mesh><mesh position={[0, 3.82, 0]}><sphereGeometry args={[.095, 12, 12]} /><meshBasicMaterial color="#f0c64c" /></mesh></group>; })}
    <ScreenPanels active={active} mobile={mobile} />
    <group position={[0, 0, 0]}><mesh position={[0, .48, 0]}><cylinderGeometry args={[.72, .95, .78, 32]} /><meshStandardMaterial color="#171b1b" metalness={.85} roughness={.2} /></mesh><mesh position={[0, .82, 0]}><cylinderGeometry args={[2.25, 2.25, .18, 64]} /><meshStandardMaterial color="#171b1b" metalness={.8} roughness={.2} /></mesh><mesh position={[0, .93, 0]}><cylinderGeometry args={[2.17, 2.17, .018, 64]} /><meshBasicMaterial color="#101f20" /></mesh><mesh position={[0, .945, 0]}><torusGeometry args={[2.18, .025, 8, 96]} /><meshBasicMaterial color="#d4af37" /></mesh>
      {Array.from({ length: 72 }, (_, i) => { const a = i * Math.PI * (3 - Math.sqrt(5)), r = 1.95 * Math.sqrt((i + .5) / 72); return <mesh key={i} position={[Math.cos(a) * r, .96, Math.sin(a) * r]}><sphereGeometry args={[i % 9 === 0 ? .035 : .019, 8, 8]} /><meshBasicMaterial color={i % 5 ? '#d4af37' : '#a8e2dc'} /></mesh>; })}
      {Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; const r1 = 1.95 * Math.sqrt((i * 5 % 72 + .5) / 72), a1 = i * 2.399; const r2 = 1.95 * Math.sqrt(((i * 5 + 24) % 72 + .5) / 72), a2 = (i * 5 + 24) * 2.399; return <group key={`route-${i}`}><mesh position={[Math.cos(a) * 1.6, .955, Math.sin(a) * 1.6]}><sphereGeometry args={[.035, 8, 8]} /><meshBasicMaterial color="#fff0b7" /></mesh><mesh position={[(Math.cos(a1) * r1 + Math.cos(a2) * r2) / 2, .952, (Math.sin(a1) * r1 + Math.sin(a2) * r2) / 2]} rotation={[0, -Math.atan2(Math.sin(a2) * r2 - Math.sin(a1) * r1, Math.cos(a2) * r2 - Math.cos(a1) * r1), 0]}><boxGeometry args={[Math.hypot(Math.cos(a2) * r2 - Math.cos(a1) * r1, Math.sin(a2) * r2 - Math.sin(a1) * r1), .009, .012]} /><meshBasicMaterial color="#79c9c0" transparent opacity={.48} /></mesh></group>; })}
      {[0, 1, 2, 3, 4, 5].map(i => { const a = i * Math.PI / 3 + Math.PI / 6; return <group key={i} position={[Math.sin(a) * 3, 0, Math.cos(a) * 3]} rotation={[0, a, 0]}><mesh position={[0, .55, 0]}><boxGeometry args={[.72, .13, .7]} /><meshStandardMaterial color="#343938" metalness={.32} roughness={.52} /></mesh><mesh position={[0, .92, -.24]}><boxGeometry args={[.72, .68, .12]} /><meshStandardMaterial color="#2d3331" metalness={.28} roughness={.54} /></mesh></group>; })}
    </group>
    <CodeFall />
    <group ref={irisRef} position={[0, 1.5, 12.8]}>{Array.from({ length: 8 }, (_, i) => <mesh key={i} rotation={[0, 0, i * Math.PI / 4]}><ringGeometry args={[.035, 4.15, 24, 1, 0, Math.PI / 4]} /><meshStandardMaterial color="#24231e" metalness={.58} roughness={.34} side={THREE.DoubleSide} emissive="#a98737" emissiveIntensity={.24} /></mesh>)}<mesh><torusGeometry args={[4.18, .075, 10, 96]} /><meshBasicMaterial color="#edbd3f" /></mesh><mesh><torusGeometry args={[.45, .055, 8, 48]} /><meshBasicMaterial color="#f0d78f" /></mesh>{Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return <group key={`lock-${i}`} position={[Math.cos(a) * 3.95, Math.sin(a) * 3.95, .04]} rotation={[0, 0, a]}><mesh><boxGeometry args={[.42, .13, .1]} /><meshStandardMaterial color="#44443d" metalness={.55} roughness={.4} emissive="#8b713a" emissiveIntensity={.2} /></mesh><mesh position={[0, 0, .06]}><boxGeometry args={[.24, .025, .015]} /><meshBasicMaterial color="#edbd3f" /></mesh></group>; })}</group>
  </>;
}

function LowPower({ active, onSelect }: { active: number; onSelect: (n: number) => void }) {
  return <div className="journey-fallback" style={{ backgroundImage: "linear-gradient(90deg,rgba(8,10,10,.92),rgba(8,10,10,.55)),url('/images/room-control.jpg')" }}><div className="fallback-kicker">CODETECHS / DIGITAL HEADQUARTERS</div><div className="fallback-center"><span>THE CONTROL ROOM</span><h2>Engineering<br /><i>in every direction.</i></h2><div className="fallback-cards">{walls.map((w, i) => <button key={w.short} onClick={() => onSelect(i)} className={active === i ? 'selected' : ''}><small>0{i + 1}</small><b>{w.short}</b></button>)}</div><div className="fallback-actions"><a className="button-primary" href="/contact">START A PROJECT <ArrowRight size={14} /></a><a href="/solutions">EXPLORE SOLUTIONS</a></div></div><div className="fallback-code" aria-hidden="true">01001　SYSTEMS　0110　CLOUD　00101　BUILD　0101</div></div>;
}

function LoadingRoom() {
  return <group><color attach="background" args={['#080a0a']} /><ambientLight intensity={.6} /><pointLight position={[0, 3, 0]} intensity={4} color="#d4af37" /><mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.1, 0]}><circleGeometry args={[10, 48]} /><meshStandardMaterial color="#111515" metalness={.65} /></mesh>{[3.5, 4.2, 4.8].map((r, i) => <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, 3.6 + i * .12, 0]}><torusGeometry args={[r, .035, 8, 64]} /><meshBasicMaterial color={i === 1 ? '#d4af37' : '#9ea9a5'} /></mesh>)}</group>;
}

class SceneBoundary extends Component<{ children: React.ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function ImmersiveOffice() {
  const target = useRef<HTMLElement>(null), progress = useRef(0);
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] });
  const spring = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: .4 });
  const [active, setActive] = useState(0), [fallback, setFallback] = useState(false), [smallScreen, setSmallScreen] = useState(false), [typed, setTyped] = useState(''), [showCta, setShowCta] = useState(false);
  useMotionValueEvent(spring, 'change', v => { progress.current = v; const idx = Math.min(walls.length - 1, Math.max(0, Math.round(THREE.MathUtils.clamp((v - .48) / .4 * 4, 0, 4)))); if (!fallback && v > .46) setActive(current => current === idx ? current : idx); const shouldShowCta = v > .94; setShowCta(current => current === shouldShowCta ? current : shouldShowCta); });
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const small = matchMedia('(max-width: 680px)');
    const canvas = document.createElement('canvas');
    const webgl = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    // Phones should still get the animated headquarters whenever WebGL works.
    // Reserve the static room for devices that cannot render WebGL or explicitly
    // request reduced motion; a low core count alone should not hide the entry.
    const updateFallback = () => { setSmallScreen(small.matches); setFallback(reduced.matches || !webgl); };
    updateFallback();
    small.addEventListener('change', updateFallback);
    reduced.addEventListener('change', updateFallback);
    return () => { small.removeEventListener('change', updateFallback); reduced.removeEventListener('change', updateFallback); };
  }, []);
  const welcome = 'Welcome to CODETECHS.\n\nA world of engineering talent. One mission: building technology that moves businesses forward. Scroll to explore our world.';
  useEffect(() => { if (fallback) { setTyped(welcome); return; } let i = 0; const timer = window.setInterval(() => { i += 2; setTyped(welcome.slice(0, i)); if (i >= welcome.length) window.clearInterval(timer); }, 23); return () => window.clearInterval(timer); }, [fallback]);
  const enter = () => { if (!target.current) return; if (fallback) { document.querySelector('.cinematic-side')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; } window.scrollTo({ top: target.current.offsetTop + window.innerHeight * 2.7, behavior: 'smooth' }); };
  const opacity = useTransform(spring, v => 1 - THREE.MathUtils.smoothstep(v, .13, .31));
  const conciergeY = useTransform(opacity, v => (1 - v) * -22);
  const hud = useTransform(spring, v => THREE.MathUtils.smoothstep(v, .3, .46) * (1 - THREE.MathUtils.smoothstep(v, .94, .975)));
  const ctaOpacity = useTransform(spring, v => THREE.MathUtils.smoothstep(v, .94, .985));
  const Icon = walls[active].icon;
  const responsiveClass = smallScreen ? (fallback ? ' mobile-fallback' : ' mobile-cinematic') : '';
  return <section ref={target} className={`cinematic-journey${responsiveClass}`} id="home" aria-label="CODETECHS digital headquarters tour">
    <div className="cinematic-sticky">
      {fallback ? <LowPower active={active} onSelect={setActive} /> : <SceneBoundary onError={() => setFallback(true)}><Canvas camera={{ position: [0, 1.55, smallScreen ? 36 : 17], fov: smallScreen ? 58 : 52 }} dpr={smallScreen ? [1, 1] : [1, 1.5]} gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}><Suspense fallback={<LoadingRoom />}><Room progress={progress} active={active} mobile={smallScreen} /></Suspense></Canvas></SceneBoundary>}
      <div className="cinematic-vignette" />
      <div className="cinematic-top"><span>CODETECHS <i>/</i> DIGITAL HEADQUARTERS</span><span><b /> TOUR MODE · SIMULATED</span></div>
      <motion.div className="concierge-console" style={{ opacity, y: conciergeY }}>
        <h1 className="sr-only">CODETECHS Digital Headquarters</h1>
        <div className="console-bar"><span>CT<span>·</span></span><span>ARRIVAL CONCIERGE</span><span className="console-status"><i /> READY</span></div>
        <div className="console-kicker">A WORLD OF ENGINEERING TALENT</div>
        <p className="concierge-message">{typed}{typed.length < welcome.length && <span className="typing-caret">▋</span>}</p>
        <div className="console-bottom"><button className="button-primary" onClick={enter}>SECURE ACCESS &amp; ENTER <ArrowRight size={14} /></button><span>SCROLL TO EXPLORE <i>↓</i></span></div>
      </motion.div>
      <motion.div className="cinematic-side" style={{ opacity: hud }}>
        <div className="wall-index">{walls.map((w, i) => <button key={w.short} onClick={() => { setActive(i); if (!fallback && target.current) window.scrollTo({ top: target.current.offsetTop + window.innerHeight * (.54 + i * .095), behavior: 'smooth' }); }} className={active === i ? 'selected' : ''} aria-label={`View ${w.title}`}><span>0{i + 1}</span></button>)}</div>
        <div className="wall-card" aria-live="polite"><div className="wall-card-kicker">DIVISION / 0{active + 1} <span>DISPLAY MODE</span></div><div className="wall-card-title"><Icon size={20} /><h2>{walls[active].title}</h2></div><p>{walls[active].copy}</p><ul className="wall-points">{panelContent[active].points.map(point => <li key={point}>{point}</li>)}</ul><div className="wall-screenline">{walls[active].screen}<span>{walls[active].metric}</span></div><div className="wall-tags">{walls[active].tags.split(' · ').map(t => <span key={t}>{t}</span>)}</div><a className="wall-project-link" href={walls[active].href}>{walls[active].cta} <ArrowRight size={12} /></a><div className="wall-card-foot">ACCRA <span>↗</span> REMOTE COLLABORATION <i>●</i></div></div>
      </motion.div>
      <div className="cinematic-bottom"><span>01 — 05 <i>ILLUSTRATIVE NETWORK VISUAL · NOT LIVE TRAFFIC</i></span><span><ArrowDown size={12} /> SCROLL TO EXPLORE</span><span>05°36′N / 00°11′W</span></div>
      {!fallback && <motion.div className="cinematic-cta" style={{ opacity: ctaOpacity }} aria-hidden={!showCta} inert={!showCta}><span>FINAL CHAMBER / START A CONVERSATION</span><h2>Have a challenge<br />worth solving?</h2><p>Let’s build technology that moves your business forward.</p><div><a className="button-primary" href="/contact" tabIndex={showCta ? 0 : -1}>START A PROJECT <ArrowRight size={14} /></a><a href="/solutions" tabIndex={showCta ? 0 : -1}>EXPLORE OUR SOLUTIONS</a></div></motion.div>}
      <div className="cinematic-progress"><motion.i style={{ scaleX: spring }} /></div>
    </div>
  </section>;
}
