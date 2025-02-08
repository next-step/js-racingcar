import Car from "../src/Car.js";

describe("자동차는 이름을 상태로 가진다", () => {
  beforeAll(() => {
    console.log("자동차 이름 테스트 시작");
  });
  it("이름은 숫자와 영문만 가능하다.", () => {
    // given
    const name = "hojeong12";
    const errorName = "-----!!";
    const location = {
      x: 0,
      y: 0,
      z: 0,
    };

    const expectedCarNameOne = "hojeong12";
    const expectedCarNameTwo = "생성할 수 없는 이름입니다.";

    // when
    const actualCarNameOne = new Car(name, location).getName();

    // then
    expect(expectedCarNameOne).toEqual(actualCarNameOne);
    expect(() => {
      // FIXME -> goTo When
      new Car(errorName, location).getName();
    }).toThrow(expectedCarNameTwo);
  });

  it("이름은 최소 1글자, 최대 9글자이어야 한다.", () => {
    // given
    const nameOne = "1";
    const nameTwo = "123456789";
    const nameThree = "123456789A";
    const location = {
      x: 0,
      y: 0,
      z: 0,
    };
    const expectedCarName = "생성할 수 없는 이름입니다.";
    const expectedCarOneLength = 1;
    const expectedCarTwoLength = 9;

    // when
    const carOne = new Car(nameOne, location);
    const carTwo = new Car(nameTwo, location);
    const actualCarOneLength = carOne.getName().length;
    const actualCarTwoLength = carTwo.getName().length;

    // then
    expect(expectedCarOneLength).toEqual(actualCarOneLength);
    expect(expectedCarTwoLength).toEqual(actualCarTwoLength);

    // 10글자일 때
    expect(() => {
      // FIXME -> goTo When
      new Car(nameThree, location).getName();
    }).toThrow(expectedCarName);
  });

  afterAll(() => {
    console.log("자동차 이름 테스트 끝");
  });
});
