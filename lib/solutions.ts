export type Solution = {
  slug: string; title: string; icon: "bot" | "message" | "workflow" | "plug";
  short: string; benefit: string; when: string; headline: string; intro: string;
  points: { t: string; d: string }[]; uses: string[]; href: string;
};

export const solutions: Solution[] = [
  {
    slug: "agentes-ia", title: "Agentes de IA", icon: "bot", href: "/solucoes/agentes-ia",
    short: "Assistentes que conversam com clientes, entendem o que eles precisam e encaminham cada pedido.",
    benefit: "Atendimento consistente, no ritmo da sua empresa.",
    when: "Quando a equipe gasta tempo respondendo as mesmas perguntas ou perde contatos fora do horário.",
    headline: "Atendimento inteligente, disponível para acompanhar o ritmo da sua empresa.",
    intro: "Um agente de IA é um assistente digital que conversa em linguagem natural, responde dúvidas, identifica o que a pessoa procura e encaminha a solicitação para quem deve resolvê-la. Cada agente é desenhado conforme o negócio, seus serviços e suas regras.",
    points: [
      { t: "Responde perguntas", d: "Usa as informações da sua empresa: serviços, horários, regras e perguntas frequentes." },
      { t: "Identifica necessidades", d: "Faz as perguntas certas para entender o que o cliente procura antes de seguir adiante." },
      { t: "Encaminha solicitações", d: "Passa o contato organizado para a equipe ou para o próximo passo do processo." },
      { t: "Personalizado ao negócio", d: "Tom de voz, limites e fluxos definidos junto com você, sem respostas genéricas." },
    ],
    uses: ["Dúvidas frequentes sobre serviços e valores", "Pré-atendimento antes da conversa com a equipe", "Triagem de solicitações por tipo de interesse", "Apoio ao agendamento de visitas e avaliações"],
  },
  {
    slug: "whatsapp", title: "Automação de WhatsApp", icon: "message", href: "/solucoes/whatsapp",
    short: "Etapas do atendimento organizadas: coleta de dados, qualificação de contatos e direcionamento.",
    benefit: "Conversas organizadas, sem perder o contato humano.",
    when: "Quando o WhatsApp é o principal canal e as conversas se acumulam sem prioridade ou histórico claro.",
    headline: "Transforme seu WhatsApp em um canal de atendimento mais organizado e eficiente.",
    intro: "Automatizar o WhatsApp vai além de respostas prontas. A solução estrutura a jornada: recebe o contato, coleta as informações necessárias, qualifica o interesse e direciona para a pessoa ou etapa certa, deixando a equipe livre para o que exige atenção humana.",
    points: [
      { t: "Fluxos de atendimento", d: "Caminhos desenhados para o seu processo, do primeiro contato ao encaminhamento." },
      { t: "Coleta de informações", d: "Nome, necessidade e dados relevantes reunidos antes de a equipe entrar na conversa." },
      { t: "Qualificação de contatos", d: "Critérios definidos por você para separar curiosos de oportunidades reais." },
      { t: "Direcionamento", d: "Cada solicitação segue para a pessoa, setor ou ferramenta adequados." },
    ],
    uses: ["Captação e qualificação de leads", "Organização de pedidos de orçamento", "Confirmação e reagendamento de horários", "Triagem entre vendas, suporte e financeiro"],
  },
  {
    slug: "automacoes", title: "Automações inteligentes", icon: "workflow", href: "/solucoes/automacoes",
    short: "Tarefas repetitivas automatizadas e ferramentas conversando entre si, em fluxos claros.",
    benefit: "Menos tarefas manuais, mais tempo para o que importa.",
    when: "Quando a mesma informação é digitada em vários lugares ou processos dependem de lembrar de fazer.",
    headline: "Menos tarefas manuais. Mais eficiência nos processos da sua empresa.",
    intro: "Automações conectam as ferramentas que sua empresa já usa e transformam tarefas repetitivas em fluxos que acontecem sozinhos. O resultado é um processo mais organizado, com menos retrabalho e informação no lugar certo.",
    points: [
      { t: "Integração de ferramentas", d: "Planilhas, CRMs, agendas, formulários e mensageiros trocando informações entre si." },
      { t: "Tarefas repetitivas", d: "Cadastros, avisos e atualizações que hoje dependem de alguém lembrar." },
      { t: "Fluxos organizados", d: "Etapas, responsáveis e condições mapeados de forma que todos entendam." },
      { t: "Evolução contínua", d: "Começamos pelo que traz mais clareza e ampliamos conforme a operação cresce." },
    ],
    uses: ["Lead novo registrado automaticamente em planilha ou CRM", "Aviso à equipe quando um contato pede atendimento humano", "Lembretes de agendamento enviados no momento certo", "Relatórios simples gerados a partir de dados já existentes"],
  },
  {
    slug: "automacoes", title: "Integrações de sistemas", icon: "plug", href: "/solucoes/automacoes",
    short: "Ferramentas, canais e sistemas conectados para que a informação circule sem retrabalho.",
    benefit: "Uma operação em que as peças se comunicam.",
    when: "", headline: "", intro: "", points: [], uses: [],
  },
];

export const pages = solutions.filter((s) => s.intro);
