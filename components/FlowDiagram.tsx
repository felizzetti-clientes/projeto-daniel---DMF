/** Fluxo ilustrativo: canal → agente → agenda / equipe. Feixes animados em CSS (desativados com movimento reduzido). */
const Node = ({ x, y, w = 132, label, sub, hot }: { x: number; y: number; w?: number; label: string; sub: string; hot?: boolean }) => (
  <g>
    <rect x={x} y={y} width={w} height={54} rx={10} fill="#202C38" stroke={hot ? "#A9C5D8" : "#536779"} strokeOpacity={hot ? 0.9 : 0.6} />
    <text x={x + 14} y={y + 24} fill="#F2F4F5" fontSize="13" fontFamily="var(--font-display)" fontWeight="500">{label}</text>
    <text x={x + 14} y={y + 41} fill="#A9C5D8" fillOpacity=".75" fontSize="10" fontFamily="var(--font-mono)">{sub}</text>
  </g>
);

export function FlowDiagram() {
  return (
    <figure className="rounded-2xl border border-steel/40 bg-graphite/70 p-4 backdrop-blur sm:p-6">
      <svg viewBox="0 0 520 300" role="img" aria-label="Diagrama ilustrativo: uma mensagem do cliente chega ao agente, que agenda o horário e avisa a equipe." className="w-full">
        {["M142 150 H194", "M326 135 C360 135 360 70 394 70", "M326 165 C360 165 360 230 394 230"].map((d) => (
          <path key={d} d={d} className="beam" fill="none" stroke="#A9C5D8" strokeWidth="1.5" strokeLinecap="round" />
        ))}
        <Node x={10} y={123} w={132} label="Cliente" sub="mensagem" />
        <Node x={194} y={113} w={132} label="Agente" sub="entende e organiza" hot />
        <Node x={394} y={43} w={116} label="Agenda" sub="horário" />
        <Node x={394} y={203} w={116} label="Equipe" sub="aviso" />
      </svg>
      <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] text-ice/60"><span>fluxo.exemplo</span><span>ilustrativo</span></figcaption>
    </figure>
  );
}
