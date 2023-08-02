const Car = require('../src/model/Car.js');
const Track = require('../src/model/Track.js');
const WinnerChecker = require('../src/model/WinnerChecker.js');
const Validator = require('../src/Validator.js');
const { getRandomNumber, splitByStandard } = require('../src/utils.js');
const {
  MIN_USER_COUNT,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_RANDOM_NUMBER,
  MAX_RANDOM_NUMBER,
  SPLIT_STANDARD,
  SKID_MARK,
  MIN_ROUND_COUNT,
  MAX_ROUND_COUNT,
} = require('../src/constants/racing-rule.js');
const { MESSAGES, ERROR_MESSAGES } = require('../src/constants/messages.js');

describe('유틸리티 함수 테스트', () => {
  test(`문자열을 ${SPLIT_STANDARD} 기준으로 나누어 배열로 반환한다.`, () => {
    const input = 'A,b,C,D.D';
    const result = splitByStandard(input);

    expect(result).toEqual(['A', 'b', 'C', 'D.D']);
  });

  test(`문자열을 나눌때 양 끝 공백을 제거한다.`, () => {
    const input = 'A, b,   C,  D.D   ';
    const result = splitByStandard(input);

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

describe('자동차의 이름 목록을 입력 받는다.', () => {
  test('일반적인 케이스 "JAMES, KANE, MARK"', () => {
    expect(() => {
      const input = 'A,B,C';
      const slicedInput = splitByStandard(input);

      Validator.isValidList(slicedInput);
    }).not.toThrow();
  });

  test('일반적인 케이스 "JAMES, KANE, MARK, ALEX, LEE"', () => {
    expect(() => {
      const input = 'JAMES, KANE, MARK, ALEX, LEE';
      const slicedInput = splitByStandard(input);

      Validator.isValidList(slicedInput);
    }).not.toThrow();
  });

  /*
  현재 최대 인원 제한이 없으므로 주석처리

  test(`참가자가 ${MAX_USER_COUNT} 초과인 케이스 "A,B,C,D,E,F"`, () => {
    const input = 'A,B,C,D,E,F';
    const slicedInput = splitByStandard(input);

    Validator.isValidNames(slicedInput);
    expect(() => {}).toThrow(ERROR_MESSAGES.MORE_THAN_MAX_USER_COUNT);
  });
  */

  test(`참가자가 ${MIN_USER_COUNT}명 미만인 케이스 "JAMES"`, () => {
    expect(() => {
      const input = 'JAMES';
      const slicedInput = splitByStandard(input);

      Validator.isValidList(slicedInput);
    }).toThrow(ERROR_MESSAGES.LESS_THAN_MIN_USER_COUNT);
  });

  test('참가자가 중복된 케이스 "A,A,B,C,D,E"', () => {
    expect(() => {
      const input = 'A,A,B,C,D,E';
      const slicedInput = splitByStandard(input);

      Validator.isValidList(slicedInput);
    }).toThrow(ERROR_MESSAGES.HAS_DUPLICATED_NAME);
  });
});

describe('자동차를 생성한다.', () => {
  test(`이름이 ${MAX_NAME_LENGTH}자 초과인 케이스 "Calvin"`, () => {
    expect(() => {
      const input = 'Calvin';

      Validator.isValidName(input);
    }).toThrow(ERROR_MESSAGES.MORE_THAN_MAX_NAME_LENGTH);
  });

  test(`이름이 ${MIN_NAME_LENGTH}자 미만인 케이스 " "`, () => {
    expect(() => {
      const input = '';

      Validator.isValidName(input);
    }).toThrow(ERROR_MESSAGES.LESS_THAN_MIN_NAME_LENGTH);
  });
});

describe('진행할 라운드를 입력 받는다.', () => {
  test('일반적인 케이스 "3"', () => {
    expect(() => {
      const input = '3';

      Validator.isValidRound(input);
    }).not.toThrow();
  });

  test(`입력한 라운드가 ${MIN_ROUND_COUNT}회 미만인 케이스 `, () => {
    expect(() => {
      const input = '0';

      Validator.isValidRound(input);
    }).toThrow(ERROR_MESSAGES.LESS_THAN_MIN_ROUND_COUNT);
  });

  test(`입력한 라운드가 ${MAX_ROUND_COUNT}회 초과인 케이스 `, () => {
    expect(() => {
      const input = '6';

      Validator.isValidRound(input);
    }).toThrow(ERROR_MESSAGES.MORE_THAN_MAX_ROUND_COUNT);
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
    const track = new Track(4);

    for (let i = 0; i < track.endRound - 1; i += 1) {
      track.increaseRound();
    }

    expect(track.isEndRound()).toBeFalsy();
  });

  test('라운드가 최대 라운드를 넘으면 종료한다.', () => {
    const track = new Track('3');

    for (let i = 0; i < track.endRound; i += 1) {
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
