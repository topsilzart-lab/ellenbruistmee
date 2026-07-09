import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, 
  Heart, 
  Compass, 
  Check, 
  Send, 
  Menu, 
  X, 
  ArrowRight, 
  Eye, 
  Trees, 
  Component, 
  Trash2, 
  Sparkle,
  Zap,
  Brain,
  Award
} from 'lucide-react';

import heroImage from './assets/hero.webp';
import ellenOver1Image from './assets/ellen-over-1.webp';
import ellenOver2Image from './assets/ellen-over-2.webp';
import logoImage from './assets/logo.webp';
import ellenContactImage from './assets/ellen-contact.webp';
import { 
  HERO_QUOTES, 
  TARGET_GROUPS, 
  MY_APPROACH, 
  HOW_WE_WORK, 
  CONTACT_INFO, 
  ALL_PROJECTS,
  TESTIMONIALS
} from './data/websiteData';

gsap.registerPlugin(ScrollTrigger);

const MENU_ITEMS = [
  { id: 'over-ellen', label: 'Ellen' },
  { id: 'voor-wie', label: 'Voor wie' },
  { id: 'aanpak', label: 'Aanpak' },
  { id: 'projecten', label: 'Projecten' },
  { id: 'referenties', label: 'Referenties' },
  { id: 'contact', label: 'Contact' }
];

// ==========================================
// GLOBAL LAVALAMP CANVAS (single instance, full viewport - gooey + sharp two-canvas system)
// ==========================================
function GlobalLavalampCanvas({ prikkelArm }) {
  const canvasRef = useRef(null);
  const sharpCanvasRef = useRef(null);
  const bubblesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (prikkelArm || isMobile) return;

    const canvas = canvasRef.current;
    const sharpCanvas = sharpCanvasRef.current;
    if (!canvas || !sharpCanvas) return;
    const ctx = canvas.getContext('2d');
    const sharpCtx = sharpCanvas.getContext('2d');
    let animationId;
    let width = 0;
    let height = 0;

    // Resolution scaling factor for gooey canvas (4x smaller = 16x fewer pixels)
    const SCALE = 4;

    const handleResize = () => {
      width = canvas.width = Math.ceil(window.innerWidth / SCALE);
      height = canvas.height = Math.ceil(window.innerHeight / SCALE);
      sharpCanvas.width = window.innerWidth;
      sharpCanvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize bubbles on mount in scaled coordinates
    bubblesRef.current = [];
    const numBubbles = 8;
    for (let i = 0; i < numBubbles; i++) {
      bubblesRef.current.push({
        x: Math.random() * (window.innerWidth / SCALE),
        y: Math.random() * (window.innerHeight / SCALE),
        radius: (60 + Math.random() * 80) / SCALE,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.15 - Math.random() * 0.5,
        temp: Math.random(),
        gravity: 0.003 + Math.random() * 0.003,
        buoyancy: -0.006 - Math.random() * 0.005,
        state: 'normal',
        subParticles: [],
        explosionAge: 0,
        maxExplosionAge: 90,
      });
    }

    const bubbles = bubblesRef.current;

    const animate = () => {
      if (!ctx || !sharpCtx || !canvas || !sharpCanvas) return;
      ctx.clearRect(0, 0, width, height);
      sharpCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const mouse = mouseRef.current;

      bubbles.forEach((b) => {
        if (!b.state) {
          b.state = 'normal';
          b.subParticles = [];
          b.explosionAge = 0;
          b.maxExplosionAge = 90;
        }
        if (b.state === 'normal') {
          // Thermodynamics: heat at bottom, cool at top
          if (b.y + b.radius >= height - 5) {
            b.temp = Math.min(1, b.temp + 0.02);
          } else if (b.y - b.radius <= 5) {
            b.temp = Math.max(0, b.temp - 0.015);
          }

          // Forces
          const accelY = (1 - b.temp) * b.gravity + b.temp * b.buoyancy;
          b.vy += accelY;
          b.vy *= 0.985;
          b.y += b.vy;

          // Organic horizontal drift
          b.vx += (Math.random() - 0.5) * 0.04;
          b.vx *= 0.975;
          b.x += b.vx;

          // Boundaries
          if (b.x - b.radius < -20) { b.x = -20 + b.radius; b.vx *= -0.4; }
          if (b.x + b.radius > width + 20) { b.x = width + 20 - b.radius; b.vx *= -0.4; }
          if (b.y - b.radius < -20) { b.y = -20 + b.radius; b.vy *= -0.2; }
          if (b.y + b.radius > height + 20) { b.y = height + 20 - b.radius; b.vy *= -0.2; }

          // Mouse hover detection (trigger explosion!)
          const dx = b.x - mouse.x / SCALE;
          const dy = b.y - mouse.y / SCALE;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < b.radius) {
            b.state = 'exploding';
            b.explosionAge = 0;
            b.subParticles = [];
            const numSubs = 10 + Math.floor(Math.random() * 5);
            const subRadius = b.radius * 0.22;
            for (let i = 0; i < numSubs; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = 3.5 + Math.random() * 5.0;
              b.subParticles.push({
                x: b.x * SCALE + Math.cos(angle) * 5,
                y: b.y * SCALE + Math.sin(angle) * 5,
                vx: Math.cos(angle) * speed + b.vx * SCALE,
                vy: Math.sin(angle) * speed + b.vy * SCALE,
                radius: subRadius * SCALE * (0.85 + Math.random() * 0.3),
              });
            }
          }

          // Draw normal bubble (Gooey canvas)
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fill();

        } else if (b.state === 'exploding') {
          b.explosionAge++;
          
          // Draw and update sub-particles on SHARP full-res canvas
          sharpCtx.fillStyle = '#ffffff';
          b.subParticles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.95;
            p.vy *= 0.95;

            // Boundaries bounce gently
            if (p.x - p.radius < 5) { p.x = 5 + p.radius; p.vx *= -0.5; }
            if (p.x + p.radius > window.innerWidth - 5) { p.x = window.innerWidth - 5 - p.radius; p.vx *= -0.5; }
            if (p.y - p.radius < 5) { p.y = 5 + p.radius; p.vy *= -0.5; }
            if (p.y + p.radius > window.innerHeight - 5) { p.y = window.innerHeight - 5 - p.radius; p.vy *= -0.5; }

            sharpCtx.beginPath();
            sharpCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            sharpCtx.fill();
          });

          if (b.explosionAge >= b.maxExplosionAge) {
            b.state = 'merging';
          }

        } else if (b.state === 'merging') {
          // Centroid calculation
          let sumX = 0, sumY = 0;
          b.subParticles.forEach(p => {
            sumX += p.x;
            sumY += p.y;
          });
          const cx = sumX / b.subParticles.length;
          const cy = sumY / b.subParticles.length;

          let maxDistToCenter = 0;
          
          // Draw merging bubbles on gooey canvas
          ctx.fillStyle = '#ffffff';
          b.subParticles.forEach(p => {
            const dx = cx - p.x;
            const dy = cy - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            maxDistToCenter = Math.max(maxDistToCenter, dist);

            if (dist > 1) {
              p.vx += (dx / dist) * 0.45;
              p.vy += (dy / dist) * 0.45;
            }
            p.vx *= 0.90;
            p.vy *= 0.90;

            p.x += p.vx;
            p.y += p.vy;

            ctx.beginPath();
            ctx.arc(p.x / SCALE, p.y / SCALE, p.radius / SCALE, 0, Math.PI * 2);
            ctx.fill();
          });

          // Converge back to normal single bubble
          if (maxDistToCenter < 18) {
            b.state = 'normal';
            b.x = cx / SCALE;
            b.y = cy / SCALE;
            b.vx = (Math.random() - 0.5) * 0.5;
            b.vy = -0.15 - Math.random() * 0.3;
            b.temp = Math.random();
            b.subParticles = [];
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [prikkelArm, isMobile]);

  if (prikkelArm || isMobile) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none gooey-bg mix-blend-overlay"
        style={{ zIndex: 1, opacity: 0.18 }}
      />
      <canvas
        ref={sharpCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none mix-blend-overlay"
        style={{ zIndex: 1, opacity: 0.18 }}
      />
    </>
  );
}

// ==========================================
// DYNAMIC CARBONATED SPARKLING WATER LOADER (Intro - Prikwater Loader)
// ==========================================
function PrikwaterLoader({ onComplete }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [processedLogo, setProcessedLogo] = useState(logoImage);

  useEffect(() => {
    const img = new Image();
    img.src = logoImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const w = canvas.width;
        const h = canvas.height;
        const visited = new Uint8Array(w * h);
        const queue = [];

        // Add border pixels to queue (top/bottom)
        for (let x = 0; x < w; x++) {
          queue.push(x, 0);
          queue.push(x, h - 1);
          visited[x] = 1;
          visited[x + (h - 1) * w] = 1;
        }
        // Left/right borders
        for (let y = 1; y < h - 1; y++) {
          queue.push(0, y);
          queue.push(w - 1, y);
          visited[y * w] = 1;
          visited[(w - 1) + y * w] = 1;
        }

        let head = 0;
        while (head < queue.length) {
          const x = queue[head++];
          const y = queue[head++];
          const idx = (x + y * w) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // If the pixel is dark background
          if (r < 40 && g < 40 && b < 40) {
            data[idx + 3] = 0; // Make transparent

            // Check 4 neighbors
            const neighbors = [
              [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
            ];
            for (let n = 0; n < neighbors.length; n++) {
              const nx = neighbors[n][0];
              const ny = neighbors[n][1];
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                const nidx = nx + ny * w;
                if (!visited[nidx]) {
                  visited[nidx] = 1;
                  queue.push(nx, ny);
                }
              }
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setProcessedLogo(canvas.toDataURL('image/png'));
      } catch (e) {
        console.error("Canvas processing failed", e);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let waveY = height + 50;
    let time = 0;
    const bubbles = [];
    const sparks = [];
    let transitionTriggered = false;

    // Helper to draw a highly realistic 3D glass carbonated bubble
    const drawGlassBubble = (c, x, y, radius) => {
      c.save();
      
      // 1. Radial gradient for glassy light refraction
      const grad = c.createRadialGradient(
        x - radius * 0.25, y - radius * 0.25, radius * 0.05,
        x, y, radius
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');   // Specs glow core
      grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.12)'); // Transparent liquid body
      grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.16)');  // Inner refraction ring
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.48)');    // Outer rim highlight

      c.fillStyle = grad;
      c.beginPath();
      c.arc(x, y, radius, 0, Math.PI * 2);
      c.fill();

      // 2. Outer boundary stroke for glass sharpness
      c.strokeStyle = 'rgba(255, 255, 255, 0.58)';
      c.lineWidth = 0.8;
      c.beginPath();
      c.arc(x, y, radius, 0, Math.PI * 2);
      c.stroke();

      // 3. Dark inner refraction shadow for depth
      c.strokeStyle = 'rgba(0, 0, 0, 0.12)';
      c.lineWidth = 0.5;
      c.beginPath();
      c.arc(x, y, radius - 0.8, 0, Math.PI * 2);
      c.stroke();

      // 4. Primary specular highlight dot (top-left light source reflection)
      c.fillStyle = '#ffffff';
      c.beginPath();
      c.arc(x - radius * 0.35, y - radius * 0.35, radius * 0.16, 0, Math.PI * 2);
      c.fill();

      // 5. Secondary bounce light highlight crescent (bottom-right reflection)
      c.fillStyle = 'rgba(255, 255, 255, 0.28)';
      c.beginPath();
      c.arc(x + radius * 0.38, y + radius * 0.38, radius * 0.1, 0, Math.PI * 2);
      c.fill();

      c.restore();
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // 1. Rise the wave level
      const targetSpeed = (height + 100) / 140; // Fills screen in ~140 frames (~2.3s)
      waveY -= targetSpeed;

      // 2. Spawn carbonated bubbles from the bottom
      if (waveY > -50) {
        // A. Standard bubbles from the bottom
        const spawnCount = Math.min(5, Math.floor(width / 220) + 1);
        for (let i = 0; i < spawnCount; i++) {
          bubbles.push({
            x: Math.random() * width,
            y: height + 15,
            radius: 1.0 + Math.random() * 6.5,
            vy: 0, // buoyancy is calculated dynamically based on radius
            sineSeed: Math.random() * 100,
            sineSpeed: 0.02 + Math.random() * 0.03,
            sineAmp: 0.3 + Math.random() * 0.8,
            state: 'rising',
            clingTimer: 0
          });
        }

        // B. Edge-clinging bubbles (nucleating on the "glass walls" of the screen)
        if (Math.random() < 0.28) {
          const isLeft = Math.random() < 0.5;
          bubbles.push({
            x: isLeft ? 5 + Math.random() * 5 : width - 5 - Math.random() * 5,
            y: height + 15,
            radius: 1.0 + Math.random() * 3.5, // clingers are usually smaller
            vy: -0.35 - Math.random() * 0.45,  // very slow rise initially
            sineSeed: Math.random() * 100,
            sineSpeed: 0.01,
            sineAmp: 0.1,
            state: 'clinging',
            clingTimer: 60 + Math.random() * 120 // cling frames before breaking free
          });
        }
      }

      // 3. Draw the rising waves of Prikwater FIRST (Glossy translucent water background)
      const waveAmplitude = 12;
      const waveFrequency = 0.008;
      const waveOffset = time * 0.08;

      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.14)'; // Highly polished glossy liquid wave
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = waveY + Math.sin(x * waveFrequency + waveOffset) * waveAmplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Highlight border
      ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = waveY - 4 + Math.sin(x * (waveFrequency * 0.85) - waveOffset) * (waveAmplitude * 0.8);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 4. Update & Draw rising glass bubbles ON TOP of the wave
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        
        // Physics based on bubble state
        if (b.state === 'clinging') {
          b.y += b.vy;
          b.clingTimer--;
          if (b.clingTimer <= 0) {
            b.state = 'rising';
          }
        } else {
          // Buoyancy: larger bubbles rise faster than smaller ones!
          const buoyancy = -1.3 - (b.radius * 0.48) - Math.random() * 0.8;
          b.vy = b.vy * 0.8 + buoyancy * 0.2; // Smooth acceleration
          b.y += b.vy;

          // Organic wobble & drift
          b.x += Math.sin(time * b.sineSpeed + b.sineSeed) * b.sineAmp * 0.48;

          // Hydrostatic expansion: bubbles grow slightly as they rise due to pressure drop!
          b.radius += 0.012;
        }

        // Wave surface detection
        const waveFreq = 0.008;
        const waveOff = time * 0.08;
        const currentWaveHeight = waveY + Math.sin(b.x * waveFreq + waveOff) * 12;

        // If bubble goes above wave or off screen top
        if (b.y < currentWaveHeight || b.y < -20) {
          // Spawn popping sparks (fizz spray)
          const numSparks = 2 + Math.floor(Math.random() * 3);
          for (let j = 0; j < numSparks; j++) {
            const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 0.6;
            const speed = 1.0 + Math.random() * 2.5;
            sparks.push({
              x: b.x,
              y: Math.min(b.y, currentWaveHeight),
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 0.5,
              radius: b.radius * 0.32,
              color: 'rgba(255, 255, 255, 0.95)',
              alpha: 1.0,
              decay: 0.045 + Math.random() * 0.05
            });
          }
          bubbles.splice(i, 1);
          continue;
        }

        // Draw bubble
        drawGlassBubble(ctx, b.x, b.y, b.radius);
      }

      // 5. Update & Draw Sparks (fizz popping) ON TOP of bubbles/waves
      ctx.save();
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.06; // gravity
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 6. Stage Curtain slide reveal once screen is covered
      if (waveY <= -35 && !transitionTriggered) {
        transitionTriggered = true;
        gsap.to(containerRef.current, {
          y: '-100%',
          duration: 1.15,
          ease: 'power3.inOut',
          onComplete: () => {
            onComplete();
          }
        });
        return; // Stop animation loop
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-gradient-to-tr from-brand-red via-brand-orange to-brand-yellow z-[100] flex items-center justify-center overflow-hidden"
    >
      {/* Floating logo and loader text */}
      <div className="relative flex flex-col items-center justify-center pointer-events-none text-center z-10 px-6 max-w-lg">
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] mb-4 animate-pulse-slow flex items-center justify-center">
          <img src={processedLogo} className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.35)]" alt="Ellen BRUIST mee Logo" />
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl text-brand-cream tracking-tight mb-2">
          Ellen <span className="text-brand-yellow">Bruist</span> Mee
        </h2>
        <p className="font-sans text-brand-cream/60 tracking-widest uppercase text-xs sm:text-sm font-semibold">
          Leren mag bruisen...
        </p>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}

// ==========================================
// HERO REAL-TIME BUBBLE EMITTER (Alive Artwork)
// ==========================================
function HeroBubbleEmitter({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = canvas.width = canvas.parentElement.clientWidth || 400;
    let height = canvas.height = canvas.parentElement.clientHeight || 500;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const bubbles = [];
    // Blue, Orange, Yellow, Purple, Red, Green
    const BRAND_COLORS = ['#3eb0f0', '#fc7423', '#fd9b1a', '#af476f', '#fc7423', '#a08c2a'];
    let time = 0;

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // Emitter point: centered around the bottom purple plate in the cropped art
      const emitterX = width * 0.5;
      const emitterY = height * 0.65;

      // Spawn bubbles slowly
      if (time % 10 === 0 && bubbles.length < 30) {
        bubbles.push({
          x: emitterX + (Math.random() - 0.5) * 30,
          y: emitterY + (Math.random() - 0.5) * 15,
          radius: 2 + Math.random() * 3,
          targetRadius: 8 + Math.random() * 18,
          vx: -0.8 - Math.random() * 1.5, // flow leftwards
          vy: -0.4 - Math.random() * 0.8, // float up gently
          color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
          opacity: 0.85,
          decay: 0.004 + Math.random() * 0.005,
          swaySpeed: 0.015 + Math.random() * 0.025,
          swayAmplitude: 0.8 + Math.random() * 1.5,
          seed: Math.random() * 100
        });
      }

      // Update & Draw Bubbles
      bubbles.forEach((b, idx) => {
        b.x += b.vx;
        b.y += b.vy;
        
        // Organic wind sway
        b.y += Math.sin(time * b.swaySpeed + b.seed) * b.swayAmplitude * 0.3;
        
        // Grow to target size
        if (b.radius < b.targetRadius) {
          b.radius += 0.3;
        }

        // Decay opacity
        b.opacity -= b.decay;

        if (b.opacity <= 0) {
          bubbles.splice(idx, 1);
          return;
        }

        ctx.fillStyle = b.color;
        ctx.globalAlpha = Math.max(0, b.opacity);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.globalAlpha = 1.0; // reset

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none gooey-bg"
      style={{ zIndex: 0 }}
    />
  );
}

// ==========================================
// CORE APP COMPONENT
// ==========================================
export default function App() {

  const [currentPage, setCurrentPage] = useState('home');
  const [prikkelArm, setPrikkelArm] = useState(false);
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      return !mq.matches; // Disable loader immediately if reduced motion is requested
    }
    return true;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Ouder', message: '' });
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [fadeState, setFadeState] = useState('opacity-100 scale-100');
  const appRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const [activeTab, setActiveTab] = useState(0);
  const [tabTimerKey, setTabTimerKey] = useState(0);
  const [fadeContent, setFadeContent] = useState('opacity-100 translate-y-0');

  const triggerTabChange = useCallback((idx) => {
    setFadeContent('opacity-0 translate-y-2');
    setTimeout(() => {
      setActiveTab(idx);
      setFadeContent('opacity-100 translate-y-0');
    }, 200);
  }, []);

  const selectTab = (idx) => {
    if (idx === activeTab) return;
    triggerTabChange(idx);
    setTabTimerKey(prev => prev + 1);
  };

  // Fail-safe: never let the intro loader hang (e.g. on some tablets the
  // canvas transition can stall) — always finish it after a max duration.
  useEffect(() => {
    if (!loading) return;
    const maxWait = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(maxWait);
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      triggerTabChange((activeTab + 1) % 3);
    }, 20000);
    return () => clearInterval(interval);
  }, [loading, activeTab, tabTimerKey, triggerTabChange]);

  const getTabBgClass = () => {
    if (prikkelArm) {
      if (activeTab === 0) return 'bg-[#FEF9E7] text-brand-aubergine';
      if (activeTab === 1) return 'bg-[#F5EEF6] text-brand-aubergine';
      return 'bg-[#FFFDF6] text-brand-aubergine';
    } else {
      if (activeTab === 0) return 'bg-brand-yellow text-brand-aubergine';
      if (activeTab === 1) return 'bg-brand-purple text-brand-cream';
      return 'bg-brand-green text-brand-aubergine';
    }
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quotes rotation interval
  useEffect(() => {
    if (loading && !prikkelArm) return;
    const interval = setInterval(() => {
      setFadeState('opacity-0 scale-95 blur-[1px]'); // fade out
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % HERO_QUOTES.length);
        setFadeState('opacity-100 scale-100 blur-0'); // fade in
      }, 400);
    }, 3200); // alternate every 3.2s
    return () => clearInterval(interval);
  }, [loading, prikkelArm]);

  const toggleSensoryMode = () => {
    setPrikkelArm(!prikkelArm);
    if (!prikkelArm) {
      setLoading(false); // disable loader instantly if toggled to prikkelarm
    }
  };

  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();
    const target = document.getElementById(id);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const homeTarget = document.getElementById(id);
        if (homeTarget) {
          const offset = 90;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = homeTarget.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else if (target) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) setFormSubmitted(true);
  };

  // GSAP animations
  useEffect(() => {
    if (loading) return; // Wait for the intro animation to finish!

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prikkelArm || mq.matches) {
      gsap.killTweensOf('.gsap-reveal');
      gsap.killTweensOf('.hero-reveal');
      return;
    }
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', { y: 40, opacity: 0, duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.1 });

      // Content stays visible by default (CSS). We only briefly hide + reveal
      // a block at the moment it scrolls into view. If a trigger never fires
      // (slow images, odd viewport), the element simply stays visible — so a
      // section can never end up as an empty coloured block.
      ScrollTrigger.batch('.gsap-reveal', {
        start: 'top 92%',
        onEnter: (els) => gsap.from(els, {
          opacity: 0, y: 45, duration: 0.9, stagger: 0.08, ease: 'power3.out', overwrite: true
        }),
      });
    }, appRef);

    // Recalculate ScrollTrigger positions once images/layout settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t1 = setTimeout(refresh, 400);
    const t2 = setTimeout(refresh, 1500);

    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t1);
      clearTimeout(t2);
      ctx.revert();
    };
  }, [prikkelArm, loading]);

  return (
    <div ref={appRef} className={`min-h-screen transition-colors duration-500 font-sans ${prikkelArm ? 'bg-[#FAF8F5] text-brand-aubergine' : 'bg-brand-cream text-brand-aubergine'}`}>
      
      {/* Dynamic Intro Loader (Skipped if prikkelArm or reduced motion is active) */}
      {loading && !prikkelArm && <PrikwaterLoader onComplete={() => setLoading(false)} />}

      {/* Global SVG Gooey Filter (optimized by removing feBlend) */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" />
          </filter>
        </defs>
      </svg>
      
      {/* ONE global lavalamp canvas spanning the entire viewport */}
      <GlobalLavalampCanvas prikkelArm={prikkelArm} />
      
      {/* A. NAVBAR */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1360px]">
        <nav className={`w-full px-6 py-3.5 md:py-4 rounded-full flex items-center justify-between transition-all duration-500 border ${
          scrolled
            ? prikkelArm
              ? 'bg-[#FAF8F5]/90 border-brand-aubergine/10 shadow-sm backdrop-blur-xl'
              : 'bg-brand-cream/80 border-brand-turquoise/20 shadow-[0_10px_35px_rgba(20,138,133,0.08)] backdrop-blur-xl'
            : prikkelArm
              ? 'bg-transparent border-transparent text-brand-aubergine'
              : 'bg-transparent border-transparent text-brand-aubergine'
        }`}>
          <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="flex flex-col items-start gap-0.5 group focus:outline-none shrink-0" aria-label="Ellen BRUIST mee Home">
            <span className="font-display text-lg md:text-xl xl:text-2xl font-bold tracking-tight text-brand-aubergine leading-none">
              Ellen <span className={prikkelArm ? '' : scrolled ? 'text-brand-orange font-black' : 'text-white font-black'}>BRUIST</span> mee
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-brand-aubergine/60 font-bold leading-none mt-1 whitespace-nowrap">
              creatief onderwijsspecialist
            </span>
          </a>
          <div className="hidden xl:flex items-center gap-5 xl:gap-7 font-medium">
            {MENU_ITEMS.map(item => (
              <a key={item.id} href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`transition-all duration-300 hover:translate-y-[-1px] whitespace-nowrap text-sm xl:text-base font-semibold ${
                  scrolled 
                    ? 'text-brand-aubergine/90 hover:text-brand-orange' 
                    : prikkelArm 
                      ? 'text-brand-aubergine/90 hover:text-brand-orange' 
                      : 'text-brand-aubergine/90 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 xl:gap-4 shrink-0">
            <button onClick={toggleSensoryMode}
              className={`px-3 py-2 xl:px-4 xl:py-2.5 rounded-full border text-xs xl:text-sm font-bold flex items-center gap-2 transition-all duration-300 whitespace-nowrap shrink-0 ${
                prikkelArm ? 'border-brand-aubergine bg-brand-aubergine text-brand-cream hover:bg-brand-aubergine/90'
                : scrolled ? 'border-brand-turquoise/40 hover:border-brand-turquoise bg-brand-turquoise/5 hover:bg-brand-turquoise/15 text-brand-turquoise'
                : 'border-brand-aubergine/30 hover:border-brand-orange bg-brand-aubergine/5 hover:bg-brand-orange/10 text-brand-aubergine hover:text-brand-orange'
              }`}
              aria-pressed={prikkelArm} aria-label="Schakel prikkelarme modus in"
            >
              <Eye className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{prikkelArm ? 'Bruisen ✨' : 'Prikkelarm 🕊️'}</span>
              <span className="sm:hidden">{prikkelArm ? 'Bruisen' : 'Prikkelarm'}</span>
            </button>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={`hidden sm:inline-flex items-center justify-center px-4 py-2.5 xl:px-5 xl:py-2.5 rounded-full font-bold transition-all duration-300 active:scale-95 border whitespace-nowrap shrink-0 ${
              prikkelArm ? 'bg-brand-aubergine border-brand-aubergine text-[#FAF8F5] hover:bg-brand-aubergine/80'
              : scrolled ? 'bg-brand-yellow border-brand-yellow text-brand-aubergine hover:bg-brand-orange hover:border-brand-orange hover:text-brand-cream'
              : 'bg-brand-yellow border-brand-yellow text-brand-aubergine hover:bg-brand-orange hover:border-brand-orange hover:text-brand-cream'
            }`}>Plan een kennismaking</a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-full hover:bg-black/5 focus:outline-none transition-colors text-brand-aubergine"
              aria-expanded={mobileMenuOpen} aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className={`mt-2 p-6 rounded-[2rem] border xl:hidden flex flex-col gap-4 ${prikkelArm ? 'bg-[#FAF8F5] border-brand-aubergine/10 shadow-lg' : 'bg-brand-cream border-brand-turquoise/20 shadow-xl'}`}>
            {MENU_ITEMS.map(item => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, item.id); }} className="py-2 text-lg font-semibold hover:text-brand-orange border-b border-black/5">
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, 'contact'); }} className={`w-full mt-2 py-3.5 rounded-full text-center font-bold transition-all duration-300 ${prikkelArm ? 'bg-brand-aubergine text-brand-cream hover:bg-brand-aubergine/90' : 'bg-brand-yellow text-brand-aubergine hover:bg-brand-orange hover:text-brand-cream'}`}>Plan een kennismaking</a>
          </div>
        )}
      </header>

      {currentPage === 'home' ? (
        <>
          {/* B. HERO */}
          <section id="hero" className={`relative min-h-[100dvh] flex items-center justify-start py-24 md:py-32 px-6 md:px-12 xl:px-24 transition-colors duration-500 overflow-hidden ${prikkelArm ? 'bg-[#FDF2ED] text-brand-aubergine' : 'bg-brand-orange'}`}>
            {/* Glowing background glassmorphic blobs for premium motion depth */}
            {!prikkelArm && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <div className="absolute top-1/4 left-[10%] w-96 h-96 rounded-full bg-white/10 blur-3xl animate-blob-one" />
                <div className="absolute bottom-1/4 right-[10%] w-[450px] h-[450px] rounded-full bg-brand-yellow/10 blur-3xl animate-blob-two" />
              </div>
            )}

            <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Stable, readable textual branding & call-to-actions */}
              <div className="lg:col-span-7 text-left space-y-6 md:space-y-8 flex flex-col justify-center">
                <div className="hero-reveal inline-flex self-start items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm">
                  <Sparkles className="h-4 w-4 text-brand-yellow" /><span>Creatief onderwijsspecialist</span>
                </div>
                
                <h1 className="hero-reveal tracking-tight font-black leading-[0.95] text-brand-aubergine text-6xl sm:text-7xl md:text-8xl xl:text-9xl">
                  <span className="block font-sans font-extrabold uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight">Leren mag</span>
                  <span className="italic font-serif font-normal block text-brand-aubergine mt-1">bruisen.</span>
                </h1>

                <p className={`hero-reveal text-lg sm:text-xl font-normal leading-relaxed max-w-xl ${prikkelArm ? 'text-brand-aubergine/85' : 'text-white/95'}`}>
                  Talentontwikkeling en maatwerk voor alle kinderen die net iets anders nodig hebben - en voor de scholen en ouders om hen heen.
                </p>

                <div className="hero-reveal flex flex-wrap gap-4 items-center pt-2">
                  <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={`relative group overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-95 ${prikkelArm ? 'bg-brand-aubergine text-brand-cream' : 'bg-brand-yellow text-brand-aubergine shadow-[0_12px_24px_rgba(220,163,84,0.35)]'}`}>
                    {!prikkelArm && <span className="absolute inset-0 w-full h-full bg-brand-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></span>}
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-brand-cream transition-colors duration-300"><span>Plan een kennismaking</span><ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" /></span>
                  </a>
                </div>
              </div>

              {/* Right Column: Floating Glassmorphic Quote Capsule */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="hero-reveal w-full max-w-md">
                  <div 
                    className={`w-full p-8 md:p-10 rounded-[3rem] border transition-all duration-500 ${
                      prikkelArm 
                        ? 'shadow-sm text-brand-aubergine' 
                        : 'shadow-2xl text-brand-aubergine animate-float-capsule'
                    }`}
                    style={{
                      backgroundColor: prikkelArm ? '#FAF8F5' : '#FFFDF6',
                      borderColor: prikkelArm ? 'rgba(30, 22, 37, 0.1)' : 'rgba(200, 89, 63, 0.15)'
                    }}
                  >
                    <span className={`font-serif text-6xl leading-none select-none block mb-2 ${prikkelArm ? 'text-brand-aubergine/10' : 'text-brand-orange/30'}`}>“</span>
                    
                    <div className="min-h-[145px] flex items-center mb-6">
                      <div className={`transition-all duration-500 transform ${fadeState}`}>
                        <p className={`text-xl sm:text-2xl font-bold leading-relaxed ${
                          prikkelArm ? 'text-brand-aubergine font-serif italic' : `text-brand-aubergine ${HERO_QUOTES[quoteIndex].style}`
                        }`}>
                          {HERO_QUOTES[quoteIndex].text.split('\n').reduce((acc, item, i) => i === 0 ? [item] : [...acc, <br key={i} />, item], [])}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-0.5 rounded-full ${prikkelArm ? 'bg-brand-aubergine/20' : 'bg-brand-yellow/50'}`}></span>
                      <span className={`text-xs uppercase tracking-widest font-extrabold ${prikkelArm ? 'text-brand-aubergine/60' : 'text-brand-yellow/90'}`}>
                        Leren mag bruisen
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

      {/* E. OVER ELLEN */}
      <section id="over-ellen" className={`py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 overflow-hidden relative ${prikkelArm ? 'bg-[#E5F2F1] text-brand-aubergine' : 'bg-brand-turquoise text-brand-aubergine'}`}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 gsap-reveal flex justify-center">
              <EllenImageSwitcher 
                prikkelArm={prikkelArm} 
                ellenOver1Image={ellenOver1Image} 
                ellenOver2Image={ellenOver2Image} 
              />
            </div>
            <div className="lg:col-span-7 gsap-reveal text-left">
              <span className={`text-xs md:text-sm font-bold uppercase tracking-widest block mb-3 ${prikkelArm ? 'text-brand-aubergine/70' : 'text-brand-aubergine/80'}`}>Even voorstellen</span>
              <h2 className={`text-4xl md:text-6xl font-display font-extrabold mb-8 leading-tight italic font-serif ${prikkelArm ? 'text-brand-orange' : 'text-brand-aubergine'}`}>"Ik heb nooit in de rij gelopen."</h2>
              <div className={`space-y-6 text-lg leading-relaxed ${prikkelArm ? 'text-brand-aubergine/95' : 'text-brand-aubergine/90'}`}>
                <p>Ik ben Ellen. Ik heb nooit in de rij gelopen. Wil heel veel ontdekken. Denk groot en geloof dat er heel veel mogelijk is (omdenken). Als je maar probeert, spart en verbindt. Als kind wilde ik al Pippi Langkous zijn. Tegenwoordig nog steeds;)</p>
                <p>Ik was dat kind dat als kleuter op de tafel mocht gaan staan om de rest m’n verzonnen verhaaltjes te vertellen. En die met een tamme kauw op het stuur naar school fietste. Al op zevenjarige leeftijd ging ik aardbeien plukken om van het verdiende geld extra doosjes kralen te kopen. Om mijn zelfgemaakte sieraden mooier te maken en te verkopen. Ik wilde altijd weg bij die saaie balletles en ging dan buiten spelen op het aangrenzende veldje met andere kinderen. M’n blokfluit was plotsklaps “verdwenen”; dat was zó niet mijn ding. Ook was ik dat kind dat steevast het recordbedrag voor Unicef bij elkaar kreeg. Door verdubbelde deals af te sluiten met mensen als ik een bepaalde afstand liep. Verder won ik de eerste prijs bij het maken van een kalenderblad voor de Rabobank van alle vijfdeklassers (gr.7) binnen de gemeente. Ha, ha, en dat terwijl ik een berisping had gekregen van m’n leerkracht omdat ik geen materialen vanuit het crealokaal gebruikte. Ik had alles zelf verzameld uit de natuur en ook met natuurlijke kleurstoffen geverfd. Ik realiseer me dat ik allesbehalve een schaap was. Eerder een vlegeltje maar geen brutale. Die daarbij meestal ook nog bijna iedereen voor zich innam.</p>
                <p>Ik ben tientallen jaren werkzaam geweest in het onderwijs (BAO en SO in alle groepen). Prachtig werk, maar ik voelde steeds sterker: Ik heb méér te bieden dan binnen de lijntjes van een systeem past.</p>
                <p>Ik wil de jeugd meenemen op het avontuur dat het leven heet. Niet volgens een standaard stappenplan, maar juist op een creatieve “out of the box” manier. Het moet BRUISEN. Waarbij ze zichzelf mogen laten zien en meer zichzelf mogen zijn. Want de jeugd is de toekomst. Wij kunnen er SAMEN voor zorgen dat dit een goede wordt!!!</p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6">
                <button
                  onClick={() => setShowSkillsModal(true)}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 transform hover:scale-[1.03] active:scale-95 border ${
                    prikkelArm 
                      ? 'border-brand-aubergine bg-brand-aubergine text-brand-cream hover:bg-brand-aubergine/90' 
                      : 'bg-brand-yellow border-brand-yellow text-brand-aubergine hover:bg-brand-orange hover:border-brand-orange hover:text-brand-cream shadow-md'
                  }`}
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Mijn Vaardigheden</span>
                </button>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-0.5 rounded-full ${prikkelArm ? 'bg-brand-aubergine/35' : 'bg-brand-aubergine/30'}`}></div>
                  <span className="font-serif italic text-2xl font-semibold text-brand-orange">Ellen BRUIST mee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. VOOR WIE */}
      <section id="voor-wie" className={`relative py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 overflow-hidden ${prikkelArm ? 'bg-[#FDF2ED] text-brand-aubergine' : 'bg-[#DA291C] text-brand-cream'}`}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="gsap-reveal text-center max-w-3xl mx-auto mb-20">
            <span className={`text-xs md:text-sm font-bold uppercase tracking-widest block mb-3 ${prikkelArm ? 'text-brand-aubergine/70' : 'text-brand-yellow/90'}`}>De doelgroep</span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-6 leading-tight">Voor wie ik werk</h2>
            <p className={`text-lg md:text-xl leading-relaxed ${prikkelArm ? 'text-brand-aubergine/80' : 'text-brand-cream/90'}`}>Niet elk kind past in het standaard stappenplan. Daar begin ik.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: <Sparkles className="h-7 w-7" />, title: TARGET_GROUPS[0].title, desc: TARGET_GROUPS[0].desc, graphic: <VoorWieMotionGraphicOne /> },
              { icon: <Compass className="h-7 w-7" />, title: TARGET_GROUPS[1].title, desc: TARGET_GROUPS[1].desc, graphic: <VoorWieMotionGraphicTwo /> },
              { icon: <Heart className="h-7 w-7" />, title: TARGET_GROUPS[2].title, desc: TARGET_GROUPS[2].desc, graphic: <VoorWieMotionGraphicThree /> },
            ].map((card, i) => (
              <div key={i} className={`gsap-reveal p-10 rounded-[2.5rem] border flex flex-col justify-between transition-lift ${prikkelArm ? 'bg-[#FAF8F5] border-brand-aubergine/10 shadow-sm' : 'bg-white/10 border-white/20 hover:bg-white/15 shadow-xl'} relative overflow-hidden group`}>
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 relative z-10 ${prikkelArm ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-yellow text-brand-aubergine'}`}>{card.icon}</div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display mb-4 relative z-10">{card.title}</h3>
                  <p className={`leading-relaxed text-base md:text-lg relative z-10 ${prikkelArm ? 'text-brand-aubergine/80' : 'text-brand-cream/85'}`}>{card.desc}</p>
                </div>
                {!prikkelArm && card.graphic}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. AANPAK (Combined Tabbed Section: Aanpak, Wat ik doe, Werkwijze) */}
      <section id="aanpak" className={`relative py-24 md:py-32 px-6 md:px-12 overflow-hidden transition-colors duration-1000 ease-in-out ${getTabBgClass()}`}>
        {!prikkelArm && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute top-1/4 left-[10%] w-96 h-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-[10%] w-[450px] h-[450px] rounded-full bg-brand-yellow/10 blur-3xl animate-pulse-slow" />
          </div>
        )}

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Main Section Header */}
          <div className="gsap-reveal text-center max-w-4xl mx-auto mb-16">
            <span className={`text-xs md:text-sm font-bold uppercase tracking-widest block mb-3 ${prikkelArm ? 'text-brand-orange' : (activeTab === 1 ? 'text-brand-yellow' : 'text-brand-orange')}`}>
              MIJN VISIE & METHODE
            </span>
            <h2 className={`text-4xl md:text-6xl font-display font-extrabold mb-6 leading-tight ${prikkelArm ? 'text-brand-orange' : (activeTab === 1 ? 'text-white' : 'text-brand-aubergine')}`}>
              Mijn aanpak
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-medium ${prikkelArm ? 'text-brand-aubergine/90' : (activeTab === 1 ? 'text-brand-cream/90' : 'text-brand-aubergine/90')}`}>
              Dat kan door kinderen aan zet te krijgen. Zij hebben nog het vermogen om creatief te denken en te doen. Hun zienswijze is vaak verrassend, vernieuwend en oplossingsgericht. Wij als volwassenen hebben het vermogen om dit te voeden en positief te stimuleren. Daarom wil ik projecten organiseren waarbij de kinderen, de school en de ouders zoveel mogelijk in meegenomen worden. Waarbij iedereen geïnspireerd wordt. Samen creëren we een omgeving waarin iedereen de kans krijgt om te groeien, grenzen te verleggen en met plezier bezig te zijn.
            </p>
            <h3 className={`text-xs md:text-sm font-extrabold uppercase tracking-widest ${prikkelArm ? 'text-brand-orange' : (activeTab === 1 ? 'text-brand-yellow' : 'text-brand-orange')}`}>
              Drie dingen waar het bij mij altijd om draait
            </h3>
          </div>

          {/* Dynamic Capsule Tabs bar */}
          <div className="flex justify-center mb-16 gsap-reveal">
            <div className={`inline-flex p-1.5 rounded-full backdrop-blur-md transition-all duration-500 border ${
              prikkelArm
                ? 'bg-[#FAF8F5]/80 border-brand-aubergine/10 shadow-sm'
                : activeTab === 1
                  ? 'bg-white/10 border-white/10 shadow-md'
                  : 'bg-brand-cream/30 border-white/20 shadow-md'
            }`}>
              {[
                { label: 'Aanpak', idx: 0 },
                { label: 'Wat ik doe', idx: 1 },
                { label: 'Werkwijze', idx: 2 }
              ].map((tab) => {
                const isActive = activeTab === tab.idx;
                return (
                  <button
                    key={tab.idx}
                    onClick={() => selectTab(tab.idx)}
                    className={`px-5 py-2 md:px-7 md:py-2.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                      isActive
                        ? prikkelArm
                          ? 'bg-brand-aubergine text-brand-cream shadow-sm'
                          : tab.idx === 1
                            ? 'bg-brand-yellow text-brand-aubergine shadow-md'
                            : 'bg-brand-orange text-white shadow-md'
                        : prikkelArm
                          ? 'text-brand-aubergine/60 hover:text-brand-aubergine hover:bg-brand-aubergine/5'
                          : activeTab === 1
                            ? 'text-white/80 hover:text-white hover:bg-white/5'
                            : 'text-brand-aubergine/70 hover:text-brand-aubergine hover:bg-black/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Pane */}
          <div className={`transition-all duration-300 transform ${fadeContent}`}>
            {activeTab === 0 && (
              /* AANPAK CARDS */
              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  { bg: 'bg-white text-brand-aubergine border-black/5 shadow-lg', iconBg: 'bg-brand-orange text-white', pBg: 'bg-brand-orange/10 text-brand-orange', icon: <Zap className="h-7 w-7" />, title: MY_APPROACH[0].title, desc: MY_APPROACH[0].desc, graphic: <CardMotionGraphicOne /> },
                  { bg: 'bg-brand-yellow text-brand-aubergine border-brand-yellow/10 shadow-lg', iconBg: 'bg-brand-aubergine text-brand-yellow', pBg: 'bg-brand-yellowDark/10 text-brand-yellowDark', icon: <Heart className="h-7 w-7" />, title: MY_APPROACH[1].title, desc: MY_APPROACH[1].desc, graphic: <CardMotionGraphicTwo /> },
                  { bg: 'bg-brand-green text-brand-aubergine border-brand-green/10 shadow-lg', iconBg: 'bg-white text-brand-green', pBg: 'bg-brand-green/10 text-brand-green', icon: <Compass className="h-7 w-7" />, title: MY_APPROACH[2].title, desc: MY_APPROACH[2].desc, graphic: <CardMotionGraphicThree /> },
                ].map((card, i) => (
                  <div key={i} className={`p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[440px] transition-all duration-300 transition-lift border ${prikkelArm ? 'bg-[#FAF8F5] border-brand-aubergine/10 text-brand-aubergine shadow-sm' : card.bg} relative overflow-hidden group`}>
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 relative z-10 ${prikkelArm ? card.pBg : card.iconBg}`}>{card.icon}</div>
                      <h3 className="text-3xl font-bold font-display mb-6 relative z-10 leading-tight">{card.title}</h3>
                      <div className={`space-y-4 text-base md:text-lg relative z-10 ${prikkelArm ? 'text-brand-aubergine/80' : ''}`}>
                        {card.desc.split('\n\n').map((paragraph, pIdx) => {
                          const lines = paragraph.split('\n').map(l => l.trim()).filter(Boolean);
                          const isList = lines.every(line => line.startsWith('-') || line.startsWith('•'));
                          if (isList) {
                            return (
                              <ul key={pIdx} className="space-y-3">
                                {lines.map((line, lIdx) => {
                                  const cleanText = line.replace(/^[-•]\s*/, '');
                                  return (
                                    <li key={lIdx} className="flex items-start gap-2.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0 mt-2"></span>
                                      <span>{cleanText}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            );
                          }
                          return (
                            <p key={pIdx} className="leading-relaxed">
                              {paragraph}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    {!prikkelArm && card.graphic}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 1 && (
              /* WAT IK DOE */
              <div>
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {[
                    {
                      title: 'Binnen de school',
                      items: ['Onderwijs', 'Cultuureducatie', 'Peergroepen voor meer- en hoogbegaafde kinderen'],
                      color: prikkelArm 
                        ? 'bg-[#FAF8F5] border-brand-aubergine/10 text-brand-aubergine'
                        : 'border-white/10 hover:border-brand-turquoise bg-white/5 hover:bg-white/10 text-white'
                    },
                    {
                      title: 'Rondom de school',
                      items: ['Thuiszitters', 'Buitenschoolse activiteiten'],
                      color: prikkelArm 
                        ? 'bg-[#FAF8F5] border-brand-aubergine/10 text-brand-aubergine'
                        : 'border-white/10 hover:border-brand-orange bg-white/5 hover:bg-white/10 text-white'
                    },
                    {
                      title: 'Rondom het kind',
                      items: ['Ouderbetrokkenheid stimuleren'],
                      color: prikkelArm 
                        ? 'bg-[#FAF8F5] border-brand-aubergine/10 text-brand-aubergine'
                        : 'border-white/10 hover:border-brand-yellow bg-white/5 hover:bg-white/10 text-white'
                    }
                  ].map((cluster, i) => (
                    <div key={i} className={`p-10 rounded-[2.5rem] border flex flex-col justify-between transition-lift ${prikkelArm ? 'bg-[#FAF8F5] border-brand-aubergine/10 text-brand-aubergine shadow-sm' : cluster.color}`}>
                      <div>
                        <h3 className={`text-2xl sm:text-3xl font-bold font-display mb-6 ${prikkelArm ? 'text-brand-purple' : 'text-brand-yellow'}`}>{cluster.title}</h3>
                        <ul className="space-y-4 text-base md:text-lg">
                          {cluster.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-2.5 ${prikkelArm ? 'bg-brand-purple' : 'bg-brand-turquoise'}`}></span>
                              <span className={prikkelArm ? 'text-brand-aubergine/90' : 'text-brand-cream/90'}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="max-w-4xl mx-auto text-center">
                  <p className={`text-lg md:text-xl font-serif italic leading-relaxed ${prikkelArm ? 'text-brand-aubergine/80' : 'text-brand-yellow/90'}`}>
                    "Samen creëren we een omgeving waarin iedereen de kans krijgt om te groeien, grenzen te verleggen en met plezier bezig te zijn."
                  </p>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              /* WERKWIJZE TIMELINE */
              <div className="max-w-4xl mx-auto text-left">
                <div className={`relative border-l ml-4 md:ml-8 space-y-12 ${prikkelArm ? 'border-brand-aubergine/20' : 'border-brand-orange/30'}`}>
                  {HOW_WE_WORK.map((s, i) => (
                    <div key={i} className="relative pl-8 md:pl-12">
                      <span className={`absolute left-0 -translate-x-1/2 w-10 h-10 rounded-full border-4 flex items-center justify-center font-bold text-sm ${prikkelArm ? 'bg-brand-cream border-brand-aubergine text-brand-aubergine' : 'bg-brand-cream border-brand-orange text-brand-orange shadow-md'}`}>
                        {s.n}
                      </span>
                      <h4 className="text-2xl font-display font-bold mb-3">{s.title}</h4>
                      <p className="text-base md:text-lg leading-relaxed opacity-85">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* H. EERDERE PROJECTEN */}
      <section id="projecten" className={`relative py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 overflow-hidden ${prikkelArm ? 'bg-[#FEF9E7] text-brand-aubergine' : 'bg-brand-turquoise text-brand-aubergine'}`}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="gsap-reveal text-center max-w-3xl mx-auto mb-20">
            <span className={`text-xs md:text-sm font-bold uppercase tracking-widest block mb-3 ${prikkelArm ? 'text-brand-aubergine/70' : 'text-brand-orange'}`}>Projecten</span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-6 leading-tight">Een greep uit wat ik deed</h2>
            <p className="text-lg md:text-xl leading-relaxed opacity-90">Heel veel projecten, in en buiten de klas. Een paar voorbeelden.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Kerst voor iedereen / Kerst in de toekomst',
                desc: `Kerst voor iedereen/Kerst in de toekomst; mondiaal bewustzijn voeden. Spelvorm met diverse nationaliteiten in verschillende cultuurdisciplines.
Dit m.b.v. een reuzenpoppenkast en een xxl schimmenspelkast binnen 1 aula. Het zittende publiek draait mee. Werkgroepen waren de verhalenschrijver (binnen thema’s), decorbouwers, pamfletontwerpers, poppenmakers, schimmenmakers, presentatoren, vertellers, de technici, de digitale-groep, de muzikanten. Kids van alle nationaliteiten komen in spelvorm met hun gemaakte landsvlag aan het woord om over hun gebruiken tijdens “Kerst of Nieuwjaarsbeleving” te vertellen (BS St. Martinus Venlo ’22-’23).`
              },
              {
                title: 'Project Plastic Fantastic',
                desc: 'Project Plastic Fantastic. Duurzaamheidsthema. Dieren maken van plastic verpakkingsmaterialen (BS De Meulebeek Oostrum ’21-’22)'
              },
              {
                title: 'Peergroepen Meer- & Hoogbegaafd',
                desc: 'Mede opzetten en draaien van peergroupen voor de Meer en Hoog Begaafde kinderen in de midden-, en bovenbouw. Doel: Uitdaging voor de peers + een meerwaarde voor de stamgroep. Zodat de peerkids hun eindresultaat kunnen presenteren in hun stamgroep (de peerouders zijn altijd van de partij). Thema’s waar ik mee gewerkt heb: Het heelal/natuurkundige verschijnselen (proefjes met door henzelf gemaakt instructieblad), duurzaamheid /milieu (bedenk, ontwerp, beschrijf, teken en voer uit met kosteloze materialen), planten/geschiedenis (een reis door de tijd; samen een boek maken voor iedere stamgroep), democratie/regering (voorstel indienen bij leerlingenraad en onderbouwen), vroeger & nu/religies (lapbook maken), vrijheid (interview maken, uitvoeren en uitwerken + collega: “Wat is vrijheid voor jou?”) (OJBS De Omnibus Baarlo ’23-‘25).'
              },
              {
                title: 'Projectleiderschap Wereldpaviljoen',
                desc: `Projectleiderschap Wereldpaviljoen tijdens de Floriade 2012
-aansturen vrijwilligers plus studenten van Fontys Hogeschool
-uitvoeren workshops ( groep 4 t/m VO tweetalig vwo)
-delegaties ontvangen en rondleidingen geven
-de slotavond voor de vrijwilligers mede organiseren en presenteren. Een plek voor en met wereldburgers.`
              }
            ].map((p, i) => (
              <div key={i} className={`gsap-reveal p-8 rounded-[2rem] border transition-lift flex flex-col justify-between ${prikkelArm ? 'bg-[#FAF8F5] border-brand-aubergine/10 text-brand-aubergine' : 'bg-[#FFFDF6] border-brand-orange/15 shadow-lg'}`}>
                <div>
                  <h3 className="text-2xl font-bold font-display mb-4 text-brand-aubergine">{p.title}</h3>
                  <p className="leading-relaxed text-base md:text-lg text-brand-aubergine/80 whitespace-pre-line">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center gsap-reveal">
            <button 
              onClick={() => {
                setCurrentPage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-95 border ${
                prikkelArm 
                  ? 'border-brand-aubergine bg-brand-aubergine text-brand-cream hover:bg-brand-aubergine/90' 
                  : 'bg-brand-orange border-brand-orange text-brand-cream hover:bg-brand-turquoise hover:border-brand-turquoise shadow-[0_8px_20px_rgba(200,89,63,0.25)]'
              }`}
            >
              <span>Bekijk al mijn projecten</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

        {/* H2. REFERENTIES */}
        <section id="referenties" className={`relative py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 overflow-hidden ${prikkelArm ? 'bg-[#FAF8F5] text-brand-aubergine border-t border-brand-aubergine/10' : 'bg-brand-purple text-brand-cream'}`}>
          {!prikkelArm && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
              <div className="absolute top-1/4 left-[5%] w-72 h-72 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute bottom-1/4 right-[5%] w-80 h-80 rounded-full bg-brand-yellow/10 blur-3xl" />
            </div>
          )}

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="gsap-reveal mb-12">
              <span className={`text-xs md:text-sm font-bold uppercase tracking-widest block mb-3 ${prikkelArm ? 'text-brand-aubergine/70' : 'text-brand-yellow/90'}`}>Ervaringen</span>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold leading-tight">Wat anderen zeggen</h2>
            </div>

            <div className="gsap-reveal relative min-h-[260px] flex flex-col justify-center items-center">
              <div 
                className={`w-full p-8 md:p-14 rounded-[3rem] border transition-all duration-500 text-left relative ${
                  prikkelArm 
                    ? 'bg-brand-cream border-brand-aubergine/10 shadow-sm' 
                    : 'bg-white/10 border-white/20 shadow-2xl backdrop-blur-md'
                }`}
              >
                <span className={`font-serif text-7xl leading-none select-none absolute top-4 left-6 ${prikkelArm ? 'text-brand-aubergine/10' : 'text-brand-yellow/20'}`}>“</span>
                
                <div className="relative z-10 pt-4">
                  <p className="text-xl sm:text-2xl font-normal leading-relaxed mb-8 font-sans">
                    {TESTIMONIALS[activeTestimonial].quote}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                     <div>
                       <h4 className="font-bold text-lg">{TESTIMONIALS[activeTestimonial].author}</h4>
                       <p className={`text-sm ${prikkelArm ? 'text-brand-aubergine/60' : 'text-brand-cream/75'}`}>{TESTIMONIALS[activeTestimonial].role}</p>
                     </div>
                     
                     <div className="flex items-center gap-3 self-end sm:self-center">
                       <button 
                         onClick={() => handlePrevTestimonial()} 
                         className={`p-3 rounded-full border transition-all duration-300 ${
                           prikkelArm 
                             ? 'border-brand-aubergine/20 hover:border-brand-aubergine text-brand-aubergine hover:bg-brand-aubergine/5' 
                             : 'border-white/20 hover:border-brand-yellow text-brand-cream hover:bg-brand-yellow hover:text-brand-aubergine'
                         }`}
                         aria-label="Vorige referentie"
                       >
                         <ArrowRight className="h-5 w-5 rotate-180" />
                       </button>
                       <button 
                         onClick={() => handleNextTestimonial()} 
                         className={`p-3 rounded-full border transition-all duration-300 ${
                           prikkelArm 
                             ? 'border-brand-aubergine/20 hover:border-brand-aubergine text-brand-aubergine hover:bg-brand-aubergine/5' 
                             : 'border-white/20 hover:border-brand-yellow text-brand-cream hover:bg-brand-yellow hover:text-brand-aubergine'
                         }`}
                         aria-label="Volgende referentie"
                       >
                         <ArrowRight className="h-5 w-5" />
                       </button>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8 gsap-reveal">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === i 
                      ? prikkelArm ? 'bg-brand-aubergine scale-125' : 'bg-brand-yellow scale-125' 
                      : prikkelArm ? 'bg-brand-aubergine/20' : 'bg-white/30'
                  }`}
                  aria-label={`Ga naar referentie ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

      {/* I. CONTACT / CTA */}
      <section id="contact" className={`relative py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 overflow-hidden ${prikkelArm ? 'bg-[#FEF9E7] text-brand-aubergine' : 'bg-[#FAF8F5] text-brand-aubergine border-t border-brand-orange/10'}`}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="gsap-reveal text-center mb-16">
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-aubergine/70 block mb-3">Plan een afspraak</span>
            <h2 className="text-4xl md:text-7xl font-display font-black mb-6 leading-tight">Zin om mee te bruisen?</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">Voor scholen, ouders, en iedereen die om kinderen heen staat. Eén bericht is genoeg.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Card: Form */}
            <div className={`gsap-reveal p-8 md:p-12 rounded-[3rem] border text-left flex flex-col justify-between ${prikkelArm ? 'bg-[#FAF8F5] border-brand-aubergine/10 shadow-sm' : 'bg-brand-cream border-brand-aubergine/10 shadow-2xl'}`}>
              {formSubmitted ? (
                <div className="text-center py-12 space-y-6 my-auto">
                  <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto"><Check className="h-8 w-8" /></div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold">Ik bruis van de zin om je te spreken!</h3>
                  <p className="text-lg text-brand-aubergine/80 max-w-md mx-auto">Je bericht is ontvangen. Ik neem binnen twee werkdagen persoonlijk contact met je op om te kijken wat wél kan.</p>
                  <button onClick={() => setFormSubmitted(false)} className={`px-6 py-3 rounded-full border text-sm font-bold transition-all duration-300 active:scale-95 ${prikkelArm ? 'border-brand-aubergine/20 hover:border-brand-aubergine text-brand-aubergine' : 'border-brand-orange/30 hover:border-brand-orange text-brand-orange hover:bg-brand-orange/5'}`}>Nieuw bericht sturen</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-semibold text-sm">Naam</label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Hoe heet je?" className="px-4 py-3.5 rounded-2xl border border-brand-aubergine/15 focus:border-brand-turquoise focus:outline-none bg-white/70 text-lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-semibold text-sm">E-mailadres</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="voorbeeld@mail.nl" className="px-4 py-3.5 rounded-2xl border border-brand-aubergine/15 focus:border-brand-turquoise focus:outline-none bg-white/70 text-lg" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="role" className="font-semibold text-sm">Ik neem contact op als...</label>
                    <select id="role" name="role" value={formData.role} onChange={handleInputChange} className="px-4 py-3.5 rounded-2xl border border-brand-aubergine/15 focus:border-brand-turquoise focus:outline-none bg-white/70 text-lg cursor-pointer">
                      <option value="Ouder">Ouder / Verzorger</option>
                      <option value="School">School / Docent / IB-er</option>
                      <option value="Zelfstandige">Zelfstandige Professional</option>
                      <option value="Anders">Iets anders</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold text-sm">Vertel me hier kort waar je naar op zoek bent...</label>
                    <textarea id="message" name="message" rows="4" required value={formData.message} onChange={handleInputChange} placeholder="Deel hier je verhaal of je vraag..." className="px-4 py-3.5 rounded-2xl border border-brand-aubergine/15 focus:border-brand-turquoise focus:outline-none bg-white/70 text-lg resize-y"></textarea>
                  </div>
                  <button type="submit" className={`relative group overflow-hidden w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${prikkelArm ? 'bg-brand-aubergine text-brand-cream' : 'bg-brand-yellow text-brand-aubergine shadow-[0_12px_24px_rgba(220,163,84,0.25)]'}`}>
                    {!prikkelArm && <span className="absolute inset-0 w-full h-full bg-brand-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></span>}
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-brand-cream transition-colors duration-300"><span>Plan een kennismaking</span><Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" /></span>
                  </button>
                  <div className="text-center mt-4">
                    <p className="text-sm font-medium text-brand-aubergine/60">
                      Of mail direct: <a href={`mailto:${CONTACT_INFO.email}`} className="underline hover:text-brand-orange transition-colors">{CONTACT_INFO.email}</a>
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right Card: Image & Quote */}
            <div className={`gsap-reveal p-8 rounded-[3rem] border text-left flex flex-col justify-between ${prikkelArm ? 'bg-[#FAF8F5] border-brand-aubergine/10 shadow-sm' : 'bg-brand-cream border-brand-aubergine/10 shadow-2xl'}`}>
              <div className="overflow-hidden rounded-[2rem] aspect-[4/5] w-full relative shadow-inner group">
                <img 
                  src={ellenContactImage} 
                  className={`w-full h-full object-cover select-none transition-transform duration-500 ${prikkelArm ? '' : 'group-hover:scale-105'} cursor-pointer`} 
                  alt="Ellen in actie" 
                />
              </div>
              <div className="mt-8 space-y-3">
                <p className="text-xl sm:text-2xl font-serif italic font-bold leading-relaxed text-brand-orange">
                  "Samen zoeken naar wat wél kan. Bewegen, ontdekken en grenzen verleggen!"
                </p>
                <span className="text-xs uppercase tracking-widest font-extrabold text-brand-aubergine/60 block mt-2">
                  ELLEN BRUIST MEE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      ) : (
        <ProjectsView prikkelArm={prikkelArm} setCurrentPage={setCurrentPage} />
      )}

      {/* J. FOOTER */}
      <footer className="bg-brand-aubergine text-brand-cream py-20 px-6 md:px-12 rounded-t-[4rem] border-t border-brand-cream/10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-6 space-y-6 text-left">
              <span className="font-display text-3xl font-bold tracking-tight block">
                Ellen <span className="text-brand-orange">BRUIST</span> mee
              </span>
              <p className="text-brand-cream/70 max-w-md text-base leading-relaxed flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-brand-yellow shrink-0 mt-1" />
                <span>Creatief onderwijsspecialist in talentontwikkeling en maatwerk<br />
                Ouderbetrokkenheid stimuleren</span>
              </p>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3.5 w-3.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${prikkelArm ? 'bg-brand-green/80' : 'bg-brand-yellow/80'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${prikkelArm ? 'bg-brand-green' : 'bg-brand-yellow'}`}></span>
                </span>
                <span className="text-sm font-semibold tracking-wider uppercase opacity-85">Online & Bereikbaar</span>
              </div>
            </div>
            <div className="md:col-span-3 space-y-4 text-left">
              <h4 className="font-display font-bold text-lg text-brand-yellow">Navigatie</h4>
              <ul className="space-y-3 text-brand-cream/80 text-base">
                {MENU_ITEMS.map(item => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} className="hover:text-brand-yellow transition-colors duration-200 block">
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => {
                      setCurrentPage('projects');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-brand-yellow transition-colors duration-200 text-left block w-full focus:outline-none font-semibold"
                  >
                    Bekijk alle {ALL_PROJECTS.length} projecten
                  </button>
                </li>
              </ul>
            </div>
            <div className="md:col-span-3 space-y-4 text-left">
              <h4 className="font-display font-bold text-lg text-brand-yellow">Contactgegevens</h4>
              <ul className="space-y-4 text-brand-cream/80 text-base">
                <li><strong className="block text-xs uppercase tracking-widest opacity-50 mb-1">E-mailadres</strong><a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline text-brand-cream font-medium text-lg">{CONTACT_INFO.email}</a></li>
                <li><strong className="block text-xs uppercase tracking-widest opacity-50 mb-1">Telefoonnummer</strong><a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="hover:underline text-brand-cream font-medium text-lg">{CONTACT_INFO.phone}</a></li>
                <li><strong className="block text-xs uppercase tracking-widest opacity-50 mb-1">Werkgebied</strong><span className="text-brand-cream font-medium text-lg block">{CONTACT_INFO.workArea}</span></li>
              </ul>
            </div>
          </div>
          <div className="h-px w-full bg-brand-cream/15 mb-8"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="font-serif italic text-3xl font-extrabold tracking-wide text-brand-orange">IK ZEG DOEN!</span>
            <div className="text-sm opacity-60 text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} Ellen BRUIST mee · {CONTACT_INFO.email}</p>
              <p className="mt-1 font-medium text-brand-yellow">Creatief onderwijsspecialist in talentontwikkeling en maatwerk</p>
            </div>
          </div>
        </div>
      </footer>

      {showSkillsModal && (
        <SkillsModal prikkelArm={prikkelArm} onClose={() => setShowSkillsModal(false)} />
      )}

    </div>
  );
}

// ==========================================
// SKILLS POPUP MODAL
// ==========================================
function SkillsModal({ prikkelArm, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const skills = [
    {
      title: 'DE COACH',
      subtitle: 'richting geven aan anderen',
      desc: 'Vriendelijk, sociaal en mensgericht, betrouwbaar, puur, onbaatzuchtig, luisteren, vernieuwende oplossingen bedenken om de ander vooruit te helpen.',
      icon: <Award className="h-6 w-6" />,
      colorBg: 'bg-brand-orange/10 text-brand-orange',
      borderCol: 'border-brand-orange/20 hover:border-brand-orange'
    },
    {
      title: 'DE DENKER',
      subtitle: 'ik begrijp het!',
      desc: 'Dringt door tot de kern van de zaken. Bedenkt creatieve oplossingen voor complexe vraagstukken (out of the box denker), ongebonden geest, kan goed relativeren, bedachtzaam, sterk intuïtief maar niet zweverig (doortastendheid), helicopterview.',
      icon: <Brain className="h-6 w-6" />,
      colorBg: 'bg-brand-turquoise/10 text-brand-turquoise',
      borderCol: 'border-brand-turquoise/20 hover:border-brand-turquoise'
    },
    {
      title: 'DE IDEALIST',
      subtitle: 'wij verbeteren de wereld!',
      desc: 'Concentreren op wat echt belangrijk is, holistisch omgevingsbewust, verbinden, samenwerken, enthousiast.',
      icon: <Heart className="h-6 w-6" />,
      colorBg: 'bg-brand-purple/10 text-brand-purple',
      borderCol: 'border-brand-purple/20 hover:border-brand-purple'
    },
    {
      title: 'DE VISIONAIR',
      subtitle: 'ik ga voor zinvolle doelen!',
      desc: 'Gaat voor toekomstvisie en langetermijndoelen, gaat voor een duurzame bijdrage aan de wereld, flexibel, ondernemend. Wanneer doelstellingen concreet worden stort ik me vol overgave op de uitvoering ervan. Altijd maatwerk, procesgericht maar nooit ten koste van alles.',
      icon: <Compass className="h-6 w-6" />,
      colorBg: 'bg-brand-yellowDark/10 text-brand-yellowDark',
      borderCol: 'border-brand-yellow/20 hover:border-brand-yellow'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-aubergine/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className={`relative w-full max-w-4xl mx-auto rounded-[2.5rem] border shadow-2xl p-8 md:p-12 transition-all duration-300 transform scale-100 max-h-[90vh] overflow-y-auto ${
        prikkelArm 
          ? 'bg-[#FAF8F5] border-brand-aubergine/20 text-brand-aubergine' 
          : 'bg-white/95 border-brand-turquoise/15 text-brand-aubergine'
      }`}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${
            prikkelArm 
              ? 'hover:bg-brand-aubergine/10 text-brand-aubergine font-bold' 
              : 'hover:bg-brand-orange/10 text-brand-orange font-bold'
          }`}
          aria-label="Sluiten"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="mb-10 text-left">
          <span className={`text-xs md:text-sm font-bold uppercase tracking-widest block mb-2 ${
            prikkelArm ? 'text-brand-aubergine/70' : 'text-brand-orange'
          }`}>MyDrivesMyHabits 360° feedback ’23-’25</span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold leading-tight text-brand-aubergine">
            Mijn Vaardigheden
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className={`p-6 md:p-8 rounded-[2rem] border text-left transition-all duration-300 ${
                prikkelArm 
                  ? 'bg-white border-brand-aubergine/10' 
                  : `bg-[#FFFDF6] ${skill.borderCol} shadow-sm hover:shadow-md`
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  prikkelArm ? 'bg-brand-aubergine/10 text-brand-aubergine' : skill.colorBg
                }`}>
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display tracking-wide text-brand-aubergine">{skill.title}</h3>
                  <span className="text-xs uppercase tracking-wider opacity-60 font-semibold block text-brand-aubergine/80">{skill.subtitle}</span>
                </div>
              </div>
              <p className="text-base leading-relaxed text-brand-aubergine/80">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ELLEN IMAGE SWITCHER WITH CROSS-FADE (4.5s)
// ==========================================
function EllenImageSwitcher({ prikkelArm, ellenOver1Image, ellenOver2Image }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhotoIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative p-6 rounded-[3rem] border w-full max-w-sm ${
      prikkelArm ? 'bg-[#FAF8F5] border-brand-aubergine/10 shadow-sm' : 'bg-brand-cream/10 border-white/20 shadow-2xl'
    }`}>
      <div className="overflow-hidden rounded-[2.5rem] aspect-[3/4] w-full relative shadow-inner">
        {/* Photo 1: Poppies */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          activePhotoIndex === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        }`}>
          <img src={ellenOver1Image} className="w-full h-full object-cover select-none" alt="Ellen in bloemenveld" />
        </div>
        
        {/* Photo 2: Log balance */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          activePhotoIndex === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        }`}>
          <img src={ellenOver2Image} className="w-full h-full object-cover select-none" alt="Ellen balancerend" />
        </div>

        {!prikkelArm && <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-20" />}
      </div>
      <div className={`absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors duration-500 shadow-md z-30 ${
        prikkelArm ? 'bg-brand-aubergine text-brand-cream' : 'bg-brand-yellow text-brand-aubergine'
      }`}>
        <span>
          {activePhotoIndex === 0 ? 'ELLEN BRUIST 🌸' : 'IK ZEG DOEN! 🪵'}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// PROJECTS VIEW SUBPAGE COMPONENT
// ==========================================
function ProjectsView({ prikkelArm, setCurrentPage }) {
  const [activeFilter, setActiveFilter] = useState('Alles');
  const FILTERS = ['Alles', 'Buitenschools', 'Thuiszitters', 'Cultuur', 'Onderwijs', 'Diverse cultuur-educatie projecten'];

  const filteredProjects = activeFilter === 'Alles' 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className={`py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 overflow-hidden relative min-h-screen ${
      prikkelArm ? 'bg-[#FAF8F5] text-brand-aubergine' : 'bg-brand-cream text-brand-aubergine'
    }`}>
      {/* Background decoration in normal mode (gooey fluid circles) */}
      {!prikkelArm && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-yellow/10 blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-brand-orange/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 w-[600px] h-[600px] rounded-full bg-brand-turquoise/10 blur-3xl" />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Return to Home button */}
        <div className="mb-12">
          <button 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors focus:outline-none ${
              prikkelArm ? 'text-brand-aubergine hover:text-brand-aubergine/70' : 'text-brand-orange hover:text-brand-turquoise'
            }`}
          >
            &larr; Terug naar homepage
          </button>
        </div>

        {/* Title and Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className={`text-xs md:text-sm font-bold uppercase tracking-widest block ${prikkelArm ? 'text-brand-aubergine/70' : 'text-brand-orange'}`}>Projecten overzicht</span>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight">Al mijn projecten</h1>
          <p className="text-lg md:text-xl leading-relaxed text-brand-aubergine/80">
            Heel veel projecten, in en buiten de klas. Een paar voorbeelden.
          </p>
        </div>

        {/* Interactive Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilter === f
                  ? prikkelArm 
                    ? 'bg-brand-aubergine text-brand-cream border border-brand-aubergine' 
                    : 'bg-brand-orange text-brand-cream border border-brand-orange shadow-md'
                  : prikkelArm
                    ? 'bg-[#FAF8F5] border border-brand-aubergine/10 text-brand-aubergine/80 hover:border-brand-aubergine'
                    : 'bg-white/40 border border-brand-orange/10 hover:border-brand-orange text-brand-aubergine hover:bg-white/60'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid of Projects */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((p, i) => (
            <div 
              key={i} 
              className={`p-10 rounded-[2.5rem] border flex flex-col justify-between transition-all duration-300 transition-lift min-h-[280px] ${
                prikkelArm 
                  ? 'bg-[#FAF8F5] border-brand-aubergine/10 text-brand-aubergine shadow-sm' 
                  : 'bg-white/60 backdrop-blur-sm shadow-md border-brand-orange/5 hover:bg-white hover:shadow-xl'
              }`}
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${prikkelArm ? 'bg-brand-aubergine/10 text-brand-aubergine/80' : p.badgeBg}`}>
                    {p.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display mb-4 text-brand-aubergine">
                  {p.title}
                </h3>
                <p className="leading-relaxed text-base md:text-lg text-brand-aubergine/80 whitespace-pre-line">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home CTA at the bottom */}
        <div className="mt-20 text-center">
          <button 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-95 border ${
              prikkelArm 
                ? 'border-brand-aubergine bg-brand-aubergine text-brand-cream hover:bg-brand-aubergine/90' 
                : 'bg-brand-yellow border-brand-yellow text-brand-aubergine hover:bg-brand-orange hover:border-brand-orange hover:text-brand-cream shadow-md'
            }`}
          >
            <span>Terug naar de homepage</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// INTERACTIVE CARD MOTION GRAPHICS
// ==========================================
function CardMotionGraphicOne() {
  return (
    <div className="absolute right-0 bottom-0 w-44 h-44 pointer-events-none select-none opacity-20 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-105 origin-bottom-right z-0">
      <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="110" cy="110" r="65" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" strokeOpacity="0.25" className="text-brand-red group-hover:text-brand-red/60 transition-colors duration-500 animate-orbit-rotate" />
        <circle cx="110" cy="110" r="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.3" className="text-brand-red group-hover:text-brand-red/80 transition-colors duration-500 animate-orbit-reverse" />
        
        <g className="animate-orbit-rotate">
          <circle cx="110" cy="45" r="4.5" fill="#C8593F" />
          <circle cx="110" cy="175" r="3.5" fill="#BE3E49" />
        </g>
        <g className="animate-orbit-reverse">
          <circle cx="68" cy="110" r="3.5" fill="#DCA354" />
          <circle cx="152" cy="110" r="4.5" fill="#C8593F" />
        </g>

        <path d="M110 92 L113 107 L128 110 L113 113 L110 128 L107 113 L92 110 L107 107 Z" fill="#C8593F" className="animate-pulse duration-1000 origin-center scale-100 group-hover:scale-110 transition-transform" style={{ transformOrigin: '110px 110px' }} />
        <circle cx="110" cy="110" r="10" fill="#C8593F" fillOpacity="0.15" className="animate-ping" style={{ animationDuration: '3s' }} />
      </svg>
    </div>
  );
}

function CardMotionGraphicTwo() {
  return (
    <div className="absolute right-0 bottom-0 w-44 h-44 pointer-events-none select-none opacity-20 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-105 origin-bottom-right z-0">
      <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="95" cy="110" r="38" stroke="#BE3E49" strokeWidth="1.5" strokeOpacity="0.2" className="animate-connection-pulse" />
        <circle cx="125" cy="110" r="38" stroke="#DCA354" strokeWidth="1.5" strokeOpacity="0.2" className="animate-connection-pulse" style={{ animationDelay: '2s' }} />
        
        <path d="M110 85 C116 93 119 101 119 110 C119 119 116 127 110 135 C104 127 101 119 101 110 C101 101 104 93 110 85 Z" fill="#BE3E49" fillOpacity="0.08" className="group-hover:fill-opacity-20 transition-all duration-500" />
        
        <g className="animate-bubble-rise-card" style={{ animationDuration: '3.5s' }}>
          <path d="M85 140 C83 138 80 138 78 140 C76 142 76 145 78 147 L85 154 L92 147 C94 145 94 142 92 140 C90 138 87 138 85 140 Z" fill="#BE3E49" />
        </g>
        <g className="animate-bubble-rise-card" style={{ animationDuration: '4.5s', animationDelay: '1.2s' }}>
          <path d="M135 130 C133 128 130 128 128 130 C126 132 126 135 128 137 L135 144 L142 137 C144 135 144 132 142 130 C140 128 137 128 135 130 Z" fill="#DCA354" />
        </g>
        <g className="animate-bubble-rise-card" style={{ animationDuration: '5.5s', animationDelay: '2.5s' }}>
          <circle cx="110" cy="150" r="3.5" fill="#BE3E49" />
        </g>
      </svg>
    </div>
  );
}

function CardMotionGraphicThree() {
  return (
    <div className="absolute right-0 bottom-0 w-44 h-44 pointer-events-none select-none opacity-20 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-105 origin-bottom-right z-0">
      <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="animate-box-rotate origin-center" style={{ transformBox: 'fill-box', transformOrigin: '110px 110px' }}>
          <path d="M110 65 L145 82.5 L145 127.5 L110 145 L75 127.5 L75 82.5 Z" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
          <path d="M110 65 L110 145" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
          <path d="M75 82.5 L110 100 L145 82.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
          <path d="M110 100 L110 145" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
        </g>
        
        <circle cx="105" cy="120" r="4.5" fill="#C8593F" fillOpacity="0.35" className="animate-bubble-rise-card" style={{ animationDuration: '3.8s', animationDelay: '0.5s' }} />
        <circle cx="120" cy="130" r="3" fill="#DCA354" fillOpacity="0.35" className="animate-bubble-rise-card" style={{ animationDuration: '4.8s', animationDelay: '1.8s' }} />
        <circle cx="95" cy="115" r="5" fill="#C8593F" fillOpacity="0.35" className="animate-bubble-rise-card" style={{ animationDuration: '5.8s', animationDelay: '2.9s' }} />
        <circle cx="115" cy="105" r="4" fill="#DCA354" fillOpacity="0.35" className="animate-bubble-rise-card" style={{ animationDuration: '3.2s', animationDelay: '1.2s' }} />
      </svg>
    </div>
  );
}

// ==========================================
// VOOR WIE CARD MOTION GRAPHICS
// ==========================================
function VoorWieMotionGraphicOne() {
  return (
    <div className="absolute right-0 bottom-0 w-40 h-40 pointer-events-none select-none opacity-20 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-105 origin-bottom-right z-0">
      <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 140 L90 100 L130 120 L150 70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 4" />
        <path d="M90 100 L150 70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
        
        <g className="animate-pulse" style={{ animationDuration: '2s' }}>
          <path d="M90 92 L92 98 L98 100 L92 102 L90 108 L88 102 L82 100 L88 98 Z" fill="#DCA354" />
          <circle cx="90" cy="100" r="8" fill="#DCA354" fillOpacity="0.15" />
        </g>
        <g className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}>
          <path d="M150 64 L151.5 68.5 L156 70 L151.5 71.5 L150 76 L148.5 71.5 L144 70 L148.5 68.5 Z" fill="#FFFDF6" />
        </g>
        <g className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '2.5s' }}>
          <path d="M50 134 L51 138.5 L56 140 L51 141.5 L50 146 L49 141.5 L44 140 L49 138.5 Z" fill="#FFFDF6" />
        </g>
        <g className="animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1.8s' }}>
          <path d="M130 115 L131 118.5 L135 120 L131 121.5 L130 125 L129 121.5 L125 120 L129 118.5 Z" fill="#DCA354" />
        </g>
      </svg>
    </div>
  );
}

function VoorWieMotionGraphicTwo() {
  return (
    <div className="absolute right-0 bottom-0 w-40 h-40 pointer-events-none select-none opacity-20 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-105 origin-bottom-right z-0">
      <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="110" cy="110" r="55" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 2" className="animate-orbit-rotate" />
        <circle cx="110" cy="110" r="48" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
        
        <g className="animate-orbit-rotate" style={{ transformOrigin: '110px 110px' }}>
          <text x="107" y="64" fill="currentColor" fontSize="8" fontWeight="bold" opacity="0.4">N</text>
          <text x="107" y="164" fill="currentColor" fontSize="8" fontWeight="bold" opacity="0.4">S</text>
          <text x="154" y="113" fill="currentColor" fontSize="8" fontWeight="bold" opacity="0.4">O</text>
          <text x="59" y="113" fill="currentColor" fontSize="8" fontWeight="bold" opacity="0.4">W</text>
        </g>
        
        <g className="animate-connection-pulse" style={{ transformOrigin: '110px 110px' }}>
          <path d="M110 75 L116 110 L110 116 L104 110 Z" fill="#DCA354" />
          <path d="M110 145 L116 110 L110 104 L104 110 Z" fill="currentColor" fillOpacity="0.3" />
          <circle cx="110" cy="110" r="4" fill="#FFFDF6" />
        </g>
      </svg>
    </div>
  );
}

function VoorWieMotionGraphicThree() {
  return (
    <div className="absolute right-0 bottom-0 w-40 h-40 pointer-events-none select-none opacity-20 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-105 origin-bottom-right z-0">
      <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="110" cy="110" r="25" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" className="animate-ping" style={{ animationDuration: '4s' }} />
        <circle cx="110" cy="110" r="45" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" className="animate-ping" style={{ animationDuration: '5s', animationDelay: '1.5s' }} />
        <circle cx="110" cy="110" r="60" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" className="animate-ping" style={{ animationDuration: '6s', animationDelay: '3s' }} />
        
        <g className="animate-pulse" style={{ transformOrigin: '110px 110px', animationDuration: '2.5s' }}>
          <path d="M110 95 C108 92 103 92 101 95 C99 97 99 101 101 103 L110 113 L119 103 C121 101 121 97 119 95 C117 92 112 92 110 95 Z" fill="#DCA354" />
        </g>

        <circle cx="75" cy="100" r="3" fill="#FFFDF6" fillOpacity="0.4" className="animate-bubble-rise-card" style={{ animationDuration: '3.5s' }} />
        <circle cx="145" cy="90" r="4" fill="#DCA354" fillOpacity="0.4" className="animate-bubble-rise-card" style={{ animationDuration: '4.5s', animationDelay: '1.2s' }} />
        <circle cx="110" cy="130" r="2.5" fill="#FFFDF6" fillOpacity="0.4" className="animate-bubble-rise-card" style={{ animationDuration: '5s', animationDelay: '2.2s' }} />
      </svg>
    </div>
  );
}
