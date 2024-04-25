import Move from '../src/domain/Move';

describe('이동 기능 테스트', () => {
  it('전진할 수 있다.', () => {
    // given
    const movement = new Move();

    // when
    const forward = movement.forward().getPosition();

    // then
    expect(forward).toBe(1);
  });
  it('후진할 수 있다.', () => {
    // given
    const movement = new Move();

    // when
    const backward = movement.backward().getPosition();

    // then
    expect(backward).toBe(-1);
  });
  it('정지할 수 있다.', () => {
    // given
    const movement = new Move();

    // when
    const stop = movement.stop().getPosition();

    // then
    expect(stop).toBe(0);
  });
});
