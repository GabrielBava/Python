import { useReveal } from '../../hooks/useReveal';

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal();
  const classNames = ['reveal', className].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} className={classNames} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}
