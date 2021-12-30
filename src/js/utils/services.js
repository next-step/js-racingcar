import { CONSTANT, MESSAGE } from "./constants.js";

export const makeCarName = () => {};

export const isValidCarNames = (string) => {
	if (string === CONSTANT.BLANK) return false;
	const convertedInputValue = string.split(",").map((name) => name.trim());
	convertedInputValue.forEach((name) => {
		if (name.length > 5) {
			alert(MESSAGE.CAR_NAME_LENGTH_ERROR);
			return false;
		}
	});
	return true;
};
