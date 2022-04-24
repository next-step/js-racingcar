import { WARN_MSG, ERR_MSG, RANDOM_NUM } from './util/constants.js';
import { toNameArray, isCheckCarNameLength } from './util/util.js';

const Car = {
	_name: [''],
	_tryCount: 0,
	get name() {
		return this._name;
	},
	set name(name) {
		const _names = toNameArray(name);

		if (!name) {
			throw new Error(ERR_MSG.EMPTY_CAR_NAME);
		}

		if (!isCheckCarNameLength(_names)) {
			throw new Error(ERR_MSG.OVER_CAR_NAME_MAX_LENGTH);
		}

		const carNamesSet = new Set(_names);
		if (_names.length !== carNamesSet.size) {
			// FIXME: confirm이 false일 경우 실행을 중단하도록 수정
			window.confirm(WARN_MSG.DUPLICATE_CAR_NAME);
		}

		this._name = _names;
	},
	get tryCount() {
		return this._tryCount;
	},
	set tryCount(tryCount) {
		if (!tryCount) {
			throw new Error(ERR_MSG.EMPTY_TRY_NUM);
		}

		this._tryCount = tryCount;
	},
	isMove() {
		const { FORWARD_NUM, MIN_NUM, MAX_NUM } = RANDOM_NUM;
		const randomNum = Math.floor(Math.random() * MAX_NUM) + MIN_NUM;

		return randomNum >= FORWARD_NUM;
	},
};

export default Car;
