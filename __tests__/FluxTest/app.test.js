import App from "../../src/app";
import { SETTING } from "../../src/constants/setting";
import createStore from "../../src/store/store";
import carReducer from "../../src/reducers/carReducer";
import { setRaceResult } from "../../src/actions/carActions";

describe("App", () => {
	let app;

	beforeEach(() => {
		app = new App();
	});

	it("랜덤값이 0~9 사이의 값으로 출력되어야 합니다", () => {
		// Given
		const randomNumber = app.getRandomNumber();

		// Then
		expect(randomNumber).toBeGreaterThanOrEqual(
			SETTING.CAR_RACING_GAME_SETTING.RANDOM_MIN
		);
		expect(randomNumber).toBeLessThanOrEqual(
			SETTING.CAR_RACING_GAME_SETTING.RANDOM_MAX
		);
	});
});
