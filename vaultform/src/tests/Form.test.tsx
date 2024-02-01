import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Form } from '../components/Form';

describe('Form', () => {
  beforeEach(() => {
    render(<Form />);
  });

  const testInputField = async (
    fieldLabel: string,
    validInput: string,
    invalidMessage: string
  ) => {
    await act(async () => {
      const input = screen.getByLabelText(fieldLabel) as HTMLInputElement;
      userEvent.type(input, validInput);
      fireEvent.blur(input);
    });

    await waitFor(() => {
      expect(screen.queryByText(invalidMessage)).not.toBeInTheDocument();
    });
  };

  test('validates first name input correctly', async () => {
    await testInputField('First Name', 'Harry', 'First Name is required');
  });

  test('validates last name input correctly', async () => {
    await testInputField('Last Name', 'Potter', 'Last Name is required');
  });

  test('validates phone number format correctly', async () => {
    await testInputField('Phone Number', '+12345678901', 'Invalid Canadian phone number. Format: +1XXXXXXXXXX');
  });

  test('validates corporation number correctly', async () => {
    await testInputField('Corporation Number', '123456789', 'Corporation number must be 9 characters');
  });
});
