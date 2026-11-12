"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GhostFibers = dynamic(() => import("./GhostFibers"), { ssr: false });

/**
 * Fundo do hero: GhostFibers nas cores da DMF (Ice Blue → Steel), baixa intensidade.
 * Em telas pequenas usa menos fibras e partículas para preservar desempenho e leitura.
 * Movimento reduzido: o próprio componente desenha um quadro estático.
 */
export function HeroFibers() {
  const [small, setSmall] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setSmall(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  if (small === null) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,#000_70%,transparent)] md:opacity-100 md:[mask-image:linear-gradient(to_right,transparent_5%,#000_55%)]"
    >
      <GhostFibers
        glowColor="#A9C5D8"
        secondaryColor="#536779"
        lineColor="#F2F4F5"
        layers={small ? 2 : 3}
        threads={small ? 36 : 64}
        density={small ? 0.6 : 0.9}
        particles={small ? 0.15 : 0.35}
        fiberStyle="dots"
        depthOfField={0.8}
        brightness={small ? 0.7 : 0.85}
        glow={0.6}
        grain={0.04}
        speed={0.35}
        scale={small ? 1.2 : 1}
        rotation={small ? 62 : 18}
        mouseInteraction={!small}
        pulseOnClick={false}
        dpr={small ? 1.5 : 2}
      />
    </div>
  );
}
