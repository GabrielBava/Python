import { useState } from 'react';
import ToolShell from '../components/tools/ToolShell';
import CalculatorCard from '../components/tools/CalculatorCard';
import CurrencyField from '../components/tools/CurrencyField';
import RangeField from '../components/tools/RangeField';
import ResultTeaser from '../components/tools/ResultTeaser';
import ToolResultGate from '../components/tools/ToolResultGate';
import BigFigure from '../components/ui/BigFigure';
import Badge from '../components/ui/Badge';
import { calculateRetirement, DISCLAIMER } from '../lib/calculators';
import { formatCurrency } from '../lib/format';
import { personalizeRecommendation } from '../lib/personalize';
import { getToolById } from '../data/tools';
import { trackEvent, EVENTS } from '../lib/analytics';

const tool = getToolById('aposentadoria');

export default function Aposentadoria() {
  const [phase, setPhase] = useState('form');
  const [yearsToRetirement, setYearsToRetirement] = useState(20);
  const [currentWealth, setCurrentWealth] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [rate, setRate] = useState(6);
  const [desiredIncome, setDesiredIncome] = useState(0);
  const [result, setResult] = useState(null);

  function handleCalculate() {
    if (!desiredIncome) return;
    trackEvent(EVENTS.TOOL_START, { tool: tool.id });
    // calculateRetirement trabalha com idades; para simplificar o formulário
    // (só pedimos "em quantos anos"), usamos 0 → yearsToRetirement, já que a
    // fórmula só depende da diferença entre as duas.
    const calc = calculateRetirement({
      currentAge: 0,
      retirementAge: yearsToRetirement,
      currentWealth,
      monthlyContribution,
      annualRatePct: rate,
      desiredMonthlyIncome: desiredIncome,
      withdrawalRatePct: 5,
    });
    setResult(calc);
    trackEvent(EVENTS.TOOL_COMPLETE, { tool: tool.id });
    setPhase('preview');
  }

  function buildResultProps(leadPayload) {
    // O próprio simulador já respondeu diretamente à pergunta que o levou
    // até aqui (está ou não no ritmo) — isso é mais relevante do que as
    // heurísticas genéricas de patrimônio/renda, então tem prioridade.
    const { priority, recommendation } = personalizeRecommendation({
      patrimonio: leadPayload.patrimonio_financeiro,
      renda: leadPayload.renda,
      objetivo: 'aposentadoria',
      override: result.onTrack
        ? {
            priority: 'Acompanhamento do plano de aposentadoria',
            recommendation:
              'Seu ritmo atual parece compatível com a renda futura desejada — o próximo passo é formalizar esse plano e acompanhar se ele se mantém alinhado ao longo do tempo.',
          }
        : {
            priority: 'Acelerar o ritmo de aposentadoria',
            recommendation: `Para alinhar seu patrimônio à renda futura desejada, o aporte mensal estimado passaria para ${formatCurrency(result.suggestedMonthlyContribution)} — vale entender com calma as alternativas para isso.`,
          },
    });

    return {
      name: leadPayload.nome,
      toolLabel: tool.title,
      primary: (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <BigFigure label="Patrimônio projetado" value={result.projectedWealth} />
          <BigFigure label="Patrimônio necessário" value={result.requiredWealth} />
        </div>
      ),
      classification: result.onTrack ? 'No ritmo em relação ao objetivo' : 'Abaixo do ritmo em relação ao objetivo',
      positives: result.onTrack ? ['Ritmo atual compatível com a renda futura desejada'] : [],
      attentionPoints: result.onTrack
        ? []
        : [
            `Aporte mensal estimado para alinhar o ritmo: ${formatCurrency(result.suggestedMonthlyContribution)}`,
          ],
      priority,
      recommendation,
      disclaimer: DISCLAIMER,
      whatsappMessage: `Olá Gabriel! Fiz o Simulador de Aposentadoria — patrimônio projetado de ${formatCurrency(result.projectedWealth)} vs. necessário de ${formatCurrency(result.requiredWealth)}. Gostaria de entender melhor.`,
    };
  }

  return (
    <ToolShell
      tool={tool}
      explanation="Compare a evolução projetada do seu patrimônio, mantendo o ritmo atual de aportes, com o patrimônio que seria necessário para sustentar a renda que você deseja na aposentadoria."
    >
      {phase === 'form' && (
        <CalculatorCard title="Seu ritmo atual está alinhado à aposentadoria desejada?" onSubmit={handleCalculate} disabled={!desiredIncome}>
          <RangeField
            label="Em quantos anos pretende se aposentar"
            value={yearsToRetirement}
            onChange={setYearsToRetirement}
            min={1}
            max={40}
            step={1}
            formatValue={(v) => `${v} ano(s)`}
          />
          <CurrencyField label="Patrimônio investido atualmente" value={currentWealth} onChange={setCurrentWealth} placeholder="0" />
          <CurrencyField label="Quanto investe por mês hoje" value={monthlyContribution} onChange={setMonthlyContribution} placeholder="1.000" />
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
          <CurrencyField label="Renda mensal desejada na aposentadoria" value={desiredIncome} onChange={setDesiredIncome} placeholder="10.000" />
        </CalculatorCard>
      )}

      {phase === 'preview' && result && (
        <ResultTeaser
          heading="Sua simulação está pronta."
          message={result.onTrack ? 'Seu ritmo atual parece compatível com o objetivo.' : 'Identificamos uma diferença entre o ritmo atual e o necessário.'}
          preview={<Badge accent>{result.onTrack ? 'Ritmo compatível' : 'Ritmo abaixo do necessário'}</Badge>}
          onContinue={() => setPhase('capture')}
        />
      )}

      {phase === 'capture' && result && (
        <ToolResultGate
          tool={tool.id}
          toolResultSummary={{
            projectedWealth: result.projectedWealth,
            requiredWealth: result.requiredWealth,
            onTrack: result.onTrack,
          }}
          buildResultProps={buildResultProps}
        />
      )}
    </ToolShell>
  );
}
