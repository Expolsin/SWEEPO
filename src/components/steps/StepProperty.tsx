/** Property type selection step */

import type { FormData, FormAction } from '../../types/form';

interface StepPropertyProps {
  formData: FormData;
  dispatch: React.Dispatch<FormAction>;
}

const propertyOptions = [
  {
    value: 'apartment' as const,
    label: 'Byt',
    description: 'Byt v rodinném domě nebo paneláku',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    value: 'house' as const,
    label: 'Dům',
    description: 'Rodinný dům, vila nebo dvojdům',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 22V12h6v10" />
      </svg>
    ),
  },
];

export function StepProperty({ formData, dispatch }: StepPropertyProps) {
  const handleSelect = (value: 'apartment' | 'house') => {
    dispatch({ type: 'SET_PROPERTY_TYPE', payload: value });
    dispatch({ type: 'NEXT_STEP' });
  };

  const isSelected = (value: 'apartment' | 'house') => formData.propertyType === value;

  return (
    <div className="min-h-screen flex flex-col px-[20px] pt-24 pb-16 screen-transition">
      <div className="max-w-md w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-semibold text-ink leading-tight text-balance">
            Kde chcete mít uklizeno?
          </h2>
          <p className="mt-2 text-ink/50">Vyberte typ nemovitosti pro přesnější odhad.</p>
        </div>

        {/* Options */}
        <div className="flex-1 flex flex-col gap-4">
          {propertyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`relative flex items-center gap-4 p-4 card-radius tap-target transition-all duration-200 border-2 ${
                isSelected(option.value)
                  ? 'border-forest bg-mint'
                  : 'border-ink/10 bg-white hover:border-ink/20 active:scale-[0.99]'
              }`}
              aria-pressed={isSelected(option.value)}
            >
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isSelected(option.value)
                    ? 'bg-forest text-white'
                    : 'bg-ink/5 text-ink/40'
                }`}
              >
                {option.icon}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-ui font-semibold text-lg text-ink">{option.label}</h3>
                <p className="text-sm text-ink/50 mt-0.5">{option.description}</p>
              </div>
              {isSelected(option.value) && (
                <svg className="w-6 h-6 text-forest flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Back button */}
        <button
          onClick={() => dispatch({ type: 'PREV_STEP' })}
          className="mt-6 w-full py-3 text-ink/60 font-ui font-medium text-center hover:text-ink transition-colors"
        >
          Zpět
        </button>
      </div>
    </div>
  );
}