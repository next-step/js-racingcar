const readline = require('readline');
const App = require('../src/App.js');
const Car = require('../src/model/Car.js');
const Track = require('../src/model/Track.js');
const WinnerChecker = require('../src/model/WinnerChecker.js');
const Validator = require('../src/Validator.js');
const { getRandomNumber, sliceByStandard } = require('../src/utils.js');
const {
  MIN_USER,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_RANDOM_NUMBER,
  MAX_RANDOM_NUMBER,
  SLICE_STANDARD,
  DEFAULT_RACING_ROUND,
  SKID_MARK,
} = require('../src/constants/racing-rule.js');
const { MESSAGES, ERROR_MESSAGES } = require('../src/constants/messages.js');

jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => ['text1', 'text2']);

describe('유틸리티 함수 테스트', () => {
  test(`문자열을 ${SLICE_STANDARD} 기준으로 나누어 배열로 반환한다.`, () => {
    const input = 'A,b,C,D.D';
    const result = sliceByStandard(input);

    expect(result).toEqual(['A', 'b', 'C', 'D.D']);
  });

  test(`문자열을 나눌때 양 끝 공백을 제거한다.`, () => {
    const input = 'A, b,   C,  D.D   ';
    const result = sliceByStandard(input);

    expect(result).toEqual(['A', 'b', 'C', 'D.D']);
  });

  test(`${MIN_RANDOM_NUMBER}부터 ${MAX_RANDOM_NUMBER} 사이의 무작위 값을 받는다.`, () => {
    const manyCases = Array.from({ length: 1000 }, () => getRandomNumber());

    const hasInvalidNumber = manyCases.some((num) => num > MAX_RANDOM_NUMBER || num < MIN_RANDOM_NUMBER);
    expect(hasInvalidNumber).toBeFalsy();

    manyCases.push(MAX_RANDOM_NUMBER + 1);
    manyCases.push(MIN_RANDOM_NUMBER - 1);
    const invalidCase = manyCases.some((num) => num > MAX_RANDOM_NUMBER || num < MIN_RANDOM_NUMBER);

    expect(invalidCase).toBeTruthy();
  });
});

describe('사용자의 입력값을 받는다.', () => {
  const app = new App();
  app.init();

  test('일반적인 케이스 "JAMES, KANE, MARK"', () => {
    expect(() => {
      const input = 'A,B,C';
      const slicedInput = sliceByStandard(input);

      Validator.isValidNames(slicedInput);
    }).not.toThrow();
  });

  test('일반적인 케이스 "JAMES, KANE, MARK, ALEX, LEE"', () => {
    expect(() => {
      const input = 'JAMES, KANE, MARK, ALEX, LEE';
      const slicedInput = sliceByStandard(input);

      Validator.isValidNames(slicedInput);
    }).not.toThrow();
  });

  test(`입력값 중에 글자수가 ${MAX_NAME_LENGTH}자 초과가 존재하는 케이스 "JAMES, KANE, MARK, ALEXANDER"`, () => {
    expect(() => {
      const input = 'JAMES, KANE, MARK, ALEXANDER';
      const slicedInput = sliceByStandard(input);

      Validator.isValidNames(slicedInput);
    }).toThrow(ERROR_MESSAGES.MORE_THAN_MAX_NAME_LENGTH);
  });

  test(`입력값 중에 글자수가 ${MIN_NAME_LENGTH}자 미만이 존재하는 케이스 ", KANE, MARK, ALEX"`, () => {
    expect(() => {
      const input = ', KANE, MARK, ALEX';
      const slicedInput = sliceByStandard(input);

      Validator.isValidNames(slicedInput);
    }).toThrow(ERROR_MESSAGES.LESS_THAN_MIN_NAME_LENGTH);
  });

  /*
  현재 최대 인원 제한이 없으므로 주석처리

  test(`참가자가 ${MAX_USER} 초과인 케이스 "A,B,C,D,E,F"`, () => {
    const input = 'A,B,C,D,E,F';
    const slicedInput = sliceByStandard(input);

    Validator.isValidNames(slicedInput);
    expect(() => {}).toThrow(ERROR_MESSAGES.MORE_THAN_MAX_USER);
  });
  */

  test(`참가자가 ${MIN_USER}명 미만인 케이스 "JAMES"`, () => {
    expect(() => {
      const input = 'JAMES';
      const slicedInput = sliceByStandard(input);

      Validator.isValidNames(slicedInput);
    }).toThrow(ERROR_MESSAGES.LESS_THAN_MIN_USER);
  });

  test('참가자가 중복된 케이스 "A,A,B,C,D,E"', () => {
    expect(() => {
      const input = 'A,A,B,C,D,E';
      const slicedInput = sliceByStandard(input);

      Validator.isValidNames(slicedInput);
    }).toThrow(ERROR_MESSAGES.HAS_DUPLICATED_NAME);
  });
});

describe('자동차를 이동시킨다.', () => {
  test('차는 이동 요청시 항상 그대로거나 한칸 앞으로 이동한다.', () => {
    for (let i = 0; i < 1000; i += 1) {
      const car = new Car('test');

      const prevDistance = car.distance;
      car.moveByRandomNumber();
      const nextDistance = car.distance;

      expect([prevDistance + 1, prevDistance]).toContain(nextDistance);
    }
  });
});

describe('경기를 진행한다.', () => {
  test('foo의 distance가 2인 경우 "foo : --"를 출력한다"', () => {
    const distance = 2;

    const DUMMY_CAR = {
      name: 'foo',
      distance,
    };

    expect(MESSAGES.GAME.carsDistance(DUMMY_CAR)).toBe(`foo : ${SKID_MARK.repeat(distance)}`);
  });
});

describe('경기가 종료될 시 경기결과를 출력한다.', () => {
  test('라운드가 최대 라운드 이하면 종료하지 않는다.', () => {
    const track = new Track();

    for (let i = 0; i < DEFAULT_RACING_ROUND - 1; i += 1) {
      track.increaseRound();
    }

    expect(track.isEndRound()).toBeFalsy();
  });

  test('라운드가 최대 라운드를 넘으면 종료한다.', () => {
    const track = new Track();

    for (let i = 0; i < DEFAULT_RACING_ROUND; i += 1) {
      track.increaseRound();
    }

    expect(track.isEndRound()).toBeTruthy();
  });

  test('우승자를 계산한다.', () => {
    const winnerChecker = new WinnerChecker();
    const DUMMY_CAR = [
      {
        name: 'foo',
        distance: 4,
      },
      {
        name: 'bar',
        distance: 2,
      },
      {
        name: 'baz',
        distance: 1,
      },
    ];

    winnerChecker.addResult(DUMMY_CAR);
    const { winners } = winnerChecker;

    expect(winners).toEqual(['foo']);
  });

  test('다수의 우승자가 존재할 수 있다.', () => {
    const winnerChecker = new WinnerChecker();
    const DUMMY_CAR = [
      {
        name: 'foo',
        distance: 4,
      },
      {
        name: 'bar',
        distance: 2,
      },
      {
        name: 'baz',
        distance: 4,
      },
    ];

    winnerChecker.addResult(DUMMY_CAR);
    const { winners } = winnerChecker;

    expect(winners).toEqual(['foo', 'baz']);
  });
});
