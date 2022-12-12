import { faker } from '@faker-js/faker';
import { arr } from '../../src/js/common/util.js';
import { MESSAGE_FOR_CELEBRATION } from "../../src/js/common/const";

describe('자동차 경주 테스트', () => {
    const player = +faker.random.numeric();
    const round  = +faker.random.numeric(1, { bannedDigits: ['0'] })
    const time = round * 1000;

    beforeEach('페이지 방문', () => {
        cy.visit('/');
    })

    beforeEach('자동차 이름 등록', () => {
        const words = arr(player).map(() => faker.word.noun({ length: { min: 1, max: 5 } }));
        cy.typeName(words.join(','));
        cy.submitName();
        cy.checkToBeVisibleRoundContainer();
    })

    beforeEach('자동차 경주 횟수 등록', () => {
        cy.typeRound(round);
        cy.submitRound();
    })

    raceSpec(player, time);
})

function raceSpec(player, time) {
    it('경주대에 등록된 자동차의 수 만큼 있어야 한다.', () => {
        cy.get('.race-container').children().should('have.length', player);
    })

    it('경주가 끝난 후 2초 뒤 \'축하합니다\' alert 창이 뜬다.', () => {
        cy.wait(time);
        checkAlert(cy.wait(2000), MESSAGE_FOR_CELEBRATION);
    })

    it('경주가 끝난 후 우승자가 발표되고 다시 시작하기 버튼이 노출되어야 한다.', () => {
        cy.wait(time);
        checkAlert(cy.wait(2000), MESSAGE_FOR_CELEBRATION);
        cy.get('.winner-container').should('be.visible');
        cy.get('.winner-player').should('be.visible');
        cy.get('.btn-reset').should('be.visible');
    })
}

function checkAlert(scenario, message) {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    scenario.then(() => expect(stub.getCall(0).lastArg).to.equals(message));
}
