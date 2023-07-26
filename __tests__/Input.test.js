import ValidateInput from "../src/ValidateInput";
import { ERROR_MESSAGE } from "../src/constants/error";

describe("Car name input validation", () => {
	let validateInput;
	beforeEach(() => {
		validateInput = new ValidateInput();
	});

	it("입력값이 없는 경우에 대한 에러 메시지가 출력되어야 합니다.", () => {
		expect(() => validateInput.isEmpty("")).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.EMPTY
		);
	});

	it("콤마로 구분되지 않은 경우에 대한 에러 메시지가 출력되어야 합니다.", () => {
		expect(() => validateInput.isCommaSeparated("pobi crong")).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.COMMA_MISSING
		);
	});

	it("이름이 5자를 초과하는 경우에 대한 에러 메시지가 출력되어야 합니다.", () => {
		expect(() => validateInput.isWithinLength("asdasda")).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.LENGTH_EXCEED
		);
	});

	it("동일한 이름이 입력된 경우에 대한 에러 메시지가 출력되어야 합니다.", () => {
		expect(() => validateInput.isUniqueNames("aa, aa, aa")).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.DUPLICATE
		);
	});

	it("특수 문자가 포함된 경우에 대한 에러 메시지가 출력되어야 합니다.", () => {
		expect(() => validateInput.isAlphabetic("%#@, !@#!")).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.SPECIAL_CHARACTER
		);
	});

	it("공백으로 이름이 입력된 경우에 대한 에러 메시지가 출력되어야 합니다.", () => {
		expect(() => validateInput.isWhitespaceFree("   ,  ,   ,")).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.WHITESPACE
		);
	});

	it("자동차가 하나만 입력된 경우에 대한 에러 메시지가 출력되어야 합니다.", () => {
		expect(() => validateInput.hasMinCars("pobi")).toThrowError(
			ERROR_MESSAGE.INPUT_ERROR.MINIMUM_CAR
		);
	});

	it("올바른 입력값에 대해서는 에러 메시지가 출력되지 않아야 합니다.", () => {
		expect(validateInput.isValidInput("pobi,crong,honux")).toBe(true);
	});
});
