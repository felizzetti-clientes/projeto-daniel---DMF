import { Button } from "@/components/ui";
export const metadata = { title: "Página não encontrada", robots: { index: false } };
export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-32">
      <p className="font-mono text-sm text-ice/70">erro 404</p>
      <h1 className="mt-4 font-display text-4xl sm:text-6xl">Esta página não está no fluxo.</h1>
      <p className="mb-9 mt-5 max-w-lg text-lg text-ice/80">O endereço pode ter mudado ou não existir. Volte ao início ou explore as soluções.</p>
      <Button href="/">Voltar ao início</Button>
    </section>
  );
}
