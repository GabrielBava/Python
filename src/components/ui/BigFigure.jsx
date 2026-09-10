import { useEffect, useRef, useState } from 'react';
import styles from './BigFigure.module.css';
import { useCountUp } from '../../hooks/useCountUp';
import { formatCurrency } from '../../lib/format';

export default function BigFigure({ label, value }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const displayValue = useCountUp(Math.round(value), { active, duration: 900 });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.wrap} ref={ref}>
      {label && <span className={styles.label}>{label}</span>}
      <span className={styles.value}>{formatCurrency(displayValue)}</span>
    </div>
  );
}
