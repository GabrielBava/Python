// Camada fina de rastreamento de eventos. Envia para dataLayer (GTM), gtag
// (GA4) e fbq (Meta Pixel) quando presentes — nenhum deles é obrigatório para
// a aplicação funcionar, então tudo aqui é best-effort e silencioso.

import { GA_MEASUREMENT_ID, GTM_ID, META_PIXEL_ID } from '../config/site';

let initialized = false;

function injectScript(src, attrs = {}) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
}

// Injeta GTM / GA4 / Meta Pixel apenas quando os IDs forem configurados via
// env (ver src/config/site.js). Sem IDs, a aplicação segue funcionando
// normalmente e os eventos só aparecem no console em modo dev.
export function initAnalytics() {
  if (initialized) return;
  initialized = true;

  try {
    if (GTM_ID) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      injectScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
    }

    if (GA_MEASUREMENT_ID) {
      injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID);
    }

    if (META_PIXEL_ID && typeof window.fbq !== 'function') {
      const fbq = function fbqStub() {
        // eslint-disable-next-line prefer-rest-params
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
        else fbq.queue.push(arguments);
      };
      window.fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      injectScript('https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', META_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  } catch {
    // ignore — analytics nunca deve derrubar a aplicação
  }
}

const EVENTS = {
  PAGE_VIEW: 'page_view',
  TOOL_VIEW: 'tool_view',
  TOOL_START: 'tool_start',
  TOOL_COMPLETE: 'tool_complete',
  LEAD_FORM_START: 'lead_form_start',
  LEAD_FORM_STEP: 'lead_form_step',
  LEAD_SUBMIT: 'lead_submit',
  RESULT_VIEW: 'result_view',
  SCHEDULE_CLICK: 'schedule_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  INSTAGRAM_CLICK: 'instagram_click',
  LINKEDIN_CLICK: 'linkedin_click',
};

export function trackEvent(name, params = {}) {
  const payload = { event: name, ...params };

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch {
    // ignore
  }

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }
  } catch {
    // ignore
  }

  try {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', name, params);
    }
  } catch {
    // ignore
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', name, params);
  }
}

export { EVENTS };
