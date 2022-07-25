// -- This is a parent command --

Cypress.Commands.add('getByDataCy', (dataCySelector) => {
	cy.get(`[data-cy="${dataCySelector}"]`);
});

Cypress.Commands.add('checkAlertMessage', (errorMessage) => {
	cy.on('window:alert', (innerAlertText) => {
		expect(innerAlertText).to.contains(errorMessage);
	});
});
