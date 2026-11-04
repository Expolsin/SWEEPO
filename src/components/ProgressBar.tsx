/** Premium Progress indicator component */

import type { FormData } from '../types/form';
import { STEP_LABELS } from '../types/form';

interface ProgressBarProps {
  formData: FormData;
}

export function ProgressBar({ formData }: ProgressBarProps) {
  const currentStep = formData.currentStep;
  const totalSteps = STEP_LABELS.length - 1; // Exclude hero step

  // Progress: steps 1-7 (0 is hero)
  const progress = Math.min(Math.max(currentStep, 1), totalSteps) / totalSteps;

  const steps = STEP_LABELS.slice(1);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-[24px] pt-4" aria-hidden="true">
      <div className="max-w-md mx-auto">
        {/* Step labels - minimal, only show current step label */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-navy/40 uppercase tracking-wider">
            Krok {currentStep} z {totalSteps}
          </span>
          <span className="text-xs font-medium text-gold">
            {steps[currentStep - 1] || steps[steps.length - 1]}
          </span>
        </div>

        {/* Progress bar with smooth animation */}
        <div className="progress-bar relative">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress * 100}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Pokrok rezervace"
          />
        </div>

        {/* Subtle step markers */}
        <div className="flex items-center justify-between mt-2" aria-hidden="true">
          {steps.map((_, index) => (
            <div key={index} className="relative flex-1">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index < currentStep ? 'bg-navy' : index === currentStep ? 'bg-gold' : 'bg-marble-vein'}`}
                style={{
                  transform: index < currentStep ? 'scale(1.2)' : index === currentStep ? 'scale(1.4)' : 'scale(1)',
                  boxShadow: index === currentStep ? '0 0 0 4px rgb(200 169 104 / 0.3)' : 'none'
                }}
              />
              {index < steps.length - 1 && (
                <div
                  className="absolute top-0.5 left-[10px] right-[10px] h-0.5 rounded transition-colors duration-300"
                  style={{ background: index < currentStep ? 'var(--color-navy)' : 'var(--color-marble-vein)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}