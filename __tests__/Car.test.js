import { GameController } from '../src/Controllers/GameController';
import { Car } from '../src/Models';
import { MESSAGE, VALIDATOR } from '../src/constants';
import { splitCarNameToArray } from '../src/utils';

// 테스트는 상위 레이어에서 인터페이스 위주로 진행하기.

// 2단계

const logSpy = jest.spyOn(console, 'log');

describe('게임 시작', () => {
  test('GameController가 정상적으로 생성되는지 확인한다.', () => {
    const model = {};
    const view = {};
    const gameController = new GameController(model, view);

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
    const car = new Car('pobi');

    expect(car).toBeInstanceOf(Car);
  });

  test('자동차 이름 길이가 최대 길이를 초과할 경우 에러가 발생한다.', () => {
    const INVALID_CAR_NAME = 'pengoose';

    expect(() => new Car(INVALID_CAR_NAME)).toThrow(
      MESSAGE.ERROR.IS_WITH_IN_MAX_LENGTH(VALIDATOR.MAX_CAR_NAME_LENGTH)
    );
  });
});

describe('자동차 경주 셋팅', () => {
  test('주어진 횟수에 따라 경주가 진행된다.', () => {});
});

describe('자동차 경주 시작', () => {
  test('랜덤 값이 4 이상일 경우 자동차가 전진하는지 확인한다.', () => {
    const car = new Car('pobi');
    const RANDOM_INT = 8;
    if (RANDOM_INT >= 4) car.advance();

    expect(car.position).toBe(1);
  });
});

describe('우승자 확인', () => {
  test('GameController가 우승자를 정상적으로 출력하는지 확인한다.', () => {
    const winner = 'pobi'; // 구현해야 함.

    expect(winner).toEqual();
  });
});
