import { MAX_CAR_NAME_LENGTH, RANDOM_NUM } from './constants.js';

export function toNameArray(str) {
	if (typeof str !== 'string') {
		throw new Error('인자의 타입이 문자열이 아닙니다.');
	}

	return str.split(',').map((item) => item.trim());
}

export function isCheckCarNameLength(carNames) {
	if (!Array.isArray(carNames)) {
		throw new Error('인자의 타입이 배열이 아닙니다.');
	}

	return carNames.every((item) => item.length <= MAX_CAR_NAME_LENGTH);
}

export function isMoveCar() {
	const { FORWARD_NUM, MIN_NUM, MAX_NUM } = RANDOM_NUM;
	const randomNum = Math.floor(Math.random() * MAX_NUM) + MIN_NUM;

	return randomNum >= FORWARD_NUM;
}
