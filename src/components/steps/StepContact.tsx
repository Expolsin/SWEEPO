/** Contact form step */

import type { FormData, FormAction } from '../../types/form';
import { useState } from 'react';

interface StepContactProps {
  formData: FormData;
  dispatch: React.Dispatch<FormAction>;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}

const pragueDistricts = [
  'Praha 1', 'Praha 2', 'Praha 3', 'Praha 4', 'Praha 5', 'Praha 6', 'Praha 7',
  'Praha 8', 'Praha 9', 'Praha 10', 'Praha 11', 'Praha 12', 'Praha 13',
  'Praha 14', 'Praha 15', 'Praha 16', 'Praha 17', 'Praha 18', 'Praha 19',
  'Praha 20', 'Praha 21', 'Praha 22',
  'Jiné (upřesním v poznámce)',
];

export function StepContact({ formData, dispatch, onSubmit, isSubmitting, submitError }: StepContactProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateField = (name: keyof FormData, value: string): string | null => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Zadejte jméno (min. 2 znaky)' : null;
      case 'phone':
        return value.trim().length < 9 ? 'Zadejte telefonní číslo' : null;
      case 'street':
        return value.trim().length < 2 ? 'Zadejte ulici' : null;
      case 'houseNumber':
        return value.trim().length === 0 ? 'Zadejte číslo popisné' : null;
      case 'district':
        return value === '' ? 'Vyberte městskou část' : null;
      default:
        return null;
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    dispatch({ type: 'SET_CONTACT', payload: { [field]: value } });
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleBlur = (field: keyof FormData, value: string) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let hasError = false;

    const fieldsToValidate: (keyof FormData)[] = ['name', 'phone', 'street', 'houseNumber', 'district'];
    fieldsToValidate.forEach(field => {
      const value = String(formData[field] ?? '');
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
        hasError = true;
      }
    });

    setErrors(newErrors);

    if (!hasError) {
      onSubmit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-[20px] pt-24 pb-16 screen-transition">
      <div className="max-w-md w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-semibold text-ink leading-tight text-balance">
            Kam máme dojet?
          </h2>
          <p className="mt-2 text-ink/50">Potřebujeme jen to nejdůležitější. Volat vás budeme pro potvrzení.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} id="contact-form" className="flex-1 overflow-y-auto pr-2 mb-6" noValidate>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink/70 mb-2">
                Jméno a příjmení *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={(e) => handleBlur('name', e.target.value)}
                placeholder="Jan Novák"
                className={`w-full px-4 py-3 card-radius border-2 tap-target font-ui text-base ${
                  errors.name
                    ? 'border-red-500 bg-red-50 focus:border-red-500'
                    : 'border-ink/10 bg-white focus:border-forest'
                } transition-colors`}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-ink/70 mb-2">
                Telefon *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onBlur={(e) => handleBlur('phone', e.target.value)}
                placeholder="+420 123 456 789"
                className={`w-full px-4 py-3 card-radius border-2 tap-target font-ui text-base ${
                  errors.phone
                    ? 'border-red-500 bg-red-50 focus:border-red-500'
                    : 'border-ink/10 bg-white focus:border-forest'
                } transition-colors`}
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                autoComplete="tel"
                inputMode="tel"
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.phone}</p>
              )}
            </div>

            {/* Street */}
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-ink/70 mb-2">
                Ulice *
              </label>
              <input
                id="street"
                type="text"
                value={formData.street}
                onChange={(e) => handleChange('street', e.target.value)}
                onBlur={(e) => handleBlur('street', e.target.value)}
                placeholder="Vodičkova"
                className={`w-full px-4 py-3 card-radius border-2 tap-target font-ui text-base ${
                  errors.street
                    ? 'border-red-500 bg-red-50 focus:border-red-500'
                    : 'border-ink/10 bg-white focus:border-forest'
                } transition-colors`}
                aria-invalid={errors.street ? 'true' : 'false'}
                aria-describedby={errors.street ? 'street-error' : undefined}
                autoComplete="street-address"
              />
              {errors.street && (
                <p id="street-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.street}</p>
              )}
            </div>

            {/* House number + District */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="houseNumber" className="block text-sm font-medium text-ink/70 mb-2">
                  Číslo popisné *
                </label>
                <input
                  id="houseNumber"
                  type="text"
                  value={formData.houseNumber}
                  onChange={(e) => handleChange('houseNumber', e.target.value)}
                  onBlur={(e) => handleBlur('houseNumber', e.target.value)}
                  placeholder="123"
                  className={`w-full px-4 py-3 card-radius border-2 tap-target font-ui text-base ${
                    errors.houseNumber
                      ? 'border-red-500 bg-red-50 focus:border-red-500'
                      : 'border-ink/10 bg-white focus:border-forest'
                  } transition-colors`}
                  aria-invalid={errors.houseNumber ? 'true' : 'false'}
                  aria-describedby={errors.houseNumber ? 'houseNumber-error' : undefined}
                  autoComplete="address-line2"
                  inputMode="text"
                />
                {errors.houseNumber && (
                  <p id="houseNumber-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.houseNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-ink/70 mb-2">
                  Městská část *
                </label>
                <select
                  id="district"
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  onBlur={(e) => handleBlur('district', e.target.value)}
                  className={`w-full px-4 py-3 card-radius border-2 tap-target font-ui text-base appearance-none bg-white ${
                    errors.district
                      ? 'border-red-500 bg-red-50 focus:border-red-500'
                      : 'border-ink/10 focus:border-forest'
                  } transition-colors`}
                  aria-invalid={errors.district ? 'true' : 'false'}
                  aria-describedby={errors.district ? 'district-error' : undefined}
                >
                  <option value="">Vyberte část Prahy</option>
                  {pragueDistricts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                {errors.district && (
                  <p id="district-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.district}</p>
                )}
              </div>
            </div>

            {/* Submit error */}
            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 card-radius text-red-700 text-sm" role="alert">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  <span>{submitError}</span>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Order summary */}
        <div className="mb-6 p-4 bg-white border border-ink/10 card-radius">
          <h3 className="font-ui font-semibold text-ink mb-3">Shrnutí poptávky</h3>
          <div className="space-y-2 text-sm text-ink/70">
            <div className="flex justify-between">
              <span className="text-ink/50">Typ:</span>
              <span className="font-medium capitalize">{formData.propertyType === 'apartment' ? 'Byt' : 'Dům'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/50">Velikost:</span>
              <span className="font-medium">{formData.size || 'Nevím'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/50">Četnost:</span>
              <span className="font-medium capitalize">{formData.frequency === 'oneoff' ? 'Jednorázově' : 'Pravidelně'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/50">Termín:</span>
              <span className="font-medium">
                {formData.preferredDate
                  ? new Date(formData.preferredDate).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long' })
                  : 'Nevybráno'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/50">Adresa:</span>
              <span className="font-medium">
                {formData.street} {formData.houseNumber}, {formData.district}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            form="contact-form"
            disabled={isSubmitting}
            className="w-full cta-button font-ui font-semibold text-lg rounded-card tap-target transition-all duration-200 active:scale-[0.98] focus-visible:outline-lime focus-visible:outline-3 focus-visible:outline-offset-2 ${
              isSubmitting
                ? 'bg-ink/30 text-ink/50 cursor-wait'
                : 'bg-forest text-white'
            }"
          >
            {isSubmitting ? 'Odesílám...' : 'Odeslat nezávaznou poptávku'}
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'PREV_STEP' })}
            disabled={isSubmitting}
            className="w-full py-3 text-ink/60 font-ui font-medium text-center hover:text-ink transition-colors disabled:opacity-50"
          >
            Zpět
          </button>
        </div>
      </div>
    </div>
  );
}