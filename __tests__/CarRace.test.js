import { CarRace } from "../src/domains/CarRace";

describe("자동차 경주 테스트", () => {
  test("우승자는 한 명 이상일 수 있다.", () => {
    const carRace = new CarRace(["a", "b", "c"]);

    carRace.cars.map((car) => car.move());
    const winner = carRace.getWinner();

    expect(winner.length).toEqual(3);
  });
});
