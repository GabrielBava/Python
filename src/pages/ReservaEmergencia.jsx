import { useState } from 'react';
import ToolShell from '../components/tools/ToolShell';
import CalculatorCard from '../components/tools/CalculatorCard';
import CurrencyField from '../components/tools/CurrencyField';
import ChoiceGroup from '../components/lead/ChoiceGroup';
import ResultTeaser from '../components/tools/ResultTeaser';
import ToolResultGate from '../components/tools/ToolResultGate';
import BigFigure from '../components/ui/BigFigure';
import { calculateEmergencyReserve } from '../lib/calculators';
import { formatCurrency } from '../lib/format';
import { personalizeRecommendation } from '../lib/personalize';
import { PROFESSIONS } from '../data/formOptions';
import { getToolById } from '../data/tools';
import { trackEvent, EVENTS } from '../lib/analytics';

const tool = getToolById('reserva-emergencia');

export default function ReservaEmergencia() {
  const [phase, setPhase] = useState('form');
  const [expenses, setExpenses] = useState(0);
  const [profession, setProfession] = useState('');
  const [result, setResult] = useState(null);

  function handleCalculate() {
    if (!expenses || !profession) return;
    trackEvent(EVENTS.TOOL_START, { tool: tool.id });
    const calc = calculateEmergencyReserve({ monthlyExpenses: expenses, profession });
    setResult(calc);
    trackEvent(EVENTS.TOOL_COMPLETE, { tool: tool.id });
    setPhase('preview');
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
      primary: <BigFigure label="Reserva recomendada" value={result.recommended} />,
      positives: [`Faixa considerada compatível: ${formatCurrency(result.min)} a ${formatCurrency(result.max)}`],
      attentionPoints: [`Equivalente a ${result.months.min}–${result.months.max} meses das suas despesas informadas`],
      priority,
      recommendation,
      whatsappMessage: `Olá Gabriel! Fiz a Calculadora de Reserva de Emergência e o valor recomendado foi ${formatCurrency(result.recommended)}. Gostaria de entender melhor.`,
    };
  }

  return (
    <ToolShell
      tool={tool}
      explanation="A reserva de emergência ideal varia conforme suas despesas mensais e a estabilidade da sua atividade profissional. Esta simulação sugere uma faixa de referência para o seu momento."
    >
      {phase === 'form' && (
        <CalculatorCard
          title="Qual seria uma reserva compatível com seu momento?"
          onSubmit={handleCalculate}
          disabled={!expenses || !profession}
        >
          <CurrencyField label="Suas despesas mensais aproximadas" value={expenses} onChange={setExpenses} placeholder="6.000" />
          <div>
            <p style={{ fontSize: 'var(--fs-sm)', marginBottom: '0.75rem' }}>Qual é sua principal atividade?</p>
            <ChoiceGroup name="profissao-reserva" options={PROFESSIONS} value={profession} onChange={setProfession} />
          </div>
        </CalculatorCard>
      )}

      {phase === 'preview' && result && (
        <ResultTeaser
          message="Calculamos uma faixa de reserva de emergência compatível com o seu momento."
          preview={<BigFigure value={result.recommended} />}
          onContinue={() => setPhase('capture')}
        />
      )}

      {phase === 'capture' && result && (
        <ToolResultGate
          tool={tool.id}
          toolResultSummary={{ recommended: result.recommended, min: result.min, max: result.max }}
          buildResultProps={buildResultProps}
        />
      )}
    </ToolShell>
  );
}
