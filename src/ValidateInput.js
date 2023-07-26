import { ERROR_MESSAGE } from "./constants/error.js";
import { SETTING } from "./constants/setting.js";

class ValidateInput {
	constructor() {
		if (!new.target) {
			throw new Error(ERROR_MESSAGE.INPUT_ERROR.NEED_NEW_KEYWORD);
		}
	}

	isEmpty(input) {
		if (input.trim() === "") {
			throw new Error(ERROR_MESSAGE.INPUT_ERROR.EMPTY);
		}
	}

	isCommaSeparated(input) {
		if (input.indexOf(SETTING.INPUT_SETTING.SPLITER) === -1) {
			throw new Error(ERROR_MESSAGE.INPUT_ERROR.COMMA_MISSING);
		}
	}

	isWithinLength(input) {
		const names = input.split(SETTING.INPUT_SETTING.SPLITER);
		for (let i = 0; i < names.length; i++) {
			if (names[i].length > SETTING.INPUT_SETTING.MAX_LENGTH) {
				throw new Error(ERROR_MESSAGE.INPUT_ERROR.LENGTH_EXCEED);
			}
		}
	}

	isUniqueNames(input) {
		const names = input.split(SETTING.INPUT_SETTING.SPLITER);
		const uniqueNames = [...new Set(names)];
		if (names.length !== uniqueNames.length) {
			throw new Error(ERROR_MESSAGE.INPUT_ERROR.DUPLICATE);
		}
	}

	isAlphabetic(input) {
		const names = input.split(SETTING.INPUT_SETTING.SPLITER);
		const regex = SETTING.INPUT_SETTING.REGEX;
		for (let i = 0; i < names.length; i++) {
			if (!regex.test(names[i])) {
				throw new Error(ERROR_MESSAGE.INPUT_ERROR.SPECIAL_CHARACTER);
			}
		}
	}

	isWhitespaceFree(input) {
		const names = input.split(SETTING.INPUT_SETTING.SPLITER);
		for (let i = 0; i < names.length; i++) {
			if (names[i].trim() === "") {
				throw new Error(ERROR_MESSAGE.INPUT_ERROR.WHITESPACE);
			}
		}
	}

	hasMinCars(input) {
		const names = input.split(SETTING.INPUT_SETTING.SPLITER);
		if (names.length < SETTING.INPUT_SETTING.MIN_CARS) {
			throw new Error(ERROR_MESSAGE.INPUT_ERROR.MINIMUM_CAR);
		}
	}

	isValidInput(input) {
		try {
			this.isEmpty(input);
			this.isCommaSeparated(input);
			this.isWithinLength(input);
			this.isUniqueNames(input);
			this.isAlphabetic(input);
			this.isWhitespaceFree(input);
			this.hasMinCars(input);
		} catch (error) {
			throw error;
		}

		return true;
	}
}

export default ValidateInput;
