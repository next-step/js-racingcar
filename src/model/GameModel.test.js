import { CarModel } from "./CarModel";
import { GameModel } from "./GameModel";

const DEFAULT_NAMES = ["크롱", "뽀로로", "루피", "포비"];
const DEFAULT_CARS = DEFAULT_NAMES.map((v) => new CarModel(v));

describe("GameModel", () => {
  test("게임의 참가는 자동차만 가능하다.", () => {
    const game = new GameModel();

    const setParticipants = (cars) => () => (game.participants = cars);

    expect(setParticipants(DEFAULT_CARS)).not.toThrow();
    expect(setParticipants(DEFAULT_NAMES)).toThrow();
    expect(setParticipants("")).toThrow();
    expect(setParticipants(3)).toThrow();
  });

  test("게임의 참가는 2대 이상부터 가능하다.", () => {
    const game = new GameModel();

    const setParticipants = (cars) => () => (game.participants = cars);

    expect(setParticipants([])).toThrow();
    expect(setParticipants(DEFAULT_CARS.slice(0, 1))).toThrow();
    expect(setParticipants(DEFAULT_CARS.slice(0, 2))).not.toThrow();
    expect(setParticipants(DEFAULT_CARS)).not.toThrow();
  });

  test("중복된 이름으로는 게임에 참여가 불가능하다.", () => {
    const game = new GameModel();
    const cars_has_duplicated_names = [...DEFAULT_NAMES, ...DEFAULT_NAMES].map(
      (v) => new CarModel(v)
    );

    const setParticipants = (cars) => () => (game.participants = cars);

    expect(setParticipants(cars_has_duplicated_names)).toThrow();
  });
});
