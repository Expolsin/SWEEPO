/** Progress indicator component */

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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-[20px] pt-4" aria-hidden="true">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          {STEP_LABELS.slice(1).map((label, index) => (
            <span
              key={label}
              className={`text-xs font-medium transition-colors duration-200 ${
                index + 1 < currentStep
                  ? 'text-forest'
                  : index + 1 === currentStep
                  ? 'text-forest'
                  : 'text-ink/30'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="relative h-1.5 bg-ink/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-lime rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}