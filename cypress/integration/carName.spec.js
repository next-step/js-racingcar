import { CLASS_NAME, MESSAGE, SELECTOR } from '../../src/js/utils/constants';

describe('자동차 이름 입력창 E2E 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('자동차 이름을 입력하지 않은 상태에서 확인 버튼을 누를 경우 경고창이 보여지는가?', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).clear();
      cy.get(SELECTOR.CAR_NAME_INPUT)
        .type('{enter}')
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            MESSAGE.INVALID_CAR_NAME
          );
        });
    });
  });

  it('6자 이상 자동차 이름을 입력하고 확인 버튼을 누를 경우 경고창이 보여지는가?', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('CYPRESS');
      cy.get(SELECTOR.CAR_NAME_INPUT)
        .type('{enter}')
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            MESSAGE.INVALID_CAR_NAME
          );
        });
    });
  });

  it('5자 이하의 자동차 이름과 쉼표를 입력 후 아무것도 입력하지 않은 상태에서 확인 버튼을 누를 경우 경고창이 보여지는가?', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE,');
      cy.get(SELECTOR.CAR_NAME_INPUT)
        .type('{enter}')
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            MESSAGE.INVALID_CAR_NAME
          );
        });
    });
  });

  it('5자 이하의 자동차 이름과 쉼표를 입력 후 6자 이상의 자동차 이름을 입력한 상태에서 확인 버튼을 누를 경우 경고창이 보여지는가?', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE, CYPRESS');
      cy.get(SELECTOR.CAR_NAME_INPUT)
        .type('{enter}')
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            MESSAGE.INVALID_CAR_NAME
          );
        });
    });
  });

  it('자동차 이름을 입력하고 확인 버튼을 누른 후에 "시도할 횟수를 입력해주세요" 문구 및 시도 횟수 입력창이 잘 표시되는가?', () => {
    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.TRY_COUNT_FILEDSET).should(
        'have.css',
        'display',
        'block'
      );
    });
  });

  it('자동차 이름을 입력하고 확인 버튼을 누른 후에 자동차 이름 입력창을 수정할 수 없는가?', () => {
    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.CAR_NAME_INPUT).should('have.attr', 'disabled');
    });
  });

  it('자동차 이름을 입력하고 확인 버튼을 누른 후에 확인 버튼을 다시 누를 수 없는가?', () => {
    cy.get(`form.${CLASS_NAME.USER_FORM}`).within(() => {
      cy.get(SELECTOR.CAR_NAME_INPUT).type('APPLE');
      cy.get(SELECTOR.CAR_NAME_INPUT).type('{enter}');

      cy.get(SELECTOR.CAR_NAME_BUTTON).should('have.attr', 'disabled');
    });
  });
});
