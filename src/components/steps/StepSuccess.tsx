/** Success step component */

import type { FormAction } from '../../types/form';

interface StepSuccessProps {
  dispatch: React.Dispatch<FormAction>;
}

export function StepSuccess({ dispatch }: StepSuccessProps) {
  const handleNewInquiry = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-[24px] pt-24 pb-16 screen-transition bg-white">
      <div className="max-w-md w-full text-center">
        {/* Marble decorative background */}
        <div className="marble-bg" aria-hidden="true" />

        {/* Success icon */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-marble-bg border border-marble-vein flex items-center justify-center stagger-in">
          <svg className="w-10 h-10 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success message */}
        <h2 className="font-display text-3xl font-semibold text-navy leading-tight text-balance mb-4 stagger-in" style={{ animationDelay: '80ms' }}>
          Poptávku máme!
        </h2>
        <p className="text-lg text-navy/70 leading-relaxed mb-8 stagger-in" style={{ animationDelay: '160ms' }}>
          Ozveme se a potvrdíme termín i cenu. Obvykle do pár hodin.
        </p>

        {/* What happens next */}
        <div className="card p-6 mb-8 text-left stagger-in" style={{ animationDelay: '240ms' }}>
          <h3 className="font-ui font-semibold text-navy mb-4">Co teď?</h3>
          <div className="space-y-3 text-sm text-navy/70">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy text-white text-xs font-semibold flex items-center justify-center">1</span>
              <span>Zkontrolujeme dostupnost na vámi vybraný termín.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy text-white text-xs font-semibold flex items-center justify-center">2</span>
              <span>Zavoláme nebo napíšeme na potvrzení ceny a detailů.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy text-white text-xs font-semibold flex items-center justify-center">3</span>
              <span>Dohodneme konkrétní čas příjezdu.</span>
            </div>
          </div>
        </div>

        {/* Contact note */}
        <div className="mb-8 p-4 bg-marble-bg rounded-xl border border-marble-vein stagger-in" style={{ animationDelay: '320ms' }}>
          <p className="text-sm text-navy/70">
            <span className="font-medium">Tip:</span> Pokud se termín nevyhoví, nic se nestane — najdeme jiný.
          </p>
        </div>

        {/* New inquiry button */}
        <button
          onClick={handleNewInquiry}
          className="w-full cta-primary pressable font-ui font-semibold text-lg rounded-card tap-target stagger-in"
          style={{ animationDelay: '400ms' }}
        >
          Nová poptávka
        </button>
      </div>
    </div>
  );
}