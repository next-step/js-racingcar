import { faker } from '@faker-js/faker';
import { arr } from '../../src/js/common/util.js';

describe('자동차 경주 테스트', () => {
    const number = +faker.random.numeric();

    beforeEach('페이지 방문', () => {
        cy.visit('/');
    })

    beforeEach('자동차 이름 등록', () => {
        const words = arr(number).map(() => faker.word.noun({ length: { min: 1, max: 5 } }));
        cy.typeName(words.join(','));
        cy.submitName();
        cy.checkToBeVisibleRoundContainer();
    })

    beforeEach('자동차 경주 횟수 등록', () => {
        cy.typeRound(+faker.random.numeric({ bannedDigits: ['0'] }));
    })

    raceSpec(number);
})

function raceSpec(number) {
    it('경주대에 등록된 자동차의 수 만큼 있어야 한다.', () => {
        cy.typeRound(+faker.random.numeric({ bannedDigits: ['0'] }));
        cy.submitRound();
        cy.get('.race-container').children().should('have.length', number);
    })
}