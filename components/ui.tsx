"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Entrada com blur + fade (equivalente ao Blur Fade), respeitando prefers-reduced-motion. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Título revelado palavra a palavra (Text Effect). O texto completo segue disponível para leitores de tela. */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <h1 className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block whitespace-pre"
          initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
        >
          {w + " "}
        </motion.span>
      ))}
    </h1>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-ice/80">
      <span className="h-px w-8 bg-ice/60" aria-hidden />
      {children}
    </p>
  );
}

export function Button({ href, children, variant = "primary", external }: { href: string; children: ReactNode; variant?: "primary" | "ghost"; external?: boolean }) {
  const base = "group inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-medium transition duration-300 active:scale-[.98]";
  const styles = variant === "primary"
    ? "bg-white text-graphite hover:bg-ice"
    : "border border-steel/60 text-white hover:border-ice hover:bg-slate/60";
  const inner = <>{children}<ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden /></>;
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>{inner}</a>
    : <Link href={href} className={`${base} ${styles}`}>{inner}</Link>;
}
