"use client";
import { useEffect, useRef } from "react";

/**
 * Adaptação do "Gateway Flow": trilhas pontilhadas das bordas convergem ao centro, com partículas em movimento.
 * Reescrito em canvas nativo (sem iframe, sem scripts externos), pausa fora da tela e respeita movimento reduzido.
 */
export function FlowBanner() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    let paths: { left: boolean; y: number; t: number; v: number }[] = [];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 640 ? 14 : 28;
      paths = Array.from({ length: n }, (_, i) => ({ left: i % 2 === 0, y: (i / n) * h * 1.6 - h * 0.3, t: Math.random(), v: 0.0015 + Math.random() * 0.002 }));
    };
    const draw = (step: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      for (const p of paths) {
        const x0 = p.left ? 0 : w, k = p.left ? 1 : -1;
        const [x1, x2] = [x0 + k * cx * 0.5, x0 + k * cx * 0.8];
        ctx.beginPath(); ctx.moveTo(x0, p.y); ctx.bezierCurveTo(x1, p.y, x2, cy, cx, cy);
        ctx.strokeStyle = "rgba(169,197,216,.22)"; ctx.lineWidth = 1; ctx.setLineDash([1, 4]); ctx.stroke(); ctx.setLineDash([]);
        if (step && (p.t += p.v) > 1) p.t = 0;
        const t = p.t, u = 1 - t;
        const x = u ** 3 * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t ** 3 * cx;
        const y = u ** 3 * p.y + 3 * u * u * t * p.y + 3 * u * t * t * cy + t ** 3 * cy;
        ctx.fillStyle = "rgba(242,244,245,.7)"; ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
      }
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, 6.283); ctx.strokeStyle = "rgba(169,197,216,.8)"; ctx.stroke();
    };
    const loop = () => { raf = 0; if (!visible) return; draw(true); raf = requestAnimationFrame(loop); };
    const ro = new ResizeObserver(() => { build(); draw(false); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduce && !raf) raf = requestAnimationFrame(loop); });
    io.observe(canvas);
    return () => { ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]" />;
}
