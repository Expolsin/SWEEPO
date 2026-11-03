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
    <div className="min-h-screen flex flex-col px-[20px] pt-24 pb-16 screen-transition">
      <div className="max-w-md w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-semibold text-ink leading-tight text-balance">
            Orientační cena
          </h2>
          <p className="mt-2 text-ink/50">
            Zde vidíte odhad. Finální cenu potvrdíme předem — bez překvapení.
          </p>
        </div>

        {/* Summary card */}
        <div className="flex-1 overflow-y-auto pr-2 mb-6">
          <div className="bg-white border border-ink/10 card-radius p-6">
            {/* Configuration summary */}
            <div className="mb-6 pb-6 border-b border-ink/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-ink/50">Typ</span>
                <span className="font-ui font-medium text-ink capitalize">
                  {formData.propertyType === 'apartment' ? 'Byt' : 'Dům'}
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-ink/50">Velikost</span>
                <span className="font-ui font-medium text-ink">{sizeDisplay}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-ink/50">Četnost</span>
                <span className="font-ui font-medium text-ink">{frequencyLabel}</span>
              </div>
              {formData.sizeM2 && (
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-ink/50">Výměra</span>
                  <span className="font-ui font-medium text-ink">{formData.sizeM2} m²</span>
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="space-y-3 mb-6">
              {/* Base cleaning */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-ui font-medium text-ink">Základní úklid</p>
                  {estimate.baseHours && (
                    <p className="text-sm text-ink/50">
                      ~{estimate.baseHours} hod × {frequency === 'oneoff' ? '350' : '320'} Kč/h
                    </p>
                  )}
                  {!estimate.baseHours && (
                    <p className="text-sm text-ink/50">Doba se určí při pohledu</p>
                  )}
                </div>
                <span className="font-ui font-semibold text-lg text-ink whitespace-nowrap">
                  {formatPrice(estimate.basePrice)}
                </span>
              </div>

              {/* Add-ons */}
              {formData.windows > 0 && (
                <div className="flex items-center justify-between text-sm text-ink/70">
                  <span>Okna ({formData.windows} křídel × 150 Kč)</span>
                  <span className="font-medium text-ink">{formData.windows * 150} Kč</span>
                </div>
              )}
              {formData.ovens > 0 && (
                <div className="flex items-center justify-between text-sm text-ink/70">
                  <span>Trouba uvnitř ({formData.ovens} × 300 Kč)</span>
                  <span className="font-medium text-ink">{formData.ovens * 300} Kč</span>
                </div>
              )}
              {formData.ironingHours > 0 && (
                <div className="flex items-center justify-between text-sm text-ink/70">
                  <span>Žehlení ({formData.ironingHours} hod × 350 Kč)</span>
                  <span className="font-medium text-ink">{formData.ironingHours * 350} Kč</span>
                </div>
              )}

              {estimate.addonsPrice > 0 && (
                <div className="flex items-center justify-between pt-3 border-t border-ink/10">
                  <span className="font-ui font-medium text-ink">Přídavky celkem</span>
                  <span className="font-ui font-semibold text-lg text-ink">
                    {formatPrice(estimate.addonsPrice)}
                  </span>
                </div>
              )}
            </div>

            {/* Total or "Cena po upřesnění" */}
            <div className={`pt-4 border-t-2 ${estimate.hasBaseEstimate ? 'border-forest' : 'border-lime'}`}>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-ink">
                  {estimate.hasBaseEstimate ? 'Celkem (orientační)' : 'Celkem'}
                </span>
                <span className={`font-display text-2xl font-semibold ${estimate.hasBaseEstimate ? 'text-forest' : 'text-lime'}`}>
                  {formatPrice(estimate.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Important notes */}
          <div className="mt-6 space-y-3 text-sm text-ink/60">
            <div className="flex items-start gap-2 p-3 bg-mint/50 rounded-xl border border-mint/50">
              <svg className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <span className="font-medium">Toto není závazná nabídka.</span> Finální cenu potvrdíme předem na základě reálného rozsahu práce.
              </p>
            </div>

            <div className="flex items-start gap-2 p-3 bg-ivory rounded-xl border border-ink/10">
              <svg className="w-5 h-5 text-ink/40 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <span className="font-medium">Čistící prostředky dodává klient.</span> O změně vás informujeme včas.
              </p>
            </div>

            {!estimate.hasBaseEstimate && (
              <div className="flex items-start gap-2 p-3 bg-lime/20 rounded-xl border border-lime/50">
                <svg className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="w-full cta-button bg-forest text-white font-ui font-semibold text-lg rounded-card tap-target transition-all duration-200 active:scale-[0.98] focus-visible:outline-lime focus-visible:outline-3 focus-visible:outline-offset-2"
          >
            Vybrat termín
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