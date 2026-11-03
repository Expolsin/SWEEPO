/** Custom hook for form persistence using sessionStorage */

import { useState, useCallback } from 'react';
import type { FormData } from '../types/form';

const STORAGE_KEY = 'stana-form-data';

export function useFormPersistence(initialData: FormData): [FormData, React.Dispatch<React.SetStateAction<FormData>>] {
  const [data, setData] = useState<FormData>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Only restore if it looks like valid form data
        if (parsed && typeof parsed.currentStep === 'number') {
          return { ...initialData, ...parsed };
        }
      }
    } catch {
      // Ignore parse errors
    }
    return initialData;
  });

  const updateData = useCallback((newData: React.SetStateAction<FormData>) => {
    setData((prev) => {
      const nextData = typeof newData === 'function' ? newData(prev) : newData;
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
      } catch {
        // Ignore storage errors (private mode, quota, etc.)
      }
      return nextData;
    });
  }, []);

  return [data, updateData];
}

export function clearFormPersistence(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}