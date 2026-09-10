import styles from './Badge.module.css';

export default function Badge({ children, accent = false, icon = null, className = '' }) {
  const classNames = [styles.badge, accent ? styles.accent : '', className].filter(Boolean).join(' ');
  return (
    <span className={classNames}>
      {icon}
      {children}
    </span>
  );
}
