/** Lead submission adapter - Netlify Forms integration */

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
 * Submit lead to Netlify Forms.
 *
 * This uses the standard Netlify Forms endpoint which works on static deploys.
 * The form must have `data-netlify="true"` and a hidden input with `name="form-name"`
 * matching the registered Netlify form name ("cleanify-inquiry").
 */
export async function submitLead(data: LeadData): Promise<SubmitResult> {
  try {
    const formData = new FormData();
    formData.append('form-name', 'cleanify-inquiry');
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response = await fetch('/', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      return { success: true };
    }

    // Try to parse error response
    let errorMessage = 'Odeslání se nezdařilo. Zkuste to prosím znovu.';
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Ignore parse errors
    }

    return { success: false, error: errorMessage };
  } catch (err) {
    console.error('Lead submission error:', err);
    return {
      success: false,
      error: 'Nepodařilo se odeslat poptávku. Zkontrolujte připojení k internetu a zkuste to znovu.',
    };
  }
}