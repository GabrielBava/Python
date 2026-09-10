import { useState } from 'react';
import ToolShell from '../components/tools/ToolShell';
import CalculatorCard from '../components/tools/CalculatorCard';
import CurrencyField from '../components/tools/CurrencyField';
import RangeField from '../components/tools/RangeField';
import ResultTeaser from '../components/tools/ResultTeaser';
import ToolResultGate from '../components/tools/ToolResultGate';
import BigFigure from '../components/ui/BigFigure';
import { calculateGoalContribution, DISCLAIMER } from '../lib/calculators';
import { formatCurrency } from '../lib/format';
import { personalizeRecommendation } from '../lib/personalize';
import { getToolById } from '../data/tools';
import { trackEvent, EVENTS } from '../lib/analytics';

const tool = getToolById('simulador-objetivos');

export default function SimuladorObjetivos() {
  const [phase, setPhase] = useState('form');
  const [targetValue, setTargetValue] = useState(0);
  const [alreadySaved, setAlreadySaved] = useState(0);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(8);
  const [result, setResult] = useState(null);

  function handleCalculate() {
    if (!targetValue) return;
    trackEvent(EVENTS.TOOL_START, { tool: tool.id });
    const deadlineMonths = years * 12;
    const calc = calculateGoalContribution({ targetValue, deadlineMonths, alreadySaved, annualRatePct: rate });
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
      primary: <BigFigure label="Aporte mensal estimado" value={result.monthlyContribution} />,
      positives: [`Objetivo de ${formatCurrency(targetValue)} em ${years} ano(s)`],
      attentionPoints: [`Total aportado estimado no período: ${formatCurrency(result.totalContributed)}`],
      priority,
      recommendation,
      disclaimer: DISCLAIMER,
      whatsappMessage: `Olá Gabriel! Fiz o Simulador de Objetivos: para juntar ${formatCurrency(targetValue)} em ${years} anos, o aporte mensal estimado foi ${formatCurrency(result.monthlyContribution)}. Gostaria de entender melhor.`,
    };
  }

  return (
    <ToolShell
      tool={tool}
      explanation="Informe o valor do seu objetivo, o prazo desejado e quanto já tem guardado — a simulação estima o aporte mensal necessário para alcançá-lo, considerando uma rentabilidade hipotética."
    >
      {phase === 'form' && (
        <CalculatorCard title="Quanto você precisa investir para o seu objetivo?" onSubmit={handleCalculate} disabled={!targetValue}>
          <CurrencyField label="Valor do objetivo" value={targetValue} onChange={setTargetValue} placeholder="50.000" />
          <CurrencyField label="Quanto já tem guardado para isso" value={alreadySaved} onChange={setAlreadySaved} placeholder="0" hint="Opcional" />
          <RangeField label="Prazo desejado" value={years} onChange={setYears} min={1} max={30} step={1} formatValue={(v) => `${v} ano(s)`} />
          <RangeField
            label="Rentabilidade anual estimada"
            value={rate}
            onChange={setRate}
            min={0}
            max={15}
            step={0.5}
            formatValue={(v) => `${v}% a.a.`}
            hint="Premissa editável — não representa rentabilidade garantida."
          />
        </CalculatorCard>
      )}

      {phase === 'preview' && result && (
        <ResultTeaser
          message="Calculamos o aporte mensal estimado para alcançar esse objetivo no prazo desejado."
          preview={<BigFigure value={result.monthlyContribution} />}
          onContinue={() => setPhase('capture')}
        />
      )}

      {phase === 'capture' && result && (
        <ToolResultGate
          tool={tool.id}
          toolResultSummary={{ monthlyContribution: result.monthlyContribution, targetValue, years }}
          buildResultProps={buildResultProps}
        />
      )}
    </ToolShell>
  );
}
