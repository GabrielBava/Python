// Banco de perguntas do Score de Saúde Financeira — 10 perguntas cobrindo as
// 8 categorias pedidas no briefing (seção 13). Cada opção vale de 0 a 10;
// score final = soma direta das 10 perguntas (0–100).

export const SCORE_QUESTIONS = [
  {
    id: 'gastos',
    category: 'organizacao',
    categoryLabel: 'Organização',
    question: 'Você sabe aproximadamente quanto gasta por mês?',
    options: [
      { label: 'Sim, tenho controle detalhado', points: 10 },
      { label: 'Tenho uma noção aproximada', points: 6 },
      { label: 'Não tenho controle sobre isso', points: 0 },
    ],
  },
  {
    id: 'poupanca',
    category: 'organizacao',
    categoryLabel: 'Organização',
    question: 'Você consegue poupar parte da sua renda mensalmente?',
    options: [
      { label: 'Sim, consistentemente', points: 10 },
      { label: 'Às vezes', points: 5 },
      { label: 'Não consigo poupar', points: 0 },
    ],
  },
  {
    id: 'reserva',
    category: 'reserva',
    categoryLabel: 'Reserva',
    question: 'Possui reserva de emergência?',
    options: [
      { label: 'Sim, cobre 6 meses ou mais de despesas', points: 10 },
      { label: 'Sim, mas menor do que eu gostaria', points: 5 },
      { label: 'Não possuo', points: 0 },
    ],
  },
  {
    id: 'dividas',
    category: 'dividas',
    categoryLabel: 'Dívidas',
    question: 'Possui dívidas atualmente?',
    options: [
      { label: 'Não possuo dívidas', points: 10 },
      { label: 'Sim, organizadas e sob controle', points: 6 },
      { label: 'Sim, e comprometem meu orçamento', points: 0 },
    ],
  },
  {
    id: 'protecao',
    category: 'protecao',
    categoryLabel: 'Proteção',
    question: 'Você possui proteção financeira para situações inesperadas?',
    options: [
      { label: 'Sim, cobertura que considero adequada', points: 10 },
      { label: 'Tenho algo, mas nunca avaliei se é suficiente', points: 5 },
      { label: 'Não possuo', points: 0 },
    ],
  },
  {
    id: 'investe',
    category: 'investimentos',
    categoryLabel: 'Investimentos',
    question: 'Você já investe?',
    options: [
      { label: 'Sim, regularmente', points: 10 },
      { label: 'Já invisto, mas de forma esporádica', points: 6 },
      { label: 'Ainda não invisto', points: 0 },
    ],
  },
  {
    id: 'objetivos_investimento',
    category: 'investimentos',
    categoryLabel: 'Investimentos',
    question: 'Seus investimentos possuem objetivos definidos (prazo e valor)?',
    options: [
      { label: 'Sim, para a maioria deles', points: 10 },
      { label: 'Para alguns', points: 5 },
      { label: 'Não têm objetivo definido', points: 0 },
    ],
  },
  {
    id: 'patrimonio',
    category: 'patrimonio',
    categoryLabel: 'Patrimônio',
    question: 'Como você avalia sua evolução patrimonial nos últimos anos?',
    options: [
      { label: 'Evoluindo de forma consistente', points: 10 },
      { label: 'Evoluindo, mas sem estratégia clara', points: 5 },
      { label: 'Não percebo evolução', points: 0 },
    ],
  },
  {
    id: 'objetivos_vida',
    category: 'objetivos',
    categoryLabel: 'Objetivos',
    question: 'Você tem clareza sobre seus objetivos de vida e quanto eles custam?',
    options: [
      { label: 'Sim, tenho valores e prazos definidos', points: 10 },
      { label: 'Tenho os objetivos, mas não os valores', points: 5 },
      { label: 'Ainda não defini', points: 0 },
    ],
  },
  {
    id: 'aposentadoria',
    category: 'aposentadoria',
    categoryLabel: 'Aposentadoria',
    question: 'Você possui uma meta ou plano para a aposentadoria?',
    options: [
      { label: 'Sim, tenho um plano estruturado', points: 10 },
      { label: 'Tenho uma ideia, mas nada estruturado', points: 5 },
      { label: 'Ainda não pensei nisso', points: 0 },
    ],
  },
];

const POSITIVE_PHRASES = {
  organizacao: 'Boa organização financeira e controle do orçamento',
  reserva: 'Reserva de emergência estruturada',
  dividas: 'Ausência de dívidas que comprometam o orçamento',
  protecao: 'Proteção financeira em nível adequado',
  investimentos: 'Já possui investimentos com boa consistência',
  patrimonio: 'Evolução patrimonial consistente',
  objetivos: 'Clareza sobre objetivos de vida',
  aposentadoria: 'Planejamento de aposentadoria já iniciado',
};

const ATTENTION_PHRASES = {
  organizacao: 'Organização financeira e controle de gastos',
  reserva: 'Reserva de emergência',
  dividas: 'Endividamento',
  protecao: 'Proteção financeira',
  investimentos: 'Consistência e direcionamento dos investimentos',
  patrimonio: 'Estratégia de construção patrimonial',
  objetivos: 'Clareza sobre objetivos e valores necessários',
  aposentadoria: 'Planejamento de longo prazo / aposentadoria',
};

export function classifyScore(score) {
  if (score >= 80) return 'Estrutura consolidada';
  if (score >= 40) return 'Estrutura em desenvolvimento';
  return 'Estrutura inicial';
}

// answers: { [questionId]: optionIndex }
export function computeScoreResult(answers) {
  const categoryTotals = {};
  const categoryCounts = {};
  let score = 0;

  SCORE_QUESTIONS.forEach((q) => {
    const optionIndex = answers[q.id];
    const option = q.options[optionIndex];
    const points = option ? option.points : 0;
    score += points;
    categoryTotals[q.category] = (categoryTotals[q.category] || 0) + points;
    categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 10;
  });

  const categoryStrength = Object.fromEntries(
    Object.keys(categoryTotals).map((cat) => [cat, categoryTotals[cat] / categoryCounts[cat]])
  );

  const positives = Object.entries(categoryStrength)
    .filter(([, strength]) => strength >= 0.7)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cat]) => POSITIVE_PHRASES[cat]);

  const attentionPoints = Object.entries(categoryStrength)
    .filter(([, strength]) => strength <= 0.5)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([cat]) => ATTENTION_PHRASES[cat]);

  return {
    score,
    classification: classifyScore(score),
    categoryStrength,
    positives: positives.length ? positives : ['Você já deu o primeiro passo ao buscar clareza sobre sua vida financeira'],
    attentionPoints,
  };
}
