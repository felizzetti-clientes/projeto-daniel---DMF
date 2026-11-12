import type { Metadata } from "next";

export const site = {
  name: "DMF Intelligent Systems",
  // Domínio oficial: definir NEXT_PUBLIC_SITE_URL. O fallback é um placeholder inválido de propósito.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://dominio-a-definir.invalid").replace(/\/$/, ""),
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/\D/g, ""),
  description:
    "Soluções inteligentes que automatizam atendimentos, conectam processos e ajudam empresas a operar com mais eficiência.",
};

export const nav = [
  { href: "/", label: "Início" },
  { href: "/solucoes", label: "Soluções" },
  { href: "/demonstracoes", label: "Demonstrações" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export const whatsappHref = (text = "Olá! Vim pelo site da DMF e gostaria de conversar.") =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : null;

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, locale: "pt_BR", type: "website", images: ["/og.png"] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
