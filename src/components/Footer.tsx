import React from 'react';

interface FooterProps {
  onOpenGame?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGame }) => {
  return (
    <footer className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 sm:py-8 px-4 sm:px-8 text-xs font-mono text-[#737373] select-none z-20">
      <div className="flex items-center gap-2">
        <span className="tracking-wider">&copy; ESPRESSO TECH</span>
      </div>

      <div>
        {onOpenGame && (
          <button
            onClick={onOpenGame}
            aria-label="Play Brew The Bean mini-game"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[#0A0A0A] border border-white/80 ring-1 ring-black/[0.06] hover:bg-white hover:ring-black/[0.12] hover:scale-105 active:scale-95 text-xs font-mono tracking-wider font-semibold transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] focus:outline-none focus:ring-2 focus:ring-black/20 cursor-pointer"
          >
            <span>BREW</span>
            <span className="text-espresso">✦</span>
          </button>
        )}
      </div>
    </footer>
  );
};
