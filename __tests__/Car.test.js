import App from '../src';
import NumberMaker from '../src/NumberMaker';
import { ERROR_MESSAGE, INPUT_MESSAGE } from '../src/constants';
import { genRacingWinners } from '../src/utils';
import { isMove } from '../src/utils/racingTrack';
import Validator from '../src/Validator.js';
import { InputView, OutputView } from '../src/view';
import { containsAllRacers, containsAllStatus } from './utils';

jest.mock('node:readline/promises', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn().mockResolvedValue('jiny,pobi,conan'),
    close: jest.fn(),
  }),
}));

describe('자동차 입력 기능 관련 테스트', () => {
  let carNames;

  beforeAll(async () => {
    carNames = await InputView.input(INPUT_MESSAGE.RACING_CAR);
  });

  test('사용자는 자동차 이름을 입력할 수 있어야 한다.', () => {
    expect(carNames).toStrictEqual(['jiny', 'pobi', 'conan']);
  });
});

describe('자동차 경주 기능 관련 테스트', () => {
  const app = new App();
  let printLogSpy;

  beforeEach(() => {
    app.play();
    printLogSpy = jest.spyOn(OutputView, 'print');
    printLogSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    printLogSpy.mockRestore();
  });

  test('자동차 경주는 5회로 고정하여 진행한다.', () => {
    expect(
      printLogSpy.mock.calls.filter((printLog) => containsAllStatus(printLog)),
    ).toHaveLength(5);
  });

  test('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    printLogSpy.mock.calls
      .filter((print) => containsAllRacers(print))
      .forEach((print) => {
        expect(containsAllRacers(print)).toBeTruthy();
      });
  });

  test('무작위 값은 0에서 9사이에서 나올 수 있어야 한다.', () => {
    const randomNumbersArr = Array(100).fill(
      NumberMaker.getRacingCarRandomNumbers(['jiny', 'pobi', 'conan', 'cofee']),
    );
    randomNumbersArr.forEach((randomNumbers) => {
      randomNumbers.forEach((num) => {
        expect(num).not.toBeLessThan(0);
        expect(num).not.toBeGreaterThan(9);
      });
    });
  });

  test('전진하는 조건은 4 이상일 경우다.', () => {
    expect(isMove(4)).toBeTruthy();
    expect(isMove(3)).toBeFalsy();
  });
});

describe('자동차 게임 우승자 출력 테스트', () => {
  test('자동차 게임이 완료되었을 때 우승자는 최소 1명 이상 나올 수 있다.', () => {
    const winners = genRacingWinners([
      'jiny : -\nmouse : -',
      'jiny : -\nmouse : --',
      'jiny : --\nmouse : ---',
      'jiny : ---\nmouse : ----',
      'jiny : -----\nmouse : -----',
    ]);
    expect(winners).toStrictEqual(['jiny', 'mouse']);
  });
});

describe('자동차 게임 예외 처리 테스트', () => {
  test('자동차 이름은 1~5자여야 하며 이를 어길 시 RangeError와 함께 프로그램을 종료되어야 한다.', () => {
    const ERROR_CASES = ['pobi,jiny,', 'taling,pivot,robot'];
    ERROR_CASES.forEach((invalidCase) => {
      expect(() =>
        Validator.check(invalidCase, INPUT_MESSAGE.RACING_CAR),
      ).toThrow(ERROR_MESSAGE.MORE_FIVE_CHARACTERS);
      expect(() =>
        Validator.check(invalidCase, INPUT_MESSAGE.RACING_CAR),
      ).toThrow(RangeError);
    });
  });

  test('중복되는 자동차 이름이 존재한다면 Syntax Error와 함께 프로그램이 종료되어야 한다.', () => {
    const ERROR_CASES = ['jiny,jiny', 'pobi,pobi'];
    ERROR_CASES.forEach((invalidCase) => {
      expect(() =>
        Validator.check(invalidCase, INPUT_MESSAGE.RACING_CAR),
      ).toThrow(SyntaxError);
      expect(() =>
        Validator.check(invalidCase, INPUT_MESSAGE.RACING_CAR),
      ).toThrow(ERROR_MESSAGE.DUPLICATE_CAR_NAMES);
    });
  });
});
