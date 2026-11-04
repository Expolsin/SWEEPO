/** Estimate/pricing summary step */

import type { FormData, FormAction } from '../../types/form';
import { calculateTotalEstimate, formatPrice, PRICING_CONFIG } from '../../config/pricing';
import type { SizeLabel, FrequencyType } from '../../config/pricing';

interface StepEstimateProps {
  formData: FormData;
  dispatch: React.Dispatch<FormAction>;
}

export function StepEstimate({ formData, dispatch }: StepEstimateProps) {
  // Calculate estimate
  const sizeLabel: SizeLabel = formData.size || 'unknown';
  const frequency: FrequencyType = formData.frequency || 'oneoff';

  const estimate = calculateTotalEstimate(
    sizeLabel,
    frequency,
    formData.windows,
    formData.ovens,
    formData.ironingHours
  );

  const handleNext = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const frequencyLabel = frequency === 'oneoff' ? 'Jednorázově' : 'Pravidelně';
  const sizeDisplay = PRICING_CONFIG.sizeEstimates[sizeLabel]?.displayName || sizeLabel;

  return (
    <div className="min-h-screen flex flex-col px-[24px] pt-24 pb-16 screen-transition bg-white">
      <div className="max-w-md w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-semibold text-navy leading-tight text-balance">
            Orientační cena
          </h2>
          <p className="mt-2 text-navy/50">
            Zde vidíte odhad. Finální cenu potvrdíme předem — bez překvapení.
          </p>
        </div>

        {/* Summary card */}
        <div className="flex-1 overflow-y-auto pr-2 mb-6">
          <div className="card p-6">
            {/* Configuration summary */}
            <div className="mb-6 pb-6 border-b border-marble-vein">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-navy/50">Typ</span>
                <span className="font-ui font-medium text-navy capitalize">
                  {formData.propertyType === 'apartment' ? 'Byt' : 'Dům'}
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-navy/50">Velikost</span>
                <span className="font-ui font-medium text-navy">{sizeDisplay}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-navy/50">Četnost</span>
                <span className="font-ui font-medium text-navy">{frequencyLabel}</span>
              </div>
              {formData.sizeM2 && (
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-navy/50">Výměra</span>
                  <span className="font-ui font-medium text-navy">{formData.sizeM2} m²</span>
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="space-y-3 mb-6">
              {/* Base cleaning */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-ui font-medium text-navy">Základní úklid</p>
                  {estimate.baseHours && (
                    <p className="text-sm text-navy/50">
                      ~{estimate.baseHours} hod × {frequency === 'oneoff' ? '350' : '320'} Kč/h
                    </p>
                  )}
                  {!estimate.baseHours && (
                    <p className="text-sm text-navy/50">Doba se určí při pohledu</p>
                  )}
                </div>
                <span className="font-ui font-semibold text-lg text-navy whitespace-nowrap">
                  {formatPrice(estimate.basePrice)}
                </span>
              </div>

              {/* Add-ons */}
              {formData.windows > 0 && (
                <div className="flex items-center justify-between text-sm text-navy/70">
                  <span>Okna ({formData.windows} křídel × 150 Kč)</span>
                  <span className="font-medium text-navy">{formData.windows * 150} Kč</span>
                </div>
              )}
              {formData.ovens > 0 && (
                <div className="flex items-center justify-between text-sm text-navy/70">
                  <span>Trouba uvnitř ({formData.ovens} × 300 Kč)</span>
                  <span className="font-medium text-navy">{formData.ovens * 300} Kč</span>
                </div>
              )}
              {formData.ironingHours > 0 && (
                <div className="flex items-center justify-between text-sm text-navy/70">
                  <span>Žehlení ({formData.ironingHours} hod × 350 Kč)</span>
                  <span className="font-medium text-navy">{formData.ironingHours * 350} Kč</span>
                </div>
              )}

              {estimate.addonsPrice > 0 && (
                <div className="flex items-center justify-between pt-3 border-t border-marble-vein">
                  <span className="font-ui font-medium text-navy">Přídavky celkem</span>
                  <span className="font-ui font-semibold text-lg text-navy">
                    {formatPrice(estimate.addonsPrice)}
                  </span>
                </div>
              )}
            </div>

            {/* Total or "Cena po upřesnění" */}
            <div className={`pt-4 border-t-2 ${estimate.hasBaseEstimate ? 'border-navy' : 'border-gold'}`}>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-navy">
                  {estimate.hasBaseEstimate ? 'Celkem (orientační)' : 'Celkem'}
                </span>
                <span className={`font-display text-2xl font-semibold ${estimate.hasBaseEstimate ? 'text-navy' : 'text-gold'}`}>
                  {formatPrice(estimate.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Important notes */}
          <div className="mt-6 space-y-3 text-sm text-navy/60">
            <div className="flex items-start gap-2 p-3 bg-marble-bg rounded-xl border border-marble-vein">
              <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <span className="font-medium">Toto není závazná nabídka.</span> Finální cenu potvrdíme předem na základě reálného rozsahu práce.
              </p>
            </div>

            <div className="flex items-start gap-2 p-3 bg-white-soft rounded-xl border border-marble-vein">
              <svg className="w-5 h-5 text-navy/40 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <span className="font-medium">Čistící prostředky dodává klient.</span> O změně vás informujeme včas.
              </p>
            </div>

            {!estimate.hasBaseEstimate && (
              <div className="flex items-start gap-2 p-3 bg-gold/10 rounded-xl border border-gold">
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>
                  <span className="font-medium">Velikost není kalibrovaná.</span> Pro přesnou cenu potřebujeme podívat se do prostoru (fotky/stavba). Poptávku můžete odeslat i tak.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleNext}
            className="w-full cta-primary pressable font-ui font-semibold text-lg rounded-card tap-target"
          >
            Vybrat termín
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