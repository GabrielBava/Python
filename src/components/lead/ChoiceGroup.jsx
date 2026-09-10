import styles from './ChoiceGroup.module.css';

export default function ChoiceGroup({ name, options, value, onChange, wide = false }) {
  return (
    <div className={[styles.group, wide ? styles.wide : ''].filter(Boolean).join(' ')} role="radiogroup">
      {options.map((option) => {
        const checked = value === option.value;
        return (
          <label key={option.value} className={styles.optionWrap}>
            <input
              type="radio"
              className={styles.input}
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => onChange(option.value)}
            />
            <span className={[styles.card, checked ? styles.checked : ''].filter(Boolean).join(' ')}>
              <span className={styles.dot} aria-hidden="true" />
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
