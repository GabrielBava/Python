// Motor de cálculo financeiro compartilhado pelas ferramentas. Todas as
// taxas são premissas informadas/editáveis pelo visitante — nunca valores
// prometidos ou garantidos (ver seção 46 do briefing: nenhuma promessa
// financeira). Todo resultado deve ser acompanhado do disclaimer padrão
// exportado em DISCLAIMER.

export const DISCLAIMER =
  'Simulação ilustrativa com base em premissas informadas por você. Não representa garantia de rentabilidade, resultado ou recomendação de investimento.';

function annualToMonthlyRate(annualRatePct) {
  const r = annualRatePct / 100;
  return (1 + r) ** (1 / 12) - 1;
}

// FV = PV(1+i)^n + PMT * (((1+i)^n - 1) / i)
export function futureValue({ presentValue = 0, monthlyContribution = 0, annualRatePct = 0, months = 0 }) {
  const i = annualToMonthlyRate(annualRatePct);
  if (months <= 0) return presentValue;
  if (i === 0) return presentValue + monthlyContribution * months;

  const growth = (1 + i) ** months;
  return presentValue * growth + monthlyContribution * ((growth - 1) / i);
}

// PMT necessário para sair de presentValue e atingir futureValueTarget em N meses.
export function requiredMonthlyContribution({
  futureValueTarget = 0,
  presentValue = 0,
  annualRatePct = 0,
  months = 1,
}) {
  const i = annualToMonthlyRate(annualRatePct);
  const safeMonths = Math.max(months, 1);

  if (i === 0) {
    return Math.max(0, (futureValueTarget - presentValue) / safeMonths);
  }

  const growth = (1 + i) ** safeMonths;
  const pmt = ((futureValueTarget - presentValue * growth) * i) / (growth - 1);
  return Math.max(0, pmt);
}

// ===== Ferramenta: Independência Financeira =====
// Patrimônio necessário = renda mensal desejada anualizada / taxa de retirada.
export function calculateFinancialIndependence({ desiredMonthlyIncome, withdrawalRatePct = 5 }) {
  const annualIncome = desiredMonthlyIncome * 12;
  const requiredWealth = annualIncome / (withdrawalRatePct / 100);
  return { requiredWealth, annualIncome, withdrawalRatePct };
}

// ===== Ferramenta: Reserva de Emergência =====
const RESERVE_MONTHS_BY_PROFILE = {
  clt: { min: 3, max: 6, recommended: 6 },
  servidor: { min: 3, max: 6, recommended: 6 },
  aposentado: { min: 3, max: 6, recommended: 6 },
  liberal: { min: 6, max: 12, recommended: 9 },
  medico: { min: 6, max: 12, recommended: 9 },
  autonomo: { min: 6, max: 12, recommended: 9 },
  empresario: { min: 6, max: 12, recommended: 12 },
  socio: { min: 6, max: 12, recommended: 12 },
  outro: { min: 6, max: 9, recommended: 6 },
};

export function calculateEmergencyReserve({ monthlyExpenses, profession }) {
  const months = RESERVE_MONTHS_BY_PROFILE[profession] || RESERVE_MONTHS_BY_PROFILE.outro;
  return {
    min: monthlyExpenses * months.min,
    max: monthlyExpenses * months.max,
    recommended: monthlyExpenses * months.recommended,
    months,
  };
}

// ===== Ferramenta: Simulador de Objetivos =====
export function calculateGoalContribution({
  targetValue,
  deadlineMonths,
  alreadySaved = 0,
  annualRatePct = 0,
}) {
  const monthlyContribution = requiredMonthlyContribution({
    futureValueTarget: targetValue,
    presentValue: alreadySaved,
    annualRatePct,
    months: deadlineMonths,
  });
  const totalContributed = monthlyContribution * deadlineMonths + alreadySaved;
  return { monthlyContribution, totalContributed };
}

// ===== Ferramenta: Simulador de Aposentadoria =====
export function calculateRetirement({
  currentAge,
  retirementAge,
  currentWealth = 0,
  monthlyContribution = 0,
  annualRatePct = 0,
  desiredMonthlyIncome,
  withdrawalRatePct = 5,
}) {
  const months = Math.max((retirementAge - currentAge) * 12, 0);
  const projectedWealth = futureValue({
    presentValue: currentWealth,
    monthlyContribution,
    annualRatePct,
    months,
  });
  const { requiredWealth } = calculateFinancialIndependence({ desiredMonthlyIncome, withdrawalRatePct });
  const onTrack = projectedWealth >= requiredWealth;
  const gap = Math.max(requiredWealth - projectedWealth, 0);
  const suggestedMonthlyContribution = onTrack
    ? monthlyContribution
    : requiredMonthlyContribution({
        futureValueTarget: requiredWealth,
        presentValue: currentWealth,
        annualRatePct,
        months,
      });

  return { months, projectedWealth, requiredWealth, onTrack, gap, suggestedMonthlyContribution };
}
