/** Premium Property type selection step */

import type { FormData, FormAction } from '../../types/form';
import { SelectionCard } from '../ui/SelectionCard';

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
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    value: 'house' as const,
    label: 'Dům',
    description: 'Rodinný dům, vila nebo dvojdům',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
    <div className="min-h-screen flex flex-col px-[24px] pt-20 pb-16 bg-white">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-10 stagger-in">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-navy leading-tight text-balance">
            Kde chcete mít uklizeno?
          </h2>
          <p className="mt-3 text-navy/50 text-lg">Vyberte typ nemovitosti pro přesnější odhad.</p>
        </div>

        {/* Options */}
        <div className="flex-1 flex flex-col gap-4 stagger-in" style={{ animationDelay: '80ms' }}>
          {propertyOptions.map((option) => (
            <SelectionCard
              key={option.value}
              onClick={() => handleSelect(option.value)}
              selected={isSelected(option.value)}
              icon={option.icon}
              iconPosition="left"
              aria-pressed={isSelected(option.value)}
            >
              <div>
                <h3 className="font-ui font-semibold text-lg text-navy">{option.label}</h3>
                <p className="text-sm text-navy/50 mt-1">{option.description}</p>
              </div>
            </SelectionCard>
          ))}
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