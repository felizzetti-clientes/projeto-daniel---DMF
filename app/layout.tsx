import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Tecnologia inteligente para empresas`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, locale: "pt_BR", type: "website", images: ["/og.png"] },
};
export const viewport: Viewport = { themeColor: "#111820" };

const jsonLd = { "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, logo: `${site.url}/logo.png`, description: site.description };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-graphite">Ir para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
