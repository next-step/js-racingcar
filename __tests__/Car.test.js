const Car = require('../src/model/Car.js');
const Track = require('../src/model/Track.js');
const WinnerChecker = require('../src/model/WinnerChecker.js');
const Validator = require('../src/Validator.js');
const { getRandomNumber, sliceByStandard } = require('../src/utils.js');
const View = require('../src/view/view.js');

// custom matcher
// eslint-disable-next-line
const toEqualType = require('../matchers/customMatchers.js');
const {
  MIN_USER,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_RANDOM_NUMBER,
  MAX_RANDOM_NUMBER,
} = require('../src/constants/racing-rule.js');
const { MESSAGES } = require('../src/constants/messages.js');

describe('사용자의 입력값을 받는다.', () => {
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
    }).toThrow(MESSAGES.ERROR.MORE_THAN_MAX_NAME_LENGTH);
  });

  test(`입력값 중에 글자수가 ${MIN_NAME_LENGTH}자 미만이 존재하는 케이스 ", KANE, MARK, ALEX"`, () => {
    expect(() => {
      const input = ', KANE, MARK, ALEX';
      const slicedInput = sliceByStandard(input);

      Validator.isValidNames(slicedInput);
    }).toThrow(MESSAGES.ERROR.LESS_THAN_MIN_NAME_LENGTH);
  });

  /*
  test(`참가자가 ${MAX_USER} 초과인 케이스 "A,B,C,D,E,F"`, () => {
    const input = 'A,B,C,D,E,F';
    const slicedInput = sliceByStandard(input);

    Validator.isValidNames(slicedInput);
    expect(() => {}).toThrow(MESSAGES.ERROR.MORE_THAN_MAX_USER);
  });
  */

  test(`참가자가 ${MIN_USER}명 미만인 케이스 "JAMES"`, () => {
    expect(() => {
      const input = 'JAMES';
      const slicedInput = sliceByStandard(input);
      console.log(slicedInput);

      Validator.isValidNames(slicedInput);
    }).toThrow(MESSAGES.ERROR.LESS_THAN_MIN_USER);
  });

  test('참가자가 중복된 케이스 "A,A,B,C,D,E"', () => {
    expect(() => {
      const input = 'A,A,B,C,D,E';
      const slicedInput = sliceByStandard(input);

      Validator.isValidNames(slicedInput);
    }).toThrow(MESSAGES.ERROR.HAS_DUPLICATED_NAME);
  });
});

// describe('자동차를 이동시킨다.', () => {
//   const car = new Car('test');

//   test('0부터 9 사이의 무작위 값을 받는다.', () => {
//     const randomNumber = getRandomNumber();

//     expect(randomNumber).toBeGreaterThanOrEqual(MIN_RANDOM_NUMBER);
//     expect(randomNumber).toBeLessThanOrEqual(MAX_RANDOM_NUMBER);
//   });

//   test('car의 isMoved는 boolean을 반환한다.', () => {
//     const isMoved = car.isMoved();

//     expect(isMoved).toEqualType('boolean');
//   });

//   test('차를 이동시키면 distance가 1 증가한다.', () => {
//     const prevDistance = car.distance;
//     car.move();
//     const nextDistance = car.distance;

//     expect(nextDistance).toBe(prevDistance + 1);
//   });
// });

// describe('경기를 진행한다.', () => {
//   const logSpy = jest.spyOn(console, 'log');

//   test('A = 2인 경우', () => {
//     const A = new Car('A');
//     A.move();
//     View.renderCarDistance(A.name, A.distance);
//     expect(logSpy).toHaveBeenCalledWith('A : --');
//   });

//   test('B = 4인 경우', () => {
//     const B = new Car('B');
//     B.move();
//     B.move();
//     B.move();
//     View.renderCarDistance(B.name, B.distance);
//     expect(logSpy).toHaveBeenCalledWith('A : --');
//   });
// });

// describe('경기가 종료될 시 경기결과를 출력한다.', () => {
//   test('라운드가 최대 라운드 이하면 종료하지 않는다.', () => {
//     const track = new Track();
//     track.increaseRound();
//     track.increaseRound();
//     expect(track.isEndRound()).toBeFalsy();
//   });

//   test('라운드가 최대 라운드를 넘으면 종료한다.', () => {
//     const track = new Track();
//     track.increaseRound();
//     track.increaseRound();
//     track.increaseRound();
//     track.increaseRound();
//     track.increaseRound();
//     expect(track.isEndRound()).toBeTruthy();
//   });

//   test('우승자를 계산한다.', () => {
//     const foo = new Car('foo');
//     foo.move();
//     foo.move();
//     const bar = new Car('bar');
//     bar.move();
//     const baz = new Car('baz');
//     baz.move();

//     const DUMMY = [foo, bar, baz];
//     expect(WinnerChecker.getWinners(DUMMY)).toEqual(['foo']);
//   });

//   test('다수의 우승자가 존재할 수 있다.', () => {
//     const foo = new Car('foo');
//     foo.move();
//     foo.move();
//     foo.move();
//     const bar = new Car('bar');
//     bar.move();
//     bar.move();
//     bar.move();
//     const baz = new Car('baz');
//     baz.move();

//     const DUMMY = [foo, bar, baz];
//     expect(WinnerChecker.getWinners(DUMMY)).toEqual(['foo', 'bar']);
//   });
// });
