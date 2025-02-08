import {Car} from "../../src/domain/Car.js";
import {Race} from "../../src/domain/Race.js";

describe("레이스는", () => {
    let race;
    let cars;
    let alwaysMoveAcceleration;

    beforeEach(() => {
        alwaysMoveAcceleration = {
            canAccelerate: () => true
        };

        cars = [
            new Car("포르쉐", alwaysMoveAcceleration),
            new Car("벤츠", alwaysMoveAcceleration),
            new Car("BMW", alwaysMoveAcceleration),
        ];
        race = new Race(cars);
    });

    describe("=== 레이스 초기화 테스트 ===", () => {
        it("전달받은 자동차 리스트를 가지고 있어야 한다", () => {
            expect(race.cars).toEqual(cars);
        });

        it("라운드 수를 전달받지 않으면 기본값이 설정되어야 한다", () => {
            const expectedRounds = 5;
            expect(race.rounds).toBe(expectedRounds);
        });
    });

    describe("=== 레이스 기록 테스트 ===", () => {
        it("레이스 결과가 라운드 수만큼 기록되어야 한다", () => {
            const raceResult = race.start();
            expect(raceResult.raceHistory.length).toBe(race.rounds);
        });

        it("각 라운드마다 자동차의 상태가 기록되어야 한다", () => {
            const raceResult = race.start();
            expect(
                raceResult.raceHistory.every(roundData => Array.isArray(roundData.cars))
            ).toBe(true);
        });
    });

    describe("=== 레이스 결과 테스트 ===", () => {
        it("우승자 목록을 반환해야한다.", () => {
            const raceResult = race.start();

            expect(raceResult.getWinners().length).toBeGreaterThan(0);
        });
    })
});


