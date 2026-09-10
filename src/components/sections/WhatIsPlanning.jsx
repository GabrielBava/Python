import styles from './WhatIsPlanning.module.css';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

const STEPS = [
  'Onde você está',
  'Onde quer chegar',
  'Quanto precisa',
  'Qual estratégia',
  'Acompanhamento',
];

export default function WhatIsPlanning() {
  return (
    <section id="planejamento" className="section">
      <div className="container">
        <div className={styles.wrap}>
          <Reveal className={styles.copy}>
            <SectionHeading
              eyebrow="Planejamento financeiro"
              title="Planejamento financeiro vai muito além dos investimentos."
            />
            <p className={styles.text}>
              É um processo que conecta sua situação financeira atual aos seus objetivos de vida,
              transformando decisões isoladas em uma estratégia.
            </p>
          </Reveal>

          <div className={styles.flow}>
            {STEPS.map((label, i) => (
              <div key={label}>
                <Reveal delay={i * 70} className={styles.step}>
                  <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.label}>{label}</span>
                </Reveal>
                {i < STEPS.length - 1 && <div className={styles.connector} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
