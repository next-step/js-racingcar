import { faker } from '@faker-js/faker';
import { ERROR_MESSAGE } from '../../src/js/common/error';

describe('자동차 경주 횟수 등록 테스트', () => {
    beforeEach('페이지 방문', () => {
        cy.visit('/');
    })

    beforeEach('자동차 이름 등록', () => {
        cy.registerCars();
    })

    roundSpec();
})

function roundSpec() {
    it('경기 횟수를 입력할 인풋 박스가 있다.', () => {
        cy.get('.round-input').should('exist');
    })

    it('경기 횟수를 입력할 수 있다.', () => {
        cy.typeRound(+faker.random.numeric());
    })

    it('경기 횟수는 최소 1회 이상이어야 한다. :: 미입력', () => {
        checkAlert(cy.submitRound(), ERROR_MESSAGE.InputMinInsufficient);
    })

    it('경기 횟수는 최소 1회 이상이어야 한다. :: 0 입력', () => {
        cy.typeRound(0);
        checkAlert(cy.submitRound(), ERROR_MESSAGE.InputMinInsufficient);
    })

    it('경기 횟수는 최소 1회 이상이어야 한다. :: 범위 안의 값', () => {
        cy.typeRound(+faker.random.numeric({ bannedDigits: ['0'] }));
        cy.submitRound();
        cy.get('.race-container').children().should('exist');
    })
}

function checkAlert(scenario, message) {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    scenario.then(() => expect(stub.getCall(0).lastArg).to.equals(message));
}
