/** Frequency selection step */

import type { FormData, FormAction } from '../../types/form';

interface StepFrequencyProps {
  formData: FormData;
  dispatch: React.Dispatch<FormAction>;
}

const frequencyOptions = [
  {
    value: 'oneoff' as const,
    label: 'Jednorázově',
    description: 'Jednorázové úklid — např. před přestěhováním, po svatbě',
    priceNote: '350 Kč / hodina',
  },
  {
    value: 'recurring' as const,
    label: 'Pravidelně',
    description: 'Týdenně, 14denně nebo měsíčně — dle dohody',
    priceNote: '320 Kč / hodina (slevové sazby)',
  },
];

export function StepFrequency({ formData, dispatch }: StepFrequencyProps) {
  const handleSelect = (value: 'oneoff' | 'recurring') => {
    dispatch({ type: 'SET_FREQUENCY', payload: value });
    dispatch({ type: 'NEXT_STEP' });
  };

  const isSelected = (value: 'oneoff' | 'recurring') => formData.frequency === value;

  return (
    <div className="min-h-screen flex flex-col px-[20px] pt-24 pb-16 screen-transition">
      <div className="max-w-md w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-semibold text-ink leading-tight text-balance">
            Jak často?
          </h2>
          <p className="mt-2 text-ink/50">Pravidelné úklidy mají výhodnější hodinovou sazbu.</p>
        </div>

        {/* Options */}
        <div className="flex-1 flex flex-col gap-4">
          {frequencyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`relative flex items-start gap-4 p-4 card-radius tap-target transition-all duration-200 border-2 ${
                isSelected(option.value)
                  ? 'border-forest bg-mint'
                  : 'border-ink/10 bg-white hover:border-ink/20 active:scale-[0.99]'
              }`}
              aria-pressed={isSelected(option.value)}
            >
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mt-0.5 transition-all duration-200 ${
                  isSelected(option.value)
                    ? 'bg-forest text-white'
                    : 'bg-ink/5 text-ink/40'
                }`}
              >
                {option.value === 'oneoff' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-ui font-semibold text-lg text-ink">{option.label}</h3>
                  <span className="text-sm font-medium text-forest whitespace-nowrap">{option.priceNote}</span>
                </div>
                <p className="text-sm text-ink/50 mt-1">{option.description}</p>
              </div>
              {isSelected(option.value) && (
                <svg className="w-6 h-6 text-forest flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Info about minimum hours */}
        <div className="mb-4 p-3 bg-mint/50 rounded-xl border border-mint/50">
          <p className="text-sm text-forest text-center">
            Minimální fakturovaná doba základního úklidu: 3 hodiny
          </p>
        </div>

        {/* Back button */}
        <button
          onClick={() => dispatch({ type: 'PREV_STEP' })}
          className="w-full py-3 text-ink/60 font-ui font-medium text-center hover:text-ink transition-colors"
        >
          Zpět
        </button>
      </div>
    </div>
  );
}