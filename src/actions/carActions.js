import { ACTION_TYPES } from "../../src/constants/actionTypes";

const setCarNames = (carNames) => ({
	type: ACTION_TYPES.SET_CAR_NAMES,
	payload: carNames,
});

const setRaceResult = (result) => ({
	type: ACTION_TYPES.SET_RACE_RESULT,
	payload: result,
});

export { setCarNames, setRaceResult };
