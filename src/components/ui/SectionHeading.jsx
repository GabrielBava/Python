import styles from './SectionHeading.module.css';
import { useReveal } from '../../hooks/useReveal';

export default function SectionHeading({ eyebrow, title, subtitle, center = false, as: Tag = 'h2' }) {
  const ref = useReveal();
  const classNames = [styles.wrap, center ? styles.center : '', 'reveal'].filter(Boolean).join(' ');

  return (
    <div className={classNames} ref={ref}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className={styles.title}>{title}</Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
