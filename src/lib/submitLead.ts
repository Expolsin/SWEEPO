/** Lead submission adapter - backend-free integration point */

export interface LeadData {
  propertyType: 'apartment' | 'house';
  size: string;
  sizeM2: string;
  frequency: 'oneoff' | 'recurring';
  windows: number;
  ovens: number;
  ironingHours: number;
  preferredDate: string;
  name: string;
  phone: string;
  street: string;
  houseNumber: string;
  district: string;
  submittedAt: string;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
}

/**
 * Submit lead to backend.
 *
 * INTEGRATION POINT: Replace this with actual backend call.
 *
 * For production, configure one of:
 * - Netlify Forms (add data-netlify="true" to form)
 * - Formspree / FormSubmit / similar
 * - Custom API endpoint
 * - EmailJS or similar client-side email service
 *
 * LAUNCH BLOCKED until this is connected to a real delivery mechanism.
 * This function currently always returns a blocked error.
 */
export async function submitLead(_data: LeadData): Promise<SubmitResult> {
  // TODO: Replace with real submission
  // Example for Netlify Forms:
  // const formData = new FormData();
  // Object.entries(data).forEach(([key, value]) => formData.append(key, String(value)));
  // const response = await fetch('/', { method: 'POST', body: formData });
  // return response.ok ? { success: true } : { success: false, error: 'Submission failed' };

  // Example for Formspree:
  // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return response.ok ? { success: true } : { success: false, error: 'Submission failed' };

  // LAUNCH BLOCKED: No backend configured
  return {
    success: false,
    error:
      'Systém pro příjem poptávek není zatím nakonfigurován. ' +
      'Prosím, kontaktujte nás telefonicky nebo zkuste to později.',
  };
}