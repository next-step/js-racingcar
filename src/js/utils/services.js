import { CONSTANT, MESSAGE } from "./constants.js";

export const isValidCarNames = (string) => {
	if (string === CONSTANT.BLANK) return false;
	const convertedInputValue = string.split(",").map((name) => name.trim());
	for (const name of convertedInputValue) {
		if (name.length < 1) {
			alert(MESSAGE.CAR_NAME_MIN_LENGTH_ERROR);
			return false;
		} else if (name.length > 5) {
			alert(MESSAGE.CAR_NAME_MAX_LENGTH_ERROR);
			return false;
		}
	}

	return true;
};
