import styles from './Benefits.module.css';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import { BENEFITS } from '../../data/benefits';

export default function Benefits() {
  return (
    <section className="section section-bg">
      <div className="container">
        <SectionHeading center title="O que muda quando existe planejamento?" />
        <div className={styles.grid}>
          {BENEFITS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 70}>
              <Card className={styles.card}>
                <span className={styles.iconWrap}>
                  <Icon name={item.icon} size={22} />
                </span>
                <span className={styles.title}>{item.title}</span>
                <p className={styles.text}>{item.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
