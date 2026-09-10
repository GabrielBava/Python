import styles from './RangeField.module.css';

export default function RangeField({ label, value, onChange, min, max, step = 1, formatValue, hint }) {
  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{formatValue ? formatValue(value) : value}</span>
      </div>
      <input
        type="range"
        className={styles.range}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
