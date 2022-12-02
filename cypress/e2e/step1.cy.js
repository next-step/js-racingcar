import { INPUT_CONDITION } from '../../src/js/constants/condition.js';
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

  const CAR_NAMES = {
    VALID_CASE: '가, 나, 다',
    SHORT_CASE: '가,,다',
    LONG_CASE: '가, 나, 다, 라마바사아자차카',
    DUPLICATED_CASE: '가, 나, 나',
  };

  context(
    `자동차 이름 input에 "${CAR_NAMES.VALID_CASE}"를 입력하고 확인 버튼을 클릭했을 때`,
    () => {
      it(`input은 value로 "${CAR_NAMES.VALID_CASE}"를 갖는다.`, () => {
        cy.registerNamesByButton(CAR_NAMES.VALID_CASE);

        cy.get(SELECTOR.CAR_NAMES_INPUT).should('have.value', CAR_NAMES.VALID_CASE);
      });
    },
  );

  context(`자동차 이름 input에 "${CAR_NAMES.VALID_CASE}"를 입력하고 enter를 눌렀을 때`, () => {
    it(`input은 value로 "${CAR_NAMES.VALID_CASE}"를 갖는다.`, () => {
      cy.get(SELECTOR.CAR_NAMES_INPUT).type(`${CAR_NAMES.VALID_CASE}{enter}`);

      cy.get(SELECTOR.CAR_NAMES_INPUT).should('have.value', CAR_NAMES.VALID_CASE);
    });
  });

  context(`이름의 길이가 ${INPUT_CONDITION.MIN_CAR_NAME_LENGTH - 1}인 자동차를 입력했을 때`, () => {
    it('경고창(alert)이 뜬다.', () => {
      cy.registerNamesByButton(CAR_NAMES.SHORT_CASE);

      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGE.INVALID_CAR_NAMES_LENGTH);
      });
    });
  });

  context(`자동차 이름의 길이가 ${INPUT_CONDITION.MAX_CAR_NAME_LENGTH}를 초과했을 때`, () => {
    it('경고창(alert)이 뜬다.', () => {
      cy.registerNamesByButton(CAR_NAMES.LONG_CASE);

      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGE.INVALID_CAR_NAMES_LENGTH);
      });
    });
  });

  context('중복되는 자동차 이름을 입력했을 때', () => {
    it('경고창(alert)이 뜬다', () => {
      cy.registerNamesByButton(CAR_NAMES.DUPLICATED_CASE);

      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGE.DUPLICATED_CAR_NAME);
      });
    });
  });

  context('자동차 이름 입력을 완료하면', () => {
    beforeEach(() => {
      cy.registerNamesByButton(CAR_NAMES.VALID_CASE);
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

describe('레이싱 횟수 입력 테스트', () => {
  const CAR_NAMES = '가, 나, 다';
  const TRIAL_COUNT = {
    VALID_CASE: 5,
    INVALID_CASE: -2,
  };

  beforeEach(() => {
    cy.registerNamesByButton(CAR_NAMES);
  });

  context(
    `레이싱 횟수 input에 ${TRIAL_COUNT.VALID_CASE}를 입력하고 확인 버튼을 클릭했을 때`,
    () => {
      it(`input은 value로 ${TRIAL_COUNT.VALID_CASE}를 갖는다.`, () => {
        cy.registerCountByButton(TRIAL_COUNT.VALID_CASE);

        cy.get(SELECTOR.TRIAL_COUNT_INPUT).should('have.value', TRIAL_COUNT.VALID_CASE);
      });
    },
  );

  context(`레이싱 횟수 input에 ${TRIAL_COUNT.VALID_CASE}를 입력하고 enter를 눌렀을 때`, () => {
    it(`input은 value로 ${TRIAL_COUNT.VALID_CASE}를 갖는다.`, () => {
      cy.get(SELECTOR.TRIAL_COUNT_INPUT).type(`${TRIAL_COUNT.VALID_CASE}{enter}`);

      cy.get(SELECTOR.TRIAL_COUNT_INPUT).should('have.value', TRIAL_COUNT.VALID_CASE);
    });
  });

  context(
    `레이싱 횟수 input에 ${INPUT_CONDITION.MIN_TRIAL_COUNT - 1}이하인 값을 입력했을 때`,
    () => {
      it('경고창(alert)이 뜬다.', () => {
        cy.registerCountByButton(TRIAL_COUNT.INVALID_CASE);

        cy.on('window:alert', (text) => {
          expect(text).to.contains(ERROR_MESSAGE.INVALID_TRIAL_COUNT);
        });
      });
    },
  );

  context('레이싱 횟수 입력을 완료했을 때', () => {
    beforeEach(() => {
      cy.registerCountByButton(TRIAL_COUNT.VALID_CASE);
    });

    it('횟수를 수정할 수 없다.', () => {
      cy.get(SELECTOR.TRIAL_COUNT_INPUT).should('be.disabled');
    });

    it('확인 버튼이 작동하지 않는다.', () => {
      cy.get(SELECTOR.TRIAL_COUNT_BTN).should('be.disabled');
    });
  });
});
