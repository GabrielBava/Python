import styles from './StickyMobileCTA.module.css';
import Button from '../ui/Button';

export default function StickyMobileCTA({
  title = 'Descubra seu momento financeiro',
  subtitle = 'Leva poucos minutos',
  ctaLabel = 'Fazer diagnóstico',
  to = '/score-financeiro',
}) {
  return (
    <div className={styles.bar}>
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      <Button to={to} size="sm">
        {ctaLabel}
      </Button>
    </div>
  );
}
