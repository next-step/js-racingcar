// tests/carReducer.test.js
import carReducer from "../../src/reducers/carReducer";

test("리듀서는 초기 상태를 반환해야 합니다.", () => {
	// Given

	// When
	const state = carReducer(undefined, {});

	// Then
	expect(state).toEqual({ carNames: [], raceResult: [] });
});

test("SET_CAR_NAMES 액션에 대한 리듀서 동작이 올바르게 수행되어야 합니다.", () => {
	// Given
	const initialState = { carNames: [], raceResult: [] };
	const action = { type: "SET_CAR_NAMES", payload: ["john", "jane", "smith"] };

	// When
	const state = carReducer(initialState, action);

	// Then
	expect(state).toEqual({
		carNames: ["john", "jane", "smith"],
		raceResult: [],
	});
});

test("SET_RACE_RESULT 액션에 대한 리듀서 동작이 올바르게 수행되어야 합니다.", () => {
	// Given
	const initialState = { carNames: [], raceResult: [] };
	const action = { type: "SET_RACE_RESULT", payload: ["pobi", "honux"] };

	// When
	const state = carReducer(initialState, action);

	// Then
	expect(state).toEqual({ carNames: [], raceResult: ["pobi", "honux"] });
});
