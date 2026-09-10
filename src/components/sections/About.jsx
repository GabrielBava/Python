import styles from './About.module.css';
import PhotoPlaceholder from '../ui/PhotoPlaceholder';
import Badge from '../ui/Badge';
import Reveal from '../ui/Reveal';

const PILLARS = ['Clareza', 'Estratégia', 'Organização', 'Patrimônio', 'Proteção', 'Objetivos', 'Acompanhamento'];

export default function About({ id = 'sobre' }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className={styles.grid}>
          <Reveal>
            <div className={styles.photoFrame}>
              <PhotoPlaceholder
                src="/images/gabriel-about.jpg"
                alt="Gabriel Bavaresco"
                caption="Gabriel Bavaresco"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className={styles.copy}>
            <div className={styles.kicker}>
              <span className="eyebrow">Sobre</span>
              <h2 className={styles.name}>Gabriel Bavaresco</h2>
              <span className={styles.role}>Planejamento Financeiro</span>
            </div>

            <p className={styles.paragraph}>
              Minha formação é em Engenharia Civil pela Unisinos, com Ciências Contábeis em andamento.
            </p>
            <p className={styles.paragraph}>
              Essa trajetória desenvolveu uma forte base analítica em planejamento, números e tomada de
              decisão, que hoje aplico ao Planejamento Financeiro.
            </p>
            <p className={styles.paragraph}>
              Meu trabalho é ajudar pessoas, famílias e empresários a compreenderem melhor seu momento
              financeiro, estruturarem suas decisões e construírem estratégias alinhadas aos seus
              objetivos de vida.
            </p>
            <p className={styles.paragraph}>
              Mais do que olhar isoladamente para investimentos, o objetivo é conectar as diferentes
              decisões financeiras dentro de uma visão estruturada de presente e futuro.
            </p>

            <div className={styles.pillars}>
              {PILLARS.map((pillar) => (
                <Badge key={pillar}>{pillar}</Badge>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
