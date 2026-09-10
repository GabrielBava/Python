import { useState } from 'react';
import LeadCaptureForm from '../lead/LeadCaptureForm';
import LeadResult from '../lead/LeadResult';

// Une LeadCaptureForm + LeadResult (usados por todas as 7 ferramentas): antes
// do cadastro, mostra o formulário multi-etapas; depois, entrega o resultado
// completo e personalizado (seção 12 — "value first, lead second").
export default function ToolResultGate({ tool, toolResultSummary, buildResultProps }) {
  const [leadPayload, setLeadPayload] = useState(null);

  if (leadPayload) {
    return <LeadResult {...buildResultProps(leadPayload)} />;
  }

  return <LeadCaptureForm tool={tool} toolResult={toolResultSummary} onSuccess={setLeadPayload} />;
}
