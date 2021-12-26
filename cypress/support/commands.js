const mockMathRandom = (values) => {
  const mockValues = values.map((n) => n / 10)
  let i = -1
  return () => {
    i += 1
    return mockValues[i % mockValues.length]
  }
  //   const mockValues = _values.map((value) => value / 46)
}
Cypress.Commands.add('windowAlertStub', (stub, message) =>
  expect(stub.getCall(0)).to.be.calledWith(message)
)
Cypress.Commands.add('mockMathRandom', (values) => {
  cy.window().then((window) => {
    window.Math.random = mockMathRandom(values)
  })
})
Cypress.Commands.add('autoRacingInput', (names, tryCount) => {
  cy.get('[data-cy=car-name-input]').type(names)
  cy.get('[data-cy="car-name-btn"]').click()
  cy.get('[data-cy=car-try-input]').type(tryCount)
  cy.get('[data-cy="car-try-btn"]').click()
})
