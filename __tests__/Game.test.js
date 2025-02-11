import Car from '../src/domain/car/service';
import Game from '../src/domain/game/service';
import { renderCarMovementLine } from '../src/view/game';

describe('게임(자동차 경주) 진행에 대한 테스트', () => {
  const DEFAULT_CAR_NAMES = ['아반떼', '스타렉스'];

  let game = null;

  beforeEach(() => (game = new Game({ names: DEFAULT_CAR_NAMES })));

  // Model
  describe('게임을 생성할 때', () => {
    test('names에 ["아반떼", "스타렉스"]를 넣으면 ["아반떼", "스타렉스"] 자동차는 게임에 참가된다.', () => {
      const players = game.getPlayers();

      expect(players).toBe(DEFAULT_CAR_NAMES);
    });

    test('경주 횟수를 정의하지 않으면 게임의 경주 횟수는 5회로 생성되어야 한다.', () => {
      const gameLap = game.getLap();

      expect(gameLap).toBe(Game.DEFAULT_LAP);
    });

    test('여섯 바퀴로 변경할 수 있다.', () => {
      const customGame = new Game({
        names: DEFAULT_CAR_NAMES,
        lap: Game.DEFAULT_LAP + 1,
      });
      const gameLap = customGame.getLap();

      expect(gameLap).toBe(Game.DEFAULT_LAP + 1);
    });
  });

  // Controller
  describe('게임에서 한 바퀴가 진행 되었을 때', () => {
    test('전진을 결정하는 무작위 숫자가 4일 경우 자동차가 한 칸 이동한다.', () => {
      const car = new Car({ name: '아반떼' });

      const status = game.determineCarMovement(
        { car },
        game.handleCarMove,
        game.handleCarStay,
      );

      expect(status).toEqual({
        name: '아반떼',
        location: Car.DEFAULT_CAR_LOCATION + 1,
      });
    });

    test('전진을 결정하는 무작위 숫자가 3일 경우 자동차가 이동하지 않는다.', () => {
      const car = new Car({ name: '아반떼' });
      const status = game.determineCarMovement(
        { car, threshold: Game.MIN_MOVEMENT_THRESHOLD - 1 },
        game.handleCarMove,
        game.handleCarStay,
      );

      expect(status).toEqual({
        name: '아반떼',
        location: Car.DEFAULT_CAR_LOCATION,
      });
    });

    test('0에 위치한 자동차(아반떼)는 1로 움직여야 한다.', () => {
      const car = new Car({ name: '아반떼' });
      const status = game.determineCarMovement(
        { car },
        game.handleCarMove,
        game.handleCarStay,
      );

      expect(status).toEqual({
        name: '아반떼',
        location: Car.DEFAULT_CAR_LOCATION + 1,
      });
    });

    test('3에 위치한 자동차(아반떼)는 4로 움직여야 한다.', () => {
      const car = new Car({
        name: '아반떼',
        location: Car.DEFAULT_CAR_LOCATION + 3,
      });
      const status = game.determineCarMovement(
        { car },
        game.handleCarMove,
        game.handleCarStay,
      );

      expect(status).toEqual({
        name: '아반떼',
        location: Car.DEFAULT_CAR_LOCATION + 4,
      });
    });
  });

  describe('게임이 종료되었을 때', () => {
    test('자동차들의 위치가 [1, 2, 1]이면, 2번째 자동차인 "카니발"이 우승자로 출력되어야 한다.', () => {
      const cars = [
        new Car({ name: '아반떼', location: 1 }),
        new Car({ name: '카니발', location: 2 }),
        new Car({ name: '제네시스', location: 1 }),
      ];
      const winners = game.getWinnersName(cars);

      expect(winners).toBe('카니발');
    });

    test('자동차들의 위치가 [1, 2, 2]이면, 2, 3번째 자동차인 "카니발", "제네시스"이 우승자로 출력되어야 한다.', () => {
      const cars = [
        new Car({ name: '아반떼', location: 1 }),
        new Car({ name: '카니발', location: 2 }),
        new Car({ name: '제네시스', location: 2 }),
      ];
      const winners = game.getWinnersName(cars);

      expect(winners).toBe('카니발, 제네시스');
    });
  });

  // View
  test.each([
    [Car.DEFAULT_CAR_LOCATION, ''],
    [Car.DEFAULT_CAR_LOCATION + 1, '-'],
    [Car.DEFAULT_CAR_LOCATION + 5, '-----'],
  ])(
    '자동차 위치가 %i이면, 자동차 움직임 궤도는 "%s"으로 출력되어야 한다.',
    (input, expected) => {
      const track = renderCarMovementLine(input);

      expect(track).toBe(expected);
    },
  );
});
