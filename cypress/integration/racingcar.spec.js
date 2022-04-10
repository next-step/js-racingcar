import {
  INVALID_CAR_MAXIMUM_NAME,
  INVALID_RACING_MINIMUM_NUMBER,
  INVALID_RACING_NUMBER,
  INVALID_RACING_NUMBER_TYPE,
} from '../../src/js/constants.js';

const BASE_URL = '../../index.html';

const setCarNames = (carNames, clickEvent) => {
  cy.get('#car-name').type(carNames);
  cy.get('#car-name-btn')
    .click()
    .then(() => clickEvent);
};

const setRacingNumber = (carNames, clickEvent) => {
  cy.get('#racing-number').type(carNames);
  cy.get('#racing-number-btn')
    .click()
    .then(() => clickEvent);
};

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it('자동차의 이름이 비어있으면 경고문을 보여준다.', () => {
    setCarNames('  ', () =>
      expect(alertStub).to.be.calledWith(INVALID_LOTTO_PRICE)
    );
  });

  it('자동차의 이름은 5자가 넘어가면 경고문을 보여준다.', () => {
    setCarNames('fivename', () =>
      expect(alertStub).to.be.calledWith(INVALID_CAR_MAXIMUM_NAME)
    );
  });

  it('자동차의 이름을 입력하면 이동 횟수 입력란이 보여진다.', () => {
    setCarNames('one,two,three');
    cy.get('.num-form').each((numForm) => {
      expect(numForm).to.be.visible;
    });
  });

  it('시도 횟수 입력란를 입력하지 않으면 경고문을 보여준다.', () => {
    setCarNames('one,two,three');

    setRacingNumber('ㅁ', () =>
      expect(alertStub).to.be.calledWith(INVALID_RACING_NUMBER)
    );
  });

  it('시도 횟수 입력란에 0보다 작은 수를 입력하면 경고문을 보여준다.', () => {
    setCarNames('one,two,three');

    setRacingNumber(-1, () =>
      expect(alertStub).to.be.calledWith(INVALID_RACING_MINIMUM_NUMBER)
    );
  });

  it('시도 횟수 입력란에 숫자를 입력하지 않으면 경고문을 보여준다.', () => {
    setCarNames('one,two,three');

    setRacingNumber('ㅁ', () =>
      expect(alertStub).to.be.calledWith(INVALID_RACING_NUMBER_TYPE)
    );
  });

  it('시도 횟수를 입력하면 레이싱카가 노출된다.', () => {
    setCarNames('one,two,three');
    setRacingNumber(5);

    cy.get('.result').each((resultForm) => {
      expect(resultForm).to.be.visible;
    });
  });
});
