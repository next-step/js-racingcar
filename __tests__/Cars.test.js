import Car from "../src/Models/Car";
import { Cars } from "../src/Models/Cars";
import { MoveStrategies } from "../src/Models/MoveStrategy";

describe("Cars 클래스 테스트", () => {
  const CARS_ERROR_MESSAGE = Cars.ERROR_MESSAGE;

  describe("CarNames 유효성 검사", () => {
    it.each([
      { carNames: ["erica", "erica", " "] },
      { carNames: ["gong0", "gong0", "Gong"] },
      { carNames: ["1031", "1031"] },
      { carNames: ["*****", "*****", "**!**", "***!*", "*****"] },
      { carNames: ["*e*1C", "*e*1C"] },
      { carNames: [" ", " "] },
      { carNames: ["", ""] },
    ])("중복된 Car 이름이 존재하면 에러를 발생시킵니다.", ({ carNames }) => {
      expect(() => Cars.from(carNames)).toThrow(
        CARS_ERROR_MESSAGE.DUPLICATE_CAR_NAME
      );
    });

    it.each([
      { carNames: ["erica", "Erica"] },
      { carNames: ["gong0", "Gong0", "1031", "1031!", "*****"] },
      { carNames: ["*e*1C", "*e*1c", "ERICA", "Pan", "theon"] },
      { carNames: ["!****", "*!***", "**!**", "***!*", "****!"] },
    ])("중복된 Car 이름이 없으면 Car 배열을 생성합니다.", ({ carNames }) => {
      expect(() => Cars.from(carNames)).not.toThrow();
      const cars = Cars.from(carNames);
      const expectedCars = carNames.map((carName) => ({
        name: carName,
        position: 0,
      }));
      expect(cars.map((car) => car.getRecord())).toEqual(expectedCars);
      expect(cars).toHaveLength(carNames.length);
    });

    it.each([
      { carNames: ["erica", "Erica"] },
      { carNames: ["gong0", "Gong0", "1031", "1031!", "*****"] },
      { carNames: ["*e*1C", "*e*1c", "ERICA", "Pan", "theon"] },
    ])("유효한 CarNames 배열로, Car 배열을 생성합니다.", ({ carNames }) => {
      const cars = Cars.from(carNames);
      expect(cars).toHaveLength(carNames.length);
      cars.forEach((car) => {
        expect(car.getRecord()).toEqual({ name: car.name, position: 0 });
      });
    });
  });

  describe("한 라운드가 진행되면, Cars 배열의 모든 Car들이 이동 여부를 결정합니다.", () => {
    const cars = Cars.from(["erica", "Erica", "theon", "yang", "ryang"]);
    const spyTryMove = jest.spyOn(Car.prototype, "tryMove");
    Cars.playOneRound(cars, new MoveStrategies("12345"));

    it("Cars 배열의 모든 Car들이 tryMove 함수를 호출합니다.", () => {
      expect(spyTryMove).toHaveBeenCalledTimes(cars.length);
    });

    it("Cars 배열 내 모든 자동차들이 올바르게 이동합니다.", () => {
      const expectedPosition = [0, 0, 0, 1, 1];
      expect(cars.map((car) => car.position)).toEqual(expectedPosition);
    });
  });

  it.each([
    { carNames: ["erica", "Erica"] },
    { carNames: ["gong0", "Gong0", "1031", "1031!", "*****"] },
    { carNames: ["*e*1C", "*e*1c", "ERICA", "Pan", "theon"] },
  ])("자동차 배열에 속한 모든 자동차의 정보를 반환합니다.", ({ carNames }) => {
    const cars = Cars.from(carNames);
    const roundRecord = Cars.getRoundRecord(cars);
    const expectedRecord = carNames.map((carName) => ({
      name: carName,
      position: 0,
    }));
    expect(roundRecord).toEqual(expectedRecord);
    expect(roundRecord).toHaveLength(carNames.length);
  });
});
