import { MAX_CAR_NAME_LENTH, MIN_CAR_NAME_LENTH } from '../../src/js/constants/car.js';
import { ERROR_ATTEMPT_COUNT_INPUT, ERROR_CAR_NAMES_INPUT } from '../../src/js/constants/message.js';

describe('RacingCar Cypres', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  describe('처음 화면이 보여질때', () => {
    it('자동차 이름을 입력할수 있는 입력창과 확인 버튼만 화면에 보여져야 한다.', () => {
      cy.get('#car-name-fieldset').should('be.visible');
      cy.get('#racing-progress-section').should('not.be.visible');
      cy.get('#racing-winner-section').should('not.be.visible');
    });
  });

  describe('STEP 1', () => {
    context('사용자가 자동차 이름을 입력할 때', () => {
      it('각각의 자동차 이름은 , 로 구분한다.', () => {
        cy.get('#car-name-input').type('EAST, WEST, SOUTH, NORTH');
        cy.get('#car-name-submit').click();
        cy.get('#attempt-count-input').type(3);
        cy.get('#attempt-count-submit').click();

        cy.get('.car-player').contains('EAST');
        cy.get('.car-player').contains('WEST');
        cy.get('.car-player').contains('SOUTH');
        cy.get('.car-player').contains('NORTH');
      });

      it(`각각의 자동차 이름이 ${MIN_CAR_NAME_LENTH}자 이상 ${MAX_CAR_NAME_LENTH}자 이하일 경우 시도 횟수를 입력할 수 있다.`, () => {
        cy.get('#car-name-input').type('EAST, WEST, SOUTH, NORTH');
        cy.get('#car-name-submit')
          .click()
          .then(() => {
            cy.get('#racing-attempt-fieldset').should('be.visible');
          });
      });

      it(`각각의 자동차 이름은 ${MIN_CAR_NAME_LENTH}자 이상 ${MAX_CAR_NAME_LENTH}자 이하가 아닐 경우 경고창이 뜬다.`, () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.get('#car-name-input').type('BANANA, CHO, apple');
        cy.get('#car-name-submit')
          .click()
          .then(() => {
            expect(alertStub).to.be.calledWith(ERROR_CAR_NAMES_INPUT);
          });
      });
    });
  });

  context('사용자가 시도 횟수를 입력할 때', () => {
    it('시도 횟수가 숫자일 때, 자동차 경주가 화면이 나타난다.', () => {
      cy.get('#car-name-input').type('EAST, WEST, SOUTH, NORTH');
      cy.get('#car-name-submit').click();
      cy.get('#attempt-count-input').type(3);
      cy.get('#attempt-count-submit').click();
      cy.get('#racing-progress-section').should('be.visible');
    });

    it('시도 횟수가 숫자가 아닐 때, 경고창이 뜬다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('#car-name-input').type('EAST, WEST, SOUTH, NORTH');
      cy.get('#car-name-submit').click();
      cy.get('#attempt-count-input').type('-');
      cy.get('#attempt-count-submit')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith(ERROR_ATTEMPT_COUNT_INPUT);
        });
    });
  });

  context('자동차 경주 시작', () => {
    it('자동차가 전진할때는 화살표 아이콘이 렌더링 된다', () => {});
    it('자동차가 멈출때는 로딩 아이콘이 렌더링 된다', () => {});
  });
});
