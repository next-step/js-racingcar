/// <reference types="cypress" />

import {MSG_ERROR_INVALID_NUMBER, MSG_ERROR_NO_NAMES} from "../../src/module/constants.mjs";
import {initApp} from "../../src/app";

describe('step2', () => {
    before(() => {
        cy.visit('../../index.html')
    })

    it('app이 존재해야한다', () => {
        cy.get('#app').should('exist')
    });


    describe('자동차 경주 게임을 완료한 후', () => {
        it('우승자를 알려준다.', () => {
        })
    })

    // given
    describe('자동차 경주 게임을 완료한 후', () => {
        // when
        context('우승자가 여러명 이라면', () => {
            // then
            it('콤마를 이용하여 구분하여 보여준다.', () => {
            })
        })
    })

    // given
    describe('자동차 경주 게임이 완료되면', () => {
        it('다시 시작하기 버튼이 노출된다.', () => {
        })

        // when
        context('다시 시작하기 버튼을 누르면', () => {
            // then
            it('자동차 경주 게임을 다시 시작할 수 있는 환경이 된다.', () => {
            })
        })
    })
})
