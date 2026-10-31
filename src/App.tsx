import React, { useState } from 'react';
import { BrandHeader } from './components/BrandHeader';
import { BrewingText } from './components/BrewingText';
import { Footer } from './components/Footer';
import { BrewGame } from './components/BrewGame';

export const App: React.FC = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <div className="relative min-h-screen lg:h-screen w-full bg-[#FAFAFA] text-[#0A0A0A] flex flex-col justify-between items-center px-4 sm:px-8 py-6 sm:py-8 lg:py-10 overflow-hidden font-satoshi selection:bg-[#0A0A0A] selection:text-white">
      
      {/* Top Brand Area (8-10% from top) */}
      <div className="w-full flex justify-center pt-2 sm:pt-4 z-20">
        <BrandHeader />
      </div>

      {/* Center Stage: Bold BREWING SOON Headline + Highlighted Mini-Game CTA */}
      <main className="relative w-full my-auto flex flex-col items-center justify-center z-10 py-6 sm:py-8">
        <BrewingText onOpenGame={() => setIsGameOpen(true)} />
      </main>

      {/* Minimal Footer with Highlighted BREW ✦ pill button */}
      <Footer onOpenGame={() => setIsGameOpen(true)} />

      {/* Interactive Easter Egg Mini-Game Modal */}
      {isGameOpen && <BrewGame onClose={() => setIsGameOpen(false)} />}

    </div>
  );
};

export default App;
