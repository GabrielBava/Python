import styles from './TextField.module.css';

export default function TextField({
  as = 'input',
  label,
  optional = false,
  error,
  hint,
  className = '',
  ...rest
}) {
  const Tag = as === 'textarea' ? 'textarea' : 'input';
  const fieldClass = as === 'textarea' ? styles.textarea : styles.input;

  return (
    <label className={[styles.field, className].filter(Boolean).join(' ')}>
      {label && (
        <span className={styles.label}>
          {label} {optional && <span className={styles.optional}>(opcional)</span>}
        </span>
      )}
      <Tag className={[fieldClass, error ? styles.error : ''].filter(Boolean).join(' ')} {...rest} />
      {error ? <span className={styles.errorText}>{error}</span> : hint ? <span className={styles.hint}>{hint}</span> : null}
    </label>
  );
}
