export const MAX_CAR_NAME_LENGTH = 5;

export const RANDOM_NUM = {
	MIN_NUM: 0,
	MAX_NUM: 9,
	FORWARD_NUM: 4,
};

export const WARN_MSG = {
	DUPLICATE_CAR_NAME:
		'중복된 자동차의 이름이 있습니다. 그래도 진행하시겠습니까?',
};

export const ERR_MSG = {
	EMPTY_CAR_NAME: '자동차의 이름을 입력해주세요.',
	OVER_CAR_NAME_MAX_LENGTH: `자동차의 이름은 최대 ${MAX_CAR_NAME_LENGTH}글자까지 입력 가능합니다.`,
	EMPTY_TRY_NUM: '시도할 횟수를 입력해주세요.',
};
