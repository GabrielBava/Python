import LegalPage from '../components/legal/LegalPage';
import { WHATSAPP_URL } from '../config/site';

const UPDATED_AT = '10 de setembro de 2026';

export default function PoliticaPrivacidade() {
  return (
    <LegalPage title="Política de Privacidade" metaTitle="Política de Privacidade | Gabriel Bavaresco" updatedAt={UPDATED_AT}>
      <section>
        <h2>1. Introdução</h2>
        <p>
          Esta Política de Privacidade explica como Gabriel Bavaresco ("nós") trata os dados pessoais
          coletados através deste site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº
          13.709/2018 — LGPD). Ao utilizar este site e suas ferramentas, você concorda com as práticas
          aqui descritas.
        </p>
      </section>

      <section>
        <h2>2. Quem trata os seus dados</h2>
        <p>
          O controlador dos dados pessoais coletados neste site é Gabriel Bavaresco, responsável pelos
          serviços de Planejamento Financeiro oferecidos.
        </p>
      </section>

      <section>
        <h2>3. Quais dados coletamos</h2>
        <ul>
          <li>Dados de identificação e contato: nome, e-mail e telefone/WhatsApp.</li>
          <li>Dados de perfil financeiro: profissão, faixa de renda e patrimônio financeiro aproximado.</li>
          <li>
            Dados de contexto: objetivo financeiro, principal preocupação relatada e momento desejado
            para início do planejamento.
          </li>
          <li>Respostas e resultados obtidos nas ferramentas e simuladores gratuitos do site.</li>
          <li>
            Dados de navegação e origem: parâmetros de campanha (UTM), página de entrada e data/hora de
            acesso.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Para que usamos os seus dados</h2>
        <ul>
          <li>Elaborar e entregar o resultado das ferramentas e simulações solicitadas.</li>
          <li>Entrar em contato para apresentar o Planejamento Financeiro, quando houver interesse.</li>
          <li>Entender a origem dos visitantes e melhorar a experiência e o conteúdo do site.</li>
        </ul>
        <p>
          Não utilizamos seus dados para tomar decisões automatizadas que produzam efeitos jurídicos ou
          impactos significativos sobre você.
        </p>
      </section>

      <section>
        <h2>5. Com quem compartilhamos seus dados</h2>
        <p>
          Seus dados podem ser processados por ferramentas de automação, agendamento e gestão de
          relacionamento (CRM) utilizadas para organizar o atendimento comercial. Essas ferramentas
          tratam os dados exclusivamente a nosso pedido e sob obrigação de confidencialidade. Não
          vendemos ou compartilhamos seus dados com terceiros para fins de marketing de terceiros.
        </p>
      </section>

      <section>
        <h2>6. Cookies e ferramentas de análise</h2>
        <p>
          Este site pode utilizar ferramentas de análise de audiência (como Google Analytics e Google
          Tag Manager) e de mensuração de campanhas (como Meta Pixel) para entender o desempenho do
          conteúdo. Essas ferramentas podem armazenar identificadores no seu navegador. Você pode
          bloquear cookies nas configurações do seu navegador a qualquer momento.
        </p>
      </section>

      <section>
        <h2>7. Armazenamento e segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger seus dados contra acessos
          não autorizados, perda ou uso indevido. Os dados são mantidos pelo tempo necessário para as
          finalidades descritas nesta política ou conforme exigido por lei.
        </p>
      </section>

      <section id="lgpd">
        <h2>8. Seus direitos como titular de dados (LGPD)</h2>
        <p>Nos termos da LGPD, você pode, a qualquer momento, solicitar:</p>
        <ul>
          <li>Confirmação da existência de tratamento dos seus dados;</li>
          <li>Acesso, correção ou atualização dos seus dados;</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
          <li>Portabilidade dos seus dados a outro fornecedor;</li>
          <li>Eliminação dos dados tratados com o seu consentimento;</li>
          <li>Informação sobre com quem seus dados foram compartilhados;</li>
          <li>Revogação do seu consentimento, a qualquer momento.</li>
        </ul>
        <p>
          Para exercer qualquer um desses direitos, entre em contato pelo{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      </section>

      <section>
        <h2>9. Alterações nesta política</h2>
        <p>
          Esta política pode ser atualizada periodicamente para refletir melhorias no site ou mudanças
          legais. A data da última atualização está sempre indicada no topo desta página.
        </p>
      </section>
    </LegalPage>
  );
}
