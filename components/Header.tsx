"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const active = (h: string) => path === h || path.startsWith(h + "/");
  return (
    <header className="sticky top-0 z-50 border-b border-steel/25 bg-graphite/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-3" aria-label="DMF Intelligent Systems, página inicial">
          <Image src="/logo.png" alt="" width={36} height={36} className="rounded-full" priority />
          <span className="font-display text-sm font-semibold tracking-wide">DMF <span className="font-normal text-ice/80">Intelligent Systems</span></span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
              className={`relative px-4 py-2 text-sm transition-colors after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-ice after:transition-transform hover:text-white hover:after:scale-x-100 ${active(n.href) ? "text-white after:scale-x-100" : "text-ice/75"}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="grid size-11 place-items-center rounded-full border border-steel/40 md:hidden" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Menu móvel" className="border-t border-steel/25 bg-graphite px-5 pb-6 md:hidden">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="flex min-h-14 items-center justify-between border-b border-steel/20 font-display text-xl">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
