import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import { LeadProvider } from './context/LeadContext';
import { initAnalytics } from './lib/analytics';

import Home from './pages/Home';
import ToolsHub from './pages/ToolsHub';
import ScoreFinanceiro from './pages/ScoreFinanceiro';
import IndependenciaFinanceira from './pages/IndependenciaFinanceira';
import ReservaEmergencia from './pages/ReservaEmergencia';
import SimuladorObjetivos from './pages/SimuladorObjetivos';
import Aposentadoria from './pages/Aposentadoria';
import RaioXFinanceiro from './pages/RaioXFinanceiro';
import ChecklistFinanceiro from './pages/ChecklistFinanceiro';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import TermosDeUso from './pages/TermosDeUso';
import NotFound from './pages/NotFound';
import RouteTracker from './components/layout/RouteTracker';

function AnalyticsInit() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LeadProvider>
        <AnalyticsInit />
        <RouteTracker />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="ferramentas" element={<ToolsHub />} />
            <Route path="score-financeiro" element={<ScoreFinanceiro />} />
            <Route path="independencia-financeira" element={<IndependenciaFinanceira />} />
            <Route path="reserva-emergencia" element={<ReservaEmergencia />} />
            <Route path="simulador-objetivos" element={<SimuladorObjetivos />} />
            <Route path="aposentadoria" element={<Aposentadoria />} />
            <Route path="raio-x-financeiro" element={<RaioXFinanceiro />} />
            <Route path="checklist-financeiro" element={<ChecklistFinanceiro />} />
            <Route path="politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="termos-de-uso" element={<TermosDeUso />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </LeadProvider>
    </BrowserRouter>
  );
}
