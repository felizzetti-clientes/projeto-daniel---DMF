import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button, Eyebrow, Reveal, WordReveal } from "@/components/ui";
import { FlowDiagram } from "@/components/FlowDiagram";
import { SolutionIcon } from "@/components/SolutionIcon";
import { Cta } from "@/components/Cta";
import { HeroFibers } from "@/components/HeroFibers";
import { solutions } from "@/lib/solutions";

const problems = [
  ["Atendimentos repetitivos", "A equipe responde as mesmas perguntas todos os dias."],
  ["Processos manuais", "Informações digitadas em vários lugares, sempre dependendo de alguém."],
  ["Leads sem acompanhamento", "Contatos interessados que se perdem entre conversas e planilhas."],
  ["Agendamentos desorganizados", "Horários combinados por mensagem, sem visão clara da agenda."],
  ["Ferramentas que não se comunicam", "Cada sistema com seus dados, sem conexão entre eles."],
];
const steps = [
  ["Entendemos sua operação", "Conversamos para conhecer seu negócio, seu atendimento e seus processos."],
  ["Identificamos oportunidades", "Apontamos onde a tecnologia pode simplificar e o que vale priorizar."],
  ["Desenvolvemos a solução", "Construímos o que faz sentido para o seu caso, não um pacote pronto."],
  ["Implementamos e acompanhamos", "Colocamos para funcionar e seguimos ajustando com você."],
];
const span = ["md:col-span-4", "md:col-span-2", "md:col-span-3", "md:col-span-3"];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroFibers />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.1fr_1fr] lg:pt-28">
          <div>
            <Eyebrow>Inteligência aplicada à operação</Eyebrow>
            <WordReveal text="Tecnologia inteligente para empresas que querem evoluir." className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl" />
            <Reveal delay={0.5}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ice/80">Desenvolvemos soluções inteligentes que automatizam atendimentos, conectam processos e ajudam sua empresa a operar com mais eficiência.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/solucoes">Conheça nossas soluções</Button>
                <Button href="/demonstracoes" variant="ghost">Explore as demonstrações</Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.35}><FlowDiagram /></Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Eyebrow>O ponto de partida</Eyebrow>
            <h2 className="font-display text-3xl font-medium leading-tight sm:text-5xl">O futuro da operação da sua empresa começa agora.</h2>
            <p className="mt-6 max-w-md text-lg text-ice/80">Tecnologia não precisa ser complicada para gerar melhorias reais. Ela começa resolvendo o que hoje consome tempo da sua equipe.</p>
          </Reveal>
          <ol className="divide-y divide-steel/30 border-y border-steel/30">
            {problems.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <li className="grid grid-cols-[3rem_1fr] gap-2 py-6">
                  <span className="pt-1 font-mono text-xs text-ice/60">0{i + 1}</span>
                  <div><h3 className="font-display text-xl">{t}</h3><p className="mt-1 text-ice/75">{d}</p></div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal><Eyebrow>Nossas soluções</Eyebrow><h2 className="max-w-2xl font-display text-3xl font-medium sm:text-5xl">Quatro frentes, um mesmo objetivo: operação mais fluida.</h2><p className="mt-5 flex items-center gap-2 font-mono text-xs text-ice/70 md:hidden"><ArrowUpRight size={14} aria-hidden />Toque em uma solução para ver os detalhes.</p></Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className={span[i]}>
              <Link href={s.href} className="group flex h-full min-h-64 flex-col justify-between rounded-2xl border border-steel/40 bg-slate/40 p-7 transition duration-300 hover:-translate-y-1 hover:border-ice/60 hover:bg-slate/70">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-steel/50 text-ice transition group-hover:scale-110"><SolutionIcon name={s.icon} /></span>
                  <span className="grid size-9 place-items-center rounded-full border border-steel/50 text-ice transition group-hover:border-ice group-hover:bg-ice group-hover:text-graphite"><ArrowUpRight size={16} aria-hidden /></span>
                </div>
                <div className="mt-10">
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <p className="mt-2 max-w-md text-ice/75">{s.short}</p>
                  <p className="mt-4 font-mono text-xs text-ice">{s.benefit}</p>
                  <span className="mt-5 flex items-center justify-between border-t border-steel/30 pt-4 text-sm font-medium">Saiba mais<ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal><Eyebrow>Como funciona</Eyebrow><h2 className="max-w-xl font-display text-3xl font-medium sm:text-5xl">Um processo simples, acompanhado de perto.</h2></Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <span className="absolute left-[5px] top-2 h-full w-px bg-steel/40 md:left-0 md:top-[5px] md:h-px md:w-full" aria-hidden />
          {steps.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <li className="relative pl-8 md:pl-0 md:pt-10">
                <span className="absolute left-0 top-1 size-[11px] rounded-full border-2 border-ice bg-graphite md:top-0" aria-hidden />
                <span className="font-mono text-xs text-ice/70">etapa 0{i + 1}</span>
                <h3 className="mt-2 font-display text-xl">{t}</h3>
                <p className="mt-2 text-ice/75">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal className="grid items-center gap-10 rounded-3xl border border-steel/40 bg-slate/40 p-8 sm:p-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Demonstrações</Eyebrow>
            <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl">Não apenas falamos sobre tecnologia. Mostramos o que ela pode fazer.</h2>
            <p className="mt-5 text-ice/80">Experimente um atendimento simulado e veja como uma conversa pode ser conduzida e organizada.</p>
            <div className="mt-8"><Button href="/demonstracoes">Explorar demonstrações</Button></div>
          </div>
          <div className="space-y-3 text-sm" aria-hidden>
            <p className="w-fit max-w-[80%] rounded-2xl rounded-bl-sm bg-graphite/80 px-4 py-3">Olá! Como posso ajudar?</p>
            <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-ice px-4 py-3 text-graphite">Quero conhecer os serviços.</p>
            <p className="w-fit max-w-[80%] rounded-2xl rounded-bl-sm bg-graphite/80 px-4 py-3">Claro! Posso mostrar as opções e solicitar um horário.</p>
          </div>
        </Reveal>
      </section>

      <Cta title="Sua empresa pode trabalhar de forma mais inteligente." text="Vamos entender seus desafios e descobrir como a tecnologia pode simplificar sua operação." />
    </>
  );
}
