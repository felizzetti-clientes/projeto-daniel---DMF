"use client";
import { useEffect, useRef, useState } from "react";
import { Send, Info } from "lucide-react";
import type { Demo } from "@/lib/demos";

type Msg = { from: "bot" | "user"; text: string };

export function ChatDemo({ demo }: { demo: Demo }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [stepId, setStepId] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const play = (id: string, reset = false) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const step = demo.steps[id];
    setStepId(null);
    if (reset) setMsgs([]);
    setTyping(true);
    step.bot.forEach((t, i) => {
      timers.current.push(window.setTimeout(() => {
        setMsgs((m) => [...m, { from: "bot", text: t }]);
        if (i === step.bot.length - 1) { setTyping(false); setStepId(id); }
      }, 700 + i * 1100));
    });
  };
  useEffect(() => { play("start", true); return () => timers.current.forEach(clearTimeout); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing, stepId]);

  const choose = (label: string, next: string) => {
    if (label === "Voltar ao início") { play("start", true); return; }
    setMsgs((m) => [...m, { from: "user", text: label }]);
    play(next);
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const step = stepId ? demo.steps[stepId] : null;
    if (!text.trim() || !step?.input) return;
    setMsgs((m) => [...m, { from: "user", text: text.trim() }]);
    setText("");
    play(step.input.next);
  };
  const step = stepId ? demo.steps[stepId] : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-steel/40 bg-slate/50">
      <div className="flex items-center gap-2 border-b border-steel/30 bg-graphite/60 px-4 py-3 text-xs text-ice/80">
        <Info size={14} aria-hidden /> <span><strong className="font-medium text-white">Demonstração simulada.</strong> {demo.business}. Não é um atendimento real.</span>
      </div>
      <div ref={box} role="log" aria-live="polite" aria-label="Conversa de demonstração" className="h-[26rem] space-y-3 overflow-y-auto p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : ""}`}>
            <p className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "rounded-br-sm bg-ice text-graphite" : "rounded-bl-sm bg-graphite/80 text-white"}`}>{m.text}</p>
          </div>
        ))}
        {typing && (
          <div className="flex w-fit gap-1 rounded-2xl rounded-bl-sm bg-graphite/80 px-4 py-3" aria-label="Digitando">
            {[0, 1, 2].map((d) => <span key={d} className="dot size-1.5 rounded-full bg-ice" style={{ animationDelay: `${d * 0.18}s` }} />)}
          </div>
        )}
      </div>
      <div className="min-h-20 border-t border-steel/30 p-4">
        {step?.options && (
          <div className="flex flex-wrap gap-2">
            {step.options.map((o) => (
              <button key={o.label} onClick={() => choose(o.label, o.next)} className="min-h-11 rounded-full border border-steel/60 px-4 text-sm transition hover:border-ice hover:bg-graphite/60">{o.label}</button>
            ))}
          </div>
        )}
        {step?.input && (
          <form onSubmit={submit} className="flex gap-2">
            <label htmlFor="demo-input" className="sr-only">Sua mensagem</label>
            <input id="demo-input" value={text} onChange={(e) => setText(e.target.value)} placeholder={step.input.placeholder} maxLength={200} className="min-h-11 flex-1 rounded-full border border-steel/50 bg-graphite/60 px-4 text-sm placeholder:text-ice/50 focus:border-ice focus:outline-none" />
            <button type="submit" aria-label="Enviar mensagem" className="grid size-11 place-items-center rounded-full bg-white text-graphite transition hover:bg-ice"><Send size={16} /></button>
          </form>
        )}
      </div>
    </div>
  );
}
