import React from 'react';

interface BrewingTextProps {
  onOpenGame?: () => void;
}

export const BrewingText: React.FC<BrewingTextProps> = ({ onOpenGame }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center select-none z-10 px-4 w-full max-w-5xl mx-auto my-auto">
      
      {/* Main Dominant Headline */}
      <h1 className="font-satoshi font-black text-[#0A0A0A] uppercase tracking-[-0.04em] leading-[0.92] text-[clamp(3.5rem,11.5vw,10.5rem)]">
        <span className="block">BREWING</span>
        <span className="block text-espresso">SOON.</span>
      </h1>

      {/* Supporting Subline */}
      <p className="text-sm sm:text-base font-light text-[#525252] tracking-wide mt-4 sm:mt-5 max-w-md">
        Something new is being crafted behind the scenes.
      </p>

      {/* Glassy White CTA Section */}
      {onOpenGame && (
        <div className="mt-10 sm:mt-12 flex flex-col items-center">
          
          {/* Top Label */}
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.28em] text-[#525252] uppercase font-medium mb-3 sm:mb-4">
            A SMALL GAME FOR BIG BREWS
          </span>

          {/* White Glassy CTA Pill Button with Glassy Stroke */}
          <button
            onClick={onOpenGame}
            className="group relative inline-flex items-center justify-between gap-5 sm:gap-7 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white/85 backdrop-blur-xl text-[#0A0A0A] border border-white/90 ring-1 ring-black/[0.08] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.04),inset_0_1px_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_28px_52px_-12px_rgba(0,0,0,0.12),0_12px_24px_-4px_rgba(0,0,0,0.06),inset_0_1px_1px_0_rgba(255,255,255,1)] hover:bg-white hover:scale-105 active:scale-[0.98] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-black/10"
            aria-label="Play Brew The Bean mini-game"
          >
            {/* Left: Roasted Coffee Bean Icon */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-sm">
                {/* Deep Roasted Espresso Bean Body */}
                <ellipse cx="12" cy="12" rx="7.5" ry="9.5" fill="#402416" transform="rotate(-18 12 12)" />
                {/* S-Curve Crease */}
                <path
                  d="M12 4.5 C14.5 8, 9.5 13, 12 19.5"
                  stroke="#FAFAFA"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  transform="rotate(-18 12 12)"
                />
              </svg>
            </div>

            {/* Center: Crisp Black Button Text */}
            <span className="font-satoshi font-black text-[#0A0A0A] text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase">
              BREW THE BEAN
            </span>

            {/* Right: Sleek Arrow that shifts on hover */}
            <div className="w-5 h-5 shrink-0 flex items-center justify-center text-[#171717]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-200"
              >
                <line x1="4" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
              </svg>
            </div>
          </button>

          {/* Bottom Label */}
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.28em] text-[#737373] uppercase font-medium mt-3 sm:mt-4">
            30S INTERACTIVE MINI-GAME
          </span>

        </div>
      )}

    </div>
  );
};
