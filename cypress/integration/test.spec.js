describe('Add Operation Test', () => {
	beforeEach(() => {
		cy.visit('')
	})

	it('1-1', () => {
		const CARS = ['EAST', 'WEST', 'SOUTH', 'NORTH']

		cy.get('.name-form input').type(CARS.join(', '))

		cy.get('.name-form button').click()

		cy.get('.num-form input').type('3')

		cy.get('.num-form button').click()

		cy.get('.car-player').each(($el, index) => {
			cy.wrap($el).should('have.text', CARS[index])
		})
	})
})
