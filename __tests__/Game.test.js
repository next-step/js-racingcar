import Car from '../src/services/Car.js';
import Game from '../src/services/Game.js';

describe('게임(자동차 경주) 진행에 대한 테스트', () => {
  const DEFAULT_CAR_NAMES = ['아반떼', '스타렉스'];
  const DEFAULT_CAR_LOCATION = 0;
  const DEFAULT_GAME_LAP = 5;

  let game = null;

  beforeEach(() => (game = new Game({ names: DEFAULT_CAR_NAMES })));

  // Model
  test('게임을 생성할 때 names에 ["아반떼", "스타렉스"]를 넣으면 ["아반떼", "스타렉스"] 자동차는 게임에 참가된다.', () => {
    const players = game.getPlayers();

    expect(players).toBe(DEFAULT_CAR_NAMES);
  });

  test('게임을 생성할 때, 다섯 바퀴로 기본 설정이다.', () => {
    const gameLap = game.getLap();

    expect(gameLap).toBe(DEFAULT_GAME_LAP);
  });

  test('게임을 생성할 때, 여섯 바퀴로 변경할 수 있다.', () => {
    const customGame = new Game({
      names: DEFAULT_CAR_NAMES,
      lap: DEFAULT_GAME_LAP + 1,
    });
    const gameLap = customGame.getLap();

    expect(gameLap).toBe(DEFAULT_GAME_LAP + 1);
  });

  // Controller
  test('게임에서 한 바퀴를 돌면 0에 위치한 자동차(아반떼)는 1로 움직여야 한다.', () => {
    const car = new Car({ name: '아반떼' });
    const status = game.getPlayerCurrentStatus(car);

    expect(status).toEqual({
      name: '아반떼',
      location: DEFAULT_CAR_LOCATION + 1,
    });
  });

  test('게임에서 한 바퀴를 돌면 3에 위치한 자동차(아반떼)는 4로 움직여야 한다.', () => {
    const car = new Car({ name: '아반떼', location: DEFAULT_CAR_LOCATION + 3 });
    const status = game.getPlayerCurrentStatus(car);

    expect(status).toEqual({
      name: '아반떼',
      location: DEFAULT_CAR_LOCATION + 4,
    });
  });

  // View
  test('자동차 위치가 0이면, 자동차 움직임 궤도는 공백이다.', () => {
    const track = game.drawMovedTrack(DEFAULT_CAR_LOCATION);

    expect(track).toBe('');
  });

  test('자동차 위치가 1이면, 자동차 움직임 궤도는 "-"이다.', () => {
    const track = game.drawMovedTrack(DEFAULT_CAR_LOCATION + 1);

    expect(track).toBe('-');
  });

  test('자동차 위치가 5이면, 자동차 움직임 궤도는 "-----"이다.', () => {
    const track = game.drawMovedTrack(DEFAULT_CAR_LOCATION + 5);

    expect(track).toBe('-----');
  });
});
