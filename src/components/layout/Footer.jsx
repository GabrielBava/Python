import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Icon from '../ui/Icon';
import { INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP_URL } from '../../config/site';
import { trackEvent, EVENTS } from '../../lib/analytics';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <span className={styles.brandName}>Gabriel Bavaresco</span>
            <p className={styles.tagline}>
              Planejamento financeiro para transformar objetivos de vida em decisões financeiras estruturadas.
            </p>
            <div className={styles.socialRow}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram de Gabriel Bavaresco"
                onClick={() => trackEvent(EVENTS.INSTAGRAM_CLICK, { placement: 'footer' })}
              >
                <Icon name="instagram" size={18} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn de Gabriel Bavaresco"
                onClick={() => trackEvent(EVENTS.LINKEDIN_CLICK, { placement: 'footer' })}
              >
                <Icon name="linkedin" size={18} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="WhatsApp de Gabriel Bavaresco"
                onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { placement: 'footer' })}
              >
                <Icon name="whatsapp" size={18} />
              </a>
            </div>
          </div>

          <div>
            <div className={styles.colTitle}>Navegação</div>
            <nav className={styles.linkList}>
              <Link to="/#planejamento">Planejamento</Link>
              <Link to="/ferramentas">Ferramentas</Link>
              <Link to="/#como-funciona">Como funciona</Link>
              <Link to="/#sobre">Sobre mim</Link>
            </nav>
          </div>

          <div>
            <div className={styles.colTitle}>Legal</div>
            <nav className={styles.linkList}>
              <Link to="/politica-de-privacidade">Política de Privacidade</Link>
              <Link to="/termos-de-uso">Termos de Uso</Link>
              <Link to="/politica-de-privacidade#lgpd">LGPD</Link>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} Gabriel Bavaresco — Planejamento Financeiro. Todos os direitos reservados.</span>
          <span className={styles.lgpdNote}>
            Os dados fornecidos neste site são tratados conforme a Lei Geral de Proteção de Dados (LGPD).
          </span>
        </div>
      </div>
    </footer>
  );
}
