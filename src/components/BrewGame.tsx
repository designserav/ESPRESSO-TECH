import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Bean {
  id: number;
  x: number; // 0 to 100 (%)
  y: number; // 0 to 100 (%)
  speed: number;
}

interface BrewGameProps {
  onClose: () => void;
}

export const BrewGame: React.FC<BrewGameProps> = ({ onClose }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'playing' | 'ended'>('playing');
  const [cupX, setCupX] = useState(50); // percentage (0 to 100)

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const beansRef = useRef<Bean[]>([]);
  const [, setRenderTrigger] = useState(0); // to trigger visual sync
  const nextBeanIdRef = useRef(1);
  const cupXRef = useRef(50);
  const animFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef(Date.now());
  const isPlayingRef = useRef(true);

  // Sync ref with state
  useEffect(() => {
    cupXRef.current = cupX;
  }, [cupX]);

  // Restart game
  const handleRestart = useCallback(() => {
    beansRef.current = [];
    setScore(0);
    setTimeLeft(30);
    setCupX(50);
    cupXRef.current = 50;
    isPlayingRef.current = true;
    lastSpawnRef.current = Date.now();
    setGameState('playing');
  }, []);

  // Timer countdown: 30 seconds
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          isPlayingRef.current = false;
          setGameState('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Keyboard navigation & ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (gameState !== 'playing') return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setCupX((prev) => Math.max(8, prev - 6));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setCupX((prev) => Math.min(92, prev + 6));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, onClose]);

  // Mouse / touch coordinate mapper
  const handlePointerMove = useCallback((clientX: number) => {
    if (!gameAreaRef.current || gameState !== 'playing') return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(8, Math.min(92, relativeX));
    setCupX(clamped);
  }, [gameState]);

  // Physics animation loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;

      const now = Date.now();
      // Gradual difficulty increase over 30s
      const elapsed = 30 - timeLeft;
      const spawnInterval = Math.max(450, 850 - elapsed * 12);
      const baseSpeed = 0.55 + (elapsed / 30) * 0.45;

      // Spawn new coffee beans
      if (now - lastSpawnRef.current > spawnInterval) {
        beansRef.current.push({
          id: nextBeanIdRef.current++,
          x: 8 + Math.random() * 84,
          y: -4,
          speed: baseSpeed + Math.random() * 0.25,
        });
        lastSpawnRef.current = now;
      }

      // Update bean positions and check collisions
      const currentCupX = cupXRef.current;
      const cupHitWidth = 10; // Catch window in percentage
      const cupTopY = 82; // Cup vertical hit zone
      const cupBottomY = 92;

      let caughtCount = 0;
      const remainingBeans: Bean[] = [];

      for (const bean of beansRef.current) {
        bean.y += bean.speed;

        // Collision check
        if (
          bean.y >= cupTopY &&
          bean.y <= cupBottomY &&
          Math.abs(bean.x - currentCupX) <= cupHitWidth
        ) {
          caughtCount++;
        } else if (bean.y <= 104) {
          remainingBeans.push(bean);
        }
      }

      beansRef.current = remainingBeans;

      if (caughtCount > 0) {
        setScore((prev) => prev + caughtCount);
      }

      setRenderTrigger((v) => (v + 1) % 1000);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, timeLeft]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Brew The Bean Mini-game"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden flex flex-col select-none">
        
        {/* Game Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E5E5]">
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-sm tracking-tight text-[#0A0A0A] uppercase">
              BREW THE BEAN
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#525252] uppercase">
              Catch the coffee beans
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#0A0A0A] font-semibold">
              <span className="text-[#737373] text-[10px]">SCORE:</span>
              <span>{score.toString().padStart(2, '0')}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[#0A0A0A] font-semibold">
              <span className="text-[#737373] text-[10px]">TIME:</span>
              <span className={timeLeft <= 5 ? 'text-espresso font-bold' : ''}>
                {timeLeft.toString().padStart(2, '0')}s
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close game"
              className="w-7 h-7 rounded-full bg-[#E5E5E5] hover:bg-[#D4D4D4] text-[#0A0A0A] flex items-center justify-center text-xs font-mono transition-colors ml-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Game Playfield Canvas Container */}
        <div
          ref={gameAreaRef}
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches[0]) handlePointerMove(e.touches[0].clientX);
          }}
          className="relative w-full h-[360px] bg-[#0A0A0A] overflow-hidden cursor-crosshair"
        >
          {/* Subtle Center Dotted Guide */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] border-r border-white/5 pointer-events-none" />

          {/* Falling Coffee Beans */}
          {beansRef.current.map((bean) => (
            <div
              key={bean.id}
              className="absolute w-5 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${bean.x}%`,
                top: `${bean.y}%`,
              }}
            >
              {/* Minimal SVG Coffee Bean Shape with Center Crease */}
              <svg viewBox="0 0 20 24" fill="none" className="w-full h-full drop-shadow-sm">
                <ellipse cx="10" cy="12" rx="8" ry="10" fill="#6F4328" />
                <path
                  d="M10 3 C9 8, 11 16, 10 21"
                  stroke="#391809"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <ellipse cx="8" cy="8" rx="2" ry="4" fill="#8A5A35" opacity="0.6" />
              </svg>
            </div>
          ))}

          {/* Player Controlled Espresso Cup */}
          <div
            className="absolute bottom-6 -translate-x-1/2 pointer-events-none transition-transform duration-75 ease-out"
            style={{ left: `${cupX}%` }}
          >
            {/* Minimal Geometric Cup SVG */}
            <div className="w-14 h-9">
              <svg viewBox="0 0 56 36" fill="none" className="w-full h-full drop-shadow-md">
                {/* Saucer */}
                <ellipse cx="28" cy="32" rx="22" ry="3" fill="#D4D4D4" />
                {/* Cup Body */}
                <path
                  d="M12 8 C12 8, 14 28, 28 28 C42 28, 44 8, 44 8 Z"
                  fill="#FFFFFF"
                />
                {/* Cup Rim */}
                <ellipse cx="28" cy="8" rx="16" ry="3" fill="#E9E9E9" />
                <ellipse cx="28" cy="8" rx="14" ry="2" fill="#6F4328" />
                {/* Handle */}
                <path
                  d="M42 12 C48 12, 50 16, 49 20 C48 24, 44 24, 41 23"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* End Screen Overlay */}
          {gameState === 'ended' && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center animate-fadeIn z-30">
              <span className="font-mono text-xs tracking-widest text-[#E5E5E5] uppercase mb-1">
                BREW COMPLETE.
              </span>
              <div className="font-satoshi font-black text-5xl text-white my-3">
                {score} <span className="text-sm font-mono text-[#A3A3A3] font-normal uppercase">BEANS</span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-full bg-white text-[#0A0A0A] font-semibold text-xs tracking-tight hover:bg-[#E5E5E5] transition-all duration-150 active:scale-95 cursor-pointer"
                >
                  PLAY AGAIN
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-full border border-white/20 text-white font-mono text-xs tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile / Keyboard Controls Footer */}
        <div className="px-5 py-3 bg-[#FAFAFA] border-t border-[#E5E5E5] flex items-center justify-between text-[11px] font-mono text-[#737373]">
          <div className="hidden sm:block">
            <span>Controls: Mouse, [A / D] or [← / →]</span>
          </div>

          {/* Mobile Touch Step Buttons for easy accessibility */}
          <div className="sm:hidden flex items-center justify-between w-full">
            <button
              onClick={() => setCupX((prev) => Math.max(8, prev - 12))}
              aria-label="Move cup left"
              className="px-4 py-1.5 rounded-lg bg-white border border-[#D4D4D4] text-[#0A0A0A] active:bg-[#E5E5E5] cursor-pointer"
            >
              ← LEFT
            </button>
            <span className="text-[10px]">Drag or tap</span>
            <button
              onClick={() => setCupX((prev) => Math.min(92, prev + 12))}
              aria-label="Move cup right"
              className="px-4 py-1.5 rounded-lg bg-white border border-[#D4D4D4] text-[#0A0A0A] active:bg-[#E5E5E5] cursor-pointer"
            >
              RIGHT →
            </button>
          </div>

          <div className="hidden sm:block">
            <span>ESC to exit</span>
          </div>
        </div>

      </div>
    </div>
  );
};
