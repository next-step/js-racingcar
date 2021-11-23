// @ts-nocheck

/* getter */
Cypress.Commands.add('getFormAttempts', () => {
  return cy.get('racingcar-form-attempts')
})
Cypress.Commands.add('getPlayboard', () => {
  return cy.get('racingcar-playboard')
})
Cypress.Commands.add('getPlayers', () => {
  return cy.get('racingcar-player')
})
Cypress.Commands.add('getWinner', () => {
  return cy.get('racingcar-winner')
})

Cypress.Commands.add('inputNames', names => {
  cy.get('racingcar-form-names input').type(names)
  cy.get('racingcar-form-names form').submit()
})
Cypress.Commands.add('inputAttempts', attempts => {
  cy.getFormAttempts().find('input').first().type(attempts)
  cy.getFormAttempts().find('form').first().submit()
})
