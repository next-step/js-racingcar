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
});
