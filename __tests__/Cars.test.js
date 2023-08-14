import Car from "../src/Models/Car";
import { Cars } from "../src/Models/Cars";
import { FixedStrategy, MoveStrategies } from "../src/Models/MoveStrategy";

describe("CarNames의 유효성을 확인하고, 유효할 경우만 Car 배열을 생성한다.", () => {
  // CHECK 테스트 코드를 위해 public으로 빼는게 맞는지?
  const CARS_ERROR_MESSAGE = Cars.ERROR_MESSAGE;

  it.each([
    { carNames: ["erica", "erica", " "] },
    { carNames: ["gong0", "gong0", "Gong"] },
    { carNames: ["1031", "1031"] },
    { carNames: ["*****", "*****", "**!**", "***!*", "*****"] },
    { carNames: ["*e*1C", "*e*1C"] },
    { carNames: [" ", " "] },
    { carNames: ["", ""] },
  ])(
    "CarNames에 중복된 Car 이름이 존재하면, 에러를 발생시킨다.",
    ({ carNames }) => {
      expect(() => Cars.from(carNames)).toThrow(
        CARS_ERROR_MESSAGE.DUPLICATED_NAME
      );
    }
  );

  it.each([
    { carNames: ["erica", "Erica"] },
    { carNames: ["gong0", "Gong0", "1031", "1031!", "*****"] },
    { carNames: ["*e*1C", "*e*1c", "ERICA", "Pan", "theon"] },
    { carNames: ["!****", "*!***", "**!**", "***!*", "****!"] },
  ])(
    "CarNames에 중복된 Car 이름이 존재하지 않으면, Car 배열을 생성한다.",
    ({ carNames }) => {
      expect(() => Cars.from(carNames)).not.toThrow();
      const cars = Cars.from(carNames);
      const expectedCars = carNames.map((carName) => ({
        name: carName,
        position: 0,
      }));
      expect(cars.map((car) => car.getRecord())).toEqual(expectedCars);
      expect(cars).toHaveLength(carNames.length);
    }
  );

  it.each([
    { carNames: ["erica", "Erica"] },
    { carNames: ["gong0", "Gong0", "1031", "1031!", "*****"] },
    { carNames: ["*e*1C", "*e*1c", "ERICA", "Pan", "theon"] },
  ])("유효한 CarNames 배열로, Car 배열을 생성한다.", ({ carNames }) => {
    const cars = Cars.from(carNames);

    expect(cars).toHaveLength(carNames.length);
    cars.forEach((car) => {
      expect(car.getRecord()).toEqual({ name: car.name, position: 0 });
    });
  });
});

describe("한 라운드가 진행되면, Cars 배열의 모든 Car들이 이동 여부를 결정한다.", () => {
  const cars = Cars.from(["erica", "Erica", "theon", "yang", "ryang"]);
  const spyTryMove = jest.spyOn(Car.prototype, "tryMove");
  Cars.playOneRound(cars, new MoveStrategies("12345"));

  it("Cars 배열의 모든 Car들이 tryMove 함수를 한 번 씩 호출한다.", () => {
    expect(spyTryMove).toHaveBeenCalledTimes(cars.length);
  });

  it("Cars 배열 내 모든 자동차들이 올바르게 이동한다.", () => {
    const expectedPosition = [0, 0, 0, 1, 1];
    expect(cars.map((car) => car.position)).toEqual(expectedPosition);
  });
});

it.each([
  { carNames: ["erica", "Erica"] },
  { carNames: ["gong0", "Gong0", "1031", "1031!", "*****"] },
  { carNames: ["*e*1C", "*e*1c", "ERICA", "Pan", "theon"] },
])("자동차 배열에 속한 모든 자동차의 정보를 반환한다.", ({ carNames }) => {
  const cars = Cars.from(carNames);
  const roundRecord = Cars.getRoundRecord(cars);
  const expectedRecord = carNames.map((carName) => ({
    name: carName,
    position: 0,
  }));
  expect(roundRecord).toEqual(expectedRecord);
  expect(roundRecord).toHaveLength(carNames.length);
});
