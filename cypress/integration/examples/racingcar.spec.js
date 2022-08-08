import { ALERT_MESSAGES } from "../../../src/js/constants/index.js";

describe("레이싱 어플리케이션 1단계 스펙", () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('첫 화면에서는 자동차 이름을 입력하는 input 과 확인 버튼 fieldset 만 노출되어야 한다.', () => {
    cy.isVisible('fieldset.car-name')
    
    cy.isDisplayNone('fieldset.attempt')
    cy.isDisplayNone('section#racingcar')
    cy.isDisplayNone('section#result')
  })

  it(`이름이 비어있을 경우 '이름을 입력해주세요.' alert메시지를 띄워준다`, () => {
    cy.get('input[name=car-name]').clear();
    cy.checkAlertMessage('.car-name-confirm', ALERT_MESSAGES.NAME.EMPTY);
  });

  it(`자동차 이름이 5자 초과될 경우, '이름은 5자 이하로 입력해주세죠.' alert 메세지를 띄워준다.`, () => {
    cy.get('input[name=car-name]').type('lamborghini');
    cy.checkAlertMessage('.car-name-confirm', ALERT_MESSAGES.NAME.MAX_LENGTH);
  }) 

  it('자동차 이름을 입력 후 시도할 횟수를 입력하는 input이 노출되어야 한다.',() => {
    cy.fillAndClickInputValue('input[name=car-name]', 'kia');
    cy.isVisible('fieldset.attempt');
  })

  it(`시도 횟수는 0 이하 일 때 '1 이상의 수를 입력해주세요.' alert 메세지가 노출되어야 한다.`,() => {
    cy.fillAndClickInputValue('input[name=car-name]', 'kia');

    cy.get('input[name=attempt-number]').type(0);
    cy.checkAlertMessage('.attempt-number-confirm', ALERT_MESSAGES.ATTEMPT.POSITIVE_NUMBER);
  })

  it('쉼표를 기준으로 이름을 나누어 할당 해야 한다.', () => {
    cy.fillAndClickInputValue('input[name=car-name]', 'benz, audi, bmw');

    cy.fillAndClickInputValue('input[name=attempt-number]', 4);

    const names = ['BENZ', 'AUDI', 'BMW'];
    names.map((name, index) => {
      cy.get('.car-player').eq(index).contains(name);
    });
  });
});
