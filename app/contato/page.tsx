import { MessageCircle } from "lucide-react";
import { PageHead } from "@/components/PageHead";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui";
import { LineBanner } from "@/components/banners/LineBanner";
import { pageMeta, whatsappHref } from "@/lib/site";

export const metadata = pageMeta("Fale com a DMF", "Conte sobre seu negócio e seus desafios. Vamos identificar como a tecnologia pode ajudar sua empresa.", "/contato");

export default function Contato() {
  const wa = whatsappHref();
  return (
    <>
      <PageHead eyebrow="Contato" title="Vamos encontrar uma solução para sua empresa?" text="Conte um pouco sobre seu negócio e os desafios que deseja resolver. Vamos entender suas necessidades e identificar como a tecnologia pode ajudar." banner={<LineBanner items={["Você conta", "Analisamos", "Retornamos"]} />} />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1.5fr_1fr]">
        <ContactForm />
        <aside className="h-fit rounded-2xl border border-steel/40 p-8">
          <MessageCircle className="text-ice" aria-hidden />
          <h2 className="mt-4 font-display text-2xl">Prefere o WhatsApp?</h2>
          {wa ? (
            <>
              <p className="mb-6 mt-3 text-ice/80">Fale direto com a DMF e conte rapidamente o que você precisa.</p>
              <Button href={wa} external>Conversar no WhatsApp</Button>
            </>
          ) : (
            <p className="mt-3 text-ice/80">O número de WhatsApp será divulgado em breve. Por enquanto, use o formulário.</p>
          )}
        </aside>
      </section>
    </>
  );
}
