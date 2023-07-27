// tests/carActions.test.js
import { setCarNames, setRaceResult } from "../../src/actions/carActions";

describe("carActions", () => {
	it("자동차 이름을 설정할 수 있어야 합니다.", () => {
		// Given
		const carNames = ["john", "jane", "smith"];

		// When
		const action = setCarNames(carNames);

		// Then
		expect(action).toEqual({ type: "SET_CAR_NAMES", payload: carNames });
	});

	it("경주 결과를 설정할 수 있어야 합니다.", () => {
		// Given
		const raceResult = ["pobi", "honux"];

		// When
		const action = setRaceResult(raceResult);

		// Then
		expect(action).toEqual({ type: "SET_RACE_RESULT", payload: raceResult });
	});
});
