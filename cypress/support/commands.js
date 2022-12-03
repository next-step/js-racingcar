Cypress.Commands.add('typeCarName', (value) => {
    cy.get('.car-name-input').type(value);
})

Cypress.Commands.add('submitCarName', () => {
    cy.get('.car-name-btn').click();
})

Cypress.Commands.add('checkToBeVisibleRaceTurnContainer', () => {
    cy.get('.race-turn-container').should('be.visible');
})