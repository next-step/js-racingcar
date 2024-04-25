import Car from "../src/domain/Car";
import { joinNamesByComma, splitNamesByComma } from "../src/utils/IO";

describe("입출력 테스트", () => {
  test("자동차의 이름은 쉼표(,)를 기준으로 구분", () => {
    // given
    const CAR_NAMES = "pobi,crong,honux";

    // when
    const splittedNames = splitNamesByComma(CAR_NAMES);

    // then
    expect(splittedNames).toEqual(["pobi", "crong", "honux"]);
  });

  test("우승자가 여러 명일 겨우 쉼표(,)를 이용하여 구분", () => {
    // given
    const RACE_WINNERS = ["pobi", "crong", "honux"];

    // when
    const joinedNames = joinNamesByComma(RACE_WINNERS);

    // then
    expect(joinedNames).toBe("pobi, crong, honux");
  });

  test("자동차의 현재 위치를 '-' 으로 표현", () => {
    // given
    const car = new Car("ganbu");
    car.move();

    // when
    const carPositionToString = car.positionToString();

    // then
    expect(carPositionToString).toBe("-");
  });
});
