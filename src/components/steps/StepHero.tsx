/** Hero step component */

import type { FormData, FormAction } from '../../types/form';

interface StepHeroProps {
  formData: FormData;
  dispatch: React.Dispatch<FormAction>;
}

export function StepHero({ dispatch }: StepHeroProps) {
  const handleStart = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-[20px] pt-24 pb-16 screen-transition">
      <div className="max-w-md w-full text-center">
        {/* Brand / Logo area */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight text-balance">
            Domů se vracejte<br />
            <span className="text-forest">odpočívat. Ne uklízet.</span>
          </h1>
        </div>

        {/* Supporting copy */}
        <p className="text-lg text-ink/70 mb-10 leading-relaxed text-balance">
          Získejte čas pro to, co vás naplňuje. My se postaráme o čistotu — důsledně, spolehlivě a bez ukrytých poplatků.
        </p>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-ink/50 mb-10">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Praha a okolí
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Nezávazná poptávka
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Orientační cena hned
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          className="w-full cta-button bg-forest text-white font-ui font-semibold text-lg rounded-card tap-target transition-all duration-200 active:scale-[0.98] focus-visible:outline-lime focus-visible:outline-3 focus-visible:outline-offset-2"
        >
          Chci mít uklizeno
        </button>

        {/* Subtle note */}
        <p className="mt-6 text-sm text-ink/40 text-center">
          Zadal byste jen základní údaje. Nikde se neobhajujete a nic neplatíte.
        </p>
      </div>
    </div>
  );
}