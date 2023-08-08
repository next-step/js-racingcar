const Car = require('../src/domain/model/Car.js');
const Track = require('../src/domain/model/Track.js');
const WinnerChecker = require('../src/domain/model/WinnerChecker.js');
const validator = require('../src/validator.js');
const { splitByStandard } = require('../src/utils.js');
const {
  MIN_USER_COUNT,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  SPLIT_STANDARD,
  SKID_MARK,
  MIN_ROUND_COUNT,
  MAX_ROUND_COUNT,
  MAX_USER_COUNT,
  MOVE_STANDARD,
  MOVING_DISTANCE_PER_ROUND,
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
});

describe('자동차의 이름 목록을 입력 받는다.', () => {
  test.each(['JAMES, KANE, MARK', 'JAMES, KANE, MARK, ALEX, LEE'])('일반적인 케이스', (input) => {
    expect(() => {
      const slicedInput = splitByStandard(input);

      validator.checkValidCarList(slicedInput);
    }).not.toThrow();
  });

  // 현재 최대 인원 제한이 없으므로 skip

  test.skip(`참가자가 ${MAX_USER_COUNT} 초과인 케이스 "A,B,C,D,E,F"`, () => {
    const input = 'A,B,C,D,E,F';
    const slicedInput = splitByStandard(input);

    validator.checkValidCarNames(slicedInput);

    expect(() => {}).toThrow(ERROR_MESSAGES.MORE_THAN_MAX_USER_COUNT);
  });

  test(`참가자가 ${MIN_USER_COUNT}명 미만인 케이스 "JAMES"`, () => {
    expect(() => {
      const input = 'JAMES';
      const slicedInput = splitByStandard(input);

      validator.checkValidCarList(slicedInput);
    }).toThrow(ERROR_MESSAGES.LESS_THAN_MIN_USER_COUNT);
  });

  test('참가자가 중복된 케이스 "A,A,B,C,D,E"', () => {
    expect(() => {
      const input = 'A,A,B,C,D,E';
      const slicedInput = splitByStandard(input);

      validator.checkValidCarList(slicedInput);
    }).toThrow(ERROR_MESSAGES.HAS_DUPLICATED_NAME);
  });
});

describe('자동차를 생성한다.', () => {
  test(`이름이 ${MAX_NAME_LENGTH}자 초과인 케이스 "Calvin"`, () => {
    expect(() => {
      const input = 'Calvin';

      validator.checkValidCarName(input);
    }).toThrow(ERROR_MESSAGES.MORE_THAN_MAX_NAME_LENGTH);
  });

  test(`이름이 ${MIN_NAME_LENGTH}자 미만인 케이스 " "`, () => {
    expect(() => {
      const input = '';

      validator.checkValidCarName(input);
    }).toThrow(ERROR_MESSAGES.LESS_THAN_MIN_NAME_LENGTH);
  });
});

describe('진행할 라운드를 입력 받는다.', () => {
  test.each(['1', '2', '3', '4', '5'])('일반적인 케이스', (input) => {
    expect(() => {
      new Track(input);
    }).not.toThrow();
  });

  test(`입력한 라운드가 ${MIN_ROUND_COUNT}회 미만인 케이스 `, () => {
    expect(() => {
      const input = '0';

      new Track(input);
    }).toThrow(ERROR_MESSAGES.LESS_THAN_MIN_ROUND_COUNT);
  });

  test(`입력한 라운드가 ${MAX_ROUND_COUNT}회 초과인 케이스 `, () => {
    expect(() => {
      const input = '6';

      new Track(input);
    }).toThrow(ERROR_MESSAGES.MORE_THAN_MAX_ROUND_COUNT);
  });

  test(`입력한 라운드가 숫자가 아닌 경우`, () => {
    expect(() => {
      const input = '안녕';

      new Track(input);
    }).toThrow(ERROR_MESSAGES.IS_NOT_NUMBER);
  });

  test(`입력한 라운드가 공백인 경우`, () => {
    expect(() => {
      const input = '';

      new Track(input);
    }).toThrow(ERROR_MESSAGES.IS_EMPTY);
  });
});

describe('자동차를 이동시킨다.', () => {
  test.each([0, 1, 2, 3])(`차는 값이 ${MOVE_STANDARD} 이하일시 이동하지 않는다.`, (power) => {
    const car = new Car('test');
    const initialDistance = car.distance;

    car.move(power);

    expect(car.distance).toBe(initialDistance);
  });

  test.each([4, 5, 6, 7, 8, 9])(
    `차는 값이 ${MOVE_STANDARD} 이상일시 ${MOVING_DISTANCE_PER_ROUND}칸 이동한다.`,
    (power) => {
      const car = new Car('test');
      const initialDistance = car.distance;

      car.move(power);

      expect(car.distance).toBe(initialDistance + MOVING_DISTANCE_PER_ROUND);
    }
  );
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
