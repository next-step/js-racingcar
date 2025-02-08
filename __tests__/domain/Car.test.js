import {Car, CarName, Position} from "../../src/domain/Car.js";

describe("자동차는", () => {
    let car;
    let alwaysMoveAcceleration;

    beforeEach(() => {
        alwaysMoveAcceleration = {
            canAccelerate: () => true
        };
        car = new Car("포르쉐", alwaysMoveAcceleration);
    });

    describe("=== 자동차의 이름에 대한 테스트 ===", () => {
        it("생성될 때 전달받은 이름을 가지고 있어야 한다", () => {
            const expectedName = "포르쉐";
            expect(car.name.value).toBe(expectedName);
        });

        it("이름이 5자를 초과하면 에러를 던져야 한다", () => {
            const givenCarName = "포르쉐포르쉐";
            expect(() => new Car(givenCarName, alwaysMoveAcceleration)).toThrow(CarName.ERROR_MESSAGES.INVALID_NAME);
        });

        it("이름이 1자 미만이면 에러를 던져야 한다", () => {
            const givenCarName = "";
            expect(() => new Car(givenCarName, alwaysMoveAcceleration)).toThrow(CarName.ERROR_MESSAGES.INVALID_NAME);
        });
    });

    describe("=== 자동차의 위치에 대한 테스트 ===", () => {
        it("처음 생성되었을 때는 시작 위치(0)에 있어야 한다", () => {
            const initialPosition = 0;
            expect(car.position).toEqual(new Position(initialPosition));
        });

        describe("> 전진할 때", () => {
            it("엑셀이 'true'를 반환하면 위치가 증가해야 한다", () => {
                const initialPosition = car.position.value;
                car.moveForward();
                expect(car.position).toEqual(new Position(initialPosition + 1));
            });
        });
    });

    describe("=== 자동차 목록 만들기에 대한 테스트 ===", () => {
        it("자동차 이름 배열을 받아서 Car 객체 배열을 반환해야 한다", () => {
            const names = ["포르쉐", "벤츠", "아우디"];
            const cars = Car.createCars(names, alwaysMoveAcceleration);

            expect(cars.every(car => car instanceof Car)).toBe(true);
        });

        it("자동차 목록이 없는 경우 에러를 던져야 한다", () => {
            expect(() => Car.createCars([], alwaysMoveAcceleration)).toThrow(Car.ERROR_MESSAGES.INVALID_NAMES);
        });

        it("자동차 이름이 배열이 아닌 경우 에러를 던져야 한다", () => {
            expect(() => Car.createCars("포르쉐,벤츠,아우디", alwaysMoveAcceleration)).toThrow(Car.ERROR_MESSAGES.INVALID_NAMES);
        });
    });
});


