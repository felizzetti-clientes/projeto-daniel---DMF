import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Cta } from "@/components/Cta";
import { Reveal } from "@/components/ui";
import { pages } from "@/lib/solutions";
import { HubBanner } from "@/components/banners/HubBanner";
import { pageMeta } from "@/lib/site";

const hubs: Record<string, { hub: string; nodes: string[] }> = {
  "agentes-ia": { hub: "Agente", nodes: ["Dúvidas", "Triagem", "Agenda", "Equipe"] },
  whatsapp: { hub: "WhatsApp", nodes: ["Contato", "Coleta", "Qualificação", "Equipe"] },
  automacoes: { hub: "Automação", nodes: ["Planilhas", "Agenda", "CRM", "Mensageiro"] },
};

export const dynamicParams = false;
export const generateStaticParams = () => pages.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = pages.find((p) => p.slug === slug);
  return s ? pageMeta(s.title, s.headline, s.href) : {};
}

export default async function Solucao({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = pages.find((p) => p.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageHead eyebrow={s.title} title={s.headline} text={s.intro} banner={<HubBanner {...hubs[s.slug]} />} />
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-2xl sm:text-3xl">Como funciona na prática</h2>
        <dl className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {s.points.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.05} className="border-t border-steel/30 pt-5">
              <dt className="font-display text-xl">{p.t}</dt><dd className="mt-2 text-ice/75">{p.d}</dd>
            </Reveal>
          ))}
        </dl>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-10">
        <div className="rounded-2xl border border-steel/40 bg-slate/40 p-8 sm:p-10">
          <h2 className="font-display text-2xl">Exemplos de aplicação</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {s.uses.map((u) => <li key={u} className="flex gap-3 text-ice/90"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ice" aria-hidden />{u}</li>)}
          </ul>
        </div>
      </section>
      <Cta title="Vamos conversar sobre o seu caso?" text="Cada projeto é desenhado a partir da operação da empresa. Conte o que você precisa resolver." />
    </>
  );
}
