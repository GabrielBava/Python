import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './Gauge.module.css';

export default function Gauge({ value, size = 180, strokeWidth = 12, suffix = '/100' }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const displayValue = useCountUp(value, { active });

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
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, value));
  const offset = circumference * (1 - (active ? pct : 0) / 100);

  return (
    <div className={styles.wrap} ref={ref} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Score ${value} de 100`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1100ms cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className={styles.center}>
        <span className={styles.value}>{displayValue}</span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
    </div>
  );
}
