import Car from "../src/Models/Car";
import { createCars } from "../src/Models/Cars";
import { DuplicatedCarNameError } from "../src/Models/Cars/errors";
import MoveStrategies from "../test/MoveStrategies";

const { from, playOneRound, getRoundRecord } = createCars();
describe("from() 테스트", () => {
  describe("CarNames 유효성 검사", () => {
    describe("중복된 자동차 이름이 존재하면, 에러를 발생시킨다.", () => {
      it.each([
        { carNames: ["erica", "erica", " "] },
        { carNames: ["gong0", "gong0", "Gong"] },
        { carNames: ["1031", "1031"] },
        { carNames: ["*****", "*****", "**!**", "***!*", "*****"] },
        { carNames: ["*e*1C", "*e*1C"] },
        { carNames: [" ", " "] },
        { carNames: ["", ""] },
      ])("$carNames", ({ carNames }) => {
        expect(() => from(carNames)).toThrow(DuplicatedCarNameError);
      });
    });

    describe("유효하면, 에러를 발생시키지 않는다.", () => {
      it.each([
        { carNames: ["erica", "Erica"] },
        { carNames: ["gong0", "Gong0", "1031", "1031!", "*****"] },
        { carNames: ["*e*1C", "*e*1c", "ERICA", "Pan", "theon"] },
        { carNames: ["!****", "*!***", "**!**", "***!*", "****!"] },
      ])("$carNames", ({ carNames }) => {
        expect(() => from(carNames)).not.toThrow();
      });
    });

    describe("중복이 없으면, Car 배열을 생성한다.", () => {
      it.each([
        { carNames: ["erica", "Erica"] },
        { carNames: ["gong0", "Gong0", "1031", "1031!", "*****"] },
        { carNames: ["*e*1C", "*e*1c", "ERICA", "Pan", "theon"] },
        { carNames: ["!****", "*!***", "**!**", "***!*", "****!"] },
      ])("$carNames", ({ carNames }) => {
        const cars = from(carNames);

        cars.forEach((car, idx) => {
          expect(car).toBeInstanceOf(Car);
          const { name, position } = car.getRecord();
          expect(name).toBe(carNames[idx]);
          expect(position).toBe(0);
        });

        expect(cars).toHaveLength(carNames.length);
      });
    });
  });
});

describe("playOneRound() 테스트", () => {
  const cars = from(["erica", "Erica", "theon", "yang", "ryang"]);
  playOneRound(cars, new MoveStrategies("12345"));

  it("Cars 배열 내 모든 자동차들이 올바르게 이동한다.", () => {
    expect(cars.map((car) => car.getRecord().position)).toEqual([
      0, 0, 0, 1, 1,
    ]);
  });
});

describe("getRoundRecord() 테스트", () => {
  describe("Cars 내 모든 Car 정보를 반환한다.", () => {
    it.each([
      { carNames: ["erica", "Erica"] },
      { carNames: ["gong0", "Gong0", "1031", "1031!", "*****"] },
      { carNames: ["*e*1C", "*e*1c", "ERICA", "Pan", "theon"] },
    ])("$carNames", ({ carNames }) => {
      const cars = from(carNames);
      const roundRecord = getRoundRecord(cars);

      roundRecord.forEach((record, idx) => {
        expect(record.name).toBe(carNames[idx]);
        expect(record.position).toBe(0);
      });
    });
  });
});
