import styles from './HowICanHelp.module.css';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import { AUTHORITY_POINTS } from '../../data/authority';

export default function Authority() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading center eyebrow="Como trabalho" title="Princípios que guiam a análise" />
        <div className={styles.grid}>
          {AUTHORITY_POINTS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 60}>
              <Card className={styles.card}>
                <span className={styles.iconWrap}>
                  <Icon name={item.icon} size={22} />
                </span>
                <span className={styles.cardTitle}>{item.title}</span>
                <p className={styles.cardText}>{item.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
