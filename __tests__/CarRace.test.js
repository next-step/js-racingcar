import CarRace from "../src/domain/CarRace";

describe("자동차 경주 기능 테스트", () => {
  test("자동차 경주는 5회로 고정된다", () => {
    // given
    const carRace = new CarRace();

    // when
    carRace.race();
    const remainingRaceCount = carRace.remainingRaceCount;

    // then
    expect(remainingRaceCount).toBe(4);
  });
});
