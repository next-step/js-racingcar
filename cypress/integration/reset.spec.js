/// <reference types="cypress" />

describe('reset test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');

    const carNameInput = cy.get('#car-name-input-set').find('input');
    carNameInput.type('abcd');
    const carNameSubmitButton = cy.get('#car-name-input-set').find('button');
    carNameSubmitButton.click();

    const countInput = cy.get('#count-input-set').find('input');
    countInput.type('3');
    const countInputButton = cy.get('#count-input-set').find('button');
    countInputButton.click();

    cy.wait(3001);
  });

  it('reset 버튼을 누르면 모든 입력창이 비워지고, disable이 사라지며 race Track과 경기 결과 창이 안보이게 됩니다.', () => {
    const resetButton = cy.get('#result-section').find('button');
    resetButton.click();

    const carNameInputSet = cy.get('#car-name-input-set');
    carNameInputSet.should('be.visible');
    carNameInputSet.should('not.be.disabled');
    const carNameInput = carNameInputSet.find('input');
    carNameInput.should('be.empty')

    const countInputSet = cy.get('#count-input-set');
    countInputSet.should('not.be.visible');
    countInputSet.should('not.be.disabled');
    const countInput = countInputSet.find('input');
    countInput.should('be.empty');

    cy.get('#race-track').should('not.be.visible');
    cy.get('#result-section').should('not.be.visible');
  });
});
