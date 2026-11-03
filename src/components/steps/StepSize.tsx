/** Size selection step */

import type { FormData, FormAction, SizeLabel } from '../../types/form';

interface StepSizeProps {
  formData: FormData;
  dispatch: React.Dispatch<FormAction>;
}

const sizeOptions: { value: SizeLabel; label: string; description: string }[] = [
  { value: '1+kk', label: '1+kk', description: 'Jeden pokoj s kuchyňským koutem' },
  { value: '2+kk', label: '2+kk', description: 'Dva pokoje s kuchyňským koutem' },
  { value: '2+1', label: '2+1', description: 'Dva pokoje a samostatná kuchyň' },
  { value: '3+kk', label: '3+kk', description: 'Tři pokoje s kuchyňským koutem' },
  { value: '3+1', label: '3+1', description: 'Tři pokoje a samostatná kuchyň' },
  { value: '4+', label: '4+', description: 'Čtyři a více pokojů' },
  { value: 'unknown', label: 'Nevím', description: 'Určíme velikost při pohledu' },
];

export function StepSize({ formData, dispatch }: StepSizeProps) {
  const handleSelect = (value: SizeLabel) => {
    dispatch({ type: 'SET_SIZE', payload: value });
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleM2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SIZE_M2', payload: e.target.value });
  };

  const isSelected = (value: SizeLabel) => formData.size === value;

  return (
    <div className="min-h-screen flex flex-col px-[20px] pt-24 pb-16 screen-transition">
      <div className="max-w-md w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-semibold text-ink leading-tight text-balance">
            Jak velký prostor uklidíme?
          </h2>
          <p className="mt-2 text-ink/50">
            {formData.propertyType === 'house'
              ? 'Pro domy je velikost jen orientační — upřesníme při pohledu.'
              : 'Vyberte rozvržení bytu. Pokud nejste si jistí, zvolte „Nevím“.'
            }
          </p>
        </div>

        {/* Size options grid */}
        <div className="flex-1 overflow-y-auto pr-2 mb-6">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {sizeOptions.slice(0, 6).map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`relative p-4 card-radius tap-target transition-all duration-200 border-2 text-center ${
                  isSelected(option.value)
                    ? 'border-forest bg-mint'
                    : 'border-ink/10 bg-white hover:border-ink/20 active:scale-[0.99]'
                }`}
                aria-pressed={isSelected(option.value)}
              >
                <h3 className="font-ui font-semibold text-base text-ink">{option.label}</h3>
                <p className="text-xs text-ink/50 mt-1 line-clamp-2">{option.description}</p>
                {isSelected(option.value) && (
                  <svg className="w-5 h-5 text-forest mx-auto mt-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* "Nevím" option - full width */}
          <button
            onClick={() => handleSelect('unknown')}
            className={`w-full p-4 card-radius tap-target transition-all duration-200 border-2 text-center ${
              isSelected('unknown')
                ? 'border-forest bg-mint'
                : 'border-ink/10 bg-white hover:border-ink/20 active:scale-[0.99]'
            }`}
            aria-pressed={isSelected('unknown')}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.5-3.146 2.5-1.463 0-2.5-.983-2.788-2.116M11 9c0 1.5-1.5 3-3 3s-3-1.5-3-3 1.5-3 3-3 3 1.5 3 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
              </svg>
              <span className="font-ui font-medium text-ink">Nevím přesnou velikost</span>
            </div>
            {isSelected('unknown') && (
              <svg className="w-5 h-5 text-forest mx-auto mt-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            )}
          </button>
        </div>

        {/* Optional m² input */}
        <div className="mb-6">
          <label htmlFor="size-m2" className="block text-sm font-medium text-ink/70 mb-2">
            Volitelně: výměra v m²
          </label>
          <input
            id="size-m2"
            type="number"
            min="10"
            max="500"
            value={formData.sizeM2}
            onChange={handleM2Change}
            placeholder="např. 65"
            className="w-full px-4 py-3 card-radius border-2 border-ink/10 bg-white text-ink placeholder-ink/30 font-ui text-base tap-target focus:border-forest focus:outline-none transition-colors"
            inputMode="numeric"
          />
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