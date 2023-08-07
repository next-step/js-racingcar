import { MESSAGES } from '../src/constants/messages.js';
import { validateNames, validateRound } from '../src/domain/validator.js';

describe('Validate Test on readline', () => {
  it('should throw Error if name length greater than 5', () => {
    // given
    const input = 'abcdef, b, c';

    // then
    expect(() => validateNames(input)).toThrowError(MESSAGES.ERROR.MAX_NAME_LENGTH);
  });

  it('should return true if name length is valid', () => {
    // given
    const input = ['evan, poby, ryan', 'a, b, c'];

    // when
    const results = input.map((v) => validateNames(v));

    // then
    expect(results).toEqual([undefined, undefined]);
  });

  it('should throw Error if name length less than 1', () => {
    // given
    const input = ' ,b';

    // then
    expect(() => validateNames(input)).toThrowError(MESSAGES.ERROR.MIN_NAME_LENGTH);
  });

  it('should throw Error if round is not a number', () => {
    // given
    const input = 'a';

    // then
    expect(() => validateRound(input)).toThrowError(MESSAGES.ERROR.IS_NOT_NUMBER);
  });
  
  it('should throw Error if round is not a intefer', () => {
    // given
    const input = -1;

    // then
    expect(() => validateRound(input)).toThrowError(MESSAGES.ERROR.IS_NOT_INTEGER_NUMBER);
  });
});
