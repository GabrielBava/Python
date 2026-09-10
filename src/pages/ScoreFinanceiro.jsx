import { useState } from 'react';
import ToolShell from '../components/tools/ToolShell';
import QuizFlow from '../components/tools/QuizFlow';
import ResultTeaser from '../components/tools/ResultTeaser';
import ToolResultGate from '../components/tools/ToolResultGate';
import Gauge from '../components/ui/Gauge';
import { SCORE_QUESTIONS, computeScoreResult } from '../lib/scoreQuestions';
import { personalizeRecommendation } from '../lib/personalize';
import { getToolById } from '../data/tools';

const tool = getToolById('score-financeiro');

export default function ScoreFinanceiro() {
  const [phase, setPhase] = useState('quiz'); // quiz | preview | capture
  const [result, setResult] = useState(null);

  function handleQuizComplete(answers) {
    setResult(computeScoreResult(answers));
    setPhase('preview');
  }

  function buildResultProps(leadPayload) {
    const { priority, recommendation } = personalizeRecommendation({
      patrimonio: leadPayload.patrimonio_financeiro,
      renda: leadPayload.renda,
      objetivo: leadPayload.objetivo,
      categoryStrength: result.categoryStrength,
    });

    return {
      name: leadPayload.nome,
      toolLabel: tool.title,
      primary: <Gauge value={result.score} />,
      classification: result.classification,
      positives: result.positives,
      attentionPoints: result.attentionPoints,
      priority,
      recommendation,
      whatsappMessage: `Olá Gabriel! Acabei de fazer o Score de Saúde Financeira e meu resultado foi ${result.score}/100 (${result.classification}). Gostaria de entender melhor.`,
    };
  }

  return (
    <ToolShell
      tool={tool}
      explanation="O Score de Saúde Financeira é uma autoavaliação rápida sobre organização, reserva, dívidas, proteção, investimentos e objetivos — um retrato inicial da sua estrutura financeira, não um diagnóstico completo."
    >
      {phase === 'quiz' && <QuizFlow tool={tool.id} questions={SCORE_QUESTIONS} onComplete={handleQuizComplete} />}

      {phase === 'preview' && result && (
        <ResultTeaser
          message={`Identificamos ${result.attentionPoints.length || 1} ponto(s) importante(s) na sua estrutura financeira.`}
          preview={<Gauge value={result.score} />}
          onContinue={() => setPhase('capture')}
        />
      )}

      {phase === 'capture' && result && (
        <ToolResultGate
          tool={tool.id}
          toolResultSummary={{ score: result.score, classification: result.classification }}
          buildResultProps={buildResultProps}
        />
      )}
    </ToolShell>
  );
}
