import LegalPage from '../components/legal/LegalPage';

const UPDATED_AT = '10 de setembro de 2026';

export default function TermosDeUso() {
  return (
    <LegalPage title="Termos de Uso" metaTitle="Termos de Uso | Gabriel Bavaresco" updatedAt={UPDATED_AT}>
      <section>
        <h2>1. Aceitação dos termos</h2>
        <p>
          Ao acessar e utilizar este site e suas ferramentas gratuitas, você concorda com os termos
          descritos abaixo. Se não concordar com algum ponto, recomendamos não utilizar o site.
        </p>
      </section>

      <section>
        <h2>2. Natureza do conteúdo</h2>
        <p>
          O conteúdo deste site — incluindo textos, simuladores e resultados gerados pelas ferramentas —
          tem caráter educativo e informativo. Não constitui recomendação de investimento, consultoria
          financeira formal, oferta de produtos financeiros ou promessa de rentabilidade ou resultado.
        </p>
      </section>

      <section>
        <h2>3. Sobre os simuladores e resultados</h2>
        <p>
          As calculadoras e simuladores disponíveis neste site utilizam premissas informadas por você
          (como taxas de rentabilidade estimadas) para gerar estimativas ilustrativas. Os resultados
          apresentados são simplificações que não consideram a totalidade da sua situação financeira,
          tributária, patrimonial e previdenciária, e não devem ser utilizados como única base para
          decisões financeiras. Um Planejamento Financeiro completo requer análise individualizada.
        </p>
      </section>

      <section>
        <h2>4. Uso adequado do site</h2>
        <p>
          Você concorda em utilizar este site de forma lícita, fornecendo informações verdadeiras nos
          formulários e ferramentas, e em não utilizar o site de forma que possa danificar, sobrecarregar
          ou comprometer seu funcionamento.
        </p>
      </section>

      <section>
        <h2>5. Propriedade intelectual</h2>
        <p>
          Textos, identidade visual, ferramentas e demais conteúdos deste site pertencem a Gabriel
          Bavaresco e não podem ser reproduzidos ou utilizados comercialmente sem autorização prévia.
        </p>
      </section>

      <section>
        <h2>6. Limitação de responsabilidade</h2>
        <p>
          Este site e suas ferramentas são oferecidos "como estão". Não garantimos disponibilidade
          ininterrupta ou ausência de erros, e não nos responsabilizamos por decisões tomadas
          exclusivamente com base nos resultados das ferramentas gratuitas, sem o acompanhamento de um
          Planejamento Financeiro completo.
        </p>
      </section>

      <section>
        <h2>7. Privacidade</h2>
        <p>
          O tratamento dos seus dados pessoais é descrito em nossa{' '}
          <a href="/politica-de-privacidade">Política de Privacidade</a>.
        </p>
      </section>

      <section>
        <h2>8. Alterações destes termos</h2>
        <p>
          Estes Termos de Uso podem ser atualizados periodicamente. A data da última atualização está
          sempre indicada no topo desta página.
        </p>
      </section>

      <section>
        <h2>9. Legislação aplicável</h2>
        <p>Estes termos são regidos pela legislação brasileira.</p>
      </section>
    </LegalPage>
  );
}
