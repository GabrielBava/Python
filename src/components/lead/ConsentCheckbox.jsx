import { Link } from 'react-router-dom';
import styles from './ConsentCheckbox.module.css';

export default function ConsentCheckbox({ checked, onChange }) {
  return (
    <label className={styles.wrap}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.text}>
        Ao continuar, você concorda com o tratamento dos seus dados para elaboração do resultado
        solicitado e eventual contato relacionado ao Planejamento Financeiro, conforme nossa{' '}
        <Link to="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
          Política de Privacidade
        </Link>
        .
      </span>
    </label>
  );
}
