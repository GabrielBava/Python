import { Helmet } from 'react-helmet-async';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <Helmet>
        <title>Página não encontrada | Gabriel Bavaresco</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <h1>Página não encontrada</h1>
      <p className="text-secondary" style={{ marginBottom: '1.5rem' }}>
        O conteúdo que você procura não está mais aqui.
      </p>
      <Button to="/">Voltar para a home</Button>
    </div>
  );
}
