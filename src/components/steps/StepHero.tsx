/** Premium Hero step with immersive visual composition */

import type { FormAction } from '../../types/form';

interface StepHeroProps {
  dispatch: React.Dispatch<FormAction>;
}

export function StepHero({ dispatch }: StepHeroProps) {
  const handleStart = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <div
      className="relative min-h-screen flex flex-col px-[24px] pt-16 pb-16 bg-white overflow-hidden"
    >
      {/* Marble decorative background */}
      <div className="marble-bg" aria-hidden="true" />

      {/* Subtle grain texture overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.02]" aria-hidden="true" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
      }} />

      <main className="flex-1 flex flex-col max-w-md w-full mx-auto relative z-10">
        {/* Brand mark - top left */}
        <div className="mb-4 self-start">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-display text-xl font-semibold text-navy">STÁŇA</span>
          </div>
        </div>

        {/* Hero visual composition */}
        <div className="flex-1 flex flex-col items-center justify-center my-4">
          {/* Illustrative graphic - stylized home/leaf composition */}
          <div className="relative w-full max-w-xs mb-8" aria-hidden="true">
            <svg
              viewBox="0 0 280 280"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Ilustrace domova symbolizující čistotu a odpočinek"
            >
              <defs>
                <linearGradient id="marbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F8F6F3" />
                  <stop offset="100%" stopColor="#E8E4DF" />
                </linearGradient>
                <linearGradient id="marbleVeinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4C9BE" />
                  <stop offset="100%" stopColor="#B8A898" />
                </linearGradient>
                <linearGradient id="navyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0F1B2A" />
                  <stop offset="100%" stopColor="#1A2D42" />
                </linearGradient>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C8A968" />
                  <stop offset="100%" stopColor="#D4B878" />
                </linearGradient>
                <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#0F1B2A" floodOpacity="0.08"/>
                </filter>
              </defs>

              {/* Ground/subtle base */}
              <ellipse cx="140" cy="250" rx="100" ry="16" fill="#F8F6F3" opacity="0.5" />

              {/* Main home shape - stylized house */}
              <g filter="url(#softShadow)">
                {/* House body */}
                <rect x="70" y="120" width="140" height="100" rx="8" fill="url(#marbleGradient)" stroke="#D4C9BE" strokeWidth="1.5" />

                {/* Roof */}
                <path d="M55 120 L140 55 L225 120 Z" fill="url(#navyGradient)" />
                <path d="M60 120 L140 60 L220 120 Z" fill="#0F1B2A" opacity="0.2" />

                {/* Windows - clean, glowing with gold accent */}
                <g fill="#C8A968" opacity="0.9">
                  <rect x="90" y="145" width="28" height="28" rx="4" />
                  <rect x="162" y="145" width="28" height="28" rx="4" />
                  <rect x="90" y="190" width="28" height="28" rx="4" />
                  <rect x="162" y="190" width="28" height="28" rx="4" />
                </g>

                {/* Window crossbars */}
                <g stroke="#0F1B2A" strokeWidth="1.5" opacity="0.3">
                  <line x1="104" y1="145" x2="104" y2="173" />
                  <line x1="90" y1="159" x2="118" y2="159" />
                  <line x1="176" y1="145" x2="176" y2="173" />
                  <line x1="162" y1="159" x2="190" y2="159" />
                  <line x1="104" y1="190" x2="104" y2="218" />
                  <line x1="90" y1="204" x2="118" y2="204" />
                  <line x1="176" y1="190" x2="176" y2="218" />
                  <line x1="162" y1="204" x2="190" y2="204" />
                </g>

                {/* Door */}
                <rect x="125" y="185" width="30" height="35" rx="4" fill="url(#navyGradient)" />
                <circle cx="145" cy="205" r="2.5" fill="#C8A968" opacity="0.8" />
              </g>

              {/* Floating organic shapes around - marble vein inspired */}
              <g opacity="0.5">
                {/* Marble vein 1 */}
                <path d="M35 80 Q 60 90 80 85 Q 100 80 110 95" stroke="url(#marbleVeinGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Marble vein 2 */}
                <path d="M200 70 Q 180 85 170 75 Q 150 65 140 80" stroke="url(#marbleVeinGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
                {/* Marble vein 3 */}
                <path d="M40 180 Q 60 190 80 185 Q 100 180 115 195" stroke="url(#marbleVeinGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
                {/* Marble vein 4 */}
                <path d="M220 180 Q 200 195 185 185 Q 170 175 160 190" stroke="url(#marbleVeinGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
              </g>

              {/* Sparkle accents in gold */}
              <g fill="#C8A968" opacity="0.8">
                <circle cx="50" cy="100" r="2" />
                <circle cx="230" cy="95" r="1.5" />
                <circle cx="40" cy="200" r="1.5" />
                <circle cx="240" cy="205" r="2" />
                <circle cx="140" cy="40" r="2.5" />
              </g>
            </svg>
          </div>

          {/* Headline */}
          <div className="text-center px-2 stagger-in" style={{ animationDelay: '120ms' }}>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy leading-[1.1] text-balance mb-4">
              Domů se vracejte
              <br />
              <span className="text-navy">odpočívat. Ne uklízet.</span>
            </h1>
          </div>

          {/* Supporting copy */}
          <div className="text-center px-2 stagger-in" style={{ animationDelay: '200ms' }}>
            <p className="text-lg text-navy/70 leading-relaxed text-balance max-w-lg mx-auto">
              Získejte čas pro to, co vás naplňuje. My se postaráme o čistotu — důsledně, spolehlivě a bez ukrytých poplatků.
            </p>
          </div>
        </div>

        {/* Trust indicators - elegant pills */}
        <div className="mb-8 stagger-in" style={{ animationDelay: '280ms' }}>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-white/80 border border-marble-vein text-sm text-navy/60 backdrop-blur-sm">
              <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Praha a okolí
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-white/80 border border-marble-vein text-sm text-navy/60 backdrop-blur-sm">
              <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nezávazná poptávka
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-white/80 border border-marble-vein text-sm text-navy/60 backdrop-blur-sm">
              <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Orientační cena hned
            </span>
          </div>
        </div>

        {/* CTA - prominent */}
        <div className="stagger-in" style={{ animationDelay: '360ms' }}>
          <button
            onClick={handleStart}
            className="w-full cta-primary pressable font-ui font-semibold text-lg rounded-card tap-target relative overflow-hidden group"
            aria-label="Začít nezávaznou poptávku"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Chci mít uklizeno
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-500 group-hover:translate-x-full" aria-hidden="true" />
          </button>
        </div>

        {/* Subtle note */}
        <p className="mt-6 text-sm text-navy/40 text-center stagger-in" style={{ animationDelay: '440ms' }}>
          Zadal byste jen základní údaje. Nikde se neobhajujete a nic neplatíte.
        </p>

        {/* Scroll hint */}
        <div className="mt-10 flex items-center justify-center gap-1.5 text-navy/30 animate-bounce" style={{ animationDuration: '2s' }} aria-hidden="true">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V4" />
          </svg>
        </div>
      </main>
    </div>
  );
}