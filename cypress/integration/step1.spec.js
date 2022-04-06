/// <reference types="cypress" />

import {MSG_ERROR_INVALID_NUMBER, MSG_ERROR_NO_NAMES} from "../../src/module/constants.mjs";
import {initApp} from "../../src/app";

describe('step1', () => {
    before(() => {
        cy.visit('../../index.html')
    })

    it('app이 존재해야한다', () => {
        cy.get('#app').should('exist')
    });

    context('자동차 입력폼이 렌더링된 후', () => {
        context('자동차이름을 입력하지 않으면', () => {
            it('경고창을 띄운다.', () => {
                cy.get('[placeholder="자동차 이름"] + button:contains("확인")').click();
                cy.on('window:alert', (str) => {
                    expect(str).to.equal(MSG_ERROR_NO_NAMES);
                })
            })
        })

        context('자동차이름을 쉼표를 기준으로 구분하여 입력하고 확인버튼을 누르면', () => {
            before(() => {
                cy.get('[placeholder="자동차 이름"]').type('자동차1,자동차2,자동차3');
                cy.get('[placeholder="자동차 이름"] + button:contains("확인")').click();
            })

            it('시도횟수 입력 입력폼이 노출된다', () => {
                cy.get('.try-count').should('be.visible');
            })
        })
    })
    context('시도횟수 입력폼이 렌더링된 후', () => {
        context('시도횟수를 입력하지 않고 확인버튼을 누르면', () => {
            it('경고창을 띄운다.', () => {
                cy.get('[placeholder="시도 횟수"] + button:contains("확인")').click();

                cy.on('window:alert', (str) => {
                    expect(str).to.equal(MSG_ERROR_INVALID_NUMBER);
                })
            })
        })

        context('시도 횟수를 입력하고 확인 버튼을 누르면', () => {
            before(() => {
                cy.get('[placeholder="시도 횟수"]').type('2');
                cy.get('[placeholder="시도 횟수"] + button:contains("확인")').click();
            })

            it('쉼표를 기준으로 나뉘어 자동차 이름이 지정된다.', () => {
                cy.get('.car-player').eq(0).should('have.text', '자동차1');
                cy.get('.car-player').eq(1).should('have.text', '자동차2');
                cy.get('.car-player').eq(2).should('have.text', '자동차3');
            })
        })
    })

    describe('전진 조건에 따라 자동차의 움직임이 결정된다.', () =>  {
        beforeEach(() => {
            cy.visit('../../index.html')
            cy.get('[placeholder="자동차 이름"]').type('자동차1,자동차2,자동차3');
            cy.get('[placeholder="자동차 이름"] + button:contains("확인")').click();
            cy.get('[placeholder="시도 횟수"]').type('2');
            cy.get('[placeholder="시도 횟수"] + button:contains("확인")').click();
        })

        context('전진 조건을 만족하면', () => {
            it('한칸 앞으로 움직인다.', () => {
                cy.window().then((w) => {
                    cy.stub(w.Math, 'random').returns(0.9);
                    cy.get('[placeholder="시도 횟수"] + button:contains("확인")').click();
                    cy.get('.race [aria-label="자동차1"] .forward-icon').should('have.length', 2);
                })
            })
        })

        context('전진 조건을 만족하지 못하면', () => {
            it('움직이지 않는다.', () => {
                cy.window().then((w) => {
                    cy.stub(w.Math, 'random').returns(0);
                    cy.get('[placeholder="시도 횟수"] + button:contains("확인")').click();
                    cy.get('.race [aria-label="자동차1"] .forward-icon').should('have.length', 0);
                })
            })
        })
    })
})
