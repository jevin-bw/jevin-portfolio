"use client";

import { useEffect, useRef } from "react";

const DURATION = 980;
const COUNT = 7200;

const INK = ["#0B1F3A", "#2B1055", "#7A0D52"];
const MINT = ["#D4EEF9", "#EFFAF6", "#B9EDDD"];

type Particle = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
};

const REGIONS: Array<[number, number, number, number, number]> = [
  [0.08, 0.16, 0.4, 0.28, 0.34],
  [0.54, 0.12, 0.34, 0.32, 0.22],
  [0.08, 0.5, 0.84, 0.22, 0.28],
  [0.08, 0.76, 0.84, 0.14, 0.16],
];

function helixStart(index: number, width: number, height: number) {
  const length = Math.hypot(width, height);
  const t = (index % (COUNT / 2)) / (COUNT / 2);
  const strand = index < COUNT / 2 ? 0 : Math.PI;
  const turns = 2.15;
  const radius = Math.min(width, height) * 0.2;
  const ux = width / length;
  const uy = -height / length;
  const px = -uy;
  const py = ux;
  const angle = t * turns * Math.PI * 2 + strand;
  const along = length * t;
  const depth = Math.sin(angle);
  const lift = depth * radius * 0.62;
  const side = Math.cos(angle) * radius;
  return {
    x: ux * (along + lift) + px * side,
    y: height + uy * (along + lift) + py * side,
  };
}

function targetPoint(index: number, width: number, height: number) {
  let cursor = (index / COUNT) % 1;
  let region = REGIONS[0];
  for (const next of REGIONS) {
    if (cursor <= next[4]) {
      region = next;
      break;
    }
    cursor -= next[4];
  }
  const [rx, ry, rw, rh] = region;
  const u = ((index * 17) % 100) / 100;
  const v = ((index * 43) % 100) / 100;
  return {
    x: (rx + u * rw) * width,
    y: (ry + v * rh) * height,
  };
}

function makeParticles(width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < COUNT; i++) {
    const start = helixStart(i, width, height);
    const end = targetPoint(i, width, height);
    const palette = i % 2 === 0 ? INK : MINT;
    particles.push({
      x0: start.x,
      y0: start.y,
      x1: Math.random() * width,
      y1: Math.random() * height,
      x2: end.x,
      y2: end.y,
      color: palette[i % 3],
    });
  }
  return particles;
}

export function EnterTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const active = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;

    const play = () => {
      if (active.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      active.current = true;
      canvas.classList.add("is-active");
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const particles = makeParticles(width, height);
      const started = performance.now();

      const draw = (now: number) => {
        const t = Math.min(1, (now - started) / DURATION);
        ctx.clearRect(0, 0, width, height);
        const breakT = Math.min(1, t / 0.42);
        const formT = Math.max(0, Math.min(1, (t - 0.32) / 0.5));
        const breakEase = 1 - (1 - breakT) * (1 - breakT);
        const formEase = formT * formT * (3 - 2 * formT);
        const fade = t < 0.72 ? 1 : 1 - (t - 0.72) / 0.28;
        const size = 3 + (1 - formEase) * 5;

        for (const particle of particles) {
          const xBurst = particle.x0 + (particle.x1 - particle.x0) * breakEase;
          const yBurst = particle.y0 + (particle.y1 - particle.y0) * breakEase;
          const x = xBurst + (particle.x2 - xBurst) * formEase;
          const y = yBurst + (particle.y2 - yBurst) * formEase;
          ctx.globalAlpha = fade;
          ctx.fillStyle = particle.color;
          ctx.fillRect(x, y, size, size);
        }

        if (t < 1) {
          frame = requestAnimationFrame(draw);
        } else {
          ctx.globalAlpha = 1;
          active.current = false;
          canvas.classList.remove("is-active");
          ctx.clearRect(0, 0, width, height);
        }
      };

      frame = requestAnimationFrame(draw);
    };

    window.addEventListener("jw-enter", play);
    return () => {
      window.removeEventListener("jw-enter", play);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="enter-transition" aria-hidden="true" />;
}
