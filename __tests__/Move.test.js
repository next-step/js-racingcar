describe('이동 기능 테스트', () => {
  it('전진할 수 있다.', () => {
    // given
    const movement = new Move();

    // when
    const forward = movement.forward().getPosition();

    // then
    expect(forward).toBe(1);
  });
});
