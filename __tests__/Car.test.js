import App from '../src';
import { ERROR_MESSAGE } from '../src/constants';
import { CarValidator } from '../src/validator/index.js';

jest.mock('node:readline/promises', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn().mockResolvedValue('jiny,pobi,conan'),
    close: jest.fn(),
  }),
}));

const app = new App();
app.controller.run();

describe('자동차 입력 기능 관련 테스트', () => {
  test('사용자가 입력한 자동차 이름은 쉼표를 기준으로 구분되어 배열 형태로 저장될 수 있어야 한다.', async () => {
    const carNames = app.controller.racingCar.getRacingCars();
    expect(carNames).toStrictEqual(['jiny', 'pobi', 'conan']);
  });
});

describe('자동차 게임 예외 처리 테스트', () => {
  test('자동차 이름은 1~5자여야 하며 이를 어길 시 프로그램을 종료한다.', () => {
    const ERROR_CASES = [['pobi', 'jiny', ''], ['taling, pivot, robot']];
    ERROR_CASES.forEach((invalidCase) => {
      expect(() => CarValidator.validateCarNames(invalidCase)).toThrow(
        ERROR_MESSAGE.MORE_FIVE_CHARACTERS
      );
    });
  });
});
