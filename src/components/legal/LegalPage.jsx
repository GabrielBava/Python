import { Helmet } from 'react-helmet-async';
import styles from './LegalPage.module.css';

export default function LegalPage({ title, metaTitle, updatedAt, children }) {
  return (
    <div className={`container section ${styles.wrap}`}>
      <Helmet>
        <title>{metaTitle || title}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.updated}>Última atualização: {updatedAt}</p>
      <div className={styles.prose}>{children}</div>
    </div>
  );
}
