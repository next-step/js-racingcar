Cypress.Commands.add('typeAndClick', (input, button, value) => {
  input().type(value);
  button().click();
});

Cypress.Commands.add('typeAndEnter', (target, value) => {
  target().type(value + '{enter}');
});
