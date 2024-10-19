import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: 'invalid', expected: null },
  { a: 'null', b: 2, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should perform calculations',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
