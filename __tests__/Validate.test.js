import { ATTEMPT_MAX_NUMBER, ROUND_MAX_NUMBER } from '../src/constants/settings.js';
import { MESSAGES } from '../src/constants/messages.js';
import { IsMaxAttempt, validateNames, validateRound } from '../src/domain/validator.js';

describe('Validate Test on readline', () => {
  it('should throw Error if name length greater than 5', () => {
    // given
    const INPUT = 'abcdef, b, c';

    // then
    expect(() => validateNames(INPUT)).toThrowError(MESSAGES.ERROR.MAX_NAME_LENGTH);
  });

  it('should return true if name length is valid', () => {
    // given
    const INPUT = ['evan, poby, ryan', 'a, b, c'];

    // when
    const results = INPUT.map((v) => validateNames(v));

    // then
    expect(results).toEqual([undefined, undefined]);
  });

  it('should throw Error if name length less than 1', () => {
    // given
    const INPUT = ' ,b';

    // then
    expect(() => validateNames(INPUT)).toThrowError(MESSAGES.ERROR.MIN_NAME_LENGTH);
  });

  it('should throw Error if round is not a number', () => {
    // given
    const INPUT = 'a';

    // then
    expect(() => validateRound(INPUT)).toThrowError(MESSAGES.ERROR.IS_NOT_NUMBER);
  });

  it('should throw Error if round is not a integer', () => {
    // given
    const INPUT = -1;

    // then
    expect(() => validateRound(INPUT)).toThrowError(MESSAGES.ERROR.IS_NOT_INTEGER_NUMBER);
  });

  it(`should throw Error if round is greater than MAX(${ROUND_MAX_NUMBER})`, () => {
    // given
    const INPUT = ROUND_MAX_NUMBER + 1;

    // then
    expect(() => validateRound(INPUT)).toThrowError(MESSAGES.ERROR.IS_ROUND_MAX_NUMBER);
  });

  it(`should throw Error if player re-try more than MAX(${ATTEMPT_MAX_NUMBER})`, () => {
    // given
    const ATTEMPT = ATTEMPT_MAX_NUMBER + 1;

    // then
    expect(IsMaxAttempt(ATTEMPT)).toBe(true);
  });
});
