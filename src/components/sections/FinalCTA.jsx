import styles from './FinalCTA.module.css';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';

export default function FinalCTA() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <h2 className={styles.title}>Seu próximo objetivo financeiro começa com clareza.</h2>
        </Reveal>
        <Reveal delay={60}>
          <p className={styles.text}>
            Faça uma análise inicial e descubra quais pontos da sua vida financeira merecem mais atenção.
          </p>
        </Reveal>
        <Reveal delay={120} className={styles.ctaRow}>
          <Button to="/score-financeiro" size="lg">
            Fazer meu diagnóstico
          </Button>
          <Button to="/ferramentas" variant="secondary" size="lg">
            Acessar ferramentas
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
