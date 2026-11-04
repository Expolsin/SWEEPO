/** Premium Frequency selection step */

import type { FormData, FormAction } from '../../types/form';
import { SelectionCard } from '../ui/SelectionCard';
import { NoteBox } from '../ui/SelectionCard';

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
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    value: 'recurring' as const,
    label: 'Pravidelně',
    description: 'Týdenně, 14denně nebo měsíčně — dle dohody',
    priceNote: '320 Kč / hodina (slevové sazby)',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
];

export function StepFrequency({ formData, dispatch }: StepFrequencyProps) {
  const handleSelect = (value: 'oneoff' | 'recurring') => {
    dispatch({ type: 'SET_FREQUENCY', payload: value });
    dispatch({ type: 'NEXT_STEP' });
  };

  const isSelected = (value: 'oneoff' | 'recurring') => formData.frequency === value;

  return (
    <div className="min-h-screen flex flex-col px-[24px] pt-20 pb-16 bg-white">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-10 stagger-in">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-navy leading-tight text-balance">
            Jak často?
          </h2>
          <p className="mt-3 text-navy/50 text-lg">Pravidelné úklidy mají výhodnější hodinovou sazbu.</p>
        </div>

        {/* Options */}
        <div className="flex-1 flex flex-col gap-4 stagger-in" style={{ animationDelay: '80ms' }}>
          {frequencyOptions.map((option) => (
            <SelectionCard
              key={option.value}
              onClick={() => handleSelect(option.value)}
              selected={isSelected(option.value)}
              icon={option.icon}
              iconPosition="left"
              aria-pressed={isSelected(option.value)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-ui font-semibold text-lg text-navy">{option.label}</h3>
                  <span className="text-sm font-medium text-gold whitespace-nowrap flex-shrink-0">{option.priceNote}</span>
                </div>
                <p className="text-sm text-navy/50 mt-1">{option.description}</p>
              </div>
            </SelectionCard>
          ))}
        </div>

        {/* Minimum hours note */}
        <div className="mb-6 stagger-in" style={{ animationDelay: '180ms' }}>
          <NoteBox type="info">
            <span className="font-medium">Minimální fakturovaná doba základního úklidu: 3 hodiny</span>
          </NoteBox>
        </div>

        {/* Back button */}
        <div className="stagger-in" style={{ animationDelay: '220ms' }}>
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