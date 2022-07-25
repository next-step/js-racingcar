import { VALIDATOR_MSG } from '../../constants/index.js';
const composeValidator =
	(...validators) =>
	(string) => {
		const copiedValidator = [...validators];

		for (let i = 0; i < copiedValidator.length; i += 1) {
			const validator = copiedValidator[i];
			const { isValid, msg } = validator(string);
			if (!isValid) {
				return { isValid, msg };
			}
		}

		return { isValid: true };
	};

const emptyStringValidator = (string = '') => {
	if (string.length === 0) {
		return { isValid: false, msg: VALIDATOR_MSG.NOT_ALLOWED_PARTICIPIANT };
	}
	return { isValid: true, msg: '' };
};

const maxStringValidator = (string = '') => {
	if (string.length > 5) {
		return { isValid: false, msg: VALIDATOR_MSG.NOT_ALLOWED_PARTICIPIANT };
	}
	return { isValid: true, msg: '' };
};

export const minTrialValidator = (trial = 0) => {
	if (trial < 1) {
		return { isValid: false, msg: VALIDATOR_MSG.NOT_ALLOWED_TRIAL };
	}
	return { isValid: true, msg: '' };
};

export const participantValidator = composeValidator(emptyStringValidator, maxStringValidator);
