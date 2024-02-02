import { render, act, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from '../components/Form';

jest.mock('@chakra-ui/react', () => {
  const actualChakra = jest.requireActual('@chakra-ui/react');
  return {
    ...actualChakra,
    useToast: jest.fn(() => jest.fn().mockImplementation(({ title, description, status }) => {
      console.log(`Toast called with title: ${title}, status: ${status}, description: ${description}`);
    })),
  };
});

beforeAll(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    }) as Promise<Response>
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Form Component Tests', () => {
  beforeEach(async () => {
    await waitFor(() => render(<Form />));
  });

  test('validates first name input correctly', async () => {
    const input = screen.getByLabelText(/first name/i);
    await userEvent.type(input, 'Harry');
    fireEvent.blur(input);
    await waitFor(() => expect(screen.queryByText(/First Name is required/)).not.toBeInTheDocument());
  });

  test('validates last name input correctly', async () => {
    const input = screen.getByLabelText(/last name/i);
    await userEvent.type(input, 'Potter');
    fireEvent.blur(input);
    await waitFor(() => expect(screen.queryByText(/Last Name is required/)).not.toBeInTheDocument());
  });

  test('validates phone number format correctly', async () => {
    const input = screen.getByLabelText(/phone number/i);
    await userEvent.type(input, '+12345678901');
    fireEvent.blur(input);
    await waitFor(() => expect(screen.queryByText(/Invalid phone number. Format: \+1XXXXXXXXXX/)).not.toBeInTheDocument());
  });

  test('validates corporation number correctly and simulates successful validation', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ valid: true }),
    });
    const input = screen.getByLabelText(/corporation number/i);
    await userEvent.type(input, '123456789');
    fireEvent.blur(input);
    await waitFor(() => expect(screen.queryByText(/Invalid corporation number/)).not.toBeInTheDocument());
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('123456789'));
  });
  test('submits form correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });
    await userEvent.type(screen.getByLabelText(/first name/i), 'Harry');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Potter');
    await userEvent.type(screen.getByLabelText(/phone number/i), '+11234567890');
    await userEvent.type(screen.getByLabelText(/corporation number/i), '123456789');
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
