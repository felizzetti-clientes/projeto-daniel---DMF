import { PageHead } from "@/components/PageHead";
import { Cta } from "@/components/Cta";
import { Reveal } from "@/components/ui";
import { LineBanner } from "@/components/banners/LineBanner";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("Sobre a DMF Intelligent Systems", "Conheça o propósito e os princípios da DMF: tecnologia, estratégia e soluções personalizadas para operações mais eficientes.", "/sobre");

const principles = [
  ["Inovação com propósito", "Tecnologia só entra quando resolve um problema real."],
  ["Soluções personalizadas", "Cada projeto parte da operação e das necessidades do cliente."],
  ["Eficiência operacional", "Simplificar processos para que a equipe foque no que importa."],
  ["Clareza e transparência", "Explicamos o que será feito, como funciona e quais são os limites."],
  ["Evolução contínua", "Soluções que acompanham o crescimento do negócio."],
];

export default function Sobre() {
  return (
    <>
      <PageHead eyebrow="Sobre" title="Tecnologia com propósito. Soluções com direção." text="A DMF Intelligent Systems nasceu com o propósito de aproximar empresas das possibilidades da tecnologia." banner={<LineBanner items={["Propósito", "Sob medida", "Eficiência", "Clareza", "Evolução"]} />} />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2">
        <Reveal className="space-y-5 text-lg leading-relaxed text-ice/85">
          <p>Acreditamos que soluções inteligentes devem ir além da inovação: precisam resolver problemas, simplificar processos e contribuir para operações mais eficientes.</p>
          <p>Nosso trabalho combina tecnologia, estratégia e desenvolvimento de soluções personalizadas para atender às necessidades de cada negócio.</p>
        </Reveal>
        <ol className="divide-y divide-steel/30 border-y border-steel/30">
          {principles.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.05}>
              <li className="grid grid-cols-[3rem_1fr] py-5"><span className="font-mono text-xs text-ice/60 pt-1">0{i + 1}</span><div><h2 className="font-display text-xl">{t}</h2><p className="mt-1 text-ice/75">{d}</p></div></li>
            </Reveal>
          ))}
        </ol>
      </section>
      <Cta title="Vamos conversar?" text="Conte o que sua empresa precisa e veja como podemos ajudar." />
    </>
  );
}
