"use client";

import { useEffect, useRef } from "react";

const PIXEL = 2;
const BURST_MS = 460;

type Palette = "on-light" | "on-dark";

const COLORS: Record<Palette, [string, string, string]> = {
  "on-light": ["#0B1F3A", "#2B1055", "#7A0D52"],
  "on-dark": ["#D4EEF9", "#EFFAF6", "#B9EDDD"],
};

const OPPOSITE: Record<Palette, [string, string, string]> = {
  "on-light": ["#D4EEF9", "#EFFAF6", "#B9EDDD"],
  "on-dark": ["#0B1F3A", "#2B1055", "#7A0D52"],
};

function inSeam(angle: number) {
  const turn = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const dist = Math.min(turn, Math.PI * 2 - turn);
  return dist < 0.85;
}

function scatter(x: number, y: number, seed: number, elapsed: number) {
  if (elapsed <= 0) return { x, y };
  const t = Math.min(1, elapsed);
  const eased = 1 - (1 - t) * (1 - t) * (1 - t);
  const n = Math.sin(seed * 12.9898) * 43758.5453;
  const unit = n - Math.floor(n);
  const n2 = Math.sin(seed * 78.233) * 0.5 + 0.5;
  const dist = eased * (28 + unit * 70);
  const ang = n2 * Math.PI * 2;
  return {
    x: x + Math.cos(ang) * dist,
    y: y + Math.sin(ang) * dist * 0.65 + eased * eased * 18,
  };
}

function plot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  size: number,
  alpha: number,
) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  const grid = Math.round(x / PIXEL) * PIXEL;
  const gridY = Math.round(y / PIXEL) * PIXEL;
  ctx.fillRect(grid, gridY, size, size);
}

function plotLine(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: string,
  seed: number,
  elapsed: number,
  alpha: number,
  size: number,
) {
  const a = scatter(x0, y0, seed, elapsed);
  const b = scatter(x1, y1, seed, elapsed);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / PIXEL));
  for (let s = 0; s <= steps; s++) {
    const u = s / steps;
    plot(ctx, a.x + dx * u, a.y + dy * u, color, size, alpha);
  }
}

function paint(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: Palette,
  time: number,
  burstAt: number | null,
  now: number,
) {
  ctx.clearRect(0, 0, width, height);
  const elapsed = burstAt == null ? 0 : Math.min(1, (now - burstAt) / BURST_MS);
  const fade = burstAt == null ? 1 : Math.max(0, 1 - elapsed);
  const colors = COLORS[palette];
  const flipped = OPPOSITE[palette];
  const length = Math.hypot(width, height);
  const steps = Math.max(220, Math.floor(length * 1.4));
  const turns = 2.15;
  const radius = Math.min(width, height) * 0.2;
  const ux = width / length;
  const uy = -height / length;
  const px = -uy;
  const py = ux;
  const rungEvery = Math.max(6, Math.round(steps / 36));
  const spin = time * 1.25 + Math.sin(time * 0.33) * 0.4;

  function orbit(t: number, phase: number) {
    const along = length * t;
    const angle = t * turns * Math.PI * 2 + phase;
    const side = Math.cos(angle) * radius;
    const depth = Math.sin(angle);
    const lift = depth * radius * 0.62;
    return {
      x: ux * (along + lift) + px * side,
      y: height + uy * (along + lift) + py * side,
      depth,
      angle,
    };
  }

  function strandColor(index: 0 | 1 | 2, angle: number) {
    return (inSeam(angle) ? flipped : colors)[index];
  }

  type Segment = {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    color: string;
    seed: number;
    depth: number;
  };
  const segments: Segment[] = [];
  let prevA: { x: number; y: number } | null = null;
  let prevB: { x: number; y: number } | null = null;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = orbit(t, spin);
    const b = orbit(t, spin + Math.PI);
    if (prevA) {
      segments.push({
        x0: prevA.x,
        y0: prevA.y,
        x1: a.x,
        y1: a.y,
        color: strandColor(0, a.angle),
        seed: i * 2,
        depth: a.depth,
      });
    }
    if (prevB) {
      segments.push({
        x0: prevB.x,
        y0: prevB.y,
        x1: b.x,
        y1: b.y,
        color: strandColor(1, b.angle),
        seed: i * 2 + 1,
        depth: b.depth,
      });
    }
    prevA = a;
    prevB = b;

    if (i % rungEvery === 0) {
      segments.push({
        x0: a.x,
        y0: a.y,
        x1: b.x,
        y1: b.y,
        color: strandColor(2, a.angle),
        seed: i * 20,
        depth: Math.min(a.depth, b.depth) - 0.15,
      });
    }
  }

  segments.sort((a, b) => a.depth - b.depth);
  for (const segment of segments) {
    const near = segment.depth * 0.5 + 0.5;
    const alpha = fade * (0.32 + 0.68 * near);
    const size = PIXEL + Math.round(near * near * 5);
    plotLine(
      ctx,
      segment.x0,
      segment.y0,
      segment.x1,
      segment.y1,
      segment.color,
      segment.seed,
      elapsed,
      alpha,
      size,
    );
  }
  ctx.globalAlpha = 1;
}

export function DnaHelix({
  palette,
  burstAt,
  reducedMotion,
}: {
  palette: Palette;
  burstAt: number | null;
  reducedMotion: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstRef = useRef(burstAt);
  burstRef.current = burstAt;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const draw = (now: number) => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      const frozen = reducedMotion ? 0.8 : now / 1000;
      paint(ctx, width, height, palette, frozen, burstRef.current, now);
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [palette, reducedMotion]);

  return <canvas ref={canvasRef} className="dna-helix" aria-hidden="true" />;
}

export const DNA_BURST_MS = BURST_MS;
