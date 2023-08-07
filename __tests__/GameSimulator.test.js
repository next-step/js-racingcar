import GameSimulator from '../src/GameSimulator';
import { createMessageViewer } from '../src/utils/createMessageViewer';
import { getUserInputByQuestion } from '../src/utils/getUserInputByQuestion';

jest.mock('../src/utils/getUserInputByQuestion');

describe('GameSimulator 테스트', () => {
  const mockViewer = jest.fn();
  const messageViewer = createMessageViewer(mockViewer);
  const CAR_NAMES = ['자동차1', '자동차2', '자동차3', '자동차4', '자동차5'];
  let simulator = null;

  beforeEach(() => {
    simulator = new GameSimulator(messageViewer);
    getUserInputByQuestion.mockImplementation(() =>
      Promise.resolve(CAR_NAMES.join(','))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('입력 테스트', () => {
    test('게임을 시작하면 경주할 자동차를 입력 받을 수 있다.', () => {
      simulator.startGame();

      expect(getUserInputByQuestion).toHaveBeenCalled();
    });
  });

  describe('출력 테스트', () => {
    test('경기가 끝나면 round 진행했던 기록들이 출력된다.', async () => {
      const printRecordsSpy = jest.spyOn(simulator, 'printRecords');

      await simulator.startGame();

      expect(printRecordsSpy).toBeCalled();
    });

    test('경기가 끝나면 우승한 자동차들이 출력된다.', async () => {
      const printWinningCarsSpy = jest.spyOn(simulator, 'printWinningCars');

      await simulator.startGame();

      expect(printWinningCarsSpy).toBeCalled();
    });
  });
});
