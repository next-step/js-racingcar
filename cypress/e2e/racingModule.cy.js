import { toArrayBySeparator } from '../../src/js/utils';
import racingData from '../../src/js/modules/RacingData';
import RacingModule, {
  CAR_NAME_MAX_LENGTH,
} from '../../src/js/modules/RacingModule';
import ValidationError, {
  INVALID_MESSAGES,
} from '../../src/js/modules/ValidationError';

const TEST_GOAL_TRY_NUMBER = 5;
const VALID_CAR_NAME = '차'.repeat(CAR_NAME_MAX_LENGTH);
const INVALID_CAR_NAME = '차'.repeat(CAR_NAME_MAX_LENGTH + 1);
let racingModule = RacingModule();
let mockReadyStatus = [
  { name: '첫번째', position: 0 },
  { name: '두번째', position: 0 },
  { name: '세번째', position: 0 },
  { name: '네번째', position: 0 },
];
const mockFinishedStatus = [
  { name: '첫번째', position: 0 },
  { name: '두번째', position: 0 },
  { name: '세번째', position: 0 },
  { name: '네번째', position: TEST_GOAL_TRY_NUMBER },
];
describe('racingModule()', () => {
  beforeEach(() => {
    racingModule = RacingModule();
    racingData.initialize();
  });
  describe('hasTooLongName()', () => {
    const { hasTooLongName } = racingModule;
    it(`name 길이가 ${CAR_NAME_MAX_LENGTH} 이하가 있는 경우 한다`, () => {
      try {
        if (
          hasTooLongName(
            toArrayBySeparator(VALID_CAR_NAME),
            CAR_NAME_MAX_LENGTH
          )
        ) {
          throw new ValidationError(INVALID_MESSAGES.NAME.MAX_LENGTH);
        }

        expect(true).to.be.true;
      } catch (e) {
        throw e;
      }
    });
    it(`name 길이가 ${CAR_NAME_MAX_LENGTH} 초과가 있는 경우 ${INVALID_MESSAGES.NAME.MAX_LENGTH}에러 메시지를 throw 리턴한다.`, () => {
      try {
        if (
          hasTooLongName(
            toArrayBySeparator(INVALID_CAR_NAME),
            CAR_NAME_MAX_LENGTH
          )
        ) {
          throw new ValidationError(INVALID_MESSAGES.NAME.MAX_LENGTH);
        }

        throw Error;
      } catch (e) {
        expect(e.message).to.be.contains(INVALID_MESSAGES.NAME.MAX_LENGTH);
      }
    });
  });
  describe('isFinishedRace()', () => {
    const { isFinishedRace } = racingModule;
    it(`goalPosition(도착지 위치)에 도달한 값이 없으면 false를 리턴한다.`, () => {
      const result = isFinishedRace(mockReadyStatus, TEST_GOAL_TRY_NUMBER);
      expect(result).to.be.false;
    });
    it(`goalPosition(도착지 위치)에 도달한 값이 하나라도 있으면 true를 리턴한다.`, () => {
      const result = isFinishedRace(mockFinishedStatus, TEST_GOAL_TRY_NUMBER);
      expect(result).to.be.true;
    });
  });
  describe('getWinners()', () => {
    const { getWinners } = racingModule;
    it(`경주가 완료된 데이터에서 승리한 리스트를 가져올 수 있다.`, () => {
      const result = getWinners(mockFinishedStatus, TEST_GOAL_TRY_NUMBER);
      expect(result).to.be.length(1);
    });
  });
  describe('goRace()', () => {
    const { goRace } = racingModule;
    it(`시도마다 tryOnceEvent를 실행할 수 있다.`, async () => {
      racingData.status = mockReadyStatus;
      racingData.setGoalTryNumber = TEST_GOAL_TRY_NUMBER;
      let event = {
        raceSingleTurn: () => {},
      };
      cy.stub(event, 'raceSingleTurn', () => {
        racingData.status[0].position += 1;
        return racingData.status;
      });

      await goRace(racingData, event.raceSingleTurn);
      expect(event.raceSingleTurn).to.be.called;
    });
    afterEach(() => {
      mockReadyStatus = [
        { name: '첫번째', position: 0 },
        { name: '두번째', position: 0 },
        { name: '세번째', position: 0 },
        { name: '네번째', position: 0 },
      ];
    });
  });
});
