import Car from "../src/car.js";

describe("자동차는", () => {
    let car;
    beforeEach(() => {
        car = new Car("포르쉐");
    });
    describe("=== 자동차의 이름에 대한 테스트 ===", () => {
        it("생성될 때 전달받은 이름을 가지고 있어야 한다", () => {
            const expectedName = "포르쉐";
            expect(car.name).toBe(expectedName);
        });

        describe("> 이름이 유효하지 않을 때", () => {
            it("에러를 던져야 한다", () => {
                const givenCarName = "포르쉐포르쉐";
                expect(() => new Car(givenCarName)).toThrow(Car.ERROR_MESSAGES.INVALID_NAME);
            });
        });
    });
    describe("=== 자동차의 위치에 대한 테스트 ===", () => {
        it("처음 생성되었을 때는 시작 위치(0)에 있어야 한다", () => {
            expect(car.position).toBe(0);
        });
        describe("> 전진할 때", () => {
            it("위치가 1만큼 증가해야 한다", () => {
                const initialPosition = car.position;
                car.moveForward();
                expect(car.position).toBe(initialPosition + 1);
            });
        });
    });
});
