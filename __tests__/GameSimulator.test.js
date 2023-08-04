import GameSimulator from '../src/GameSimulator';
import { MAX_ROUNDS } from '../src/GameSimulator/constants';
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

    describe('자동차 주행 테스트', () => {
      test('자동차 입력을 받은 후 startRound 함수가 호출 된다.', async () => {
        const startRoundSpy = jest.spyOn(simulator, 'startRound');

        await simulator.startGame();

        expect(startRoundSpy).toHaveBeenCalled();

        startRoundSpy.mockRestore();
      });

      test('round는 5회동안 진행된다.', async () => {
        const runRoundSpy = jest.spyOn(simulator, 'runRound');

        await simulator.startGame();

        expect(runRoundSpy).toBeCalledTimes(MAX_ROUNDS);

        runRoundSpy.mockRestore();
      });
    });
  });

  describe('자동차 정보 출력 테스트', () => {
    test('하나의 라운드가 종료 되면 자동차별 차량 정보가 출력 된다.', async () => {
      const printCarStatusSpy = jest.spyOn(simulator, 'printCarStatus');

      await simulator.setRacingGame();
      simulator.runRound();

      expect(printCarStatusSpy).toHaveBeenCalledTimes(CAR_NAMES.length);
    });
  });

  describe('우승 테스트', () => {
    describe('우승한 자동차의 이름을 확인 할 수 있다.', () => {
      test('우승자가 1명일 때 배열의 길이가 1이다', async () => {
        getUserInputByQuestion.mockImplementation(() =>
          Promise.resolve('자동차1')
        );

        await simulator.startGame();

        expect(simulator.getWinningCarNames().length).toBe(1);
      });

      test('우승자가 여러명일 떄는 배열의 길이가 0보다 크다', async () => {
        await simulator.startGame();

        expect(simulator.getWinningCarNames().length > 0).toBe(true);
      });
    });

    describe('우승한 자동차의 이름을 출력한다.', () => {
      test('우승자가 1명일 때', async () => {
        const winningCarName = '우승';

        getUserInputByQuestion.mockImplementation(() =>
          Promise.resolve(winningCarName)
        );

        await simulator.startGame();

        expect(mockViewer).toHaveBeenCalledWith(
          `${winningCarName}가 최종 우승했습니다.`
        );
      });

      test('우승자가 여러명일 떄는 ,로 구분해서 출력한다.', async () => {
        await simulator.startGame();

        expect(mockViewer).toHaveBeenCalledWith(
          `${simulator.getWinningCarNames().join(',')}가 최종 우승했습니다.`
        );
      });
    });
  });
});
