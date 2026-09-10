import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent, EVENTS } from '../../lib/analytics';

// Dispara page_view na primeira renderização e a cada troca de rota.
export default function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    trackEvent(EVENTS.PAGE_VIEW, { path: location.pathname });
  }, [location.pathname]);

  return null;
}
