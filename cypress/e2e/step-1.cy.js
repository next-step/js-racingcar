import { CAR_NAME_MAX_LENGTH, errorMessages } from '../../src/js/constants';

describe('winningLotto', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('자동차 이름', () => {
    beforeEach(() => {
      cy.on('window:alert', (message) => {
        expect(message).to.equal(errorMessages.INVALID_CAR_NAMES);
      });
    });

    it(`자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 ${CAR_NAME_MAX_LENGTH}자 이하만 가능하다.`, () => {
      cy.get('#form-car-name input').type('a, b, c, d, e, f');
      cy.get('#form-car-name button').click();

      cy.get('#form-car-name input').should('be.disabled');
      cy.get('#form-car-name button').should('be.disabled');
    });

    it(`${CAR_NAME_MAX_LENGTH + 1}자 이상의 이름은 오류를 발생시킨다.`, () => {
      cy.get('#form-car-name input').type('abcdef');
      cy.get('#form-car-name button').click();
    });

    it('이름을 입력하지 않은 경우 오류를 발생시킨다.', () => {
      cy.get('#form-car-name button').click();
    });
  });

  describe('시도 횟수', () => {
    beforeEach(() => {
      cy.on('window:alert', (message) => {
        expect(message).to.equal(errorMessages.INVALID_COIN);
      });

      cy.get('#form-car-name input').type('a, b, c');
      cy.get('#form-car-name button').click();
    });

    it('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.', () => {
      cy.get('#form-car-coin input').type(3);
      cy.get('#form-car-coin button').click();

      cy.get('#form-car-coin input').should('be.disabled');
      cy.get('#form-car-coin button').should('be.disabled');
    });

    it('숫자를 입력하지 않은 경우 alert.', () => {
      cy.get('#form-car-coin input').type('a');
      cy.get('#form-car-coin button').click();
    });

    it('횟수를 입력하지 않은 경우 alert', () => {
      cy.get('#form-car-coin button').click();
    });
  });

  describe('게임', () => {
    const carNames = ['a', 'b', 'c'];

    beforeEach(() => {
      cy.get('#form-car-name input').type(carNames.join(', '));
      cy.get('#form-car-name button').click();

      cy.get('#form-car-coin input').type(3);
      cy.get('#form-car-coin button').click();
    });

    it('자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
      cy.get('.car-player').each((car, index) => {
        expect(car.text().trim()).to.equal(carNames[index]);
      });
    });

    it('입력한 이름만큼 자동차가 있어야 한다.', () => {
      cy.get('.car-player').should('have.length', carNames.length);
    });
  });
});
