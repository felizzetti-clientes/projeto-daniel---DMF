import { validate, type ContactData } from "@/lib/contact";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  let body: Partial<ContactData> & { site?: string };
  try { body = await req.json(); } catch { return Response.json({ error: "Requisição inválida." }, { status: 400 }); }
  if (body.site) return Response.json({ ok: true }); // honeypot: bots preenchem este campo
  const errors = validate(body);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const { RESEND_API_KEY: key, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = process.env;
  if (!key || !to || !from) return Response.json({ error: "not_configured" }, { status: 503 });

  const d = body as ContactData;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from, to: [to], reply_to: d.email, subject: `Novo contato pelo site: ${d.empresa.slice(0, 80)}`,
      html: `<p><b>Nome:</b> ${esc(d.nome)}<br><b>Empresa:</b> ${esc(d.empresa)}<br><b>E-mail:</b> ${esc(d.email)}<br><b>WhatsApp:</b> ${esc(d.whatsapp)}<br><b>Interesse:</b> ${esc(d.interesse)}</p><p>${esc(d.mensagem).replace(/\n/g, "<br>")}</p>`,
    }),
  });
  return res.ok ? Response.json({ ok: true }) : Response.json({ error: "send_failed" }, { status: 502 });
}
