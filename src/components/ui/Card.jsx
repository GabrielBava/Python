import styles from './Card.module.css';

export default function Card({ as: Tag = 'div', interactive = false, flat = false, className = '', children, ...rest }) {
  const classNames = [styles.card, interactive ? styles.interactive : '', flat ? styles.flat : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classNames} {...rest}>
      {children}
    </Tag>
  );
}
