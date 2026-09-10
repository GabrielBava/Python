import styles from './Hero.module.css';
import Button from '../ui/Button';
import PhotoPlaceholder from '../ui/PhotoPlaceholder';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import { trackEvent, EVENTS } from '../../lib/analytics';

export default function Hero() {
  return (
    <section className={`container ${styles.hero}`}>
      <div className={styles.grid}>
        <Reveal className={styles.copy}>
          <h1 className={styles.title}>Seu dinheiro precisa acompanhar os seus objetivos.</h1>
          <p className={styles.subtitle}>
            Entenda seu momento financeiro, identifique oportunidades e construa uma estratégia para
            organizar, proteger e desenvolver seu patrimônio.
          </p>

          <div className={styles.ctaRow}>
            <Button
              to="/score-financeiro"
              size="lg"
              onClick={() => trackEvent(EVENTS.TOOL_START, { tool: 'score-financeiro', placement: 'hero' })}
            >
              Fazer meu diagnóstico
            </Button>
            <Button to="/ferramentas" variant="secondary" size="lg">
              Acessar ferramentas gratuitas
            </Button>
          </div>
          <span className={styles.microcopy}>Comece gratuitamente. Leva poucos minutos.</span>

          <div className={styles.trustLine}>
            <Icon name="shield" size={18} />
            <span>Planejamento financeiro para decisões mais claras sobre o presente e o futuro.</span>
          </div>
        </Reveal>

        <Reveal className={styles.photoCol} delay={120}>
          <div className={styles.photoFrame}>
            <PhotoPlaceholder
              src="/images/gabriel-hero.jpg"
              alt="Gabriel Bavaresco, planejador financeiro"
              caption="Gabriel Bavaresco"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
