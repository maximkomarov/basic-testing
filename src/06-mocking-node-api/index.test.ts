import path from 'path';
import fs from 'fs';
import fsProm from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(5);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

jest.mock('path', () => {
  const originalModule = jest.requireActual('path');
  return {
    ...originalModule,
    join: jest.fn(),
  };
});

jest.mock('fs', () => {
  const actualFs = jest.requireActual('fs');
  return {
    ...actualFs,
    existsSync: jest.fn(),
  };
});

jest.mock('fs/promises', () => {
  const actualFsProm = jest.requireActual('fs/promises');
  return {
    ...actualFsProm,
    readFile: jest.fn(),
  };
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'pathToFile';
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    expect(await readFileAsynchronously('non-existing-file.txt')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fsProm.readFile as jest.Mock).mockReturnValue('file.txt');
    expect(await readFileAsynchronously('non-existing-file.txt')).toBe(
      'file.txt',
    );
  });
});
