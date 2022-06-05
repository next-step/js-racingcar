import { CLASS_NAME, MESSAGE, SELECTOR } from '../../src/js/utils/constants';

describe('시도 횟수 입력창 E2E 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('시도 횟수는 최소 1 이상 입력 가능한가?', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_INPUT).type(0);
      cy.get(SELECTOR.TRY_COUNT_INPUT)
        .type('{enter}')
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(MESSAGE.MIN_COUNT);
        });
    });
  });

  it('시도 횟수는 최대 20 까지만 입력 가능한가?', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_INPUT).type(21);
      cy.get(SELECTOR.TRY_COUNT_INPUT)
        .type('{enter}')
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(MESSAGE.MAX_COUNT);
        });
    });
  });

  it('시도 횟수를 입력하고 확인 버튼을 누른 후에 시도 횟수를 수정할 수 없는가?', () => {
    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_INPUT).type(2);
      cy.get(SELECTOR.TRY_COUNT_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_INPUT).should('have.attr', 'disabled');
    });
  });

  it('시도 횟수를 입력하고 확인 버튼을 누른 후에 확인 버튼을 다시 누를 수 없는가?', () => {
    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_INPUT).type(2);
      cy.get(SELECTOR.TRY_COUNT_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_BUTTON).should('have.attr', 'disabled');
    });
  });

  it('시도 횟수를 입력하고 확인 버튼을 눌렀을 때 자동차 이름이 보이는가?', () => {
    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_INPUT).type(2);
      cy.get(SELECTOR.TRY_COUNT_INPUT).type('{enter}');
    });

    cy.get(`section.${CLASS_NAME.RACING_BOARD}`).should(
      'have.css',
      'display',
      'flex'
    );
  });
});
