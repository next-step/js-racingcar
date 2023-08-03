import { ERROR_MESSAGE, INPUT_MESSAGE } from '../src/constants/message.js';
import { AVALIABLE_RANDOM_NUMBER } from '../src/constants/randomNumber.js';
import { SEPERATOR_SYMBOLS } from '../src/constants/commons.js';
import { CAR_MAX_LENGTH, CAR_MIN_LENGTH } from '../src/constants/validate.js';
import { RacingCars, RacingGame } from '../src/model/index.js';
import { NumberMaker } from '../src/NumberMaker.js';
import { MockNumberMaker } from './utils/index.js';
import { Validator } from '../src/Validator.js';

describe.each([
  [4, 'jiny,react,vue'],
  [2, 'jine,mouse'],
  [3, 'book,pen,cil'],
  [5, 'apple,panda,fee,conf,cook'],
])('자동차 경주 기능 관련 테스트', (count, carNames) => {
  test(`자동차 경주는 ${count} 만큼 진행한다.`, () => {
    const racingGame = new RacingGame(carNames, count);
    racingGame.race();
    const result = racingGame.getRacingResult().length;
    expect(result === count).toBeTruthy();
  });

  test('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    const racingGame = new RacingGame(carNames, count);
    racingGame.race();
    const carNamesArr = carNames.split(SEPERATOR_SYMBOLS.COMMA);
    racingGame
      .getRacingResult()
      .at(-1)
      .split(SEPERATOR_SYMBOLS.NEW_LINE)
      .forEach((status, i) => expect(status.includes(carNamesArr[i])).toBeTruthy());
  });

  test('무작위 값은 0에서 9사이에서 나올 수 있어야 한다.', () => {
    const randomNumbers = Array.from({ length: count }, () => NumberMaker.createRandomNumber());
    randomNumbers.forEach((randomNumber) => {
      expect(randomNumber).not.toBeLessThan(0);
      expect(randomNumber).not.toBeGreaterThan(9);
    });
  });

  test('모든 자동차들은 랜덤 숫자가 4 이상 일 경우에만 이동할 수 있다.', () => {
    const racingCars = new RacingCars(carNames, MockNumberMaker);
    const createRandomNumberForSuccess = () => AVALIABLE_RANDOM_NUMBER;
    MockNumberMaker.createRandomNumber = createRandomNumberForSuccess;
    let moveStatus = racingCars.move(carNames);
    let result = Object.values(moveStatus);
    expect(result).toStrictEqual(Array(result.length).fill('-'));

    const createRandomNumberForStop = () => AVALIABLE_RANDOM_NUMBER - 1;
    MockNumberMaker.createRandomNumber = createRandomNumberForStop;
    moveStatus = racingCars.move(carNames);
    result = Object.values(moveStatus);
    expect(result).toStrictEqual(Array(result.length).fill('-'));
  });
});

describe.each([
  [4, 'jiny,react,vue'],
  [2, 'jine,mouse'],
  [3, 'book,pen,cil'],
  [5, 'apple,panda,fee,conf,cook'],
])('자동차 게임 우승자 출력 테스트', (count, carNames) => {
  test('자동차 게임이 완료되었을 때 우승자는 최소 1명 이상 나올 수 있다.', () => {
    const racingGame = new RacingGame(carNames, count);
    racingGame.race();
    const winners = racingGame.confirmRacingWinners();
    expect(winners.length >= 1).toBeTruthy();
  });
});

describe('자동차 게임 예외 처리 테스트', () => {
  const validateCarNames = (invalidCase) => Validator.check(invalidCase, INPUT_MESSAGE.RACING_CAR);
  const validateCount = (invalidCase) => Validator.check(invalidCase, INPUT_MESSAGE.COUNT);
  test.each(['jiny,re,ac, t', ' ', 're, a,ct', ' v,u,e', '1, 2, 3'])(
    '%s중 공백이 있는 자동차 이름이 존재하여 Syntax Error 및 에러 메시지가 발생한다.',
    (invalidCase) => {
      expect(() => validateCarNames(invalidCase)).toThrow(ERROR_MESSAGE.INCLUDE_EMPTY_WORDS);
      expect(() => validateCarNames(invalidCase)).toThrow(SyntaxError);
    },
  );

  test.each(['conf,react,ji1n', 'jiny,[a~@', 'jinyy,^%$', 'car,jiny🚑', 'jine,go➔'])(
    '%s 중 한/영문자에 해당되는 문자가 아닌 자동차 이름이 존재하여 TypeError 및 에러 메시지가 발생한다.',
    (invalidCase) => {
      expect(() => validateCarNames(invalidCase)).toThrow(ERROR_MESSAGE.AVALIABLE_CHARACTER);
      expect(() => validateCarNames(invalidCase)).toThrow(TypeError);
    },
  );

  test.each(['pobi,jiny,', 'taling,pivot,robot', 'jiny,,react', ''])(
    '자동차 이름은 1~5자여야 하며 이를 어길 시 RangeError와 에러 메시지가 확인되어야 한다.',
    (invalidCase) => {
      expect(() => validateCarNames(invalidCase)).toThrow(
        ERROR_MESSAGE.INVALID_RANGE(CAR_MIN_LENGTH, CAR_MAX_LENGTH),
      );
      expect(() => validateCarNames(invalidCase)).toThrow(RangeError);
    },
  );

  test.each(['jiny,jiny,jiny', 'jine,jine,jine', 'pobi,pobi'])(
    '중복되는 자동차 이름이 존재한다면 Syntax Error와 에러 메시지가 확인되어야 한다.',
    (invalidCase) => {
      expect(() => validateCarNames(invalidCase)).toThrow(SyntaxError);
      expect(() => validateCarNames(invalidCase)).toThrow(ERROR_MESSAGE.DUPLICATE_CAR_NAMES);
    },
  );

  test.each(['', 'asdfas', '[]23]', '👍🔥'])(
    '숫자가 아닌 값이 count로 들어올 경우 TypeError Error와 에러 메시지가 확인되어야 한다.',
    (invalidCase) => {
      expect(() => validateCount(invalidCase)).toThrow(TypeError);
      expect(() => validateCount(invalidCase)).toThrow(ERROR_MESSAGE.AVALIABLE_NUMBER);
    },
  );
});
