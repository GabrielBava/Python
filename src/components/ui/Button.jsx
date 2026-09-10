import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    fullWidth = false,
    loading = false,
    disabled = false,
    className = '',
    ...rest
  },
  ref
) {
  const classNames = [styles.btn, styles[variant], size !== 'md' ? styles[size] : '', fullWidth ? styles.fullWidth : '', className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span>{children}</span>
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classNames} ref={ref} {...rest}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classNames} ref={ref} target={rest.target} rel={rest.target ? 'noopener noreferrer' : undefined} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classNames} disabled={disabled || loading} ref={ref} type={rest.type || 'button'} {...rest}>
      {content}
    </button>
  );
});

export default Button;
