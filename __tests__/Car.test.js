import Car from "../src/Models/Car.js";

describe("Car는 이름의 유효성을 확인하고, 유효할 경우만 Car 객체를 생성한다.", () => {
  const CAR_ERROR_MESSAGE = Car.ERROR_MESSAGE;

  it("Car 이름이 빈 값이면 에러를 발생시킨다.", () => {
    expect(() => Car.of("")).toThrow(CAR_ERROR_MESSAGE.EMPTY_NAME);
  });

  it.each(["erica0", "ericaGong", "*****!", "951031"])(
    "Car 이름이 5자 초과라면 에러를 발생시킨다.",
    (carName) => {
      expect(() => Car.of(carName)).toThrow(CAR_ERROR_MESSAGE.LONG_NAME);
    }
  );

  it("5자 이하의 유효한 Car 이름이라면, 오류를 발생시키지 않는다.", () => {
    expect(() => Car.of("erica")).not.toThrow();
  });

  it.each([{ position: 0 }, { position: 1 }])(
    "유효한 Car 이름과 위치가 주어지면, 이름과 위치를 상태로 갖는 Car 객체를 생성한다.",
    ({ position }) => {
      const car = Car.of("erica", position);

      expect(car.name).toBe("erica");
      expect(car.position).toBe(position);
    }
  );
});

describe(`Car가 전진하면, 현재 위치가 1만큼 증가한다.`, () => {
  it.each([{ position: 0 }, { position: 1 }])(
    "Car가 전진하면 현재 위치가 1만큼 증가한다.",
    ({ position }) => {
      const car = Car.of("erica", position);
      const currentPosition = car.position;

      car.move();
      expect(car.position).toBe(currentPosition + 1);
    }
  );
});
//   const CAR_MOVE_CRITERIA = 4;
//   let testCases = [];

//   for (let i = 0; i < 9; i++) {
//     testCases.push({
//       input: i,
//       isMovable: i >= CAR_MOVE_CRITERIA,
//     });
//   }
//   const movableTestCases = testCases.filter(({ isMovable }) => isMovable);
//   const immovableTestCases = testCases.filter(({ isMovable }) => !isMovable);
//   it.each(immovableTestCases)(
//     `자동차는 전진 조건에 부합하지 않으면 현재 위치를 유지한다. (input = $input)`,
//     ({ input }) => {
//       const car = Car.of("erica");
//       car.tryMoveWith(input);
//       expect(car.position).toBe(0);
//     }
//   );
//   it.each(movableTestCases)(
//     `자동차는 전진 조건에 부합하면, 전진한다. (input = $input)`,
//     ({ input }) => {
//       const car = Car.of("erica", 0);
//       car.tryMoveWith(input);
//       expect(car.position).toBe(1);
//     }
//   );
// });

describe("Car는 이름과 현재 위치 정보를 반환한다.", () => {
  const car = Car.of("erica", 0);

  it("Car 객체는 이름을 반환한다.", () => {
    expect(car.name).toBe("erica");
  });

  it("Car 객체는 현재 위치를 반환한다.", () => {
    expect(car.position).toBe(0);
  });

  it("Car 객체는 이름과 현재 이름을 객체 형태로 반환한다.", () => {
    expect(car.getRecord()).toBeInstanceOf(Object);
    expect(car.getRecord()).toHaveProperty("name");
    expect(car.getRecord()).toHaveProperty("position");
  });
});

// describe(`[feature2] 자동차는 랜덤 숫자가 4 이상이면 전진하고, 아니면 현재 위치를 유지한다.`, () => {
