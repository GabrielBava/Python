import { useEffect, useState } from 'react';
import styles from './LeadCaptureForm.module.css';
import TextField from './TextField';
import ChoiceGroup from './ChoiceGroup';
import ConsentCheckbox from './ConsentCheckbox';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { PROFESSIONS, INCOME_RANGES, WEALTH_RANGES, GOALS, TIMINGS } from '../../data/formOptions';
import { useLeadSubmit } from '../../hooks/useLeadSubmit';
import { useLeadSession } from '../../context/LeadContext';
import { trackEvent, EVENTS } from '../../lib/analytics';

const TOTAL_STEPS = 7;

const initialFormData = {
  nome: '',
  telefone: '',
  email: '',
  profissao: '',
  renda: '',
  patrimonio_financeiro: '',
  objetivo: '',
  dor_principal: '',
  momento: '',
};

function digitsOnly(value) {
  return value.replace(/\D/g, '');
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateStep(step, data) {
  switch (step) {
    case 1:
      if (data.nome.trim().length < 3) return 'Informe seu nome completo.';
      if (digitsOnly(data.telefone).length < 10) return 'Informe um WhatsApp válido com DDD.';
      if (!isValidEmail(data.email)) return 'Informe um e-mail válido.';
      return null;
    case 2:
      return data.profissao ? null : 'Selecione uma opção para continuar.';
    case 3:
      return data.renda ? null : 'Selecione uma faixa de renda.';
    case 4:
      return data.patrimonio_financeiro ? null : 'Selecione uma opção para continuar.';
    case 5:
      return data.objetivo ? null : 'Selecione sua principal prioridade.';
    case 6:
      return data.dor_principal.trim().length >= 3 ? null : 'Conte um pouco — isso ajuda a preparar a conversa.';
    case 7:
      if (!data.momento) return 'Selecione uma opção para continuar.';
      return null;
    default:
      return null;
  }
}

// Formulário multi-etapas reutilizado por todas as ferramentas (seção 48).
// Nunca mostra todos os campos de uma vez — progressive profiling reduz
// fricção e mantém a percepção de "está quase pronto" (seção 37, CRO).
export default function LeadCaptureForm({ tool, toolResult, onSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const { interactions, markSubmitted } = useLeadSession();
  const { status, error, submit } = useLeadSubmit();

  useEffect(() => {
    trackEvent(EVENTS.LEAD_FORM_START, { tool });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    trackEvent(EVENTS.LEAD_FORM_STEP, { tool, step });
  }, [step, tool]);

  function update(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const stepError = touched ? validateStep(step, formData) : null;

  function goNext() {
    setTouched(true);
    const err = validateStep(step, formData);
    if (err) return;
    setTouched(false);
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  }

  function goBack() {
    setTouched(false);
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleSubmit() {
    setTouched(true);
    const err = validateStep(7, formData);
    if (err) return;
    if (!consent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    const payload = await submit({ formData, tool, toolResult, interactions });
    if (payload) {
      markSubmitted();
      onSuccess?.(payload);
    }
  }

  return (
    <div className={styles.wrap}>
      <ProgressBar step={step} total={TOTAL_STEPS} />

      {step === 1 && (
        <StepShell title="Vamos começar" subtitle="Para onde enviamos o seu resultado?">
          <TextField
            label="Nome completo"
            placeholder="Seu nome"
            autoComplete="name"
            value={formData.nome}
            onChange={(e) => update('nome', e.target.value)}
          />
          <TextField
            label="WhatsApp"
            placeholder="(00) 00000-0000"
            inputMode="tel"
            autoComplete="tel"
            value={formData.telefone}
            onChange={(e) => update('telefone', e.target.value)}
          />
          <TextField
            label="E-mail"
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </StepShell>
      )}

      {step === 2 && (
        <StepShell title="Qual é sua principal atividade?" subtitle="Isso ajuda a contextualizar sua análise.">
          <ChoiceGroup name="profissao" options={PROFESSIONS} value={formData.profissao} onChange={(v) => update('profissao', v)} />
        </StepShell>
      )}

      {step === 3 && (
        <StepShell title="Qual sua faixa aproximada de renda mensal?" subtitle="Uma estimativa já ajuda bastante.">
          <ChoiceGroup name="renda" options={INCOME_RANGES} value={formData.renda} onChange={(v) => update('renda', v)} />
        </StepShell>
      )}

      {step === 4 && (
        <StepShell title="Quanto aproximadamente você possui investido?" subtitle="Considere aplicações financeiras, não patrimônio físico.">
          <ChoiceGroup
            name="patrimonio"
            options={WEALTH_RANGES}
            value={formData.patrimonio_financeiro}
            onChange={(v) => update('patrimonio_financeiro', v)}
            wide
          />
        </StepShell>
      )}

      {step === 5 && (
        <StepShell title="Qual é sua principal prioridade financeira hoje?" subtitle="Escolha a que faz mais sentido agora.">
          <ChoiceGroup name="objetivo" options={GOALS} value={formData.objetivo} onChange={(v) => update('objetivo', v)} wide />
        </StepShell>
      )}

      {step === 6 && (
        <StepShell title="Se pudesse resolver apenas uma questão financeira hoje, qual seria?" subtitle="Essa resposta ajuda a preparar uma conversa mais direta ao ponto.">
          <TextField
            as="textarea"
            placeholder="Ex.: Não sei se estou investindo da forma certa para minha aposentadoria."
            value={formData.dor_principal}
            onChange={(e) => update('dor_principal', e.target.value)}
          />
        </StepShell>
      )}

      {step === 7 && (
        <StepShell title="Quando gostaria de começar a organizar isso?" subtitle="Última etapa.">
          <ChoiceGroup name="momento" options={TIMINGS} value={formData.momento} onChange={(v) => update('momento', v)} wide />
          <ConsentCheckbox checked={consent} onChange={setConsent} />
        </StepShell>
      )}

      {stepError && <div className={styles.errorBanner}>{stepError}</div>}
      {consentError && <div className={styles.errorBanner}>É necessário concordar com o tratamento de dados para continuar.</div>}
      {status === 'error' && <div className={styles.errorBanner}>{error} Tente novamente.</div>}

      <div className={styles.row}>
        {step > 1 ? (
          <Button variant="ghost" onClick={goBack} disabled={status === 'loading'}>
            <span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}>
              <Icon name="arrow" size={16} />
            </span>{' '}
            Voltar
          </Button>
        ) : (
          <span />
        )}

        {step < TOTAL_STEPS ? (
          <Button onClick={goNext}>Continuar</Button>
        ) : (
          <Button onClick={handleSubmit} loading={status === 'loading'}>
            Receber meu resultado
          </Button>
        )}
      </div>

      <div className={styles.secure}>
        <Icon name="shield" size={14} /> Seus dados estão protegidos e não são compartilhados.
      </div>
    </div>
  );
}

function StepShell({ title, subtitle, children }) {
  return (
    <>
      <div className={styles.stepHead}>
        <h3 className={styles.stepTitle}>{title}</h3>
        {subtitle && <p className={styles.stepSubtitle}>{subtitle}</p>}
      </div>
      <div className={styles.stepBody}>{children}</div>
    </>
  );
}
