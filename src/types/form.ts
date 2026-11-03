/** Form data types for the booking funnel */

export type PropertyType = 'apartment' | 'house';
export type SizeLabel = '1+kk' | '2+kk' | '2+1' | '3+kk' | '3+1' | '4+' | 'unknown';
export type FrequencyType = 'oneoff' | 'recurring';

export interface FormData {
  // Step 1: Property type
  propertyType: PropertyType | null;

  // Step 2: Size
  size: SizeLabel | null;
  sizeM2: string; // optional manual m² entry

  // Step 3: Frequency
  frequency: FrequencyType | null;

  // Step 4: Add-ons
  windows: number; // number of window wings
  ovens: number;   // number of ovens
  ironingHours: number;

  // Step 5: Preferred date
  preferredDate: string; // ISO date string

  // Step 6: Contact
  name: string;
  phone: string;
  street: string;
  houseNumber: string;
  district: string;

  // Meta
  currentStep: number;
  submitted: boolean;
  submitError: string | null;
  submitSuccess: boolean;
}

export const INITIAL_FORM_DATA: FormData = {
  propertyType: null,
  size: null,
  sizeM2: '',
  frequency: null,
  windows: 0,
  ovens: 0,
  ironingHours: 0,
  preferredDate: '',
  name: '',
  phone: '',
  street: '',
  houseNumber: '',
  district: '',
  currentStep: 0,
  submitted: false,
  submitError: null,
  submitSuccess: false,
};

export type FormAction =
  | { type: 'SET_PROPERTY_TYPE'; payload: PropertyType }
  | { type: 'SET_SIZE'; payload: SizeLabel }
  | { type: 'SET_SIZE_M2'; payload: string }
  | { type: 'SET_FREQUENCY'; payload: FrequencyType }
  | { type: 'SET_WINDOWS'; payload: number }
  | { type: 'SET_OVEN'; payload: number }
  | { type: 'SET_IRONING'; payload: number }
  | { type: 'SET_PREFERRED_DATE'; payload: string }
  | { type: 'SET_CONTACT'; payload: Partial<Pick<FormData, 'name' | 'phone' | 'street' | 'houseNumber' | 'district'>> }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_SUBMITTING' }
  | { type: 'SET_SUBMIT_ERROR'; payload: string }
  | { type: 'SET_SUBMIT_SUCCESS' }
  | { type: 'RESET_FORM' };

export function formReducer(state: FormData, action: FormAction): FormData {
  switch (action.type) {
    case 'SET_PROPERTY_TYPE':
      return { ...state, propertyType: action.payload, currentStep: Math.max(state.currentStep, 1) };
    case 'SET_SIZE':
      return { ...state, size: action.payload, currentStep: Math.max(state.currentStep, 2) };
    case 'SET_SIZE_M2':
      return { ...state, sizeM2: action.payload };
    case 'SET_FREQUENCY':
      return { ...state, frequency: action.payload, currentStep: Math.max(state.currentStep, 3) };
    case 'SET_WINDOWS':
      return { ...state, windows: action.payload };
    case 'SET_OVEN':
      return { ...state, ovens: action.payload };
    case 'SET_IRONING':
      return { ...state, ironingHours: action.payload };
    case 'SET_PREFERRED_DATE':
      return { ...state, preferredDate: action.payload, currentStep: Math.max(state.currentStep, 5) };
    case 'SET_CONTACT':
      return { ...state, ...action.payload, currentStep: Math.max(state.currentStep, 6) };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'NEXT_STEP':
      return { ...state, currentStep: Math.min(state.currentStep + 1, 7) };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 0) };
    case 'SET_SUBMITTING':
      return { ...state, submitted: true, submitError: null };
    case 'SET_SUBMIT_ERROR':
      return { ...state, submitted: false, submitError: action.payload };
    case 'SET_SUBMIT_SUCCESS':
      return { ...state, submitted: false, submitSuccess: true, submitError: null };
    case 'RESET_FORM':
      return { ...INITIAL_FORM_DATA };
    default:
      return state;
  }
}

/** Step labels for progress indicator */
export const STEP_LABELS = [
  'Typ nemovitosti',
  'Velikost',
  'Četnost',
  'Přídavky',
  'Orientační cena',
  'Termín',
  'Kontakt',
  'Odeslání',
];

export const TOTAL_STEPS = 7; // 0-6 (hero is step 0, contact is step 6, success is after)