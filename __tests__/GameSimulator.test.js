import GameSimulator from '../src/GameSimulator';
import { validateCarName } from '../src/GameSimulator/utils';
import { getUserInputByQuestion } from '../src/utils/getUserInputByQuestion';

jest.mock('../src/utils/getUserInputByQuestion');

describe('GameSimulator 테스트', () => {
  describe('입력 테스트', () => {
    const CAR_NAMES = ['자동차1', '자동차2', '자동차3', '자동차4', '자동차5'];

    beforeEach(() => {
      getUserInputByQuestion.mockImplementation(() =>
        Promise.resolve(CAR_NAMES.join(','))
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('게임을 시작하면 경주할 자동차를 입력 받을 수 있다.', () => {
      const simulator = new GameSimulator();

      simulator.startGame();

      expect(getUserInputByQuestion).toHaveBeenCalled();
    });

    describe('자동차 이름 검증 테스트', () => {
      test('자동차 이름 길이가 5보다 작으면 에러가 발생하지 않는다.', () => {
        CAR_NAMES.forEach((name) =>
          expect(() => validateCarName(name)).not.toThrow()
        );
      });

      test('자동차 이름 길이는 최대 5글자다.', () => {
        const carNames = ['최대다섯글자', '최대다섯글자입니다'];

        carNames.forEach((name) =>
          expect(() => validateCarNames(name)).toThrow()
        );
      });
    });
  });
});
