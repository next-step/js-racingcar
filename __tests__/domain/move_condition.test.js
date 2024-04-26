import { isSatisfied } from '../../src/domain/move_condition.js';

describe('전진 조건', () => {
  it('4 이상일 때 전진 가능', () => {
    expect(isSatisfied(4)).toBeTruthy();
  });

  it('3 이하일 때 전진 불가', () => {
    expect(isSatisfied(3)).toBeFalsy();
  });
});
