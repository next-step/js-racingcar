import { faker } from '@faker-js/faker';
import { ErrorMessage } from '../../src/js/common/enum.js';

const $inputPlayer = '#input-player';
const $btnSubmitPlayer = '#btn-submit-player';
const $roundWrap = '.round-wrap';
const $inputRound = '#input-round';
const $btnSubmitRound = '#btn-submit-round';
const $racingWrap = '.racing-wrap';
const $carList = '.car-list';

Cypress.Commands.addAll({
  typingOnElement(element, value) {
    cy.get(element).type(value);
  },
  clickElement(element) {
    cy.get(element).click();
  },
  checkToHave(element, chainer, value) {
    cy.get(element).should(`have.${chainer}`, value);
  },
  clearValue(element) {
    cy.get(element).clear();
  },
  checkExist(element) {
    cy.get(element).should('exist');
  },
  checkVisible(element) {
    cy.get(element).should('be.visible');
  },
  checkInvisible(element) {
    cy.get(element).should('not.be.visible');
  },
});

function generateName(min = 0, max = 10) {
  return faker.word.adjective({ length: { min, max } });
}

function inputRandomName() {
  const number = faker.random.numeric();
  const names = Array.from({ length: number }, () => generateName(1, 5));

  cy.typingOnElement($inputPlayer, names.join(','));
  cy.clickElement($btnSubmitPlayer);
}

function inputRandomRound() {
  const number = faker.random.numeric({ bannedDigits: ['0'] });

  cy.typingOnElement($inputRound, number);
  cy.clickElement($btnSubmitRound);
}

describe('플레이어 이름 입력', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.checkExist($inputPlayer);
  });

  it('이름은 다섯자 이하만 허용한다', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.typingOnElement($inputPlayer, generateName(6));
    cy.clickElement($btnSubmitPlayer).then(() => {
      const actualMessage = alertStub.getCall(0).lastArg;

      expect(actualMessage).to.equal(ErrorMessage.INVALID_PLAYER);
    });
  });

  it('올바른 값 입력 시, 횟수를 입력하는 필드를 노출한다', () => {
    cy.checkInvisible($roundWrap);

    inputRandomName();
    cy.checkVisible($roundWrap);
  });
});

describe('라운드 횟수 입력', () => {
  beforeEach(() => {
    cy.visit('/');
    inputRandomName();
    cy.checkVisible($roundWrap);
  });

  it('0 이하의 값은 허용하지 않는다', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.typingOnElement($inputRound, '0');
    cy.clickElement($btnSubmitRound).then(() => {
      const actualMessage = alertStub.getCall(0).lastArg;

      expect(actualMessage).to.equal(ErrorMessage.INVALID_ROUND);
    });
  });

  it('올바른 값 입력 시, 레이싱 필드를 노출한다', () => {
    cy.checkInvisible($racingWrap);

    inputRandomRound();
    cy.checkVisible($racingWrap);
  });
});

describe('자동차 데이터 확인', () => {
  beforeEach(() => {
    cy.visit('/');
    inputRandomName();
    inputRandomRound();
    cy.checkVisible($racingWrap);
  });

  it('입력한 플레이어 수와 일치하는지 확인한다', () => {
    cy.get($inputPlayer).invoke('val').then(v => {
      cy.checkToHave(`${$carList} > div`, 'length', v.split(',').length);
    });
  });

  it('입력한 플레이어 이름과 일치하는지 확인한다', () => {
    cy.get($inputPlayer).invoke('val').then(v => {
      const arr = v.split(',');

      arr.forEach((el, i) => {
        cy.get(`${$carList} .car-player`).eq(i).should('have.text', el.trim());
      });
    });
  });
});
