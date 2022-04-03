import { MAX_CAR_NAME_LENGTH, RANDOM_NUM } from './constatns.js';

export function isCheckCarNameLength(carName) {
	return carName.every((item) => item.length <= MAX_CAR_NAME_LENGTH);
}

export function isRace() {
	const randomNum =
		Math.floor(Math.random() * RANDOM_NUM.MAX_NUM) + RANDOM_NUM.MIN_NUM;
	return randomNum >= RANDOM_NUM.FORWARD_NUM;
}
