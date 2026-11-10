"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { forgeStore } from "@/lib/forgeStore";
import { cn } from "@/lib/utils";

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  max: number;
  sprite: number;
  wobble: number;
};

const COLORS = [
  "#5FCF4A",
  "#8BE86A",
  "#FFC94A",
  "#A6F28A",
  "#45E3CF",
  "#6FD64E",
];

function makeSprite(color: string): HTMLCanvasElement {
  const sprite = document.createElement("canvas");
  sprite.width = 48;
  sprite.height = 48;
  const ctx = sprite.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(24, 24, 0, 24, 24, 24);
    gradient.addColorStop(0, "#FFF6E2");
    gradient.addColorStop(0.22, color);
    gradient.addColorStop(0.55, `${color}55`);
    gradient.addColorStop(1, `${color}00`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 48, 48);
  }
  return sprite;
}

export function EmberCanvas({
  className,
  count = 70,
  speed = 1,
}: {
  className?: string;
  count?: number;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const sprites = COLORS.map(makeSprite);
    const embers: Ember[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;
    let inView = true;
    let disposed = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (width === 0 || height === 0) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (seeded: boolean): Ember => {
      const max = 2600 + Math.random() * 4200;
      return {
        x: Math.random() * width,
        y: seeded ? Math.random() * height : height + Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -(0.16 + Math.random() * 0.5),
        size: 3 + Math.random() * 13,
        life: seeded ? Math.random() * max : 0,
        max,
        sprite:
          Math.random() < 0.06
            ? 5
            : Math.floor(Math.random() * (COLORS.length - 1)),
        wobble: Math.random() * Math.PI * 2,
      };
    };

    const paint = (dt: number) => {
      const visuals = forgeStore.get();
      const target = Math.round(
        count * visuals.embers * Math.min(1.6, (width * height) / 420_000 + 0.35),
      );

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.42 + visuals.glow * 0.4;

      while (embers.length < target) embers.push(spawn(true));
      if (embers.length > target) embers.length = target;

      for (let i = 0; i < embers.length; i += 1) {
        const ember = embers[i];
        ember.life += dt;
        ember.wobble += dt * 0.0016;
        ember.x += (ember.vx + Math.sin(ember.wobble) * 0.22) * dt * 0.06 * speed;
        ember.y += ember.vy * dt * 0.06 * speed;

        if (ember.life >= ember.max || ember.y < -30) {
          embers[i] = spawn(false);
          continue;
        }

        const progress = ember.life / ember.max;
        const alpha = Math.sin(progress * Math.PI);
        const size = ember.size * (0.6 + alpha * 0.7);
        ctx.globalAlpha = alpha * (0.35 + visuals.glow * 0.45);
        ctx.drawImage(
          sprites[ember.sprite],
          ember.x - size / 2,
          ember.y - size / 2,
          size,
          size,
        );
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = (time: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(frame);
      if (!inView || document.hidden) {
        last = time;
        return;
      }
      const dt = Math.min(48, last ? time - last : 16);
      last = time;
      paint(dt);
    };

    resize();

    if (reduced) {
      const target = Math.round(count * forgeStore.get().embers);
      for (let i = 0; i < target; i += 1) embers.push(spawn(true));
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const ember of embers) {
        ctx.globalAlpha = 0.5;
        ctx.drawImage(
          sprites[ember.sprite],
          ember.x - ember.size / 2,
          ember.y - ember.size / 2,
          ember.size,
          ember.size,
        );
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      return () => {
        disposed = true;
      };
    }

    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(canvas);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    visibility.observe(canvas);

    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      visibility.disconnect();
    };
  }, [count, speed, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
    />
  );
}