"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type Layout = { w: number; h: number; hw: number; tw: number; fs: number; xs: number[]; ys: number[] };
const WIDE: Layout = { w: 640, h: 150, hw: 112, tw: 132, fs: 12, xs: [110, 110, 530, 530], ys: [34, 116, 34, 116] };
const COMPACT: Layout = { w: 360, h: 180, hw: 84, tw: 104, fs: 11, xs: [64, 64, 296, 296], ys: [40, 140, 40, 140] };

/** Adaptação do hub de integrações do Ink Orbit: um núcleo que conecta uma ferramenta de cada vez. */
export function HubBanner({ hub, nodes }: { hub: string; nodes: string[] }) {
  const reduce = useReducedMotion();
  const [auto, setAuto] = useState(0);
  const [hover, setHover] = useState(-1);
  useEffect(() => {
    if (reduce || hover >= 0) return;
    const t = setInterval(() => setAuto((a) => (a + 1) % nodes.length), 1800);
    return () => clearInterval(t);
  }, [reduce, hover, nodes.length]);
  const on = hover >= 0 ? hover : reduce ? -1 : auto;

  const Diagram = ({ l, className }: { l: Layout; className: string }) => {
    const hx = l.w / 2, hy = l.h / 2;
    const path = (i: number) => {
      const right = l.xs[i] > hx;
      const sx = right ? hx + l.hw / 2 : hx - l.hw / 2;
      const ex = right ? l.xs[i] - l.tw / 2 : l.xs[i] + l.tw / 2;
      return `M${sx},${hy} H${(sx + ex) / 2} V${l.ys[i]} H${ex}`;
    };
    return (
      <svg viewBox={`0 0 ${l.w} ${l.h}`} className={`h-full w-full ${className}`}>
        {nodes.map((_, i) => (
          <path key={i} d={path(i)} fill="none" strokeWidth="1.2" className={on === i ? "beam stroke-ice" : "stroke-steel/40"} />
        ))}
        {!reduce && on >= 0 && <circle key={on} r="2.5" className="fill-ice"><animateMotion dur="1.1s" repeatCount="indefinite" path={path(on)} /></circle>}
        <rect x={hx - l.hw / 2} y={hy - 20} width={l.hw} height="40" rx="8" className="fill-graphite stroke-ice/70" />
        <text x={hx} y={hy} textAnchor="middle" dominantBaseline="central" fontSize={l.fs - 1} className="fill-white font-mono" letterSpacing=".5">{hub.toUpperCase()}</text>
        {nodes.map((n, i) => (
          <g key={n} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} className="transition-transform duration-300" style={{ transform: on === i ? "translateY(-2px)" : undefined }}>
            <rect x={l.xs[i] - l.tw / 2} y={l.ys[i] - 15} width={l.tw} height="30" rx="7" className={`fill-slate transition-colors ${on === i ? "stroke-ice" : "stroke-steel/60"}`} />
            <text x={l.xs[i]} y={l.ys[i]} textAnchor="middle" dominantBaseline="central" fontSize={l.fs} className={on === i ? "fill-white" : "fill-ice/80"}>{n}</text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div aria-hidden className="relative mx-auto flex h-full max-w-3xl items-center px-5 py-3">
      <Diagram l={WIDE} className="hidden sm:block" />
      <Diagram l={COMPACT} className="sm:hidden" />
      <span className="absolute bottom-2 right-5 font-mono text-[10px] text-ice/50">ilustrativo</span>
    </div>
  );
}
