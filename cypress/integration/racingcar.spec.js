describe('레이싱카 앱 테스트', () => {
	beforeEach(() => {
		cy.visit('../index.html');
	});

	it('자동차 이름을 입력하지 않으면 경고창을 띄워준다.', () => {
		const alertStub = cy.stub();
		cy.on('window:alert', alertStub);

		cy.get('#car-names-input').clear();
		cy.get('#car-names-submit')
			.click()
			.then(() => {
				// TODO: 에러 메세지를 상수화한다.
				expect(alertStub.getCall(0)).to.be.calledWith(
					'자동차의 이름을 입력해주세요.'
				);
			});
	});

	it('자동차의 이름이 5글자를 초과하면 경고창을 띄워준다.', () => {
		const alertStub = cy.stub();
		cy.on('window:alert', alertStub);

		cy.get('#car-names-input').type('EASTTT, WEST, SOUTH, NORTH');
		cy.get('#car-names-submit')
			.click()
			.then(() => {
				expect(alertStub.getCall(0)).to.be.calledWith(
					'자동차의 이름은 최대 5글자까지 입력 가능합니다.'
				);
			});
	});

	it('자동차의 이름을 입력하면 이름 입력 필드가 disabled되고 전진 횟수를 입력하는 필드가 나타난다.', () => {
		cy.get('#car-names-input').type('EAST, WEST, SOUTH, NORTH');
		cy.get('#car-names-submit').click();
		cy.get('#car-names-input').should('be.disabled');
		cy.get('#car-try-block').should('be.visible');
	});

	it('전진 횟수를 입력하지 않으면 경고창을 띄워준다.', () => {
		const alertStub = cy.stub();
		cy.on('window:alert', alertStub);

		cy.get('#car-names-input').type('EAST, WEST, SOUTH, NORTH');
		cy.get('#car-names-submit').click();
		cy.get('#car-try-input').clear();
		cy.get('#car-try-block').should('be.visible');
		cy.get('#car-try-submit')
			.click()
			.then(() => {
				expect(alertStub.getCall(0)).to.be.calledWith(
					'시도할 횟수를 입력해주세요.'
				);
			});
	});

	it('전진 횟수를 입력하면 횟수 입력 필드가 disabled되고 자동차 경주 블록이 나타난다.', () => {
		cy.get('#car-names-input').type('EAST, WEST, SOUTH, NORTH');
		cy.get('#car-names-submit').click();
		cy.get('#car-try-input').type('3');
		cy.get('#car-try-submit').click();
		cy.get('#car-try-input').should('be.disabled');
		cy.get('#car-racing-block').should('be.visible');
	});
});
