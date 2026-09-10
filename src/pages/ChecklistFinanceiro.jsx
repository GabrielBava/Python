import { useState } from 'react';
import styles from './ChecklistFinanceiro.module.css';
import ToolShell from '../components/tools/ToolShell';
import ToolResultGate from '../components/tools/ToolResultGate';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import { personalizeRecommendation } from '../lib/personalize';
import { CHECKLIST_ITEMS } from '../data/checklist';
import { getToolById } from '../data/tools';
import { trackEvent, EVENTS } from '../lib/analytics';

const tool = getToolById('checklist-financeiro');
const VISIBLE_COUNT = 3;

export default function ChecklistFinanceiro() {
  const [phase, setPhase] = useState('teaser');

  function handleUnlock() {
    trackEvent(EVENTS.TOOL_START, { tool: tool.id });
    trackEvent(EVENTS.TOOL_COMPLETE, { tool: tool.id });
    setPhase('capture');
  }

  function buildResultProps(leadPayload) {
    const { priority, recommendation } = personalizeRecommendation({
      patrimonio: leadPayload.patrimonio_financeiro,
      renda: leadPayload.renda,
      objetivo: leadPayload.objetivo,
    });

    return {
      name: leadPayload.nome,
      toolLabel: tool.title,
      primary: (
        <div className={styles.list} style={{ width: '100%' }}>
          {CHECKLIST_ITEMS.map((item, i) => (
            <div key={item} className={styles.item}>
              <span className={styles.itemIndex}>{String(i + 1).padStart(2, '0')}</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      ),
      priority,
      recommendation,
      whatsappMessage: 'Olá Gabriel! Recebi o Checklist Financeiro e gostaria de entender melhor os pontos que preciso revisar.',
    };
  }

  return (
    <ToolShell
      tool={tool}
      explanation="Dez pontos objetivos para você revisar sozinho, hoje — uma forma rápida de perceber o que já está bem encaminhado e o que talvez precise de mais atenção."
    >
      {phase === 'teaser' && (
        <div className={styles.wrap}>
          <div className={styles.list}>
            {CHECKLIST_ITEMS.slice(0, VISIBLE_COUNT).map((item, i) => (
              <div key={item} className={styles.item}>
                <span className={styles.itemIndex}>{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className={styles.lockedWrap}>
            <div className={`${styles.list} ${styles.locked}`} aria-hidden="true">
              {CHECKLIST_ITEMS.slice(VISIBLE_COUNT, VISIBLE_COUNT + 3).map((item, i) => (
                <div key={item} className={styles.item}>
                  <span className={styles.itemIndex}>{String(i + VISIBLE_COUNT + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className={styles.lockedOverlay}>
              <span className={styles.lockedText}>+{CHECKLIST_ITEMS.length - VISIBLE_COUNT} pontos bloqueados</span>
            </div>
          </div>

          <Button size="lg" onClick={handleUnlock}>
            <Icon name="check" size={16} /> Receber checklist completo
          </Button>
        </div>
      )}

      {phase === 'capture' && (
        <ToolResultGate tool={tool.id} toolResultSummary={{ items: CHECKLIST_ITEMS.length }} buildResultProps={buildResultProps} />
      )}
    </ToolShell>
  );
}
