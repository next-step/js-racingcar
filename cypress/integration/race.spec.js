/// <reference types="cypress" />

describe('race test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');

    const carNameInput = cy.get('#car-name-input-set').find('input');
    carNameInput.type('abcd');
    const carNameSubmitButton = cy.get('#car-name-input-set').find('button');
    carNameSubmitButton.click();
  });

  it('반복횟수를 3으로 입력했으면, 3000밀리초 약간 후에 경기가 끝나서 결과 창이 보여야 합니다.', () => {
    const iterationCount = 3;
    const waitMs = iterationCount * 1000;

    const countInput = cy.get('#count-input-set').find('input');
    countInput.type(String(iterationCount));
    const countInputButton = cy.get('#count-input-set').find('button');
    countInputButton.click();

    cy.wait(waitMs);
    cy.get('#result-section').should('be.visible');
  });
});
