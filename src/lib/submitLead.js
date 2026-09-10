import { WEBHOOK_URL } from '../config/site';
import { calculateLeadScore, classifyLeadScore } from './leadScore';
import { buildLeadSummary } from './leadSummary';
import { getUtm } from './utm';
import { local } from './storage';

// Monta o objeto final do lead no formato combinado com o back-office /
// automações (n8n, Make, CRM, Planilhas — ver seção 18 do briefing).
export function buildLeadPayload({ formData, tool, toolResult, interactions = 0 }) {
  const utm = getUtm();
  const { score } = calculateLeadScore({ ...formData, ferramenta: tool, interactions });
  const classification = classifyLeadScore(score);
  const resumo = buildLeadSummary({ ...formData, ferramenta: tool });

  return {
    nome: formData.nome || '',
    email: formData.email || '',
    telefone: formData.telefone || '',

    profissao: formData.profissao || '',
    renda: formData.renda || '',
    patrimonio_financeiro: formData.patrimonio_financeiro || '',

    objetivo: formData.objetivo || '',
    dor_principal: formData.dor_principal || '',
    momento: formData.momento || '',

    ferramenta: tool || '',
    resultado_ferramenta: toolResult ?? null,

    lead_score: score,
    lead_classificacao: classification,
    lead_resumo: resumo,

    utm_source: utm.utm_source || '',
    utm_medium: utm.utm_medium || '',
    utm_campaign: utm.utm_campaign || '',
    utm_content: utm.utm_content || '',
    utm_term: utm.utm_term || '',

    landing_page: typeof window !== 'undefined' ? window.location.href : '',
    data_hora: new Date().toISOString(),
  };
}

// POST simples do lead para o webhook configurado (n8n / Make / CRM). Nunca
// inclui API keys ou segredos — apenas o payload do lead. Enquanto nenhum
// webhook estiver configurado (VITE_WEBHOOK_URL vazio), o lead é guardado
// localmente para que o fluxo completo continue testável de ponta a ponta.
export async function submitLead(payload) {
  if (!WEBHOOK_URL) {
    // eslint-disable-next-line no-console
    console.info('[submitLead] VITE_WEBHOOK_URL não configurado — lead salvo localmente.', payload);
    const existing = local.get('gb_leads_debug', []);
    local.set('gb_leads_debug', [...existing, payload]);
    return { ok: true, mode: 'local' };
  }

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook respondeu com status ${response.status}`);
  }

  return { ok: true, mode: 'webhook' };
}
