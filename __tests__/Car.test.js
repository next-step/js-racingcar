const App = require('../src/App.js');
const { MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER } = require('../src/constants.js');
const Car = require('../src/model/Car.js');
const Track = require('../src/model/Track.js');
const { getRandomNumber } = require('../src/utils.js');
const View = require('../src/view/view.js');

describe('사용자의 입력값을 받는다.', () => {
  const app = new App();

  test('일반적인 케이스 "A,B,C"', () => {
    expect(() => {
      app.isValidatedNames('A, B, C');
    }).not.toThrowError();
  });

  test('일반적인 케이스 "A,B,C,D,E"', () => {
    expect(() => {
      app.isValidatedNames('A, B, C');
    }).not.toThrowError();
  });

  test('다섯글자 이상인 케이스 "AAAAAA,B,C,D,E"', () => {
    expect(() => {
      app.isValidatedNames('A, B, C');
    }).toThrowError();
  });

  test('참가자가 없는 케이스 "   "', () => {
    expect(() => {
      app.isValidatedNames('   ');
    }).toThrowError();
  });
});

describe('자동차를 이동시킨다.', () => {
  const car = new Car('test');

  test('0부터 9 사이의 무작위 값을 받는다.', () => {
    const randomNumber = getRandomNumber();

    expect(randomNumber).toBeGreaterThanOrEqual(MIN_RANDOM_NUMBER);
    expect(randomNumber).toBeLessThanOrEqual(MAX_RANDOM_NUMBER);
  });

  test('랜덤한 값이 4 이하라면 false를 반환한다.', () => {
    const isMoved = car.isMoved(3);

    expect(isMoved).toBeFalsy();
  });

  test('차를 이동시키면 distance가 1 증가한다.', () => {
    const prevDistance = car.distance;
    car.move();
    const nextDistance = car.distance;

    expect(nextDistance).toBe(prevDistance + 1);
  });
});

describe('경기 현황을 출력한다.', () => {
  test('A = 2인 경우', () => {
    const A = new Car('A');
    A.move();
    View.renderCarDistance(A.name, A.distance);
    expect(console.log).toHaveBeenCalledWith('A : --');
  });

  test('B = 4인 경우', () => {
    const B = new Car('B');
    B.move();
    B.move();
    B.move();
    View.renderCarDistance(B.name, B.distance);
    expect(console.log).toHaveBeenCalledWith('A : ----');
  });
});

describe('경기가 종료될 시 경기결과를 출력한다.', () => {
  test('라운드가 5라운든 이하면 종료하지 않는다.', () => {
    const track = new Track();
    track.increaseRound();
    track.increaseRound();
    expect(track.isEndRound()).toBeTruthy();
  });

  test('라운드가 5라운드면 종료한다.', () => {
    const track = new Track();
    track.increaseRound();
    track.increaseRound();
    track.increaseRound();
    track.increaseRound();
    expect(track.isEndRound()).toBeTruthy();
  });

  test('우승자를 출력한다.', () => {
    const A = new Car('A');
    const B = new Car('B');
    View.renderResult(A.name, B.name);
    expect(console.log).toHaveBeenCalledWith('A, B가 최종 우승했습니다.');
  });
});
