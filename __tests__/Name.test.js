import Name from '../src/domain/Name';

describe('이름 기능 테스트', () => {
  it('이름을 설정할 수 있다.', () => {
    // given
    const name = new Name('pucci');

    // when
    const pucciName = name.getName();

    // then
    expect(pucciName).toBe('pucci');
  });
  it('이름 n자 이하로 길이를 제한할 수 있다. (default: 5)', () => {
    // given
    const name1 = new Name('pucci');
    const name2 = new Name('hyunseo', 7);

    // when
    const pucciName = name1.getName();
    const hyunseoName = name2.getName();

    // then
    expect(pucciName.length).toBe(5);
    expect(() => new Name('hyunseo', 3)).toThrow();
    expect(hyunseoName.length).toBe(7);
  });
});
