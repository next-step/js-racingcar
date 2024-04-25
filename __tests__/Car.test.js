import Name from '../src/domain/Name';

describe('이름 기능 테스트', () => {
  it('이름을 설정할 수 있다.', () => {
    const name = new Name('pucci');
    expect(name.getName()).toBe('pucci');
  });
});
