import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import PainPoints from '../components/sections/PainPoints';
import WhatIsPlanning from '../components/sections/WhatIsPlanning';
import HowICanHelp from '../components/sections/HowICanHelp';
import ToolsGrid from '../components/sections/ToolsGrid';
import DiagnosticSpotlight from '../components/sections/DiagnosticSpotlight';
import HowItWorks from '../components/sections/HowItWorks';
import Benefits from '../components/sections/Benefits';
import About from '../components/sections/About';
import Authority from '../components/sections/Authority';
import FinalCTA from '../components/sections/FinalCTA';
import StickyMobileCTA from '../components/layout/StickyMobileCTA';
import { SITE_TITLE, SITE_URL } from '../config/site';

const DESCRIPTION =
  'Planejamento financeiro para organizar decisões, construir patrimônio e transformar objetivos em estratégias. Faça uma análise inicial gratuita.';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
      </Helmet>

      <Hero />
      <PainPoints />
      <WhatIsPlanning />
      <HowICanHelp />
      <ToolsGrid />
      <DiagnosticSpotlight />
      <HowItWorks />
      <Benefits />
      <About />
      <Authority />
      <FinalCTA />
      <StickyMobileCTA />
    </>
  );
}
