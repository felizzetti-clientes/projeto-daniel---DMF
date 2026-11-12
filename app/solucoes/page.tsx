import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { SolutionIcon } from "@/components/SolutionIcon";
import { Cta } from "@/components/Cta";
import { Reveal } from "@/components/ui";
import { pages } from "@/lib/solutions";
import { HubBanner } from "@/components/banners/HubBanner";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("Soluções inteligentes para empresas", "Agentes de IA, automação de WhatsApp e automações inteligentes desenvolvidos conforme a necessidade de cada empresa.", "/solucoes");

export default function Solucoes() {
  return (
    <>
      <PageHead eyebrow="Soluções" title="Soluções inteligentes para desafios reais." text="Cada empresa possui processos e necessidades diferentes. Desenvolvemos soluções tecnológicas pensadas para melhorar a forma como seu negócio atende, organiza e opera." banner={<HubBanner hub="Sua empresa" nodes={["Agentes de IA", "WhatsApp", "Automações", "Integrações"]} />} />
      <div className="mx-auto max-w-6xl divide-y divide-steel/30 px-5">
        {pages.map((s, i) => (
          <Reveal key={s.slug} className="grid gap-8 py-16 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <span className="font-mono text-xs text-ice/60">0{i + 1}</span>
              <div className="mt-4 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl border border-steel/50 text-ice"><SolutionIcon name={s.icon} /></span><h2 className="font-display text-3xl">{s.title}</h2></div>
              <p className="mt-5 text-ice/80">{s.short}</p>
              <p className="mt-5 rounded-lg border-l-2 border-ice bg-slate/40 p-4 text-sm"><span className="font-mono text-xs text-ice">Faz sentido quando</span><br />{s.when}</p>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ice/70">Aplicações</h3>
              <ul className="mt-4 divide-y divide-steel/25 border-y border-steel/25">
                {s.uses.map((u) => <li key={u} className="py-3.5 text-ice/90">{u}</li>)}
              </ul>
              <Link href={s.href} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-8 hover:underline">Ver detalhes de {s.title} →</Link>
            </div>
          </Reveal>
        ))}
      </div>
      <Cta title="Não sabe qual solução faz sentido?" text="Conte sobre sua operação. Ajudamos a identificar por onde começar." />
    </>
  );
}
