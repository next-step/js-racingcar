import { Cars } from "../src/Models/Cars";

describe("CarNames의 유효성을 확인하고, 유효할 경우만 Car 배열을 생성한다.", () => {
  const CARS_ERROR_MESSAGE = Cars.ERROR_MESSAGE;

  it.each([
    { carNames: ["erica", "erica"] },
    { carNames: ["gong0", "gong0"] },
    { carNames: ["1031", "1031"] },
    { carNames: ["*****", "*****"] },
    { carNames: ["*e*1C", "*e*1C"] },
    { carNames: [" ", " "] },
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
  ])(
    "CarNames에 중복된 Car 이름이 존재하지 않으면, Car 배열을 생성한다.",
    ({ carNames }) => {
      expect(() => Cars.from(carNames)).not.toThrow();
      expect(Cars.from(carNames)).toHaveLength(carNames.length);
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

// TODO playOneRound 테스트 함수 작성
describe("playOneRound 테스트 함수 작성", () => {});

it.each([
  { carNames: ["erica", "Erica"] },
  { carNames: ["gong0", "Gong0", "1031", "1031!", "*****"] },
  { carNames: ["*e*1C", "*e*1c", "ERICA", "Pan", "theon"] },
])("자동차 배열에 속한 모든 자동차의 정보를 반환한다.", ({ carNames }) => {
  const cars = Cars.from(carNames);
  const roundRecord = Cars.getRoundRecord(cars);

  expect(roundRecord).toHaveLength(carNames.length);
  expect(roundRecord).toEqual(
    carNames.map((carName) => ({ name: carName, position: 0 }))
  );
});
