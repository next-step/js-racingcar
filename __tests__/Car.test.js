import RacingCar from '../src/domain/racing-car.js';
import Racer from '../src/domain/racer.js';
import UserIO from '../src/view/user-io.js';
import { getRandomNumber } from '../src/utils/common.util.js';
import {
  ERROR_EXIT_MESSAGE,
  ERROR_WRONG_INPUT_MESSAGE,
} from '../src/constants/error.const.js';
import { readline } from '../src/utils/readline.util.js';

const userIO = new UserIO(readline);

const racingCar = new RacingCar();
const racer = new Racer();

const initialize = () => {
  racingCar.init();
};

// 콘솔에서 동작하는 자동차 경주 게임을 구현한다.
describe('Racing Car Game', () => {
  // 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
  it('Racer names: pobi,crong,honux -> true', () => {
    initialize();

    expect(racingCar.validateCarNamesInput('pobi,crong,honux')).toBe(true);
  });

  // 자동차 경주는 5회로 고정하여 진행한다.
  it('Race Loop times 5 -> true', () => {
    initialize();

    const racers = [
      { name: 'pobi', state: '-' },
      { name: 'crong', state: '-' },
      { name: 'honux', state: '-' },
    ];
    racingCar.setCount(5);
    racingCar.race(racers);
    expect(racingCar.count).toBe(5);
  });

  // 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
  it('Logging Car name', () => {
    const spyFn = jest.spyOn(racer, 'printRacingState');

    initialize();

    const racers = [
      { name: 'pobi', state: '-' },
      { name: 'crong', state: '-' },
      { name: 'honux', state: '-' },
    ];

    racers.forEach(({ name, state }) => {
      racer.printRacingState(name, state);
    });

    expect(spyFn).toBeCalledTimes(3);
    expect(spyFn).toBeCalledWith('pobi', '-');
    expect(spyFn).toBeCalledWith('crong', '-');
    expect(spyFn).toBeCalledWith('honux', '-');
  });

  // 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
  it('Go and GoCheck', () => {
    initialize();

    const randomNumber = getRandomNumber(0, 9);
    expect(randomNumber).toBeGreaterThanOrEqual(0);
    expect(randomNumber).toBeLessThanOrEqual(9);

    if (randomNumber < 4) {
      expect(racer.checkGo(randomNumber)).toBe(false);
      return;
    }

    expect(racer.checkGo(randomNumber)).toBe(true);
  });

  // 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
  it('Print Race Winners', () => {
    initialize();

    const racers = [
      { name: 'pobi', state: '-' },
      { name: 'crong', state: '-' },
      { name: 'honux', state: '-' },
    ];
    racingCar.race(racers);
    userIO.outputWinners(racingCar.getWinners());

    expect(racingCar.winners.length > 0).toBe(true);
  });

  // 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
  it('Race Winners', () => {
    initialize();

    const racers = [
      { name: 'pobi', state: '-' },
      { name: 'crong', state: '-' },
      { name: 'honux', state: '-' },
    ];
    racingCar.race(racers);
    userIO.outputWinners(racingCar.getWinners());

    if (racingCar.winners.length > 1) {
      expect(racingCar.getWinners()).toMatch(/,/);
    }
  });

  // 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.
  it('Wrong Input', () => {
    initialize();

    const testInput = () => {
      if (!racingCar.validateCarNamesInput('pobi,crong,honuasdfx')) {
        userIO.exit();
      }
    };

    expect(testInput).toThrow(ERROR_EXIT_MESSAGE);
  });

  // 사용자가 잘못된 입력 값을 작성한 경우 에러 메시지를 보여주고, 다시 입력할 수 있게 한다.
  it('Wrong Input -> Show Error message, and then restart', () => {
    initialize();

    const testInput = () => {
      if (!racingCar.validateCarNamesInput('pobi,crong,honuasdfx')) {
        return ERROR_WRONG_INPUT_MESSAGE;
      }
    };

    expect(testInput()).toBe(ERROR_WRONG_INPUT_MESSAGE);
  });

  // 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
  it('User input count', () => {
    initialize();

    racingCar.setCount(3);

    expect(racingCar.count).toBe(3);
  });

  // 주어진 횟수 동안 n 대의 자동차는 전진 또는 멈출 수 있다.
  it('Car race within user input count', () => {
    initialize();

    const racers = [
      { name: 'pobi', state: '-' },
      { name: 'crong', state: '-' },
      { name: 'honux', state: '-' },
    ];
    racingCar.setCount(5);
    racingCar.race(racers);

    expect(racingCar.count).toBe(5);
  });
});
