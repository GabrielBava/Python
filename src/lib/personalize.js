// Motor de personalização do resultado final (seção 49 do briefing): evita
// mostrar o mesmo texto para todo mundo, cruzando patrimônio, renda,
// objetivo e — quando disponível — o detalhamento por categoria do Score.
// Usado por todas as ferramentas na tela de resultado completo (pós-captura).

const HIGH_INCOME = ['20k-30k', '30k-50k', '50k-100k', 'acima-100k'];
const LOW_WEALTH = ['nenhum', 'ate-50k', '50k-100k'];
const HIGH_WEALTH = ['500k-1m', '1m-3m', 'acima-3m'];

export function personalizeRecommendation({ patrimonio, renda, objetivo, categoryStrength } = {}) {
  const weak = (cat) => categoryStrength && categoryStrength[cat] !== undefined && categoryStrength[cat] <= 0.5;

  if (weak('reserva') || (!categoryStrength && LOW_WEALTH.includes(patrimonio))) {
    return {
      priority: 'Reserva de emergência',
      recommendation:
        'Antes de acelerar outras frentes, vale priorizar uma reserva de emergência compatível com o seu momento — ela é a base que dá segurança para o restante da estratégia.',
    };
  }

  if (weak('dividas')) {
    return {
      priority: 'Organização de dívidas',
      recommendation:
        'Organizar as dívidas atuais tende a liberar capacidade de poupança e é um passo importante antes de acelerar investimentos ou novos objetivos.',
    };
  }

  if (HIGH_INCOME.includes(renda) && LOW_WEALTH.includes(patrimonio)) {
    return {
      priority: 'Eficiência na construção patrimonial',
      recommendation:
        'Sua renda sugere uma boa capacidade de poupança que ainda não se reflete totalmente em patrimônio — o foco aqui é estruturar um plano para transformar renda em patrimônio de forma mais eficiente.',
    };
  }

  if (HIGH_WEALTH.includes(patrimonio) && (!categoryStrength || weak('objetivos') || weak('patrimonio'))) {
    return {
      priority: 'Estratégia patrimonial',
      recommendation:
        'Com um patrimônio já relevante, o próximo passo costuma ser estruturar uma estratégia patrimonial mais elaborada — organização, proteção e eficiência para o que já foi construído.',
    };
  }

  if (objetivo === 'aposentadoria') {
    return {
      priority: 'Direcionamento de longo prazo',
      recommendation:
        'Como aposentadoria está entre suas prioridades, o próximo passo é entender se o ritmo atual de construção patrimonial está alinhado à renda futura desejada.',
    };
  }

  return {
    priority: 'Organização financeira geral',
    recommendation:
      'Uma visão integrada da sua situação financeira — receitas, despesas, patrimônio e objetivos — ajuda a definir com mais clareza os próximos passos.',
  };
}
