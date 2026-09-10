import { useState } from 'react';
import styles from './PhotoPlaceholder.module.css';

// Renderiza a fotografia real quando o arquivo existir em /public/images/.
// Como nenhuma fotografia profissional foi anexada a este projeto, o
// visual cai automaticamente para um tratamento premium com monograma —
// basta o arquivo com o nome esperado ser adicionado depois, sem alterar
// código (ver public/images/README.md).
export default function PhotoPlaceholder({ src, alt = '', initials = 'GB', caption, className = '' }) {
  const [errored, setErrored] = useState(!src);

  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')}>
      {!errored ? (
        <img src={src} alt={alt} className={styles.img} loading="lazy" onError={() => setErrored(true)} />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={alt}>
          <span className={styles.monogram} aria-hidden="true">
            {initials}
          </span>
          {caption && <span className={styles.caption}>{caption}</span>}
        </div>
      )}
    </div>
  );
}
