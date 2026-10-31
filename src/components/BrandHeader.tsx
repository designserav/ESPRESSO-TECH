import React from 'react';

/**
 * BrandHeader Component
 * 
 * Clean typographic brand lockup without logo placeholder box.
 */
export const BrandHeader: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center text-center select-none z-20">
      <span className="font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight text-[#0A0A0A] uppercase leading-none">
        ESPRESSO TECH
      </span>
      <span className="text-[9px] sm:text-[10.5px] font-mono tracking-[0.28em] text-[#525252] uppercase mt-2 font-medium">
        SOFTWARE DEVELOPMENT COMPANY
      </span>
    </header>
  );
};
