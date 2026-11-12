/**
 * Demonstrações guiadas por dados. A interface (ChatDemo) só conhece `Demo`/`Step`.
 * Para trocar o fluxo simulado por um agente real, substitua `getStep` por uma chamada a uma API
 * que devolva o mesmo formato `Step`. Novas demos (academia, restaurante...) entram em `demos`.
 */
export type Step = {
  bot: string[];
  options?: { label: string; next: string }[];
  input?: { placeholder: string; next: string };
};
export type Demo = { id: string; title: string; business: string; steps: Record<string, Step> };

const again = { label: "Voltar ao início", next: "start" };

export const demos: Demo[] = [
  {
    id: "clinica-estetica", title: "Clínica de estética", business: "Clínica Aurora (exemplo fictício)",
    steps: {
      start: { bot: ["Olá! Sou o assistente virtual da Clínica Aurora.", "Esta é uma demonstração: a clínica é fictícia. Como posso ajudar?"], options: [
        { label: "Conhecer os serviços", next: "services" }, { label: "Consultar informações", next: "info" },
        { label: "Solicitar agendamento", next: "ask" }, { label: "Falar com atendente", next: "human" } ] },
      services: { bot: ["Alguns serviços de exemplo: limpeza de pele, drenagem linfática, massagem relaxante e avaliação facial.", "Quer solicitar um horário?"], options: [{ label: "Solicitar agendamento", next: "ask" }, again] },
      info: { bot: ["Informações de exemplo: atendimento de segunda a sábado, com hora marcada. Valores são passados após a avaliação.", "Posso ajudar com mais alguma coisa?"], options: [{ label: "Solicitar agendamento", next: "ask" }, { label: "Falar com atendente", next: "human" }, again] },
      ask: { bot: ["Claro! Conte brevemente o que você procura."], input: { placeholder: "Ex.: quero uma avaliação facial", next: "period" } },
      period: { bot: ["Entendi. Qual período fica melhor para você?"], options: [{ label: "Manhã", next: "done" }, { label: "Tarde", next: "done" }, { label: "Noite", next: "done" }] },
      done: { bot: ["Solicitação registrada. Em uma operação real, ela seguiria para a agenda da equipe com seus dados e preferências.", "Lembrete: nenhum agendamento real foi feito nesta demonstração."], options: [{ label: "Falar com atendente", next: "human" }, again] },
      human: { bot: ["Em uma operação real, a conversa seria transferida para uma pessoa da equipe, com o histórico já organizado."], options: [again] },
    },
  },
];
