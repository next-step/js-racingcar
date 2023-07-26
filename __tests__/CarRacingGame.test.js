import CarRacingGame from "../src/CarRacingGame";
import { SETTING } from "../src/constants/setting";

describe("CarRacingGame", () => {
	let carRacingGame;
	beforeEach(() => {
		carRacingGame = new CarRacingGame();
	});

	it("경기가 5번 진행되면 게임이 끝나야 합니다.", () => {
		carRacingGame.endGame = jest.fn();
		for (let i = 0; i < SETTING.CAR_RACING_GAME_SETTING.ROUND_END; i++) {
			carRacingGame.increaseGame();
		}
		expect(carRacingGame.endGame).toBeCalled();
	});

	it("게임 1회 진행시 랜덤값이 0~9 사이의 값으로 출력되어야 합니다.", () => {
		const randomValue = carRacingGame.getRandomValue();
		expect(randomValue).toBeGreaterThanOrEqual(
			SETTING.CAR_RACING_GAME_SETTING.RANDOM_MIN
		);
		expect(randomValue).toBeLessThanOrEqual(
			SETTING.CAR_RACING_GAME_SETTING.RANDOM_MAX
		);
	});

	it("게임 1회 진행시 자동차의 상태를 보여줘야합니다.", () => {
		carRacingGame.cars = [
			{
				name: "pobi",
				position: 5,
			},
			{
				name: "crong",
				position: 3,
			},
			{
				name: "honux",
				position: 1,
			},
		];
		const carStatus = carRacingGame.getCarsStatus();
		expect(carStatus).toBe("pobi : -----\ncrong : ---\nhonux : -");
	});

	it("게임이 끝나면 우승자를 알려줘야 합니다.", () => {
		carRacingGame.cars = [
			{
				name: "pobi",
				position: 5,
			},
			{
				name: "crong",
				position: 3,
			},
			{
				name: "honux",
				position: 1,
			},
		];

		const winner = carRacingGame.getWinner();
		expect(winner).toBe("pobi");
	});
});
