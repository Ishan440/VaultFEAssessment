import { useToast } from '@chakra-ui/react';

const useSubmit = (url: string) => {
    const toast = useToast();
  
    const submitForm = async (data: any) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          toast({ title: 'Form submitted successfully', status: 'success' });
          return true;
        } else {
          const errorData = await response.json();
          toast({ title: 'Submission failed', description: errorData.message, status: 'error' });
        }
      } catch (error) {
        console.error('Submission error:', error);
        toast({ title: 'Submission error', description: 'An error occurred while submitting the form.', status: 'error' });
      }
      return false;
    };
  
    return submitForm;
  };
  
  export default useSubmit;
  