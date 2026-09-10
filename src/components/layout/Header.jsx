import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

const NAV_LINKS = [
  { label: 'Planejamento', to: '/#planejamento' },
  { label: 'Ferramentas', to: '/ferramentas' },
  { label: 'Como funciona', to: '/#como-funciona' },
  { label: 'Sobre mim', to: '/#sobre' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandName}>Gabriel Bavaresco</span>
          <span className={styles.brandRole}>Planejamento Financeiro</span>
        </Link>

        <nav className={styles.nav} aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.desktopCta}>
          <Button to="/score-financeiro" size="sm">
            Fazer diagnóstico
          </Button>
        </div>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      {open && (
        <div className={styles.mobilePanel}>
          <nav className={styles.mobileNav} aria-label="Navegação mobile">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.to} className={styles.mobileNavLink}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.mobileFooter}>
            <Button to="/score-financeiro" fullWidth>
              Fazer diagnóstico
            </Button>
            <Button to="/ferramentas" variant="secondary" fullWidth>
              Acessar ferramentas gratuitas
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
