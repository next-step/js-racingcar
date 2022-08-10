import { toArrayBySeparator } from '../../src/js/utils';
import racingProcessInfo from '../../src/js/modules/RacingProcessInfo';
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
    racingProcessInfo.initialize();
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
  describe('goRace()', () => {
    const { goRace } = racingModule;
    it(`시도마다 tryOnceEvent를 실행할 수 있다.`, async () => {
      racingProcessInfo.status = mockReadyStatus;
      racingProcessInfo.setGoalTryNumber = TEST_GOAL_TRY_NUMBER;
      let event = {
        raceSingleTurn: () => {},
      };
      cy.stub(event, 'raceSingleTurn', () => {
        racingProcessInfo.status[0].position += 1;
        return racingProcessInfo.status;
      });

      await goRace(racingProcessInfo, event.raceSingleTurn);
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
