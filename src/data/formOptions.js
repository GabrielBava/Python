// Fonte única de verdade para as opções usadas no formulário multi-etapas,
// no lead score e no resumo comercial gerado automaticamente — evita
// divergência entre o que o visitante vê e o que chega para o Gabriel.

export const PROFESSIONS = [
  { value: 'clt', label: 'CLT' },
  { value: 'liberal', label: 'Profissional liberal' },
  { value: 'medico', label: 'Médico' },
  { value: 'empresario', label: 'Empresário' },
  { value: 'socio', label: 'Sócio de empresa' },
  { value: 'servidor', label: 'Servidor público' },
  { value: 'autonomo', label: 'Autônomo' },
  { value: 'aposentado', label: 'Aposentado' },
  { value: 'outro', label: 'Outro' },
];

export const INCOME_RANGES = [
  { value: 'ate-5k', label: 'Até R$ 5 mil' },
  { value: '5k-10k', label: 'R$ 5 mil a R$ 10 mil' },
  { value: '10k-20k', label: 'R$ 10 mil a R$ 20 mil' },
  { value: '20k-30k', label: 'R$ 20 mil a R$ 30 mil' },
  { value: '30k-50k', label: 'R$ 30 mil a R$ 50 mil' },
  { value: '50k-100k', label: 'R$ 50 mil a R$ 100 mil' },
  { value: 'acima-100k', label: 'Acima de R$ 100 mil' },
];

export const WEALTH_RANGES = [
  { value: 'nenhum', label: 'Ainda não possuo investimentos' },
  { value: 'ate-50k', label: 'Até R$ 50 mil' },
  { value: '50k-100k', label: 'R$ 50 mil – R$ 100 mil' },
  { value: '100k-300k', label: 'R$ 100 mil – R$ 300 mil' },
  { value: '300k-500k', label: 'R$ 300 mil – R$ 500 mil' },
  { value: '500k-1m', label: 'R$ 500 mil – R$ 1 milhão' },
  { value: '1m-3m', label: 'R$ 1 milhão – R$ 3 milhões' },
  { value: 'acima-3m', label: 'Acima de R$ 3 milhões' },
  { value: 'prefiro-nao-informar', label: 'Prefiro não informar' },
];

export const GOALS = [
  { value: 'organizar', label: 'Organizar minha vida financeira' },
  { value: 'reserva', label: 'Criar reserva' },
  { value: 'comecar-investir', label: 'Começar a investir' },
  { value: 'melhorar-investimentos', label: 'Melhorar meus investimentos' },
  { value: 'patrimonio', label: 'Construir patrimônio' },
  { value: 'imovel', label: 'Comprar imóvel' },
  { value: 'dividas', label: 'Reduzir dívidas' },
  { value: 'aposentadoria', label: 'Planejar aposentadoria' },
  { value: 'protecao-familia', label: 'Proteger minha família' },
  { value: 'pf-pj', label: 'Organizar PF + PJ' },
  { value: 'tributario', label: 'Planejamento tributário' },
  { value: 'sucessao', label: 'Sucessão patrimonial' },
  { value: 'outro', label: 'Outro' },
];

export const TIMINGS = [
  { value: 'agora', label: 'Agora' },
  { value: '3-meses', label: 'Nos próximos 3 meses' },
  { value: '6-meses', label: 'Nos próximos 6 meses' },
  { value: 'pesquisando', label: 'Ainda estou pesquisando' },
];

export const TOOLS = [
  { value: 'score-financeiro', label: 'Score de Saúde Financeira' },
  { value: 'independencia-financeira', label: 'Calculadora de Independência Financeira' },
  { value: 'reserva-emergencia', label: 'Calculadora de Reserva de Emergência' },
  { value: 'simulador-objetivos', label: 'Simulador de Objetivos' },
  { value: 'aposentadoria', label: 'Simulador de Aposentadoria' },
  { value: 'raio-x-financeiro', label: 'Raio-X Financeiro' },
  { value: 'checklist-financeiro', label: 'Checklist Financeiro' },
];

export function labelFor(list, value) {
  return list.find((item) => item.value === value)?.label || value || '';
}
