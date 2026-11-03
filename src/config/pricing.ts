/** Pricing configuration — editable, not hardcoded across components */

export type PropertyType = 'apartment' | 'house';
export type SizeLabel = '1+kk' | '2+kk' | '2+1' | '3+kk' | '3+1' | '4+' | 'unknown';
export type FrequencyType = 'oneoff' | 'recurring';

export interface SizeEstimate {
  label: SizeLabel;
  /** Hours for base cleaning. Null = not yet calibrated — show "Cena po upřesnění" */
  baseHours: number | null;
  /** Display name for UI */
  displayName: string;
}

export interface PricingConfig {
  /** One-off cleaning hourly rate (CZK) */
  oneoffHourlyRate: number;
  /** Recurring cleaning hourly rate (CZK) */
  recurringHourlyRate: number;
  /** Minimum billed base cleaning hours */
  minimumBaseHours: number;
  /** Window cleaning per wing (CZK) */
  windowPerWing: number;
  /** Oven interior cleaning per unit (CZK) */
  ovenPerUnit: number;
  /** Ironing per hour (CZK) */
  ironingPerHour: number;
  /** Size estimates map */
  sizeEstimates: Record<SizeLabel, SizeEstimate>;
}

export const PRICING_CONFIG: PricingConfig = {
  oneoffHourlyRate: 350,
  recurringHourlyRate: 320,
  minimumBaseHours: 3,
  windowPerWing: 150,
  ovenPerUnit: 300,
  ironingPerHour: 350,
  sizeEstimates: {
    '1+kk': { label: '1+kk', baseHours: null, displayName: '1+kk' },
    '2+kk': { label: '2+kk', baseHours: null, displayName: '2+kk' },
    '2+1': { label: '2+1', baseHours: 4, displayName: '2+1' },
    '3+kk': { label: '3+kk', baseHours: null, displayName: '3+kk' },
    '3+1': { label: '3+1', baseHours: null, displayName: '3+1' },
    '4+': { label: '4+', baseHours: null, displayName: '4+' },
    'unknown': { label: 'unknown', baseHours: null, displayName: 'Nevím' },
  },
};

/** Calculate base cleaning price */
export function calculateBasePrice(
  sizeLabel: SizeLabel,
  frequency: FrequencyType,
  config: PricingConfig = PRICING_CONFIG
): { price: number | null; hours: number | null; isEstimate: boolean } {
  const sizeEstimate = config.sizeEstimates[sizeLabel];
  const hourlyRate = frequency === 'oneoff'
    ? config.oneoffHourlyRate
    : config.recurringHourlyRate;

  if (!sizeEstimate.baseHours) {
    return { price: null, hours: null, isEstimate: false };
  }

  const hours = Math.max(sizeEstimate.baseHours, config.minimumBaseHours);
  const price = hours * hourlyRate;

  return { price, hours, isEstimate: true };
}

/** Calculate add-ons price */
export function calculateAddonsPrice(
  windows: number,
  ovens: number,
  ironingHours: number,
  config: PricingConfig = PRICING_CONFIG
): number {
  return (
    windows * config.windowPerWing +
    ovens * config.ovenPerUnit +
    ironingHours * config.ironingPerHour
  );
}

/** Calculate total estimate */
export function calculateTotalEstimate(
  sizeLabel: SizeLabel,
  frequency: FrequencyType,
  windows: number,
  ovens: number,
  ironingHours: number,
  config: PricingConfig = PRICING_CONFIG
): { total: number | null; basePrice: number | null; addonsPrice: number; baseHours: number | null; hasBaseEstimate: boolean } {
  const base = calculateBasePrice(sizeLabel, frequency, config);
  const addons = calculateAddonsPrice(windows, ovens, ironingHours, config);

  if (!base.price) {
    return {
      total: null,
      basePrice: null,
      addonsPrice: addons,
      baseHours: base.hours,
      hasBaseEstimate: false,
    };
  }

  return {
    total: base.price + addons,
    basePrice: base.price,
    addonsPrice: addons,
    baseHours: base.hours,
    hasBaseEstimate: true,
  };
}

/** Format price in CZK */
export function formatPrice(price: number | null): string {
  if (price === null) return 'Cena po upřesnění';
  return `${price.toLocaleString('cs-CZ')} Kč`;
}