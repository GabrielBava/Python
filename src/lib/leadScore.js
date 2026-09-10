// Lead scoring interno (0–100). Nunca é exibido ao visitante — serve apenas
// para priorizar a abordagem comercial de Gabriel (ver seção 16 do
// briefing). Pesos somam 100 pontos; a origem (UTM) entra como um pequeno
// ajuste, já que é um sinal mais fraco que renda/patrimônio/timing.

const INCOME_SCORE = {
  'ate-5k': 4,
  '5k-10k': 8,
  '10k-20k': 12,
  '20k-30k': 16,
  '30k-50k': 18,
  '50k-100k': 20,
  'acima-100k': 20,
};

const WEALTH_SCORE = {
  nenhum: 4,
  'ate-50k': 6,
  '50k-100k': 10,
  '100k-300k': 14,
  '300k-500k': 16,
  '500k-1m': 18,
  '1m-3m': 20,
  'acima-3m': 20,
  'prefiro-nao-informar': 8,
};

const PROFESSION_SCORE = {
  clt: 6,
  liberal: 8,
  medico: 9,
  empresario: 10,
  socio: 10,
  servidor: 6,
  autonomo: 7,
  aposentado: 7,
  outro: 6,
};

const GOAL_SCORE = {
  organizar: 6,
  reserva: 5,
  'comecar-investir': 6,
  'melhorar-investimentos': 7,
  patrimonio: 9,
  imovel: 7,
  dividas: 5,
  aposentadoria: 9,
  'protecao-familia': 7,
  'pf-pj': 10,
  tributario: 10,
  sucessao: 10,
  outro: 5,
};

const TIMING_SCORE = {
  agora: 20,
  '3-meses': 14,
  '6-meses': 8,
  pesquisando: 3,
};

const TOOL_SCORE = {
  'score-financeiro': 4,
  'independencia-financeira': 5,
  'reserva-emergencia': 3,
  'simulador-objetivos': 4,
  aposentadoria: 5,
  'raio-x-financeiro': 4,
  'checklist-financeiro': 2,
};

function scoreDor(dorPrincipal = '') {
  const len = dorPrincipal.trim().length;
  if (len === 0) return 0;
  if (len < 15) return 5;
  return 10;
}

function scoreInteractions(count = 0) {
  if (count >= 3) return 5;
  if (count === 2) return 3;
  if (count === 1) return 2;
  return 0;
}

function originModifier({ utm_source: source = '', utm_medium: medium = '' } = {}) {
  const s = source.toLowerCase();
  const m = medium.toLowerCase();
  if (m === 'prospeccao' || s === 'referral' || s === 'indicacao') return 3;
  if (s === 'whatsapp') return 2;
  if (s === 'linkedin') return 1;
  return 0;
}

export function calculateLeadScore(lead) {
  const breakdown = {
    renda: INCOME_SCORE[lead.renda] ?? 0,
    patrimonio: WEALTH_SCORE[lead.patrimonio_financeiro] ?? 0,
    profissao: PROFESSION_SCORE[lead.profissao] ?? 5,
    objetivo: GOAL_SCORE[lead.objetivo] ?? 5,
    dor: scoreDor(lead.dor_principal),
    momento: TIMING_SCORE[lead.momento] ?? 0,
    ferramenta: TOOL_SCORE[lead.ferramenta] ?? 3,
    interacoes: scoreInteractions(lead.interactions),
  };

  const base = Object.values(breakdown).reduce((sum, v) => sum + v, 0);
  const withOrigin = base + originModifier(lead);
  const score = Math.max(0, Math.min(100, Math.round(withOrigin)));

  return { score, breakdown };
}

export function classifyLeadScore(score) {
  if (score >= 75) return 'HOT';
  if (score >= 45) return 'WARM';
  return 'COLD';
}
