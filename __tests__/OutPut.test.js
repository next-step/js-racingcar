import { CONSOLE_MESSAGES } from "../src/constants/messages";
import { Car } from "../src/domains/Car";
import { CarRace } from "../src/domains/CarRace";
import { output } from "../src/view/output";

describe("출력 테스트", () => {
  let logSpy;
  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
  });
  test("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", async () => {
    const car = new Car("a");

    car.move();
    output.carPosition(car);

    expect(logSpy).toHaveBeenCalledWith("a : -");
  });

  test("우승자가 여러 명인 경우 쉼표로 구분하여 출력한다.", () => {
    const carRace = new CarRace(["a", "b", "c"]);

    carRace.cars.map((car) => car.move());
    const winner = carRace.getWinner();
    output.winner(winner);

    expect(logSpy).toHaveBeenCalledWith(
      CONSOLE_MESSAGES.WINNER(["a", "b", "c"].join(", "))
    );
  });
});
