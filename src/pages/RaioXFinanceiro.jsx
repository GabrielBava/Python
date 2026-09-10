import { useState } from 'react';
import ToolShell from '../components/tools/ToolShell';
import QuizFlow from '../components/tools/QuizFlow';
import ResultTeaser from '../components/tools/ResultTeaser';
import ToolResultGate from '../components/tools/ToolResultGate';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import { SCORE_QUESTIONS, computeScoreResult } from '../lib/scoreQuestions';
import { personalizeRecommendation } from '../lib/personalize';
import { getToolById } from '../data/tools';

const tool = getToolById('raio-x-financeiro');

// Versão enxuta do Score: 6 perguntas, uma por área, para uma leitura rápida
// por área em vez de um número único — reaproveita o mesmo motor de cálculo.
const RAIO_X_IDS = ['gastos', 'reserva', 'dividas', 'protecao', 'investe', 'aposentadoria'];
const RAIO_X_QUESTIONS = SCORE_QUESTIONS.filter((q) => RAIO_X_IDS.includes(q.id));

export default function RaioXFinanceiro() {
  const [phase, setPhase] = useState('quiz');
  const [result, setResult] = useState(null);

  function handleComplete(answers) {
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

    const areas = RAIO_X_QUESTIONS.map((q) => {
      const strength = result.categoryStrength[q.category] ?? 0;
      return { label: q.categoryLabel, ok: strength >= 0.6 };
    });

    return {
      name: leadPayload.nome,
      toolLabel: tool.title,
      primary: (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          {areas.map((area) => (
            <Badge key={area.label} accent={area.ok} icon={<Icon name={area.ok ? 'check' : 'warning'} size={13} />}>
              {area.label}
            </Badge>
          ))}
        </div>
      ),
      classification: result.classification,
      positives: result.positives,
      attentionPoints: result.attentionPoints,
      priority,
      recommendation,
      whatsappMessage: `Olá Gabriel! Fiz o Raio-X Financeiro e identifiquei pontos de atenção em: ${result.attentionPoints.join(', ') || 'nenhum ponto crítico'}. Gostaria de entender melhor.`,
    };
  }

  return (
    <ToolShell
      tool={tool}
      explanation="Seis perguntas rápidas, uma por área da sua vida financeira, para identificar onde vale mais a pena concentrar atenção antes de uma conversa mais profunda."
    >
      {phase === 'quiz' && <QuizFlow tool={tool.id} questions={RAIO_X_QUESTIONS} onComplete={handleComplete} />}

      {phase === 'preview' && result && (
        <ResultTeaser
          message={`Identificamos ${result.attentionPoints.length || 1} área(s) que merece(m) mais atenção.`}
          onContinue={() => setPhase('capture')}
        />
      )}

      {phase === 'capture' && result && (
        <ToolResultGate
          tool={tool.id}
          toolResultSummary={{ score: result.score, attentionPoints: result.attentionPoints }}
          buildResultProps={buildResultProps}
        />
      )}
    </ToolShell>
  );
}
