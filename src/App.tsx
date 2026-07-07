import TerminalPortfolio from '@/components/TerminalPortfolio';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <>
      <TerminalPortfolio />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
