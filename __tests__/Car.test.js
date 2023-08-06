import { GameController } from '../src/Controllers/GameController';
import { Car, RacingGame } from '../src/Domains';
import { MESSAGE, CAR, RACING_GAME } from '../src/constants';
import { getRandomIntInRange, splitCarNameToArray } from '../src/utils';
import { View } from '../src/Views';

// 2단계
describe('게임 시작', () => {
  test('GameController가 정상적으로 생성되는지 확인한다.', () => {
    const view = new View();
    const gameController = new GameController(view);

    expect(gameController).toBeInstanceOf(GameController);
  });
});

describe('자동차 이름 입력', () => {
  test('입력된 자동차 이름이 배열로 변환되는지 확인한다.', () => {
    const carNames = 'pobi,crong,honux';
    const result = splitCarNameToArray(carNames);

    expect(result).toEqual(['pobi', 'crong', 'honux']);
  });
});

describe('자동차 이름 유효성 검사', () => {
  test('Car 객체가 정상적으로 생성되는지 확인한다.', () => {
    const VALID_CAR_NAME = 'pobi';
    const car = new Car(VALID_CAR_NAME);

    expect(car).toBeInstanceOf(Car);
  });

  test('자동차 이름 길이가 최대 길이를 초과할 경우 에러가 발생한다.', () => {
    const INVALID_CAR_NAME = 'pengoose';

    expect(() => {
      new Car(INVALID_CAR_NAME);
    }).toThrow(MESSAGE.ERROR.LENGTH_OVERFLOW(CAR.MAX_NAME_LENGTH));
  });
});

describe('자동차 경주 셋팅', () => {
  test('주어진 횟수에 따라 경주가 진행된다.', () => {
    const carNames = splitCarNameToArray('pobi,crong,honux');
    const cars = carNames.map((carName) => new Car(carName));
    const randomRound = getRandomIntInRange(1, 9);

    const model = new RacingGame(cars, randomRound);

    const gameResult = model.getGameResult();
    const gameResultLines = gameResult.split('\n');
    const expectedLines = randomRound * (carNames.length + 1) + 3;

    expect(gameResultLines.length).toBe(expectedLines);
  });
});

describe('자동차 경주 시작', () => {
  test('랜덤 값이 4 이상일 경우 자동차가 전진하는지 확인한다.', () => {
    const car = new Car('pobi');
    const RANDOM_INT = 8;
    if (RANDOM_INT >= RACING_GAME.RACER.MOVEMENT_THRESHOLD) car.advance();

    expect(car.getDistance()).toBe(1);
  });

  test('랜덤 값이 4 미만일 경우 자동차가 전진하지 않는지 확인한다.', () => {
    const car = new Car('pobi');
    const RANDOM_INT = 2;
    if (RANDOM_INT >= RACING_GAME.RACER.MOVEMENT_THRESHOLD) car.advance();

    expect(car.getDistance()).toBe(0);
  });
});

describe('우승자 확인', () => {
  test('GameController가 우승자를 정상적으로 출력하는지 확인한다.', () => {
    const carNames = splitCarNameToArray('pobi,crong,honux');
    const cars = carNames.map((carName) => new Car(carName));
    const randomRound = getRandomIntInRange(1, 9);
    const model = new RacingGame(cars, randomRound);

    const gameResult = model.getGameResult();
    const gameResultLines = gameResult.split('\n');
    const winner = gameResultLines[gameResultLines.length - 1];

    expect(winner).toContain(`가 최종 우승했습니다.`);
  });
});
