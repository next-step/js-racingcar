/// <reference types="cypress" />

describe('Iteration Count Input', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');

    const carNameInput = cy.get('#car-name-input-set').find('input');
    carNameInput.type('abcd');

    const carNameSubmitButton = cy.get('#car-name-input-set').find('button');
    carNameSubmitButton.click();
  });

  function testCountInput(input, isClick, resultCallback) {
    const countInput = cy.get('#count-input-set').find('input');
    if (input) countInput.type(input);

    if (isClick) {
      const countInputButton = cy.get('#count-input-set').find('button');
      countInputButton.click();
    } else {
      const countInput = cy.get('#count-input-set').find('input');
      countInput.type('{enter}');
    }

    resultCallback();
  }

  it('횟수에 아무것도 없이 클릭하면 경고창을 띄운다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('횟수를 입력해주세요!');
    });

    testCountInput('', true, () => {});
  });

  it('횟수에 아무것도 없이 엔터하면 경고창을 띄운다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('횟수를 입력해주세요!');
    });

    testCountInput('', false, () => {});
  });

  it('횟수를 입력하면, 횟수 입력 fieldset이 disable되고 race Track의 hide가 없어진다.', () => {
    testCountInput('3', true, () => {
      cy.get('#count-input-set').should('be.disabled');
      cy.get('#race-track').should('be.visible');
    });
  });

  it('횟수를 입력하고 엔터하면, 횟수 입력 fieldset이 disable되고 race Track의 hide가 없어진다.', () => {
    testCountInput('3', false, () => {
      cy.get('#count-input-set').should('be.disabled');
      cy.get('#race-track').should('be.visible');
    });
  });
});
