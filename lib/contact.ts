export const interests = ["Agentes de IA", "Automação de WhatsApp", "Automações inteligentes", "Integração de sistemas", "Ainda não sei"] as const;
export type ContactData = { nome: string; empresa: string; email: string; whatsapp: string; interesse: string; mensagem: string };

/** Validação compartilhada entre cliente e servidor. Retorna erros por campo. */
export function validate(d: Partial<ContactData>) {
  const e: Partial<Record<keyof ContactData, string>> = {};
  if (!d.nome?.trim() || d.nome.trim().length < 2) e.nome = "Informe seu nome.";
  if (!d.empresa?.trim()) e.empresa = "Informe o nome da empresa.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email ?? "")) e.email = "Informe um e-mail válido.";
  if ((d.whatsapp ?? "").replace(/\D/g, "").length < 10) e.whatsapp = "Informe DDD e número.";
  if (!interests.includes(d.interesse as never)) e.interesse = "Escolha uma opção.";
  if (!d.mensagem?.trim() || d.mensagem.trim().length < 10) e.mensagem = "Conte um pouco mais (mínimo de 10 caracteres).";
  return e;
}
