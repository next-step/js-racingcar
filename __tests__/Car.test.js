import Car from "../src/Car";
import { SETTING } from "../src/constants/setting";
describe("Car action", () => {
	let car;
	beforeEach(() => {
		car = new Car(SETTING.CAR_SETTING.CAR_NAME);
	});

	it("자동차가 생성되었을 떄, 자동차의 이름은 입력한 이름과 같아야 한다.", () => {
		expect(car.getName).toBe(SETTING.CAR_SETTING.CAR_NAME);
	});

	it("자동차가 생성되었을 때, 자동차의 위치는 1이어야 한다.", () => {
		expect(car.getPosition).toBe(SETTING.CAR_SETTING.DEFAULT_POSITION);
	});

	it("4이상 값이 나온 경우, 1위치에 있는 자동차는 전진후 2가 된다", () => {
		if (car.getPosition === SETTING.CAR_SETTING.DEFAULT_POSITION) {
			car.move(SETTING.CAR_SETTING.CAN_MOVE_NUM);
			expect(car.getPosition).toBe(
				SETTING.CAR_SETTING.DEFAULT_POSITION + SETTING.CAR_SETTING.CAR_RUN_UNIT
			);
		}
	});

	it("3이하 값이 나온 경우, 자동차는 멈춰야 한다.", () => {
		if (car.getPosition === SETTING.CAR_SETTING.DEFAULT_POSITION) {
			car.move(3);
			expect(car.getPosition).toBe(SETTING.CAR_SETTING.DEFAULT_POSITION);
		}
	});
});
