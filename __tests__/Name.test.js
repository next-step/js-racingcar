import Name from '../src/domain/Name';

describe('이름 기능 테스트', () => {
  it('이름을 설정할 수 있다.', () => {
    // given
    const pucci = new Name('pucci');

    // when
    const pucciName = pucci.name;

    // then
    expect(pucciName).toBe('pucci');
  });
  it('이름 n자 이하로 길이를 제한할 수 있다. (default: 5)', () => {
    // given
    const name1 = new Name('pucci');
    const name2 = new Name('hyunseo', { maxLen: 7 });
    // when
    const pucciName = name1.name;
    const hyunseoName = name2.name;

    // then
    expect(pucciName.length).toBe(5);
    expect(() => new Name('hyunseo', { maxLen: 3 })).toThrow();
    expect(hyunseoName.length).toBe(7);
  });
  it('이름은 n자 이상으로 길이를 제한할 수 있다. (default: 2)', () => {
    expect(() => new Name('a')).toThrow();
    expect(() => new Name('abcd', { minLen: 5 })).toThrow();
  });
  it('이름은 공백일 수 없습니다.', () => {
    expect(() => new Name('')).toThrow();
  });
  it('이름의 타입은 string 이어야 합니다.', () => {
    expect(() => new Name(1)).toThrow();
    expect(() => new Name(null)).toThrow();
    expect(() => new Name(null)).toThrow();
  });
  it('이름에는 숫자, 특수문자, 공백이 포함될 수 없습니다.', () => {
    expect(() => new Name('012')).toThrow();
    expect(() => new Name('ford01')).toThrow();
    expect(() => new Name(',#&')).toThrow();
    expect(() => new Name('fo rd')).toThrow();
  });
});
