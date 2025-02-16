// hooks/useRestrictKeys.ts
import { useCallback } from 'react';

// Custom hook to restrict specific keys for input fields
export const useRestrictKeys = (restrictedKeys: string[]) => {
  return useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (restrictedKeys.includes(e.key)) {
      e.preventDefault(); // Prevent default behavior for restricted keys
    }
  }, [restrictedKeys]);
};
