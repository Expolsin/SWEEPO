/** Add-ons (extras) selection step */

import type { FormData, FormAction } from '../../types/form';

interface StepExtrasProps {
  formData: FormData;
  dispatch: React.Dispatch<FormAction>;
}

export function StepExtras({ formData, dispatch }: StepExtrasProps) {
  const handleWindowChange = (delta: number) => {
    const newValue = Math.max(0, formData.windows + delta);
    dispatch({ type: 'SET_WINDOWS', payload: newValue });
  };

  const handleOvenChange = (delta: number) => {
    const newValue = Math.max(0, formData.ovens + delta);
    dispatch({ type: 'SET_OVEN', payload: newValue });
  };

  const handleIroningChange = (delta: number) => {
    const newValue = Math.max(0, formData.ironingHours + delta);
    dispatch({ type: 'SET_IRONING', payload: newValue });
  };

  const extras = [
    {
      key: 'windows' as const,
      label: 'Okna',
      unit: 'křídlo',
      price: '150 Kč / křídlo',
      description: 'Vnitřní i vnější strana, rámy včetně',
      value: formData.windows,
      onChange: handleWindowChange,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12M6 12h12" />
        </svg>
      ),
    },
    {
      key: 'ovens' as const,
      label: 'Trouba uvnitř',
      unit: 'kus',
      price: '300 Kč / ks',
      description: 'Včetně roštu a plechu',
      value: formData.ovens,
      onChange: handleOvenChange,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      key: 'ironing' as const,
      label: 'Žehlení',
      unit: 'hodina',
      price: '350 Kč / hodina',
      description: 'Prádlo dodáte vy, my zžehlíme',
      value: formData.ironingHours,
      onChange: handleIroningChange,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
      ),
    },
  ];

  const handleNext = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <div className="min-h-screen flex flex-col px-[20px] pt-24 pb-16 screen-transition">
      <div className="max-w-md w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-semibold text-ink leading-tight text-balance">
            Chcete něco navíc?
          </h2>
          <p className="mt-2 text-ink/50">
            Základní úklid zahrnuje: podlahy, odprašení, kuchyňské plochy, koupelnu, WC a koše.
            Vše je volitelné — můžete přeskočit.
          </p>
        </div>

        {/* Extras list */}
        <div className="flex-1 overflow-y-auto pr-2 mb-6">
          <div className="space-y-4">
            {extras.map((extra) => (
              <div
                key={extra.key}
                className="bg-white border border-ink/10 card-radius p-4 tap-target transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-mint flex items-center justify-center text-forest">
                    {extra.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-ui font-semibold text-lg text-ink">{extra.label}</h3>
                      <span className="text-sm font-medium text-forest whitespace-nowrap">{extra.price}</span>
                    </div>
                    <p className="text-sm text-ink/50 mt-1">{extra.description}</p>
                  </div>
                </div>
                {/* Quantity selector */}
                <div className="mt-4 flex items-center justify-end gap-3">
                  <button
                    onClick={() => extra.onChange(-1)}
                    disabled={extra.value === 0}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-ink font-semibold transition-colors ${
                      extra.value === 0
                        ? 'bg-ink/5 text-ink/30 cursor-not-allowed'
                        : 'bg-ink/5 hover:bg-ink/10 active:scale-95'
                    }`}
                    aria-label={`Snížit počet ${extra.label.toLowerCase()}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="font-ui font-semibold text-xl text-ink tabular-nums min-w-[2rem] text-center">
                    {extra.value}
                  </span>
                  <button
                    onClick={() => extra.onChange(1)}
                    className="w-10 h-10 rounded-xl bg-forest text-white flex items-center justify-center transition-colors hover:opacity-90 active:scale-95"
                    aria-label={`Zvýšit počet ${extra.label.toLowerCase()}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <span className="text-sm text-ink/50 whitespace-nowrap">{extra.unit}{extra.value !== 1 ? '' : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skip / Continue */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleNext}
            className="w-full cta-button bg-forest text-white font-ui font-semibold text-lg rounded-card tap-target transition-all duration-200 active:scale-[0.98] focus-visible:outline-lime focus-visible:outline-3 focus-visible:outline-offset-2"
          >
            Pokračovat
          </button>
          <button
            onClick={() => dispatch({ type: 'PREV_STEP' })}
            className="w-full py-3 text-ink/60 font-ui font-medium text-center hover:text-ink transition-colors"
          >
            Zpět
          </button>
        </div>
      </div>
    </div>
  );
}