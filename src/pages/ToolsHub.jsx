import { Helmet } from 'react-helmet-async';
import ToolsGrid from '../components/sections/ToolsGrid';
import About from '../components/sections/About';
import FinalCTA from '../components/sections/FinalCTA';
import Reveal from '../components/ui/Reveal';
import { SITE_URL } from '../config/site';

const TITLE = 'Ferramentas Financeiras Gratuitas | Gabriel Bavaresco';
const DESCRIPTION =
  'Faça simulações, descubra pontos de atenção e tenha mais clareza sobre suas decisões financeiras — gratuito e em poucos minutos.';

export default function ToolsHub() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/ferramentas`} />
      </Helmet>

      <section className="container section" style={{ paddingBottom: 0, textAlign: 'center' }}>
        <Reveal style={{ maxWidth: 620, margin: '0 auto' }}>
          <span className="eyebrow">Central de ferramentas</span>
          <h1 style={{ fontSize: 'var(--fs-2xl)', marginTop: '0.75rem' }}>
            Clareza sobre sua vida financeira, em poucos minutos.
          </h1>
          <p className="text-secondary" style={{ fontSize: 'var(--fs-md)', marginTop: '1rem', lineHeight: 'var(--lh-relaxed)' }}>
            Sete ferramentas gratuitas para simular cenários, identificar pontos de atenção e entender
            melhor suas próprias decisões financeiras — antes de qualquer conversa.
          </p>
        </Reveal>
      </section>

      <ToolsGrid />
      <About />
      <FinalCTA />
    </>
  );
}
