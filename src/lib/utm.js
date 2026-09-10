import { session } from './storage';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const STORAGE_KEY = 'gb_utm';

const EMPTY_UTM = UTM_KEYS.reduce((acc, key) => ({ ...acc, [key]: '' }), {});

// Atribuição "first touch": captura os UTMs da URL na primeira página vista
// na sessão e mantém esse conjunto para todo o funil, mesmo que o visitante
// navegue depois para páginas sem querystring (ex.: entrou pelo Instagram na
// home e só preenche o formulário duas páginas depois).
export function captureUtm() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = {};
  let hasAny = false;

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      fromUrl[key] = value;
      hasAny = true;
    }
  });

  if (hasAny) {
    const merged = { ...EMPTY_UTM, ...fromUrl };
    session.set(STORAGE_KEY, merged);
    return merged;
  }

  return session.get(STORAGE_KEY, EMPTY_UTM);
}

export function getUtm() {
  return session.get(STORAGE_KEY, EMPTY_UTM);
}
