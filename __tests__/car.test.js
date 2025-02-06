import Car from "../src/car.js";

describe("Car 클래스는", () => {
    let car;

    beforeEach(() => {
        car = new Car("test");
    });

    it("생성자를 통해 전달받은 이름을 리턴한다", () => {
        const expectedName = "test";
        expect(car.name).toBe(expectedName);
    });

    it("초기 position 값을 올바르게 설정한다", () => {
        expect(car.position).toBe(0);
    });

    it("전진하면 position의 값이 증가한다", () => {
        car.moveForward();
        expect(car.position).toBe(1);
    });
});

