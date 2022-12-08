// racing scenario test

import { VALIDATOR_MSG } from '../../src/constants/index.js';
import { DATA_CY } from '../fixtures/selector';

describe('레이싱  E2E 테스트를 시작합니다.', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5500/index.html');
	});

	it('참가자를 입력하는 input이 보여야 합니다.', () => {
		cy.getByDataCy(DATA_CY.RACING_PARTICIPANT_INPUT).should('be.visible');
	});

	it(`참가자를 입력하지 않고, 입력버튼을 누르면 ${VALIDATOR_MSG.NOT_ALLOWED_PARTICIPIANT}를 볼 수 있어야 합니다.`, () => {
		const stub = cy.stub();
		cy.on('window:alert', stub);

		cy.getByDataCy(DATA_CY.RACING_PARTICIPANT_INPUT).clear();
		cy.getByDataCy(DATA_CY.RACING_PARTICIPANT_SUBMIT_BUTTON)
			.click()
			.then(() => {
				expect(stub.getCall(0)).to.be.calledWith(VALIDATOR_MSG.NOT_ALLOWED_PARTICIPIANT);
			});
	});
});
