import { useState } from 'react';
import styles from './QuizFlow.module.css';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { trackEvent, EVENTS } from '../../lib/analytics';

// Wizard de uma pergunta por tela (usado pelo Score Financeiro e pelo
// Raio-X). Selecionar uma opção já avança — reduz fricção e mantém o ritmo
// de "quiz" que sustenta a conclusão até o fim.
export default function QuizFlow({ tool, questions, onComplete }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  function choose(optionIndex) {
    if (index === 0 && Object.keys(answers).length === 0) {
      trackEvent(EVENTS.TOOL_START, { tool });
    }
    setSelected(optionIndex);
    const nextAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(nextAnswers);

    setTimeout(() => {
      if (isLast) {
        trackEvent(EVENTS.TOOL_COMPLETE, { tool });
        onComplete(nextAnswers);
      } else {
        setIndex((i) => i + 1);
        setSelected(null);
      }
    }, 260);
  }

  function goBack() {
    if (index === 0) return;
    setSelected(null);
    setIndex((i) => i - 1);
  }

  return (
    <div className={styles.wrap}>
      <ProgressBar step={index + 1} total={questions.length} />

      {question.categoryLabel && <span className={styles.categoryTag}>{question.categoryLabel}</span>}
      <h2 className={styles.question}>{question.question}</h2>

      <div className={styles.options}>
        {question.options.map((option, i) => (
          <button
            key={option.label}
            type="button"
            className={[styles.option, selected === i ? styles.optionSelected : ''].filter(Boolean).join(' ')}
            onClick={() => choose(i)}
          >
            <span>{option.label}</span>
            <Icon name="arrow" size={16} />
          </button>
        ))}
      </div>

      {index > 0 && (
        <div className={styles.backRow}>
          <Button variant="ghost" onClick={goBack}>
            Voltar
          </Button>
        </div>
      )}
    </div>
  );
}
