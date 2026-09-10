import styles from './ResultTeaser.module.css';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

// Ponte entre a interação com a ferramenta e o formulário de captura —
// mostra que o resultado já existe e gera curiosidade antes de pedir os
// dados (seção 13: "value first, lead second").
export default function ResultTeaser({
  heading = 'Seu diagnóstico está pronto.',
  message,
  preview,
  ctaLabel = 'Receber meu resultado completo',
  onContinue,
}) {
  return (
    <div className={styles.wrap}>
      <span className={styles.check}>
        <Icon name="check" size={28} />
      </span>
      <h2 className={styles.heading}>{heading}</h2>
      {message && <p className={styles.message}>{message}</p>}
      {preview && <div className={styles.preview}>{preview}</div>}
      <Button size="lg" onClick={onContinue}>
        {ctaLabel}
      </Button>
      <span className={styles.microcopy}>Leva menos de 1 minuto</span>
    </div>
  );
}
