import { minTrialValidator, participantValidator } from './validator.js';

export const generateRandomNumber = () => Math.floor(Math.random() * 10);

export const makeElementDisabled = (...elements) => {
	elements.forEach((element) => (element.disabled = true));
};

export { minTrialValidator, participantValidator };
