import { ERROR_MESSAGE } from '../../src/js/constants/errorMessage.js';
import { SELECTOR } from '../../src/js/constants/selector.js';

beforeEach(() => {
  cy.visit('../../index.html');
});

describe('자동차 이름 입력 테스트', () => {
  it('자동차 이름을 입력할 수 있는 input이 존재하고 화면에 보인다.', () => {
    cy.get(SELECTOR.CAR_NAMES_INPUT).should('exist');
    cy.get(SELECTOR.CAR_NAMES_INPUT).should('be.visible');
  });

  it('자동차 이름을 확인하는 버튼이 존재하고 화면에 보인다.', () => {
    cy.get(SELECTOR.CAR_NAMES_BTN).should('exist');
    cy.get(SELECTOR.CAR_NAMES_BTN).should('be.visible');
  });

  context('자동차 이름 input에 "가, 나, 다"를 입력하고 확인 버튼을 클릭했을 때', () => {
    it('input은 value로 "가, 나, 다"를 갖는다.', () => {
      cy.registerNamesByButton('가, 나, 다');

      cy.get(SELECTOR.CAR_NAMES_INPUT).should('have.value', '가, 나, 다');
    });
  });

  context('자동차 이름 input에 "가, 나, 다"를 입력하고 enter를 눌렀을 때', () => {
    it('input은 value로 "가, 나, 다"를 갖는다.', () => {
      cy.get(SELECTOR.CAR_NAMES_INPUT).type('가, 나, 다{enter}');

      cy.get(SELECTOR.CAR_NAMES_INPUT).should('have.value', '가, 나, 다');
    });
  });

  context('이름의 길이가 0인 자동차를 입력했을 때', () => {
    it('경고창(alert)이 뜬다.', () => {
      cy.registerNamesByButton('가,,다');

      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGE.INVALID_CAR_NAMES_LENGTH);
      });
    });
  });

  context('자동차 이름의 길이가 5를 초과했을 때', () => {
    it('경고창(alert)이 뜬다.', () => {
      cy.registerNamesByButton('가, 나, 다, 라마바사아자차카');

      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGE.INVALID_CAR_NAMES_LENGTH);
      });
    });
  });

  context('중복되는 자동차 이름을 입력했을 때', () => {
    it('경고창(alert)이 뜬다', () => {
      cy.registerNamesByButton('가, 나, 나');

      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGE.DUPLICATED_CAR_NAME);
      });
    });
  });

  context('자동차 이름 입력을 완료하면', () => {
    beforeEach(() => {
      cy.registerNamesByButton('가, 나, 다');
    });

    it('자동차 이름을 수정할 수 없다.', () => {
      cy.get(SELECTOR.CAR_NAMES_INPUT).should('be.disabled');
    });

    it('확인 버튼이 작동하지 않는다.', () => {
      cy.get(SELECTOR.CAR_NAMES_BTN).should('be.disabled');
    });

    it('레이싱 횟수 입력칸과 확인 버튼이 화면에 보인다.', () => {
      cy.get(SELECTOR.TRIAL_COUNT_INPUT).should('be.visible');
      cy.get(SELECTOR.TRIAL_COUNT_BTN).should('be.visible');
    });
  });
});
