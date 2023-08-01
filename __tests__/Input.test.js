import ValidateInput from "../src/ValidateInput";
import { ERROR_MESSAGE } from "../src/constants/error";

describe("Car name input validation", () => {
	let validateInput;
	beforeEach(() => {
		validateInput = new ValidateInput();
	});

	it("입력값이 없는 경우에 대한 에러 메시지가 출력되어야 한다.", () => {
		// Given
		const input = "";

		// When, Then
		expect(() => validateInput.isEmpty(input)).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.EMPTY
		);
	});

	it("콤마로 구분되지 않은 경우에 대한 에러 메시지가 출력되어야 한다.", () => {
		// Given
		const input = "pobi crong";

		// When, Then
		expect(() => validateInput.isCommaSeparated(input)).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.COMMA_MISSING
		);
	});

	it("이름이 5자를 초과하는 경우에 대한 에러 메시지가 출력되어야 한다.", () => {
		// Given
		const input = "asdasda";

		// When, Then
		expect(() => validateInput.isWithinLength(input)).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.LENGTH_EXCEED
		);
	});

	it("동일한 이름이 입력된 경우에 대한 에러 메시지가 출력되어야 한다.", () => {
		// Given
		const input = "aa, aa, aa";

		// When, Then
		expect(() => validateInput.isUniqueNames(input)).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.DUPLICATE
		);
	});

	it("특수 문자가 포함된 경우에 대한 에러 메시지가 출력되어야 한다.", () => {
		// Given
		const input = "%#@, !@#!";

		// When, Then
		expect(() => validateInput.isAlphabetic(input)).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.SPECIAL_CHARACTER
		);
	});

	it("공백으로 이름이 입력된 경우에 대한 에러 메시지가 출력되어야 한다.", () => {
		// Given
		const input = "   ,  ,   ,";

		// When, Then
		expect(() => validateInput.isWhitespaceFree(input)).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.WHITESPACE
		);
	});

	it("자동차가 하나만 입력된 경우에 대한 에러 메시지가 출력되어야 한다.", () => {
		// Given
		const input = "pobi";

		// When, Then
		expect(() => validateInput.hasMinCars(input)).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.MINIMUM_CAR
		);
	});

	it("올바른 입력값에 대해서는 에러 메시지가 출력되지 않아야 한다.", () => {
		// Given
		const input = "pobi,crong,honux";

		// When, Then
		const result = validateInput.isValidCarInput(input);
		expect(result).toBe(true);
	});
});

describe("Round input validation", () => {
	let validateInput;
	beforeEach(() => {
		validateInput = new ValidateInput();
	});

	it("입력값이 없는 경우에 대한 에러 메시지가 출력되어야 한다.", () => {
		// Given
		const input = "";

		// When, Then
		expect(() => validateInput.isEmpty(input)).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.EMPTY
		);
	});

	it("숫자가 아닌 값이 입력된 경우에 대한 에러 메시지가 출력되어야 한다.", () => {
		// Given
		const input = "a";

		// When, Then
		expect(() => validateInput.isNumeric(input)).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.NUMERIC
		);
	});

	it("0이 입력된 경우에 대한 에러 메시지가 출력되어야 한다.", () => {
		// Given
		const input = "0";

		// When, Then
		expect(() => validateInput.isPositive(input)).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.POSITIVE
		);
	});

	it("음수가 입력된 경우에 대한 에러 메시지가 출력되어야 한다.", () => {
		// Given
		const input = "-1";

		// When, Then
		expect(() => validateInput.isPositive(input)).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.POSITIVE
		);
	});

	it("올바른 입력값에 대해서는 에러 메시지가 출력되지 않아야 한다.", () => {
		// Given
		const input = "1";

		// When, Then
		const result = validateInput.isValidRoundInput(input);
		expect(result).toBe(true);
	});
});
