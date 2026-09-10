import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router não rola para âncoras (#planejamento, #sobre...) nem para o
// topo automaticamente entre rotas — este componente resolve os dois casos.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      // aguarda o layout da nova rota renderizar antes de medir a posição
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const headerOffset = 88;
          const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 80);
      return () => clearTimeout(timer);
    }

    window.scrollTo({ top: 0 });
    return undefined;
  }, [pathname, hash]);

  return null;
}
