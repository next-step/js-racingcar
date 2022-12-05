import { deepDiffMapper } from './index.js';

describe('유틸 함수를 테스트한다', () => {
  describe('depth가 없는 객체의 경우 값들을 비교한다.', () => {
    const currentObject = {
      a: 1,
      b: 2,
      c: 3,
    };
    it('값이 같은 경우 false반환', () => {
      const nextObject = {
        a: 1,
        b: 2,
        c: 3,
      };
      expect(deepDiffMapper().check(currentObject, nextObject).isDiff).toBe(
        false
      );
    });

    it('값이 다른 경우 true반환', () => {
      const nextObject = {
        a: 1,
        b: 2,
        c: 4,
      };
      expect(deepDiffMapper().check(currentObject, nextObject).isDiff).toBe(
        true
      );
    });
  });

  describe('객체의 depth가 있는경우에도 다름이 판별되어야 한다.', () => {
    const currentObject = {
      a: {
        d: {
          e: 3,
          f: true,
        },
      },
      b: 2,
      c: 3,
    };
    it('값이 같은 경우 false반환', () => {
      const nextObject = {
        a: {
          d: {
            e: 3,
            f: true,
          },
        },
        b: 2,
        c: 3,
      };

      expect(deepDiffMapper().check(currentObject, nextObject).isDiff).toBe(
        false
      );
    });

    it('값이 다른 경우 true반환', () => {
      const nextObject = {
        a: {
          d: {
            e: 4,
            f: false,
          },
        },
        b: 2,
        c: 3,
      };

      expect(deepDiffMapper().check(currentObject, nextObject).isDiff).toBe(
        true
      );
    });
  });

  describe('배열이 포함되어있어도 다름을 판별해야 한다.', () => {
    const currentObject = {
      a: 'i am unchanged',
      b: 'i am deleted',
      e: {
        a: 1,
        b: false,
        c: null,
      },
      f: [
        1,
        {
          a: 'same',
          b: [
            {
              a: 'same',
            },
            {
              d: 'willChange',
            },
          ],
        },
      ],
    };
    it('값이 같은 경우 false반환', () => {
      const nextObject = {
        a: 'i am unchanged',
        b: 'i am deleted',
        e: {
          a: 1,
          b: false,
          c: null,
        },
        f: [
          1,
          {
            a: 'same',
            b: [
              {
                a: 'same',
              },
              {
                d: 'willChange',
              },
            ],
          },
        ],
      };

      expect(deepDiffMapper().check(currentObject, nextObject).isDiff).toBe(
        false
      );
    });

    it('값이 다른 경우 true 반환', () => {
      const nextObject = {
        a: 'i am unchanged',
        b: 'i am deleted',
        e: {
          a: 1,
          b: false,
          c: null,
        },
        f: [
          1,
          {
            a: 'same',
            b: [
              {
                a: 'same',
              },
              {
                d: 'change',
              },
            ],
          },
        ],
      };

      expect(deepDiffMapper().check(currentObject, nextObject).isDiff).toBe(
        true
      );
    });
  });

  describe('Date가 포함되어 있어도 다름을 판별해야한다.', () => {
    const currentObject = {
      a: 'i am unchanged',
      b: 'i am deleted',
      e: {
        a: 1,
        b: false,
        c: null,
      },
      f: new Date('2017.11.25'),
    };
    it('값이 같은 경우 false반환', () => {
      const nextObject = {
        a: 'i am unchanged',
        b: 'i am deleted',
        e: {
          a: 1,
          b: false,
          c: null,
        },
        f: new Date('2017.11.25'),
      };

      expect(deepDiffMapper().check(currentObject, nextObject).isDiff).toBe(
        false
      );
    });

    it('값이 다른 경우 true 반환', () => {
      const nextObject = {
        a: 'i am unchanged',
        b: 'i am deleted',
        e: {
          a: 1,
          b: false,
          c: null,
        },
        g: new Date('2017.11.26'),
      };

      expect(deepDiffMapper().check(currentObject, nextObject).isDiff).toBe(
        true
      );
    });
  });
});
