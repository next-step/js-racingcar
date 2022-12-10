import { faker } from '@faker-js/faker';
import { ErrorMessage, PlayerRule } from '../../src/js/common/enum.js';

const $inputPlayer = '#input-player';
const $btnSubmitPlayer = '#btn-submit-player';
const $roundField = '#round-field';
const $inputRound = '#input-round';
const $btnSubmitRound = '#btn-submit-round';
const $racingWrap = '.racing-wrap';
const $carList = '.car-list';

function generateName(min = PlayerRule.MIN_LENGTH, max = PlayerRule.MAX_LENGTH) {
  return faker.word.adjective({ length: { min, max } });
}

function inputValidName() {
  const number = faker.random.numeric();
  const names = Array.from({ length: number }, () => generateName());

  cy.typingOnElement($inputPlayer, names.join(','));
  cy.clickElement($btnSubmitPlayer);
}

function inputValidRound() {
  const number = faker.random.numeric({ bannedDigits: ['0'] });

  cy.typingOnElement($inputRound, number);
  cy.clickElement($btnSubmitRound);
}

describe('플레이어 이름 입력', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('이름의 글자수는 1~5 로 제한한다, 조건에 맞지 않을 시 alert을 노출한다 : 미입력', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.clickElement($btnSubmitPlayer).then(() => {
      const actualMessage = alertStub.getCall(0).lastArg;

      expect(actualMessage).to.equal(ErrorMessage.INVALID_PLAYER);
    });
  });

  it('이름의 글자수는 1~5 로 제한한다, 조건에 맞지 않을 시 alert을 노출한다 : 6 이상의 값 입력', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.typingOnElement($inputPlayer, generateName(6));
    cy.clickElement($btnSubmitPlayer).then(() => {
      const actualMessage = alertStub.getCall(0).lastArg;

      expect(actualMessage).to.equal(ErrorMessage.INVALID_PLAYER);
    });
  });

  it('올바른 값 입력 시, 횟수를 입력하는 필드를 노출한다', () => {
    cy.checkInvisible($roundField);

    inputValidName();
    cy.checkVisible($roundField);
  });
});

describe('라운드 횟수 입력', () => {
  beforeEach(() => {
    cy.visit('/');
    inputValidName();
  });

  it('0 이하의 값은 허용하지 않는다, 조건에 맞지 않을 시 alert을 노출한다 : 0 입력', () => {
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

    inputValidRound();
    cy.checkVisible($racingWrap);
  });
});

describe('자동차 데이터 확인', () => {
  beforeEach(() => {
    cy.visit('/');
    inputValidName();
    inputValidRound();
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
