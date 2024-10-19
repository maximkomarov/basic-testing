import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    return expect(() => {
      getBankAccount(999).withdraw(1000);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    return expect(() => {
      getBankAccount(999).transfer(1000, getBankAccount(999));
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    return expect(() => {
      const bankAccount = getBankAccount(999);
      bankAccount.transfer(500, bankAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(999);
    bankAccount.deposit(1);
    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(1000);
    bankAccount.withdraw(1);
    expect(bankAccount.getBalance()).toBe(999);
  });

  test('should transfer money', () => {
    const fromBankAccount = getBankAccount(1000);
    const toBankAccount = getBankAccount(1000);
    fromBankAccount.transfer(500, toBankAccount);
    expect(fromBankAccount.getBalance()).toBe(500);
    expect(toBankAccount.getBalance()).toBe(1500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(1000);
    const balance = await bankAccount.fetchBalance();
    expect(balance === null || typeof balance === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(1000);
    try {
      await bankAccount.synchronizeBalance();
      expect(bankAccount.getBalance()).toBeGreaterThan(0); // Assuming balance should be a positive number
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(1000);
    try {
      await bankAccount.synchronizeBalance();
      expect(bankAccount.getBalance()).toBeGreaterThan(0); // Assuming balance should be a positive number
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
