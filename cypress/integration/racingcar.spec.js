import { CONGRATS_MESSAGE, NAME_ERROR_MESSAGE, NUMBER_ERROR_MESSAGE } from '../../src/js/utils/constants.js';

describe('test racing car game', () => {
	beforeEach(() => {
		cy.visit('http://127.0.0.1:5500');
		cy.clock();
	});

	// it('input names with name over length 5', () => {
	// 	cy.get('.name-input').type('TEST, TESTTT');
	// 	cy.get('.name-button').click();
	// 	cy.on('window:alert', (str) => {
	// 		expect(str).to.equal(NAME_ERROR_MESSAGE);
	// 	});
	// });

	// it('input names with name shorter than length 1', () => {
	// 	cy.get('.name-input').type('TEST, TEST2,');
	// 	cy.get('.name-button').click();
	// 	cy.on('window:alert', (str) => {
	// 		expect(str).to.equal(NAME_ERROR_MESSAGE);
	// 	});
	// });

	// it('input valid names and invalid number', () => {
	// 	cy.get('.name-input').type('TEST1, TEST2, TEST3, TEST4, TEST5');
	// 	cy.get('.name-button').click();
		
	// 	cy.get('.try-input').type(0);
	// 	cy.get('.try-button').click();
	// 	cy.on('window:alert', (str) => {
	// 		expect(str).to.equal(NUMBER_ERROR_MESSAGE);
	// 	});
	// });

	it('input valid names and number, and start game', () => {
		cy.get('.name-input').type('TEST1, TEST2, TEST3, TEST4, TEST5');
		cy.get('.name-button').click();
		cy.get('.try-input').type(5);
		cy.get('.try-button').click();

		cy.tick(1000);
		cy.get('.car-container').should('contain.html', '<span class="material spinner"></span>');
	});

	it('after 5 seconds, show winners', () => {
		cy.get('.name-input').type('TEST1, TEST2, TEST3, TEST4, TEST5');
		cy.get('.name-button').click();
		cy.get('.try-input').type(5);
		cy.get('.try-button').click();

		// 약 16ms씩 밀려서(?) animation이 실행됨
		cy.tick(5100);
		cy.get('.result-container').should('be.visible');
	});

	it('alert congratulation message', () => {});
});
