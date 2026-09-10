// Configuração central de integrações e links externos.
// Todos os valores vêm de variáveis de ambiente (VITE_*) para que a troca em
// produção não exija alterar código-fonte. Ver ".env.example" para a lista completa.
// Nenhum valor aqui é secreto: são endpoints e IDs públicos consumidos no front-end.

const env = import.meta.env;

export const WEBHOOK_URL = env.VITE_WEBHOOK_URL || '';
export const CALENDAR_URL = env.VITE_CALENDAR_URL || '';

export const INSTAGRAM_URL = env.VITE_INSTAGRAM_URL || 'https://instagram.com/';
export const LINKEDIN_URL = env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/';
export const WHATSAPP_URL = env.VITE_WHATSAPP_URL || 'https://wa.me/55SEUNUMERO';

export const GA_MEASUREMENT_ID = env.VITE_GA_MEASUREMENT_ID || '';
export const GTM_ID = env.VITE_GTM_ID || '';
export const META_PIXEL_ID = env.VITE_META_PIXEL_ID || '';

export const SITE_NAME = 'Gabriel Bavaresco';
export const SITE_TITLE = 'Gabriel Bavaresco | Planejamento Financeiro';
export const SITE_URL = 'https://gabrielbavaresco.com.br';

// Monta um link de WhatsApp com mensagem contextual pré-preenchida, para que a
// abordagem comercial já nasça com contexto (ver seção 33 do briefing).
export function buildWhatsappLink(message) {
  const base = WHATSAPP_URL.split('?')[0];
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `${base}${text}`;
}
