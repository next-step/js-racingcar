import { minTrialValidator, participantValidator } from './validator.js';

export const makeElementDisabled = (...elements) => {
	elements.forEach((element) => (element.disabled = true));
};

export { minTrialValidator, participantValidator };
