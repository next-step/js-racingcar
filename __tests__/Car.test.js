import racingCar from '../src/racing-car.js';
import racer from '../src/racer.js';
import { getRaceRandomNumber } from '../src/utils/race.util.js';

const initialize = () => {
  racingCar.init();
  racer.init();
};

// 콘솔에서 동작하는 자동차 경주 게임을 구현한다.
describe('Racing Car Game', () => {
  // 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
  it('Racer names: pobi,crong,honux -> true', () => {
    initialize();

    expect(racingCar.validateInput('pobi,crong,honux')).toBe(true);
  });

  // 자동차 경주는 5회로 고정하여 진행한다.
  // 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
  it('Race Loop times 5 -> true', () => {
    initialize();

    const racers = [
      { name: 'pobi', state: '-' },
      { name: 'crong', state: '-' },
      { name: 'honux', state: '-' },
    ];
    racingCar.race(racers);
    expect(racingCar.count).toBe(5);
  });

  // 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
  it('Go and GoCheck', () => {
    initialize();

    const randomNumber = getRaceRandomNumber();
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
    racingCar.printWinners();

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
    racingCar.printWinners();

    if (racingCar.winners.length > 1) {
      expect(racingCar.getWinners()).toMatch(/,/);
    }
  });

  // 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.
  it('Wrong Input', () => {
    initialize();

    const testInput = () => {
      if (!racingCar.validateInput('pobi,crong,honuasdfx')) {
        racingCar.exit();
      }
    };

    expect(testInput).toThrow('잘못된 입력 값으로 프로그램을 종료합니다.');
  });
});
