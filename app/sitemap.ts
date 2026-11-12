import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { pages } from "@/lib/solutions";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/solucoes", ...pages.map((s) => s.href), "/demonstracoes", "/sobre", "/contato"];
  return paths.map((p) => ({ url: site.url + p, lastModified: new Date() }));
}
