import type { ReactNode } from "react";
import { Eyebrow, Reveal } from "./ui";
export function PageHead({ eyebrow, title, text, banner }: { eyebrow: string; title: string; text: string; banner?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-steel/25">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <Reveal className={`relative mx-auto max-w-6xl px-5 pt-20 sm:pt-28 ${banner ? "pb-14" : "pb-20"}`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ice/80">{text}</p>
      </Reveal>
      {banner && <div className="relative h-44 border-t border-steel/25 bg-graphite/50 sm:h-52">{banner}</div>}
    </section>
  );
}
