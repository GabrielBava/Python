import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { captureUtm } from '../lib/utm';
import { session } from '../lib/storage';

const LeadContext = createContext(null);

const SESSION_KEY = 'gb_session';

const defaultSessionState = {
  interactions: 0,
  toolsUsed: [],
  lastTool: null,
  lastResult: null,
  submitted: false,
};

export function LeadProvider({ children }) {
  const [utm, setUtm] = useState(() => ({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
  }));
  const [sessionState, setSessionState] = useState(() =>
    session.get(SESSION_KEY, defaultSessionState)
  );

  useEffect(() => {
    setUtm(captureUtm());
  }, []);

  useEffect(() => {
    session.set(SESSION_KEY, sessionState);
  }, [sessionState]);

  // Chamado sempre que um visitante interage de fato com uma ferramenta
  // (não apenas visualiza a página) — alimenta o lead score ("quantidade de
  // interações") e o resumo comercial ("ferramenta acessada").
  const registerInteraction = useCallback((toolId) => {
    setSessionState((prev) => ({
      ...prev,
      interactions: prev.interactions + 1,
      toolsUsed: prev.toolsUsed.includes(toolId) ? prev.toolsUsed : [...prev.toolsUsed, toolId],
      lastTool: toolId,
    }));
  }, []);

  const setToolResult = useCallback((toolId, result) => {
    setSessionState((prev) => ({ ...prev, lastTool: toolId, lastResult: result }));
  }, []);

  const markSubmitted = useCallback(() => {
    setSessionState((prev) => ({ ...prev, submitted: true }));
  }, []);

  const value = useMemo(
    () => ({ utm, ...sessionState, registerInteraction, setToolResult, markSubmitted }),
    [utm, sessionState, registerInteraction, setToolResult, markSubmitted]
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLeadSession() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error('useLeadSession deve ser usado dentro de <LeadProvider>');
  return ctx;
}
