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
 * Current implementation logs to console and simulates success.
 *
 * For production, configure one of:
 * - Netlify Forms (add data-netlify="true" to form)
 * - Formspree / FormSubmit / similar
 * - Custom API endpoint
 * - EmailJS or similar client-side email service
 *
 * LAUNCH BLOCKED until this is connected to a real delivery mechanism.
 */
export async function submitLead(data: LeadData): Promise<SubmitResult> {
  console.log('[Lead Submission] Submitting lead:', data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

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

  // For now, simulate success but log warning
  console.warn(
    '[LAUNCH BLOCKED] Lead submission is not connected to a real backend. ' +
    'Configure submitLead() in src/lib/submitLead.ts with a real delivery mechanism.'
  );

  // Simulate occasional failure for testing error state
  if (Math.random() < 0.1) {
    return { success: false, error: 'Odeslání se nezdařilo. Zkuste to prosím znovu nebo nás kontaktujte telefonicky.' };
  }

  return { success: true };
}