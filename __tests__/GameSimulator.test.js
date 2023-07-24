import GameSimulator from '../src/GameSimulator';
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
  });
});
