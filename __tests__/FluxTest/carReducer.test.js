// tests/carReducer.test.js
import carReducer from "../../src/reducers/carReducer";

describe("carReducer", () => {
	const initialState = {
		carNames: [],
		raceResult: [],
		round: 0,
	};

	it("리듀서는 초기 상태를 반환해야 한다.", () => {
		// Given

		// When
		const state = carReducer(undefined, {});

		// Then
		expect(state).toEqual(initialState);
	});

	it("SET_CAR_NAMES 액션에 대한 리듀서 동작이 올바르게 수행되어야 한다.", () => {
		// Given
		const action = {
			type: "SET_CAR_NAMES",
			payload: ["john", "jane", "smith"],
		};

		// When
		const state = carReducer(initialState, action);

		// Then
		expect(state).toEqual({
			carNames: ["john", "jane", "smith"],
			raceResult: [],
			round: 0,
		});
	});

	it("SET_ROUND 액션에 대한 리듀서 동작이 올바르게 수행되어야 한다.", () => {
		// Given
		const action = { type: "SET_ROUND", payload: 5 };

		// When
		const state = carReducer(initialState, action);

		// Then
		expect(state).toEqual({ carNames: [], raceResult: [], round: 5 });
	});

	it("SET_RACE_RESULT 액션에 대한 리듀서 동작이 올바르게 수행되어야 한다.", () => {
		// Given
		const action = { type: "SET_RACE_RESULT", payload: ["pobi", "honux"] };

		// When
		const state = carReducer(initialState, action);

		// Then
		expect(state).toEqual({
			carNames: [],
			raceResult: ["pobi", "honux"],
			round: 0,
		});
	});
});
