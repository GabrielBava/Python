import styles from './PainPoints.module.css';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Reveal from '../ui/Reveal';
import { PAIN_POINTS } from '../../data/painPoints';

export default function PainPoints() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading center title="Alguma dessas situações parece familiar?" />

        <div className={styles.grid}>
          {PAIN_POINTS.map((text, i) => (
            <Reveal key={text} delay={(i % 2) * 80}>
              <Card flat className={styles.card}>
                {text}
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className={styles.closing}>
            Quando as decisões financeiras passam a conversar entre si, começa o Planejamento Financeiro.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
