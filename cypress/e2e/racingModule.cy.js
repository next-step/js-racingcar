import { CAR_NAME_MAX_LENGTH, CONDITIONS } from "../../src/js/consts";
import { toArrayBySeparator } from "../../src/js/utils";
import racingData from "../../src/js/modules/RacingData";
import RacingModule from "../../src/js/modules/RacingModule";

let racingModule = RacingModule();
const TEST_GOAL_TRY_NUMBER = 5;
const VALID_CAR_NAME = Array.from(
  { length: CAR_NAME_MAX_LENGTH },
  () => "차"
).join("");
const INVALID_CAR_NAME = Array.from(
  { length: CAR_NAME_MAX_LENGTH + 1 },
  () => "차"
).join("");
const mockReadyStatus = [
  { name: "첫번째", position: 0 },
  { name: "두번째", position: 0 },
  { name: "세번째", position: 0 },
  { name: "네번째", position: 0 },
];
const mockFinishedStatus = [
  { name: "첫번째", position: 0 },
  { name: "두번째", position: 0 },
  { name: "세번째", position: 0 },
  { name: "네번째", position: TEST_GOAL_TRY_NUMBER },
];
describe("racingModule()", () => {
  beforeEach(() => {
    racingModule = RacingModule();
    racingData.initialize();
  });
  describe("hasTooLongName()", () => {
    const { hasTooLongName } = racingModule;
    it(`name 길이가 ${CAR_NAME_MAX_LENGTH} 이하가 있는 경우 false를 리턴한다.`, () => {
      const result = hasTooLongName(
        toArrayBySeparator(VALID_CAR_NAME),
        CAR_NAME_MAX_LENGTH
      );
      expect(result).to.be.false;
    });
    it(`name 길이가 ${CAR_NAME_MAX_LENGTH} 초과가 있는 경우 true를 리턴한다.`, () => {
      const result = hasTooLongName(
        toArrayBySeparator(INVALID_CAR_NAME),
        CAR_NAME_MAX_LENGTH
      );
      expect(result).to.be.true;
    });
  });
  describe("hasInvalidCarName()", () => {
    const { hasInvalidCarName } = racingModule;
    it(`carNames이 Falsy한 값인경우 flase를 리턴한다.`, () => {
      const result = hasInvalidCarName("");
      expect(result).to.be.true;
    });
  });
  describe("isStoppableRace()", () => {
    const { isStoppableRace } = racingModule;
    it(`goalTryNumber(목표 시도 숫자)에 도달한 값이 없으면 false를 리턴한다.`, () => {
      const result = isStoppableRace(mockReadyStatus, TEST_GOAL_TRY_NUMBER);
      expect(result).to.be.false;
    });
    it(`goalTryNumber(목표 시도 숫자)에 도달한 값이 하나라도 있으면 true를 리턴한다.`, () => {
      const result = isStoppableRace(mockFinishedStatus, TEST_GOAL_TRY_NUMBER);
      expect(result).to.be.true;
    });
  });
  describe("getWinners()", () => {
    const { getWinners } = racingModule;
    it(`경주가 완료된 데이터에서 승리한 리스트를 가져올 수 있다.`, () => {
      const result = getWinners(mockFinishedStatus, TEST_GOAL_TRY_NUMBER);
      expect(result).to.be.length(1);
    });
  });
  describe("goRace()", () => {
    const { goRace, isStoppableRace } = racingModule;
    it(`시도마다 tryOnceEvent를 실행할 수 있다.`, () => {
      racingData.status = mockReadyStatus;
      racingData.setGoalTryNumber = TEST_GOAL_TRY_NUMBER;
      let event = {
        tryOnceEvent: () => {},
      };
      cy.stub(event, "tryOnceEvent", () => {
        racingData.status[0].position += 1;
        return racingData.status;
      });

      goRace(racingData, event.tryOnceEvent).then(() => {
        expect(event.tryOnceEvent).to.be.called;
      });
    });
  });
});
