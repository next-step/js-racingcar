import { faker } from "@faker-js/faker";
import { ERROR_MESSAGE } from "../../src/js/common/error.js";
import { arr } from "../../src/js/common/util.js";

describe('자동차 경주 테스트', () => {
    beforeEach('페이지 방문', () => {
        cy.visit('/');
    })

    carNameSpec();
})

function carNameSpec() {
    it('자동차 이름을 입력할 인풋 박스가 있다.', () => {
        cy.get('.car-name-input').should('exist');
    })

    it('자동차 이름을 입력할 수 있다.', () => {
        cy.typeCarName(faker.name.lastName());
    })

    it('자동차 이름은 1자 이상, 5자 이하로 입력할 수 있다. :: 5자 이상의 값', () => {
        cy.typeCarName(faker.word.noun({ length: { min: 6, max: 10 }}));
        checkAlert(cy.submitCarName(), ERROR_MESSAGE.CAR_NAME_OUT_OF_RANGE);
    })

    it('자동차 이름은 1자 이상, 5자 이하로 입력할 수 있다. :: 미입력', () => {
        checkAlert(cy.submitCarName(), ERROR_MESSAGE.CAR_NAME_OUT_OF_RANGE);
    })

    it('자동차 이름은 1자 이상, 5자 이하로 입력할 수 있다. :: 범위 안의 값', () => {
        cy.typeCarName(faker.word.noun({ length: { min: 1, max: 5 }}));
        cy.submitCarName();
        cy.checkToBeVisibleRaceTurnContainer();
    })

    it('자동차 이름은 콤마를 이용하여 여러 대 입력할 수 있다.', () => {
        const number = faker.random.numeric();
        const words = arr(number)
            .map(num => faker.word.noun({ length: { min: 1, max: 5 }}));
        cy.typeCarName(words.join(','));
        cy.submitCarName();
        cy.checkToBeVisibleRaceTurnContainer();
    })
}

function checkAlert(scenario, message) {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    scenario.then(() => expect(stub.getCall(0).lastArg).to.equals(message));
}
