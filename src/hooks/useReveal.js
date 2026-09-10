import { useEffect, useRef } from 'react';

// Adiciona a classe "is-visible" quando o elemento entra na viewport.
// Usado com a classe utilitária .reveal (ver styles/global.css) para as
// microinterações discretas de fade/subida pedidas no briefing.
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null);

  // threshold/rootMargin são primitivos estáveis entre renders (diferente de
  // um objeto de opções recriado a cada render), então o observer só é
  // recriado se o chamador explicitamente passar valores diferentes.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
