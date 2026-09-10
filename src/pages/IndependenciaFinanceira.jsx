import { useState } from 'react';
import ToolShell from '../components/tools/ToolShell';
import CalculatorCard from '../components/tools/CalculatorCard';
import CurrencyField from '../components/tools/CurrencyField';
import RangeField from '../components/tools/RangeField';
import ResultTeaser from '../components/tools/ResultTeaser';
import ToolResultGate from '../components/tools/ToolResultGate';
import BigFigure from '../components/ui/BigFigure';
import { calculateFinancialIndependence, DISCLAIMER } from '../lib/calculators';
import { formatCurrency } from '../lib/format';
import { personalizeRecommendation } from '../lib/personalize';
import { getToolById } from '../data/tools';
import { trackEvent, EVENTS } from '../lib/analytics';

const tool = getToolById('independencia-financeira');

export default function IndependenciaFinanceira() {
  const [phase, setPhase] = useState('form');
  const [income, setIncome] = useState(0);
  const [rate, setRate] = useState(5);
  const [result, setResult] = useState(null);

  function handleCalculate() {
    if (!income) return;
    trackEvent(EVENTS.TOOL_START, { tool: tool.id });
    const calc = calculateFinancialIndependence({ desiredMonthlyIncome: income, withdrawalRatePct: rate });
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
      primary: <BigFigure label="Patrimônio estimado necessário" value={result.requiredWealth} />,
      positives: [`Renda futura desejada: ${formatCurrency(result.annualIncome / 12)}/mês`],
      attentionPoints: [`Estimativa considera uma taxa de retirada de ${result.withdrawalRatePct}% ao ano`],
      priority,
      recommendation,
      disclaimer: DISCLAIMER,
      whatsappMessage: `Olá Gabriel! Fiz a Calculadora de Independência Financeira e o patrimônio estimado foi ${formatCurrency(result.requiredWealth)}. Gostaria de entender melhor.`,
    };
  }

  return (
    <ToolShell
      tool={tool}
      explanation="Esta simulação estima, de forma simplificada, o patrimônio que poderia sustentar a renda mensal que você deseja no futuro — um ponto de partida para pensar em independência financeira, não uma meta exata."
    >
      {phase === 'form' && (
        <CalculatorCard
          title="Quanto patrimônio você precisa construir?"
          subtitle="Informe a renda mensal que você gostaria de ter no futuro."
          onSubmit={handleCalculate}
          disabled={!income}
        >
          <CurrencyField label="Renda mensal desejada no futuro" value={income} onChange={setIncome} placeholder="10.000" />
          <RangeField
            label="Taxa de retirada anual estimada"
            value={rate}
            onChange={setRate}
            min={3}
            max={8}
            step={0.5}
            formatValue={(v) => `${v}% a.a.`}
            hint="Premissa editável — não representa rentabilidade garantida."
          />
        </CalculatorCard>
      )}

      {phase === 'preview' && result && (
        <ResultTeaser
          message="Calculamos uma estimativa de patrimônio necessário para sustentar essa renda."
          preview={<BigFigure value={result.requiredWealth} />}
          onContinue={() => setPhase('capture')}
        />
      )}

      {phase === 'capture' && result && (
        <ToolResultGate
          tool={tool.id}
          toolResultSummary={{ requiredWealth: result.requiredWealth, withdrawalRatePct: rate }}
          buildResultProps={buildResultProps}
        />
      )}
    </ToolShell>
  );
}
