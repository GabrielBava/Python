import styles from './DiagnosticSpotlight.module.css';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Gauge from '../ui/Gauge';
import Reveal from '../ui/Reveal';
import { getToolById } from '../../data/tools';

export default function DiagnosticSpotlight() {
  const independencia = getToolById('independencia-financeira');
  const raioX = getToolById('raio-x-financeiro');

  return (
    <section className="section section-bg">
      <div className="container">
        <SectionHeading
          center
          eyebrow="Comece por aqui"
          title="Como está sua vida financeira hoje?"
          subtitle="Responda algumas perguntas e receba uma análise inicial da sua estrutura financeira."
        />

        <div className={styles.grid}>
          <Reveal>
            <Card className={styles.mainCard}>
              <div className={styles.mainTop}>
                <div className={styles.mainCopy}>
                  <Badge accent>Score de Saúde Financeira</Badge>
                  <h3 className={styles.mainTitle}>Descubra seu score em poucos minutos.</h3>
                  <p className={styles.mainText}>
                    Responda 10 perguntas rápidas sobre organização, reserva, dívidas, proteção,
                    investimentos e objetivos — e receba pontos positivos e de atenção personalizados.
                  </p>
                </div>
                <Gauge value={68} size={148} strokeWidth={10} />
              </div>
              <span className={styles.sampleNote}>Exemplo ilustrativo de resultado</span>
              <Button to="/score-financeiro" size="lg" fullWidth>
                Descobrir meu score
              </Button>
            </Card>
          </Reveal>

          <div className={styles.sideCol}>
            <Reveal delay={80}>
              <Card className={styles.sideCard}>
                <div>
                  <Badge>{independencia.badges[0]}</Badge>
                  <h3 className={styles.sideTitle} style={{ marginTop: '0.75rem' }}>
                    Quanto patrimônio você precisa construir para o futuro?
                  </h3>
                </div>
                <Button to={independencia.route} variant="secondary" fullWidth>
                  Fazer simulação
                </Button>
              </Card>
            </Reveal>

            <Reveal delay={140}>
              <Card className={styles.sideCard}>
                <div>
                  <Badge>{raioX.badges[0]}</Badge>
                  <h3 className={styles.sideTitle} style={{ marginTop: '0.75rem' }}>
                    Descubra quais áreas merecem mais atenção.
                  </h3>
                </div>
                <Button to={raioX.route} variant="secondary" fullWidth>
                  Fazer meu raio-X
                </Button>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
