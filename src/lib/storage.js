// Wrapper defensivo sobre Web Storage — nunca deve quebrar a página
// (modo privado, cookies bloqueados etc. podem lançar exceções).

function safeGet(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(storage, key, value) {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export const session = {
  get(key, fallback = null) {
    const raw = safeGet(window.sessionStorage, key);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    return safeSet(window.sessionStorage, key, JSON.stringify(value));
  },
};

export const local = {
  get(key, fallback = null) {
    const raw = safeGet(window.localStorage, key);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    return safeSet(window.localStorage, key, JSON.stringify(value));
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};
