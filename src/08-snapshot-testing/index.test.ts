import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([0])).toStrictEqual({
      next: {
        next: null,
        value: null,
      },
      value: 0,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([0]);
    expect(linkedList).toMatchSnapshot();
  });
});
