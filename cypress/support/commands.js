Cypress.Commands.add('alertMessageWillBeEqual', (text) => {
  cy.on('window:alert', (txt) => {
    expect(text).to.equal(txt)
  })
})

Cypress.Commands.add('getPlayers', () => {
  return cy.get('.car-player')
})
