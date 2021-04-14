/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

import { WINNING_MESSAGE } from '../../src/library/constants/alertMessage';
import Car from '../../src/library/models/Car';
import { getRandomNumber } from '../../src/library/utils/random.js';

describe('레이싱 게임', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  it('자동차 이름을 부여하면 시도할 횟수 입력창이 노출된다.', () => {
    cy.get('#input-car-name').type('aaa,bbb,ccc');
    cy.get('#submit-car-name').click();
    cy.get('#section-race-times').should('be.visible');
  });

  it('이름은 1자이상, 5자 이하만 가능합니다.', () => {
    cy.get('#input-car-name').type(',bbbbbb,aaa');
    cy.get('#submit-car-name').click();
    cy.get('#section-race-times').should('not.to.be.visible');
  });

  it('이름은 공백일 수 없다', () => {
    cy.get('#input-car-name').type('             ');
    cy.get('#submit-car-name').click();
    cy.get('#section-race-times').should('not.to.be.visible');
  });

  it('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.', () => {
    cy.get('#input-car-name').type('aaa,bbb,ccc');
    cy.get('#submit-car-name').click();
    cy.get('#input-race-times').type('2');
    cy.get('#submit-race-times').click();
    cy.get('#game-process-component > section').should('exist');
  });

  it('시도할 횟수는 1 이상이어야 한다.', () => {
    cy.get('#input-car-name').type('aaa,bbb,ccc');
    cy.get('#submit-car-name').click();
    cy.get('#input-race-times').type('0');
    cy.get('#submit-race-times').click();
    cy.get('#game-process-component > section').should('not.exist');
  });

  it('입력이 완료된 정보는 다시 입력할 수 없다.', () => {
    cy.get('#input-car-name').type('aaa,bbb,ccc');
    cy.get('#submit-car-name').click();
    cy.get('#submit-car-name').should('have.attr', 'disabled');
    cy.get('#input-race-times').type('10');
    cy.get('#submit-race-times').click();
    cy.get('#submit-race-times').should('have.attr', 'disabled');
  });

  it('자동차는 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.', () => {
    const testCar = new Car('test');
    testCar.go(4);
    expect(testCar.position).to.equal(1);
    testCar.go(3);
    expect(testCar.position).to.equal(1);
  });

  it('자동차는 전진의 조건으로 0에서 9 사이에서 랜덤값을 받는다.', () => {
    const wrongCases = [...Array(100)]
      .map(() => getRandomNumber(0, 10))
      .filter(number => number < 0 || number > 9);
    expect(wrongCases.length).to.be.lessThan(1);
  });

  it('주어진 횟수 동안 진행한 n대의 자동차의 레이싱 상태를 표시한다.', () => {
    cy.get('#input-car-name').type('aaa');
    cy.get('#submit-car-name').click();
    cy.get('#input-race-times').type('100');
    cy.get('#submit-race-times').click();
    cy.get('.forward-icon').should('exist');
  });

  it('자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.', () => {
    cy.get('#input-car-name').type('aaa,bbb');
    cy.get('#submit-car-name').click();
    cy.get('#input-race-times').type('1');
    cy.get('#submit-race-times').click();
    cy.wait(1000);

    cy.get('.car').then($cars => {
      const $carAaa = $cars[0];
      const $carBbb = $cars[1];
      const aaaPosition = $carAaa.querySelectorAll('.forward-icon').length;
      const bbbPosition = $carBbb.querySelectorAll('.forward-icon').length;

      if (aaaPosition >= bbbPosition) {
        cy.get('#winners')
          .then(([element]) => element.innerText.includes('aaa'))
          .should('is.true');
      } else {
        cy.get('#winners').should('have.text', 'bbb');
      }
    });
  });

  it('우승자가 여러 명일 경우 `,`를 이용하여 구분한다.', () => {
    for (let i = 0; i < 10; i++) {
      cy.get('#input-car-name').type('aaa,bbb');
      cy.get('#submit-car-name').click();
      cy.get('#input-race-times').type('1');
      cy.get('#submit-race-times').click();
      cy.wait(1000);


      cy.get('.car').then($cars => {
        const $carAaa = $cars[0];
        const $carBbb = $cars[1];
        const aaaPosition = $carAaa.querySelectorAll('.forward-icon').length;
        const bbbPosition = $carBbb.querySelectorAll('.forward-icon').length;

        if (aaaPosition === bbbPosition) {
          cy.get('#winners')
            .then(([element]) => element.innerText.includes('aaa, bbb'))
            .should('is.true');
        }
        if (aaaPosition !== bbbPosition) {
          cy.get('#winners')
            .then(([element]) => element.innerText.includes(','))
            .should('is.false');
        }
      });

      cy.get('#retry').click();
    }
  });

  it('사용자는 자동차 경주 게임을 다시 시작할 수 있다.', () => {
    cy.get('#input-car-name').type('aaa');
    cy.get('#submit-car-name').click();
    cy.get('#input-race-times').type('1');
    cy.get('#submit-race-times').click();
    cy.get('#retry').click();
    cy.get('#game-result-component > section').should('not.exist');
  });

  it('자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.', () => {
    cy.get('#input-car-name').type('aaa');
    cy.get('#submit-car-name').click();
    cy.get('#input-race-times').type('2');
    cy.get('#submit-race-times').click();
    cy.get('.forward-icon').should('not.exist');
    cy.wait(1000);
    cy.get('.forward-icon').should('exist');
  });

  it('정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));

    cy.get('#input-car-name').type('aaa');
    cy.get('#submit-car-name').click();
    cy.get('#input-race-times').type('1');
    cy.get('#submit-race-times').click();
    cy.wait(2000);
    cy.get('@alert').should('not.be.called');
    cy.wait(2000);
    cy.get('@alert').should('be.calledWith', WINNING_MESSAGE);
  });

});
