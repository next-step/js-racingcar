Cypress.Commands.addAll({
  typingOnElement(element, value) {
    cy.get(element).type(value);
  },
  clickElement(element) {
    cy.get(element).click();
  },
  checkToHave(element, chainer, value) {
    cy.get(element).should(`have.${chainer}`, value);
  },
  clearValue(element) {
    cy.get(element).clear();
  },
  checkExist(element) {
    cy.get(element).should('exist');
  },
  checkVisible(element) {
    cy.get(element).should('be.visible');
  },
  checkInvisible(element) {
    cy.get(element).should('not.be.visible');
  },
});
