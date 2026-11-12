import { PageHead } from "@/components/PageHead";
import { ChatDemo } from "@/components/ChatDemo";
import { Cta } from "@/components/Cta";
import { FlowBanner } from "@/components/banners/FlowBanner";
import { demos } from "@/lib/demos";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("Demonstrações interativas", "Experimente uma demonstração de atendimento automatizado e veja como soluções inteligentes organizam conversas e agendamentos.", "/demonstracoes");

export default function Demonstracoes() {
  const demo = demos[0];
  return (
    <>
      <PageHead eyebrow="Demonstrações" title="Veja a tecnologia em ação." text="Explore demonstrações interativas e descubra como soluções inteligentes podem transformar o atendimento e os processos de diferentes empresas." banner={<FlowBanner />} />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ice/70">Demonstração 01</p>
          <h2 className="mt-3 font-display text-3xl">{demo.title}</h2>
          <p className="mt-4 text-ice/80">Converse com um assistente simulado: conheça serviços, consulte informações, solicite um horário e peça atendimento humano.</p>
          <p className="mt-4 text-sm text-ice/65">As respostas são programadas e a clínica é fictícia. Nenhuma informação enviada aqui é armazenada. Em breve: academia, restaurante e assistência técnica.</p>
        </div>
        <ChatDemo demo={demo} />
      </section>
      <Cta title="Quer algo assim para a sua empresa?" text="Adaptamos o atendimento ao seu negócio, aos seus serviços e ao seu processo." />
    </>
  );
}
