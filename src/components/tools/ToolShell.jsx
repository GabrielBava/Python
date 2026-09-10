import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ToolShell.module.css';
import Badge from '../ui/Badge';
import Reveal from '../ui/Reveal';
import About from '../sections/About';
import ToolsGrid from '../sections/ToolsGrid';
import { SITE_URL } from '../../config/site';
import { trackEvent, EVENTS } from '../../lib/analytics';

// Layout compartilhado por todas as ferramentas standalone (seção 35 do
// briefing): cada ferramenta precisa funcionar sozinha para tráfego pago,
// sem depender de navegação prévia pela home. Mini hero + explicação + a
// ferramenta em si (children) + Sobre Gabriel + outras ferramentas — o
// Header/Footer já vêm do Layout global.
export default function ToolShell({ tool, explanation, children }) {
  useEffect(() => {
    trackEvent(EVENTS.TOOL_VIEW, { tool: tool.id, placement: 'standalone_page' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool.id]);

  return (
    <>
      <Helmet>
        <title>{`${tool.title} | Gabriel Bavaresco`}</title>
        <meta name="description" content={tool.heroSubheadline} />
        <link rel="canonical" href={`${SITE_URL}${tool.route}`} />
        <meta property="og:title" content={`${tool.title} | Gabriel Bavaresco`} />
        <meta property="og:description" content={tool.heroSubheadline} />
        <meta property="og:url" content={`${SITE_URL}${tool.route}`} />
      </Helmet>

      <section className={`container ${styles.miniHero}`}>
        <Reveal className={styles.miniHeroInner}>
          <div className={styles.badgeRow}>
            {tool.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>
          <h1 className={styles.title}>{tool.heroHeadline}</h1>
          <p className={styles.subtitle}>{tool.heroSubheadline}</p>
        </Reveal>
      </section>

      {explanation && (
        <Reveal as="div" className={`container ${styles.explanation}`}>
          {explanation}
        </Reveal>
      )}

      <div className={`container ${styles.toolArea}`}>{children}</div>

      <About id="sobre-gabriel" />

      <ToolsGrid />
    </>
  );
}
