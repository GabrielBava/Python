import styles from './HowICanHelp.module.css';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import { HELP_AREAS } from '../../data/helpAreas';

export default function HowICanHelp() {
  return (
    <section className="section section-bg">
      <div className="container">
        <SectionHeading center title="Como posso te ajudar" />
        <div className={styles.grid}>
          {HELP_AREAS.map((area, i) => (
            <Reveal key={area.title} delay={(i % 4) * 60}>
              <Card className={styles.card}>
                <span className={styles.iconWrap}>
                  <Icon name={area.icon} size={22} />
                </span>
                <span className={styles.cardTitle}>{area.title}</span>
                <p className={styles.cardText}>{area.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
