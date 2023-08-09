import GameInput from '../../src/GameInput';
import GameSimulator from '../../src/GameSimulator';
import GameViewer from '../../src/GameViewer';
import { createMessageViewer } from '../../src/utils/createMessageViewer';
import { getUserInputByQuestion } from '../../src/utils/getUserInputByQuestion';

jest.mock('../../src/utils/getUserInputByQuestion');

describe('GameSimulator 테스트', () => {
  const mockViewer = jest.fn();
  const messageViewer = createMessageViewer(mockViewer);
  const gameViewer = new GameViewer(messageViewer);
  const gameInput = new GameInput(getUserInputByQuestion);
  const CAR_NAMES = ['자동차1', '자동차2', '자동차3', '자동차4', '자동차5'];
  let simulator = null;

  beforeEach(() => {
    getUserInputByQuestion
      .mockImplementationOnce(() => Promise.resolve(CAR_NAMES.join(',')))
      .mockImplementationOnce(() => Promise.resolve(3));

    simulator = new GameSimulator(gameViewer, gameInput, () => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('입력 테스트', () => {
    test('게임을 시작하면 경주할 자동차와 round 횟수를 입력 받는다.', async () => {
      await simulator.startGame();

      expect(getUserInputByQuestion).toBeCalledTimes(2);
    });
  });

  describe('출력 테스트', () => {
    test('경기가 끝나면 round 진행했던 기록들이 출력된다.', async () => {
      const printRecordsSpy = jest.spyOn(gameViewer, 'printRecords');

      await simulator.startGame();

      expect(printRecordsSpy).toBeCalled();
    });

    test('경기가 끝나면 우승한 자동차들이 출력된다.', async () => {
      const printWinningCarsSpy = jest.spyOn(gameViewer, 'printWinningCars');

      await simulator.startGame();

      expect(printWinningCarsSpy).toBeCalled();
    });
  });
});
