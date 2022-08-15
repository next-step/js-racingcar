import { toArrayBySeparator } from '../../src/js/utils';
import racingProcessInfo from '../../src/js/modules/RacingProcessInfo';
import RacingModule, {
  CAR_NAME_MAX_LENGTH,
} from '../../src/js/modules/RacingModule';

const TEST_SINGLE_TRY_NUMBER = 1;
const TEST_GOAL_TRY_NUMBER = 5;
const VALID_CAR_NAME = '차'.repeat(CAR_NAME_MAX_LENGTH);
const INVALID_CAR_NAME = '차'.repeat(CAR_NAME_MAX_LENGTH + 1);
let racingModule = RacingModule();
let mockCarNames = ['첫번째', '두번째', '세번째', '네번째'];
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
  describe('checkFalsyName()', () => {
    const { checkFalsyName } = racingModule;
    it('name에 1개 이상의 문자가 들어가 있는경우 에러를 throw하지 않는다.', () => {
      expect(() => {
        checkFalsyName('차');
      }).to.not.throw();
    });
    it('name이 1개 이상의 공백으로만 들어가 있는 경우 에러를 throw 한다.', () => {
      expect(() => {
        checkFalsyName('      ');
      }).to.be.throw();
    });
  });
  describe('checkTooLongName()', () => {
    const { checkTooLongName } = racingModule;
    it(`name 길이가 ${CAR_NAME_MAX_LENGTH} 이하가 있는 에러를 throw하지 않는다.`, () => {
      expect(() => {
        checkTooLongName(
          toArrayBySeparator(VALID_CAR_NAME),
          CAR_NAME_MAX_LENGTH
        );
      }).to.not.throw();
    });
    it(`name 길이가 ${CAR_NAME_MAX_LENGTH} 초과가 있는 경우 에러 메시지를 throw 리턴한다.`, () => {
      expect(() => {
        checkTooLongName(
          toArrayBySeparator(INVALID_CAR_NAME),
          CAR_NAME_MAX_LENGTH
        );
      }).to.be.throw();
    });
  });
  describe('goRace()', () => {
    const { goRace } = racingModule;
    it(`시도마다 tryOnceEvent를 실행할 수 있다.`, async () => {
      racingProcessInfo.initialize();
      racingProcessInfo.setRaceReadyStatus(mockCarNames);
      racingProcessInfo.setTryEndNumber(TEST_SINGLE_TRY_NUMBER);
      const raceSingleTurn = cy.stub().returns(racingProcessInfo.status);
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      await goRace(racingProcessInfo, raceSingleTurn);
      expect(raceSingleTurn).to.be.called;
    });
    afterEach(() => {
      racingProcessInfo.initialize();
      mockReadyStatus = [
        { name: '첫번째', position: 0 },
        { name: '두번째', position: 0 },
        { name: '세번째', position: 0 },
        { name: '네번째', position: 0 },
      ];
    });
  });
});
