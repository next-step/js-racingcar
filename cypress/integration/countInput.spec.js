/// <reference types="cypress" />

describe('Iteration Count Input', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');

    const carNameInput = cy.get('#car-name-input-set').find('input');
    carNameInput.type('abcd');

    const carNameSubmitButton = cy.get('#car-name-input-set').find('button');
    carNameSubmitButton.click();
  });

  it('횟수에 아무것도 없이 클릭하면 경고창을 띄운다.', () => {
    const countInputButton = cy.get('#count-input-set').find('button');
    countInputButton.click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('횟수를 입력해주세요!');
    });
  });

  it('횟수를 입력하면, 횟수 입력 fieldset이 disable되고 race Track의 hide가 없어진다.', () => {
    const countInput = cy.get('#count-input-set').find('input');
    countInput.type('3');

    const countInputButton = cy.get('#count-input-set').find('button');
    countInputButton.click();

    cy.get('#count-input-set').should('be.disabled');
    cy.get('#race-track').should('be.visible');
  });
});
