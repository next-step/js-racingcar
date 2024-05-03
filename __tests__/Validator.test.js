import { CAR } from "../src/constants/car";
import { ERROR_MESSAGES } from "../src/constants/messages";
import { car } from "../src/validator/car";

describe("자동차 이름 유효성 테스트", () => {
	test(`자동차 이름은 ${CAR.NAME_MAX_LENGTH}자 이하만 입력 가능하다.`, () => {
		const carInput = ["a".repeat(CAR.NAME_MAX_LENGTH + 1)];

		expect(() => car.nameValidator(carInput)).toThrow(
			ERROR_MESSAGES.CAR_NAME_LENGTH,
		);
	});

	test(`자동차 이름은 ${CAR.NAME_MIN_LENGTH}자 이상만 입력 가능하다.`, () => {
		const carInput = [
			CAR.NAME_MIN_LENGTH - 1 <= 0 ? "" : "a".repeat(CAR.NAME_MIN_LENGTH - 1),
		];

		expect(() => car.nameValidator(carInput)).toThrow(
			ERROR_MESSAGES.CAR_NAME_LENGTH,
		);
	});

	test("중복된 자동차 이름이 존재할 수 없다.", () => {
		const carInput = ["a", "a", "b"];

		expect(() => {
			car.nameValidator(carInput);
		}).toThrow(ERROR_MESSAGES.SAME_CAR_NAME);
	});
});
