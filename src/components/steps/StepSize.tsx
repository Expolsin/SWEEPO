/** Premium Size selection step */

import type { FormData, FormAction, SizeLabel } from '../../types/form';
import { OptionCard, InputField } from '../ui/SelectionCard';

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
    <div className="min-h-screen flex flex-col px-[24px] pt-20 pb-16 bg-white">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 stagger-in">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-navy leading-tight text-balance">
            Jak velký prostor uklidíme?
          </h2>
          <p className="mt-3 text-navy/50 text-lg">
            {formData.propertyType === 'house'
              ? 'Pro domy je velikost jen orientační — upřesníme při pohledu.'
              : 'Vyberte rozvržení bytu. Pokud nejste si jistí, zvolte „Nevím“.'
            }
          </p>
        </div>

        {/* Size options grid */}
        <div className="flex-1 overflow-y-auto pr-2 mb-6 stagger-in" style={{ animationDelay: '60ms' }}>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {sizeOptions.map((option) => (
              <OptionCard
                key={option.value}
                onClick={() => handleSelect(option.value)}
                selected={isSelected(option.value)}
                aria-pressed={isSelected(option.value)}
              >
                <h3 className="font-ui font-semibold text-base text-navy">{option.label}</h3>
                <p className="text-xs text-navy/50 mt-1.5 line-clamp-2">{option.description}</p>
              </OptionCard>
            ))}
          </div>

          {/* "Nevím" option - full width */}
          <OptionCard
            onClick={() => handleSelect('unknown')}
            selected={isSelected('unknown')}
            aria-pressed={isSelected('unknown')}
            className="flex items-center justify-center gap-3 text-left p-4"
          >
            <svg className="w-5 h-5 text-navy/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.5-3.146 2.5-1.463 0-2.5-.983-2.788-2.116M11 9c0 1.5-1.5 3-3 3s-3-1.5-3-3 1.5-3 3-3 3 1.5 3 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9z" />
            </svg>
            <span className="font-ui font-medium text-navy">Nevím přesnou velikost</span>
          </OptionCard>
        </div>

        {/* Optional m² input */}
        <div className="mb-6 stagger-in" style={{ animationDelay: '140ms' }}>
          <InputField
            label="Volitelně: výměra v m²"
            error={undefined}
            required={false}
            htmlFor="size-m2"
          >
            <input
              id="size-m2"
              type="number"
              min="10"
              max="500"
              value={formData.sizeM2}
              onChange={handleM2Change}
              placeholder="např. 65"
              className="input-premium"
              inputMode="numeric"
            />
          </InputField>
        </div>

        {/* Back button */}
        <div className="stagger-in" style={{ animationDelay: '200ms' }}>
          <button
            onClick={() => dispatch({ type: 'PREV_STEP' })}
            className="w-full cta-secondary pressable font-ui font-medium text-base rounded-card tap-target"
          >
            Zpět
          </button>
        </div>
      </div>
    </div>
  );
}