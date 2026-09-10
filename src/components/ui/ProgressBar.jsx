import styles from './ProgressBar.module.css';

export default function ProgressBar({ step, total, label }) {
  const pct = Math.min(100, Math.round((step / total) * 100));
  return (
    <div className={styles.wrap}>
      <div className={styles.label}>
        <span>{label || `Etapa ${step} de ${total}`}</span>
        <span>{pct}%</span>
      </div>
      <div className={styles.track} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
