import styles from './ToolsGrid.module.css';
import SectionHeading from '../ui/SectionHeading';
import ToolCard from '../tools/ToolCard';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { TOOLS_META } from '../../data/tools';

export default function ToolsGrid() {
  return (
    <section id="ferramentas" className="section">
      <div className="container">
        <SectionHeading
          center
          eyebrow="Central de ferramentas"
          title="Ferramentas para entender melhor sua vida financeira."
          subtitle="Faça simulações, descubra pontos de atenção e tenha mais clareza sobre suas decisões financeiras."
        />

        <div className={styles.grid}>
          {TOOLS_META.map((tool, i) => (
            <Reveal key={tool.id} delay={(i % 3) * 70}>
              <ToolCard tool={tool} />
            </Reveal>
          ))}
        </div>

        <div className={styles.footer}>
          <Button to="/ferramentas" variant="secondary" size="lg">
            Ver todas as ferramentas
          </Button>
        </div>
      </div>
    </section>
  );
}
