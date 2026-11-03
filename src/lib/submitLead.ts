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
 * Submit a cleaning request using Netlify Forms.
 * Netlify detects the static HTML blueprint in index.html at deployment time.
 * A successful server response is required before showing the thank-you screen.
 */
export async function submitLead(data: LeadData): Promise<SubmitResult> {
  // Vite's local dev server does not process Netlify Forms, so never
  // falsely report success when testing without a deployed Netlify site.
  if (import.meta.env.DEV || ['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    return {
      success: false,
      error: 'Odesílání poptávek lze otestovat až na zveřejněném webu Netlify.',
    };
  }

  const payload = new URLSearchParams({
    'form-name': 'cleanify-inquiry',
    ...Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, String(value)])
    ),
    'bot-field': '',
  });

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Poptávku se nepodařilo doručit. Zkuste to prosím znovu.',
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: 'Spojení se nezdařilo. Zkontrolujte internet a zkuste to znovu.',
    };
  }
}
