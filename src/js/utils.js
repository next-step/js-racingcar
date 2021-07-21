import { CAR_NAME_MAX_LENGTH, MIN_ROUND } from './constants/index.js';

export const max = (numberArry) => {
	let maxCnt = 0;
	for (const num of numberArry) {
		maxCnt = Math.max(maxCnt, num);
	}
	return maxCnt;
};

export const sleep = async (ms) =>
	new Promise((resolve) => setTimeout(resolve, ms));

const isLessOrEqualThanMaxLength = (carName) => {
	return carName.length <= CAR_NAME_MAX_LENGTH;
};
const isMoreThanZero = (carName) => {
	return carName.length > 0;
};
export const isCarNameValid = (carNamesBeforeBeingParsed) => {
	const carNames = carNamesBeforeBeingParsed.split(',');
	return (
		carNames.every(isLessOrEqualThanMaxLength) && carNames.every(isMoreThanZero)
	);
};
export const isRoundVaild = (roundInputValue) => {
	return parseInt(roundInputValue) >= MIN_ROUND;
};

export const callAfterAllInit = (fn) => setTimeout(fn, 0);

export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
