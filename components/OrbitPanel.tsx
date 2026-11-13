"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Painel do hero: um núcleo (agente) no centro de anéis concêntricos, ecoando o círculo da logo.
 * Um sinal percorre canal → agente → agenda → sistemas → equipe, com o registro da operação ao lado.
 * Tudo é simulação ilustrativa, e o painel diz isso.
 */
const C = 220;
const nodes = [
  { id: "canal", label: "Canal", a: 200 },
  { id: "agenda", label: "Agenda", a: 320 },
  { id: "sistemas", label: "Sistemas", a: 130 },
  { id: "equipe", label: "Equipe", a: 40 },
];
const at = (a: number, r = 170) => [C + r * Math.cos((a * Math.PI) / 180), C + r * Math.sin((a * Math.PI) / 180)] as const;
const steps = [
  { node: "canal", out: false, log: ["canal", "mensagem recebida"] },
  { node: null, out: false, log: ["agente", "intenção identificada: agendamento"] },
  { node: "agenda", out: true, log: ["agenda", "horário sugerido ao cliente"] },
  { node: "sistemas", out: true, log: ["sistemas", "solicitação registrada"] },
  { node: "equipe", out: true, log: ["equipe", "atendente avisado"] },
];

export function OrbitPanel() {
  const reduce = useReducedMotion();
  const [s, setS] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setS((v) => (v + 1) % steps.length), 1700);
    return () => clearInterval(t);
  }, [reduce]);
  const step = reduce ? steps.length - 1 : s;
  const cur = steps[step];
  const first = Math.max(0, step - 2);
  const shown = steps.slice(first, step + 1);
  const target = nodes.find((n) => n.id === cur.node);
  const tp = target ? at(target.a) : null;
  const packet = tp ? (cur.out ? `M${C},${C} L${tp[0]},${tp[1]}` : `M${tp[0]},${tp[1]} L${C},${C}`) : null;

  return (
    <figure role="img" aria-label="Ilustração animada: uma mensagem chega pelo canal, o agente a interpreta e a encaminha para agenda, sistemas e equipe." className="rounded-2xl border border-steel/40 bg-graphite/70 p-4 backdrop-blur sm:p-6">
      <div aria-hidden>
        <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-ice/60">
          <span>operacao.simulada</span>
          <span className="flex items-center gap-2"><span className="dot size-1.5 rounded-full bg-ice" />simulação</span>
        </div>
        <svg viewBox="0 0 440 420" className="mx-auto w-full max-w-[440px]">
          <circle cx={C} cy={C} r="70" className="fill-none stroke-steel/30" />
          <circle cx={C} cy={C} r="120" className="fill-none stroke-steel/30" strokeDasharray="2 6" />
          <circle cx={C} cy={C} r="170" className="fill-none stroke-steel/40" />
          <g className="orbit"><circle cx={C + 120} cy={C} r="3" className="fill-ice/70" /><circle cx={C - 120} cy={C} r="2" className="fill-steel" /></g>
          <g className="orbit orbit-r"><circle cx={C} cy={C - 70} r="3" className="fill-ice/70" /><circle cx={C} cy={C + 170} r="2.5" className="fill-steel" /></g>

          {nodes.map((n) => {
            const [x, y] = at(n.a);
            const on = cur.node === n.id;
            return (
              <g key={n.id}>
                <line x1={C} y1={C} x2={x} y2={y} strokeWidth="1" className={on ? "beam stroke-ice" : "stroke-steel/25"} strokeDasharray={on ? undefined : "2 5"} />
                {on && <circle cx={x} cy={y} r="13" className="fill-none stroke-ice/40" />}
                <circle cx={x} cy={y} r="6" className={`transition-colors duration-500 ${on ? "fill-ice stroke-ice" : "fill-graphite stroke-steel"}`} strokeWidth="1.5" />
                <text x={x} y={y < C ? y - 20 : y + 32} textAnchor="middle" fontSize="15" className={`font-mono transition-colors duration-500 ${on ? "fill-white" : "fill-ice/60"}`}>{n.label}</text>
              </g>
            );
          })}

          {!reduce && packet && <circle key={step} r="3.5" className="fill-white"><animateMotion dur="1.2s" fill="freeze" path={packet} /></circle>}
          {!reduce && cur.node === null && (
            <circle key={"p" + step} cx={C} cy={C} r="30" className="fill-none stroke-ice">
              <animate attributeName="r" from="30" to="78" dur="1.4s" />
              <animate attributeName="opacity" from=".7" to="0" dur="1.4s" />
            </circle>
          )}

          <circle cx={C} cy={C} r="30" className="fill-graphite stroke-ice/60" />
          <path d={`M${C - 11},${C + 11} L${C - 11},${C - 11} L${C + 11},${C + 11} Z`} className="fill-ice" />
          <text x={C} y={C + 52} textAnchor="middle" fontSize="12" letterSpacing="2" className="fill-ice/70 font-mono">AGENTE</text>
        </svg>
        <div className="mt-2 min-h-[4.75rem] space-y-1.5 border-t border-steel/30 pt-4 font-mono text-xs">
          {shown.map((l, i) => (
            <p key={first + i} className={i === shown.length - 1 ? "rise text-white" : "text-ice/50"}>
              <span className="text-ice/60">› </span><span className="text-ice">{l.log[0]}</span> {l.log[1]}
            </p>
          ))}
        </div>
      </div>
    </figure>
  );
}
