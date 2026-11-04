/** Premium Add-ons (extras) selection step */

import type { FormData, FormAction } from '../../types/form';
import { SelectionCard, QuantityStepper } from '../ui/SelectionCard';

interface StepExtrasProps {
  formData: FormData;
  dispatch: React.Dispatch<FormAction>;
}

type ExtraKey = 'windows' | 'ovens' | 'ironingHours';

const extras: { key: ExtraKey; label: string; unit: string; price: string; description: string; icon: React.ReactNode }[] = [
  {
    key: 'windows',
    label: 'Okna',
    unit: 'křídlo',
    price: '150 Kč / křídlo',
    description: 'Vnitřní i vnější strana, rámy včetně',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12M6 12h12" />
      </svg>
    ),
  },
  {
    key: 'ovens',
    label: 'Trouba uvnitř',
    unit: 'ks',
    price: '300 Kč / ks',
    description: 'Včetně roštu a plechu',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    key: 'ironingHours',
    label: 'Žehlení',
    unit: 'hod',
    price: '350 Kč / hod',
    description: 'Prádlo dodáte vy, my zžehlíme',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
      </svg>
    ),
  },
];

export function StepExtras({ formData, dispatch }: StepExtrasProps) {
  const handleChange = (key: ExtraKey, delta: number) => {
    const currentValue = formData[key];
    const newValue = Math.max(0, currentValue + delta);
    dispatch({
      type: key === 'windows' ? 'SET_WINDOWS' : key === 'ovens' ? 'SET_OVEN' : 'SET_IRONING',
      payload: newValue
    });
  };

  const handleNext = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <div className="min-h-screen flex flex-col px-[24px] pt-20 pb-16 bg-white">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 stagger-in">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-navy leading-tight text-balance">
            Chcete něco navíc?
          </h2>
          <p className="mt-3 text-navy/50 text-lg">
            Základní úklid zahrnuje: podlahy, odprašení, kuchyňské plochy, koupelnu, WC a koše.
            Vše je volitelné — můžete přeskočit.
          </p>
        </div>

        {/* Extras list */}
        <div className="flex-1 overflow-y-auto pr-2 mb-6 stagger-in" style={{ animationDelay: '60ms' }}>
          <div className="space-y-4">
            {extras.map((extra) => (
              <SelectionCard
                key={extra.key}
                selected={false}
                className="p-0 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-marble-bg flex items-center justify-center text-navy">
                      {extra.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="font-ui font-semibold text-lg text-navy">{extra.label}</h3>
                        <span className="text-sm font-medium text-gold whitespace-nowrap flex-shrink-0">{extra.price}</span>
                      </div>
                      <p className="text-sm text-navy/50 mt-1">{extra.description}</p>
                    </div>
                  </div>
                  {/* Quantity selector */}
                  <div className="mt-4">
                    <QuantityStepper
                      value={formData[extra.key]}
                      onChange={(v) => handleChange(extra.key, v - formData[extra.key])}
                      unit={extra.unit}
                    />
                  </div>
                </div>
              </SelectionCard>
            ))}
          </div>
        </div>

        {/* Skip / Continue */}
        <div className="flex flex-col gap-3 stagger-in" style={{ animationDelay: '200ms' }}>
          <button
            onClick={handleNext}
            className="w-full cta-primary pressable font-ui font-semibold text-lg rounded-card tap-target"
          >
            Pokračovat
          </button>
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