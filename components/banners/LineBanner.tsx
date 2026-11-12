"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Linha de etapas que se acendem em sequência (movimento do hub, em formato linear). */
export function LineBanner({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const n = items.length;
  const [auto, setAuto] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setAuto((a) => (a + 1) % (n + 1)), 1400);
    return () => clearInterval(t);
  }, [reduce, n]);
  const on = reduce ? n - 1 : Math.min(auto, n - 1);
  return (
    <div aria-hidden className="mx-auto flex h-full max-w-3xl items-center px-5">
      <div className="relative w-full">
        <div className="absolute top-[5px] h-px bg-steel/40" style={{ left: `${50 / n}%`, right: `${50 / n}%` }}>
          <div className="h-full bg-ice transition-[width] duration-700" style={{ width: `${(on / (n - 1)) * 100}%` }} />
        </div>
        <ol className="relative flex">
          {items.map((t, i) => (
            <li key={t} className="flex flex-1 flex-col items-center gap-3 text-center">
              <span className={`size-[11px] rounded-full border-2 transition-colors duration-500 ${i <= on ? "border-ice bg-ice" : "border-steel bg-graphite"}`} />
              <span className={`font-mono text-[10px] transition-colors duration-500 sm:text-xs ${i === on ? "text-white" : "text-ice/60"}`}>{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
