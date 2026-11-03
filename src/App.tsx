import { useState, useCallback } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { StepHero } from './components/steps/StepHero';
import { StepProperty } from './components/steps/StepProperty';
import { StepSize } from './components/steps/StepSize';
import { StepFrequency } from './components/steps/StepFrequency';
import { StepExtras } from './components/steps/StepExtras';
import { StepEstimate } from './components/steps/StepEstimate';
import { StepDate } from './components/steps/StepDate';
import { StepContact } from './components/steps/StepContact';
import { StepSuccess } from './components/steps/StepSuccess';
import type { FormAction } from './types/form';
import { formReducer, INITIAL_FORM_DATA } from './types/form';
import { useFormPersistence } from './hooks/useFormPersistence';
import { submitLead } from './lib/submitLead';

function App() {
  const [formData, setFormData] = useFormPersistence(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useCallback((action: FormAction) => {
    setFormData((prev) => formReducer(prev, action));
  }, [setFormData]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    dispatch({ type: 'SET_SUBMITTING' });

    const leadData = {
      propertyType: formData.propertyType!,
      size: formData.size || 'unknown',
      sizeM2: formData.sizeM2,
      frequency: formData.frequency!,
      windows: formData.windows,
      ovens: formData.ovens,
      ironingHours: formData.ironingHours,
      preferredDate: formData.preferredDate,
      name: formData.name,
      phone: formData.phone,
      street: formData.street,
      houseNumber: formData.houseNumber,
      district: formData.district,
      submittedAt: new Date().toISOString(),
    };

    const result = await submitLead(leadData);

    if (result.success) {
      dispatch({ type: 'SET_SUBMIT_SUCCESS' });
      // Clear persistence on success
      try {
        sessionStorage.removeItem('stana-form-data');
      } catch {}
    } else {
      dispatch({ type: 'SET_SUBMIT_ERROR', payload: result.error || 'Neznámá chyba' });
    }

    setIsSubmitting(false);
  };

  // Render current step
  const renderStep = () => {
    const step = formData.currentStep;

    if (formData.submitSuccess) {
      return <StepSuccess dispatch={dispatch} />;
    }

    switch (step) {
      case 0:
        return <StepHero formData={formData} dispatch={dispatch} />;
      case 1:
        return <StepProperty formData={formData} dispatch={dispatch} />;
      case 2:
        return <StepSize formData={formData} dispatch={dispatch} />;
      case 3:
        return <StepFrequency formData={formData} dispatch={dispatch} />;
      case 4:
        return <StepExtras formData={formData} dispatch={dispatch} />;
      case 5:
        return <StepEstimate formData={formData} dispatch={dispatch} />;
      case 6:
        return <StepDate formData={formData} dispatch={dispatch} />;
      case 7:
        return (
          <StepContact
            formData={formData}
            dispatch={dispatch}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={formData.submitError}
          />
        );
      default:
        return <StepHero formData={formData} dispatch={dispatch} />;
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Progress bar - only show after hero */}
      {formData.currentStep > 0 && !formData.submitSuccess && (
        <ProgressBar formData={formData} />
      )}

      {/* Main content */}
      <main className="pt-0 pb-24">
        {renderStep()}
      </main>
    </div>
  );
}

export default App;