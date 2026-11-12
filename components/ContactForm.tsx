"use client";
import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { interests, validate, type ContactData } from "@/lib/contact";

type Status = "idle" | "sending" | "ok" | "unavailable" | "error";
const field = "mt-2 min-h-12 w-full rounded-lg border border-steel/50 bg-graphite/60 px-4 text-sm placeholder:text-ice/45 focus:border-ice focus:outline-none aria-[invalid=true]:border-red-300/70";

export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as unknown as ContactData & { site: string };
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) { (e.currentTarget.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus(); return; }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { setStatus("ok"); e.currentTarget.reset(); }
      else setStatus(res.status === 503 ? "unavailable" : "error");
    } catch { setStatus("error"); }
  }

  if (status === "ok")
    return (
      <div role="status" className="rounded-2xl border border-ice/40 bg-slate/50 p-8">
        <CheckCircle2 className="text-ice" aria-hidden />
        <h3 className="mt-4 font-display text-2xl">Mensagem enviada.</h3>
        <p className="mt-2 text-ice/80">Recebemos seu contato e retornaremos em breve.</p>
      </div>
    );

  const F = ({ name, label, type = "text", auto, ph }: { name: keyof ContactData; label: string; type?: string; auto?: string; ph?: string }) => (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input id={name} name={name} type={type} autoComplete={auto} placeholder={ph} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-e` : undefined} className={field} />
      {errors[name] && <p id={`${name}-e`} className="mt-1.5 text-xs text-red-200">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-steel/40 bg-slate/40 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <F name="nome" label="Nome" auto="name" />
        <F name="empresa" label="Empresa" auto="organization" />
        <F name="email" label="E-mail" type="email" auto="email" />
        <F name="whatsapp" label="WhatsApp" type="tel" auto="tel" ph="(47) 90000-0000" />
      </div>
      <div>
        <label htmlFor="interesse" className="text-sm font-medium">Solução desejada</label>
        <select id="interesse" name="interesse" defaultValue="" aria-invalid={!!errors.interesse} className={field}>
          <option value="" disabled>Selecione</option>
          {interests.map((i) => <option key={i} className="bg-graphite">{i}</option>)}
        </select>
        {errors.interesse && <p className="mt-1.5 text-xs text-red-200">{errors.interesse}</p>}
      </div>
      <div>
        <label htmlFor="mensagem" className="text-sm font-medium">Mensagem</label>
        <textarea id="mensagem" name="mensagem" rows={5} aria-invalid={!!errors.mensagem} className={`${field} py-3`} placeholder="Conte sobre seu negócio e o que gostaria de resolver." />
        {errors.mensagem && <p className="mt-1.5 text-xs text-red-200">{errors.mensagem}</p>}
      </div>
      <input name="site" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {(status === "unavailable" || status === "error") && (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-red-300/40 p-3 text-sm text-red-100">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
          {status === "unavailable" ? "O envio por formulário ainda não está disponível. Use o WhatsApp ou tente novamente mais tarde." : "Não foi possível enviar agora. Tente novamente em instantes."}
        </p>
      )}
      <button disabled={status === "sending"} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-graphite transition hover:bg-ice disabled:opacity-60">
        {status === "sending" && <Loader2 size={16} className="animate-spin" aria-hidden />}
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
