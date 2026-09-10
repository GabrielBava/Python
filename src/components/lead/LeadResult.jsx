import { useEffect, useState } from 'react';
import styles from './LeadResult.module.css';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { CALENDAR_URL, buildWhatsappLink } from '../../config/site';
import { trackEvent, EVENTS } from '../../lib/analytics';

// Tela de resultado completo exibida após o cadastro (seções 20 e 21 do
// briefing). Nunca é um "Obrigado" genérico — entrega o valor prometido:
// visual do resultado, pontos positivos/atenção, prioridade personalizada
// e o convite para a conversa com contexto real.
export default function LeadResult({
  name,
  toolLabel,
  primary,
  classification,
  positives = [],
  attentionPoints = [],
  priority,
  recommendation,
  disclaimer,
  whatsappMessage,
}) {
  const [embedOpen, setEmbedOpen] = useState(false);
  const firstName = name?.trim().split(' ')[0] || '';

  useEffect(() => {
    trackEvent(EVENTS.RESULT_VIEW, { tool: toolLabel });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleScheduleClick() {
    trackEvent(EVENTS.SCHEDULE_CLICK, { tool: toolLabel, has_calendar: Boolean(CALENDAR_URL) });
    if (CALENDAR_URL) {
      setEmbedOpen(true);
      setTimeout(() => {
        document.getElementById('agendar-diagnostico')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  }

  const whatsappHref = buildWhatsappLink(whatsappMessage);

  return (
    <div className={styles.wrap}>
      <div className={styles.headBlock}>
        <span className={styles.eyebrowReady}>Seu diagnóstico está pronto</span>
        <h2 className={styles.name}>{firstName ? `${firstName}, seu resultado` : 'Seu resultado'}</h2>
      </div>

      {primary && <div className={styles.primaryVisual}>{primary}</div>}
      {classification && <p className={styles.classification}>{classification}</p>}

      {(positives.length > 0 || attentionPoints.length > 0) && (
        <div className={styles.columns}>
          {positives.length > 0 && (
            <div className={styles.panel}>
              <div className={styles.panelTitle}>Pontos positivos</div>
              <div className={styles.list}>
                {positives.map((item) => (
                  <div key={item} className={styles.listItem}>
                    <Icon name="check" size={16} className={styles.iconPositive} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {attentionPoints.length > 0 && (
            <div className={styles.panel}>
              <div className={styles.panelTitle}>Pontos de atenção</div>
              <div className={styles.list}>
                {attentionPoints.map((item) => (
                  <div key={item} className={styles.listItem}>
                    <Icon name="warning" size={16} className={styles.iconWarning} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {priority && (
        <div className={styles.priorityPanel}>
          <span className={styles.priorityLabel}>Prioridade recomendada</span>
          <span className={styles.priorityValue}>{priority}</span>
          {recommendation && <p className={styles.recommendation}>{recommendation}</p>}
        </div>
      )}

      <p className={styles.disclaimer}>
        {disclaimer
          ? `${disclaimer} `
          : ''}
        Esta é uma análise inicial. Um Planejamento Financeiro completo considera conjuntamente renda,
        despesas, patrimônio, objetivos, riscos e decisões financeiras.
      </p>

      <div className={styles.ctaBlock}>
        <p className={styles.ctaMeta}>
          Em aproximadamente 40 minutos, vamos conversar sobre seu momento financeiro, seus objetivos e os
          principais pontos de atenção identificados.
        </p>
        <div className={styles.ctaButtons}>
          <Button size="lg" onClick={handleScheduleClick} href={!CALENDAR_URL ? whatsappHref : undefined} target={!CALENDAR_URL ? '_blank' : undefined}>
            Agendar diagnóstico financeiro
          </Button>
          <Button variant="secondary" size="lg" href="#sobre-gabriel">
            Quero entender meu resultado
          </Button>
        </div>
      </div>

      {embedOpen && CALENDAR_URL && (
        <div id="agendar-diagnostico" className={styles.embedWrap}>
          <iframe src={CALENDAR_URL} title="Agendar diagnóstico financeiro com Gabriel Bavaresco" loading="lazy" />
        </div>
      )}
    </div>
  );
}
