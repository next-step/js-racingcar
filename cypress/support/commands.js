import { faker } from "@faker-js/faker";
import { arr } from "../../src/js/common/util";

Cypress.Commands.add('typeName', (value) => {
    cy.get('.name-input').type(value);
})

Cypress.Commands.add('submitName', () => {
    cy.get('.name-btn').click();
})

Cypress.Commands.add('checkToBeVisibleRoundContainer', () => {
    cy.get('.round-container').should('be.visible');
})

Cypress.Commands.add('registerCars', () => {
    const number = +faker.random.numeric();
    const words = arr(number).map(() => faker.word.noun({ length: { min: 1, max: 5 } }));
    cy.typeName(words.join(','));
    cy.submitName();
    cy.checkToBeVisibleRoundContainer();
})

Cypress.Commands.add('typeRound', (value) => {
    cy.get('.round-input').type(value);
})

Cypress.Commands.add('submitRound', () => {
    cy.get('.round-btn').click();
})