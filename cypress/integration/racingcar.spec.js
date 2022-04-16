import MESSAGE from '../../src/js/constants/message.js';
import CAR_VALIDATION from '../../src/js/constants/carValidation.js';
import { CarManager } from '../../src/js/model/CarManager.js';
import { progressRacing, startRacingGame } from '../../src/js/controller/racingProgressController.js';

const CORRECT_INPUT_CAR_NAMES = 'EAST, WEST, SOUTH, NORTH';
const INCORRECT_INPUT_CAR_NAMES = 'BANANA, YELLOW, north ';

describe('RacingCar Cypres', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  describe('사용자가 자동차 경주 게임에 참여하기 전', () => {
    it('자동차 이름을 입력할수 있는 입력창과 확인 버튼만 화면에 보여져야 한다.', () => {
      cy.isVisible('#car-name-fieldset');
      cy.isNotVisible('#racing-progress-section');
      cy.isNotVisible('#racing-winner-section');
    });
  });

  describe('STEP 1', () => {
    context('사용자가 자동차 이름을 입력할 때', () => {
      it('각각의 자동차 이름은 , 로 구분한다.', () => {
        cy.submitCarNames(CORRECT_INPUT_CAR_NAMES);
        cy.submitAttemptCount(3);

        cy.isContainsPlayer('EAST');
        cy.isContainsPlayer('WEST');
        cy.isContainsPlayer('SOUTH');
        cy.isContainsPlayer('NORTH');
      });

      it(`각각의 자동차 이름이 ${CAR_VALIDATION.MIN_CAR_NAME_LENTH}자 이상 ${CAR_VALIDATION.MAX_CAR_NAME_LENTH}자 이하일 경우 시도 횟수를 입력할 수 있다.`, () => {
        cy.submitCarNames(CORRECT_INPUT_CAR_NAMES);
        cy.isVisible('#racing-attempt-fieldset');
      });

      it(`각각의 자동차 이름은 ${CAR_VALIDATION.MIN_CAR_NAME_LENTH}자 이상 ${CAR_VALIDATION.MAX_CAR_NAME_LENTH}자 이하가 아닐 경우 경고창이 뜬다.`, () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.submitCarNames(INCORRECT_INPUT_CAR_NAMES).then(() =>
          expect(alertStub).to.be.calledWith(MESSAGE.ERROR_CAR_NAMES_INPUT)
        );
      });
    });

    context('사용자가 시도 횟수를 입력할 때', () => {
      it('시도 횟수가 숫자일 때, 자동차 경주가 화면이 나타난다.', () => {
        cy.submitCarNames(CORRECT_INPUT_CAR_NAMES);
        cy.submitAttemptCount(3);

        cy.isVisible('#racing-progress-section');
      });

      it('시도 횟수가 숫자가 아닐 때, 경고창이 뜬다.', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.submitCarNames(CORRECT_INPUT_CAR_NAMES);
        cy.submitAttemptCount('-').then(() =>
          expect(alertStub).to.be.calledWith(MESSAGE.ERROR_ATTEMPT_COUNT_INPUT)
        );
      });
    });

    context('자동차 경주 시작', () => {
      it('자동차가 전진할때는 화살표 아이콘이 렌더링 된다?', () => {
        let racingCarList = null;
        cy.submitCarNames(CORRECT_INPUT_CAR_NAMES).then((c) => {
          racingCarList = new CarManager(CORRECT_INPUT_CAR_NAMES);
        });
        cy.submitAttemptCount(3)
          .then(() => {
            racingCarList.attemptCount = 3;
            return racingCarList;
          })
          .then((racingCarList) => {
            const carList = startRacingGame(racingCarList);
            // CarRacingProperty {#carName: 'd', #isForward: false}
            carList.forEach((car) => {
              cy.log(car.carName);
              if (car.isForward) {
                cy.log(car.isForward);

                cy.get(`#${car.carName}`).next().should('have.class', 'forward-icon');
              } else {
                cy.log(car.isForward);
                cy.get(`#${car.carName}`).next().should('have.class', 'spinner-wrapper');
              }
            });
          });

        // const racingCarList = new CarManager(CORRECT_INPUT_CAR_NAMES);
        // racingCarList.attemptCount = 3;

        // const carList = startRacingGame(racingCarList);

        // carList.forEach((car) => {
        //   cy.log(car.carName);
        //   if (car.isForward) {
        //     cy.log(car.isForward);

        //     cy.get(`#${car.carName}`).next().should('have.class', 'forward-icon');
        //   } else {
        //     cy.log(car.isForward);
        //     cy.get(`#${car.carName}`).next().should('have.class', 'spinner-wrapper');
        //   }
        // });
      });
      it('자동차가 멈출때는 로딩 아이콘이 렌더링 된다', () => {});
    });
  });
});
