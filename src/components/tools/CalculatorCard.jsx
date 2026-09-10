import styles from './CalculatorCard.module.css';
import Button from '../ui/Button';

export default function CalculatorCard({ title, subtitle, children, ctaLabel = 'Calcular', onSubmit, disabled }) {
  return (
    <form
      className={styles.wrap}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.fields}>{children}</div>
      <Button type="submit" size="lg" disabled={disabled}>
        {ctaLabel}
      </Button>
    </form>
  );
}
