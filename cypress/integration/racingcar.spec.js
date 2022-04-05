import { ERR_MSG } from '../../src/js/util/constatns';

describe('레이싱카 앱 테스트', () => {
	beforeEach(() => {
		cy.visit('../index.html');
	});

	context('자동차 이름 입력', () => {
		it('자동차 이름을 입력하지 않으면 경고창을 띄워준다.', () => {
			const alertStub = cy.stub();
			cy.on('window:alert', alertStub);

			cy.get('#car-names-input').clear();
			cy.get('#car-names-submit')
				.click()
				.then(() => {
					expect(alertStub.getCall(0)).to.be.calledWith(ERR_MSG.EMPTY_CAR_NAME);
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
						ERR_MSG.OVER_CAR_NAME_MAX_LENGTH
					);
				});
		});

		it('자동차의 이름 입력을 완료하면 필드가 비활성화 된다.', () => {
			cy.get('#car-names-input').type('EAST, WEST, SOUTH, NORTH');
			cy.get('#car-names-submit').click();
			cy.get('#car-names-input').should('be.disabled');
			cy.get('#car-names-submit').should('be.disabled');
		});
	});

	context('시도할 횟수 입력', () => {
		const CAR_NAMES = 'EAST, WEST, SOUTH, NORTH';

		it('전진 횟수를 입력하는 필드가 나타난다.', () => {
			cy.get('#car-names-input').type(CAR_NAMES);
			cy.get('#car-names-submit').click();
			cy.get('#car-try-block').should('be.visible');
		});

		it('전진 횟수를 입력하지 않으면 경고창을 띄워준다.', () => {
			const alertStub = cy.stub();
			cy.on('window:alert', alertStub);

			cy.get('#car-names-input').type(CAR_NAMES);
			cy.get('#car-names-submit').click();
			cy.get('#car-try-input').clear();
			cy.get('#car-try-block').should('be.visible');
			cy.get('#car-try-submit')
				.click()
				.then(() => {
					expect(alertStub.getCall(0)).to.be.calledWith(ERR_MSG.EMPTY_TRY_NUM);
				});
		});

		it('전진 횟수 입력을 완료하면 필드가 비활성화 된다.', () => {
			cy.get('#car-names-input').type(CAR_NAMES);
			cy.get('#car-names-submit').click();
			cy.get('#car-try-input').type('3');
			cy.get('#car-try-submit').click();
			cy.get('#car-try-input').should('be.disabled');
			cy.get('#car-try-submit').should('be.disabled');
		});
	});

	context('자동차 경주 시작', () => {
		const CAR_NAMES = 'EAST, WEST, SOUTH, NORTH';

		it('자동차 경주 블록이 나타난다.', () => {
			cy.get('#car-names-input').type(CAR_NAMES);
			cy.get('#car-names-submit').click();
			cy.get('#car-try-input').type('3');
			cy.get('#car-try-submit').click();
			cy.get('#car-racing-block').should('be.visible');
		});

		// it('입력한 자동차의 이름대로 자동차가 생성된다.', () => {});
	});
});
