import Name from '../src/domain/Name';

describe('이름 기능 테스트', () => {
  it('이름을 설정할 수 있다.', () => {
    const name = new Name('pucci');
    expect(name.getName()).toBe('pucci');
  });
  it('이름 n자 이하로 길이를 제한할 수 있다. (default: 5)', () => {
    const name1 = new Name('pucci');
    const name2 = new Name('hyunseo', 7);

    expect(name1.getName().length).toBe(5);
    expect(() => new Name('hyunseo', 3)).toThrow();
    expect(name2.getName().length).toBe(7);
  });
});
