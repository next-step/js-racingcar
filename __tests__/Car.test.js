import Car from "../src/Car";

describe("Car action", () => {
	let car;
	beforeEach(() => {
		car = new Car("pobi");
	});

	it("자동차가 생성되었을 떄, 자동차의 이름은 입력한 이름과 같아야 합니다.", () => {
		expect(car.getName).toBe("pobi");
	});

	it("자동차가 생성되었을 때, 자동차의 위치는 0이어야 합니다.", () => {
		expect(car.getPosition).toBe(0);
	});

	it("4이상 값이 나온 경우, 0위치에 있는 자동차는 전진후 1이 되어야합니다..", () => {
		if (car.getPosition === 0) {
			car.move(4);
			expect(car.getPosition).toBe(1);
		}
	});

	it("3이하 값이 나온 경우, 자동차는 멈춰야 합니다.", () => {
		car.move(3);
		expect(car.getPosition).toBe(0);
	});
});
