import { faker } from "@faker-js/faker";
import { ERROR_MESSAGE } from "../../src/js/common/error.js";

describe('자동차 이름 등록 테스트', () => {
    beforeEach('페이지 방문', () => {
        cy.visit('/');
    })

    nameSpec();
})

function nameSpec() {
    it('자동차 이름을 입력할 인풋 박스가 있다.', () => {
        cy.get('.name-input').should('exist');
    })

    it('자동차 이름을 입력할 수 있다.', () => {
        cy.typeName(faker.name.lastName());
    })

    it('자동차 이름은 1자 이상, 5자 이하로 입력할 수 있다. :: 5자 이상의 값', () => {
        cy.typeName(faker.word.noun({ length: { min: 6, max: 10 }}));
        checkAlert(cy.submitName(), ERROR_MESSAGE.InputOutOfRange);
    })

    it('자동차 이름은 1자 이상, 5자 이하로 입력할 수 있다. :: 미입력', () => {
        checkAlert(cy.submitName(), ERROR_MESSAGE.InputOutOfRange);
    })

    it('자동차 이름은 1자 이상, 5자 이하로 입력할 수 있다. :: 범위 안의 값', () => {
        cy.typeName(faker.word.noun({ length: { min: 1, max: 5 }}));
        cy.submitName();
        cy.checkToBeVisibleRoundContainer();
    })

    it('자동차 이름은 콤마를 이용하여 여러 대 입력할 수 있다.', () => {
        cy.registerCars();
    })
}

function checkAlert(scenario, message) {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    scenario.then(() => expect(stub.getCall(0).lastArg).to.equals(message));
}
