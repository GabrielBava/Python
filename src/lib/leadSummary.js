import { PROFESSIONS, INCOME_RANGES, WEALTH_RANGES, GOALS, TOOLS, labelFor } from '../data/formOptions';

function inline(label) {
  if (!label) return '';
  if (label === label.toUpperCase()) return label; // preserva siglas (CLT, PF + PJ)
  return label.charAt(0).toLowerCase() + label.slice(1);
}

const TIMING_PHRASE = {
  agora: 'pretende começar agora',
  '3-meses': 'pretende começar nos próximos 3 meses',
  '6-meses': 'pretende começar nos próximos 6 meses',
  pesquisando: 'ainda está pesquisando, sem prazo definido',
};

// Gera o parágrafo de inteligência comercial (campo lead_resumo) que permite
// a Gabriel abordar o lead com contexto real em vez de "você preencheu um
// formulário" (ver seções 17 e 33 do briefing).
export function buildLeadSummary(lead) {
  const parts = [];

  const profissao = inline(labelFor(PROFESSIONS, lead.profissao));
  const renda = labelFor(INCOME_RANGES, lead.renda);
  const patrimonio = labelFor(WEALTH_RANGES, lead.patrimonio_financeiro);
  const objetivo = inline(labelFor(GOALS, lead.objetivo));
  const ferramenta = labelFor(TOOLS, lead.ferramenta);

  let opener = 'Lead';
  if (profissao) opener += ` ${profissao},`;
  if (renda) opener += ` renda ${inline(renda)},`;
  if (patrimonio) opener += ` patrimônio financeiro ${inline(patrimonio)},`;
  if (objetivo) opener += ` interessado em ${objetivo}.`;
  else opener += opener.endsWith(',') ? opener.replace(/,$/, '.') : '.';
  parts.push(opener);

  if (lead.dor_principal?.trim()) {
    parts.push(`Principal preocupação relatada: "${lead.dor_principal.trim()}".`);
  }

  if (lead.momento && TIMING_PHRASE[lead.momento]) {
    parts.push(`${TIMING_PHRASE[lead.momento][0].toUpperCase()}${TIMING_PHRASE[lead.momento].slice(1)}.`);
  }

  if (ferramenta) {
    parts.push(`Origem: ${ferramenta}.`);
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}
