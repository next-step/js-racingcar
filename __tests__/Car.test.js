import CarView from '../src/view/CarView.js';
import { MESSAGES, SETTINGS } from '../src/constants/index.js';
import { RacingSystem } from '../src/controller/RacingSystem.js';

describe('게임 테스트', () => {
  test('게임 시작', () => {
    const logSpy = jest.spyOn(console, 'log');
    // given
    const input = `pobi${SETTINGS.SEPERATOR}crong${SETTINGS.SEPERATOR}honux`;
    const racingSystem = new RacingSystem(SETTINGS.ROUND, SETTINGS.SEPERATOR);

    racingSystem.startGame(input);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(MESSAGES.GAME.WINNER_ANNOUNCEMENT));
  });
});

describe('유효성 검사', () => {
  test('이름 길이 검사', () => {
    const { MAX, MIN } = SETTINGS;
    const { ERROR } = MESSAGES
    // given
    const exceedName = 'a'.repeat(MAX.NAME_LENGTH + 1);
    const shortName = 'b'.repeat(MIN.NAME_LENGTH - 1);

    // when
    const racingSystem = new RacingSystem();
    expect(() => racingSystem.startGame(exceedName)).toThrowError(ERROR.MAX_NAME);
    expect(() => racingSystem.startGame(shortName)).toThrowError(ERROR.MIN_NAME);
  });
})

describe('확장성 테스트', () => {
  test('라운드 설정', () => {
    const input = 'evan';
    const ROUND = 10;
  
    const racingSystem = new RacingSystem(ROUND, ',');
    const logSpy = jest.spyOn(racingSystem.view, 'printCarPosition');
    racingSystem.startGame(input);
    const count = logSpy.mock.calls.filter((v) => v.includes('evan')).length;

    expect(count).toBe(ROUND);
  });
})