import { Button, Reveal } from "./ui";
import { whatsappHref } from "@/lib/site";

export function Cta({ title, text, label = "Fale com a DMF" }: { title: string; text: string; label?: string }) {
  const wa = whatsappHref();
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal className="relative overflow-hidden rounded-3xl border border-steel/40 bg-slate/40 p-8 sm:p-14">
        <div className="spot pointer-events-none absolute inset-0" aria-hidden />
        <h2 className="relative max-w-2xl font-display text-3xl font-medium leading-tight sm:text-5xl">{title}</h2>
        <p className="relative mt-5 max-w-xl text-lg text-ice/80">{text}</p>
        <div className="relative mt-9 flex flex-wrap gap-3">
          <Button href="/contato">{label}</Button>
          {wa && <Button href={wa} variant="ghost" external>WhatsApp</Button>}
        </div>
      </Reveal>
    </section>
  );
}
