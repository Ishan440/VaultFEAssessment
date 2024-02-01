import { useState, useEffect } from 'react';

interface ValidationResponse {
  isValid: boolean;
  message?: string;
}

const useCorporationNumberValidation = (corporationNumber: string): ValidationResponse => {
  const [result, setResult] = useState<ValidationResponse>({ isValid: true });

  useEffect(() => {
    const validateCorporationNumber = async () => {
      if (corporationNumber.length === 9) {
        try {
          const response = await fetch(`https://vault-test-task-api.onrender.com/corporation-number/${corporationNumber}`);
          const data = await response.json();
          if (data.valid) {
            setResult({ isValid: true });
          } else {
            setResult({ isValid: false, message: data.message || 'Invalid corporation number' });
          }
        } catch (error) {
          console.error("Error validating corporation number:", error);
          setResult({ isValid: false, message: 'Error validating corporation number' });
        }
      } else {
        setResult({ isValid: false, message: 'Corporation number must be 9 characters' });
      }
    };

    validateCorporationNumber();
  }, [corporationNumber]);

  return result;
};

export default useCorporationNumberValidation;
