import Link from "next/link";
import Image from "next/image";
import { nav, site, whatsappHref } from "@/lib/site";
import { pages } from "@/lib/solutions";

export function Footer() {
  const wa = whatsappHref();
  return (
    <footer className="border-t border-steel/25">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src="/logo.png" alt="DMF Intelligent Systems" width={72} height={72} className="rounded-full" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ice/70">{site.description}</p>
        </div>
        <FooterCol title="Soluções" items={pages.map((s) => ({ href: s.href, label: s.title }))} />
        <FooterCol title="Empresa" items={[...nav.filter((n) => n.href !== "/solucoes"), ...(wa ? [{ href: wa, label: "WhatsApp" }] : [])]} />
      </div>
      <p className="border-t border-steel/20 px-5 py-6 text-center font-mono text-xs text-ice/60">© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ice/60">{title}</p>
      <ul className="space-y-3 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            {i.href.startsWith("http")
              ? <a href={i.href} target="_blank" rel="noopener noreferrer" className="text-ice/80 transition-colors hover:text-white">{i.label}</a>
              : <Link href={i.href} className="text-ice/80 transition-colors hover:text-white">{i.label}</Link>}
          </li>
        ))}
      </ul>
    </div>
  );
}
