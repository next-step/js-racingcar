import { ACTION_TYPES } from "../../src/constants/actionTypes.js";

const setCarNames = (carNames) => ({
	type: ACTION_TYPES.SET_CAR_NAMES,
	payload: carNames,
});

const setRound = (round) => ({
	type: ACTION_TYPES.SET_ROUND,
	payload: round,
});

const setRaceResult = (result) => ({
	type: ACTION_TYPES.SET_RACE_RESULT,
	payload: result,
});

export { setCarNames, setRound, setRaceResult };
