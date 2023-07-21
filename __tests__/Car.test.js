import { ERROR_MESSAGE } from '../src/constants';
import { CarValidator } from '../src/validator/index.js';
import { InputView } from '../src/view';

jest.mock('node:readline/promises', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn().mockResolvedValue('jiny,pobi,conan'),
    close: jest.fn(),
  }),
}));

describe('자동차 입력 기능 관련 테스트', () => {
  let carNames;

  beforeAll(async () => {
    carNames = await InputView.inputCarNames();
  });

  test('사용자는 자동차 이름을 입력할 수 있어야 한다.', () => {
    expect(carNames).toStrictEqual(['jiny', 'pobi', 'conan']);
  });
});

describe('자동차 게임 예외 처리 테스트', () => {
  test('자동차 이름은 1~5자여야 하며 이를 어길 시 RangeError와 함께 프로그램을 종료되어야 한다.', () => {
    const ERROR_CASES = [['pobi', 'jiny', ''], ['taling, pivot, robot']];
    ERROR_CASES.forEach((invalidCase) => {
      expect(() => CarValidator.validateCarNames(invalidCase)).toThrow(
        ERROR_MESSAGE.MORE_FIVE_CHARACTERS
      );
      expect(() => CarValidator.validateCarNames(invalidCase)).toThrow(
        RangeError
      );
    });
  });
  test('중복되는 자동차 이름이 존재한다면 Syntax Error와 함께 프로그램이 종료되어야 한다.', () => {
    const ERROR_CASES = [
      ['jiny', 'jiny'],
      ['pobi', 'pobi'],
    ];
    ERROR_CASES.forEach((invalidCase) => {
      expect(() => CarValidator.validateCarNames(invalidCase)).toThrow(
        SyntaxError
      );
      expect(() => CarValidator.validateCarNames(invalidCase)).toThrow(
        ERROR_MESSAGE.DUPLICATE_CAR_NAMES
      );
    });
  });
});
