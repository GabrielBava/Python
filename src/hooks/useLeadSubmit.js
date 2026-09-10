import { useCallback, useState } from 'react';
import { buildLeadPayload, submitLead } from '../lib/submitLead';
import { trackEvent, EVENTS } from '../lib/analytics';

// Encapsula loading / success / error do envio do lead (seção 31 do
// briefing) e dispara o evento de analytics lead_submit ao concluir.
export function useLeadSubmit() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState(null);

  const submit = useCallback(async ({ formData, tool, toolResult, interactions }) => {
    setStatus('loading');
    setError(null);
    const built = buildLeadPayload({ formData, tool, toolResult, interactions });

    try {
      await submitLead(built);
      setPayload(built);
      setStatus('success');
      trackEvent(EVENTS.LEAD_SUBMIT, {
        tool,
        lead_score: built.lead_score,
        lead_classificacao: built.lead_classificacao,
      });
      return built;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar seus dados.');
      setStatus('error');
      return null;
    }
  }, []);

  return { status, error, payload, submit };
}
