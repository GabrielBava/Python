import styles from './HowItWorks.module.css';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import { HOW_IT_WORKS } from '../../data/howItWorks';

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <div className="container">
        <SectionHeading center eyebrow="Metodologia" title="Como funciona o planejamento" />
        <div className={styles.timeline}>
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal key={step.title} delay={i * 80} className={styles.step}>
              <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.title}>{step.title}</span>
              <p className={styles.description}>{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
