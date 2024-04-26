import { Name } from '../../src/domain/name.js';

describe("객체 생성", () => {
  it.each([
    'a',
    'abcde',
  ])
  ("생성", (value) => {
    const name = new Name(value);
    expect(name.value).toEqual(value);
  });

  it.each([
    '',
    null,
    undefined
  ])
  ("'%s' 값으로 생성 불가", (value) => {
    expect(() => new Name(value)).toThrow('빈 값으로 생성할 수 없습니다.');
  });

  it("길이 초과 생성 불가", () => {
    expect(() => new Name("overlength")).toThrow('5자 이상의 이름을 생성할 수 없습니다.');
  });

});
