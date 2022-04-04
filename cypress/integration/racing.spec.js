import { CLASS_NAME, MESSAGE, SELECTOR } from '../../src/js/utils/constants.js';

describe('레이싱 E2E 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('게임이 끝나고 우승자가 잘 표시되는가?', () => {
    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_INPUT).type(1);
      cy.get(SELECTOR.TRY_COUNT_INPUT).type('{enter}');
    });

    cy.wait(1000);

    cy.get(`section.${CLASS_NAME.WINNER}`).should('have.css', 'flex');
    cy.get(`section.${CLASS_NAME.WINNER} h2`).should(
      'have.text',
      '🏆 최종 우승자: APPLE 🏆'
    );
  });

  it('게임이 끝나고 1초 뒤 축하 알림창이 잘 보여지는가?', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_INPUT).type(1);
      cy.get(SELECTOR.TRY_COUNT_INPUT).type('{enter}');
    });

    cy.wait(2000).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(MESSAGE.CONGRATS);
    });
  });

  it('게임이 끝나고 "다시 시작하기" 버튼을 눌렀을 때 자동차 이름에 아무것도 입력되어 있지 않은가?', () => {
    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_INPUT).type(1);
      cy.get(SELECTOR.TRY_COUNT_INPUT).type('{enter}');
    });

    cy.wait(2000);
    cy.get(`button.${CLASS_NAME.RESET_BUTTON}`).click();

    cy.get(SELECTOR.CAR_NAME_INPUT).should('have.value', '');
  });

  it('게임이 끝나고 "다시 시작하기" 버튼을 눌렀을 때 자동차 이름 확인 버튼을 클릭할 수 있는가?', () => {
    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_INPUT).type(1);
      cy.get(SELECTOR.TRY_COUNT_INPUT).type('{enter}');
    });

    cy.wait(2000);
    cy.get(`button.${CLASS_NAME.RESET_BUTTON}`).click();

    cy.get(SELECTOR.CAR_NAME_BUTTON).should('not.have.attr', 'disabled');
  });

  it('게임이 끝나고 "다시 시작하기" 버튼을 눌렀을 때 자동차 이름 입력창을 제외한 나머지 컨텐츠는 볼 수 없는가?', () => {
    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_INPUT).type(1);
      cy.get(SELECTOR.TRY_COUNT_INPUT).type('{enter}');
    });

    cy.wait(2000);
    cy.get(`button.${CLASS_NAME.RESET_BUTTON}`).click();

    cy.get(`form ${SELECTOR.TRY_COUNT_FILEDSET}`).should(
      'have.css',
      'display',
      'none'
    );
    cy.get(`section.${CLASS_NAME.RACING_BOARD}`).should(
      'have.css',
      'display',
      'none'
    );
    cy.get(`section.${CLASS_NAME.WINNER}`).should(
      'have.css',
      'display',
      'none'
    );
  });
});
