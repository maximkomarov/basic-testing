import {
  throwError,
  throwCustomError,
  resolveValue,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = await resolveValue('value');
    expect(value).toBe('value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', async () => {
    try {
      await throwError('provided message');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('provided message');
      }
    }
  });

  test('should throw error with default message if message is not provided', async () => {
    try {
      await throwError();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Oops!');
      }
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    return expect(() => {
      throwCustomError();
    }).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
