// @ts-nocheck
import { CongratulationMsg, ErrorMsgs } from '../../dist/constants.js'

before(() => {
  cy.visit('http://localhost:3000/')
})

const initialTest = () => {
  cy.get('racingcar-form-names').should('be.visible').find('input').first().should('be.focused')
  cy.getFormAttempts().should('not.be.visible')
  cy.getPlayboard().should('not.be.visible')
  cy.getWinner().should('not.be.visible')
}

describe('racing-car', () => {
  describe('최초 접속시', () => {
    it('최초 접속시 이름 입력창만 보임', initialTest)
  })
  describe('이름 입력', () => {
    it('하나라도 5글자 초과시 경고', () => {
      cy.on('window:alert', text => {
        expect(text).to.contains(ErrorMsgs.NAME_LENGTH_LIMIT)
      })
      cy.inputNames('abcdef,g,h')
      cy.inputNames('a,bcdefgh,ijk')
      cy.inputNames('a,bcdefgh,ijk')
    })

    it('5자 이하로 콤마로 구분하여 나열시', () => {
      cy.inputNames('apple, banan, cocoa, donut')
      cy.getFormAttempts().should('be.visible').find('input').first().should('be.focused')
      cy.getPlayers()
        .should('have.length', 4)
        .eq(0)
        .should('have.text', 'apple')
        .next()
        .should('have.text', 'banan')
        .next()
        .should('have.text', 'cocoa')
        .next()
        .should('have.text', 'donut')
    })
  })
  describe('시도횟수 입력', () => {
    it('2 입력하면 2초간 racing함 -> 이후 2초 대기시 축하alert 뜸', () => {
      cy.inputAttempts(2)
      cy.getPlayboard().should('be.visible')
      cy.getWinner().should('not.be.visible')
      cy.wait(1000 * 2)
      cy.getWinner().should('be.visible')
      cy.getPlayers().each(el => {
        cy.wrap(el).should($el => {
          expect($el.length).to.be.within(0, 2)
        })
      })
      cy.wait(1000 * 2)
      cy.on('window:alert', text => {
        expect(text).to.contains(CongratulationMsg)
      })
    })

    it('3 입력하면 3초간 racing함. 바로 이어서 다시 2 입력하면 경고창 뜨지 않고 racing함', () => {
      cy.inputAttempts(3)
      cy.getPlayboard().should('be.visible')
      cy.getWinner().should('not.be.visible')
      cy.wait(1000 * 3)
      cy.getWinner().should('be.visible')
      cy.getPlayers().each(el => {
        cy.wrap(el).should($el => {
          expect($el.length).to.be.within(0, 3)
        })
      })
      cy.wait(500)
      cy.inputAttempts(2)
      cy.wait(1000 * 2)
      cy.getWinner().should('be.visible')
      cy.getPlayers().each(el => {
        cy.wrap(el).should($el => {
          expect($el.length).to.be.within(0, 2)
        })
      })
      cy.wait(1000 * 2)
      cy.on('window:alert', text => {
        expect(text).to.contains(CongratulationMsg)
      })
    })
  })
  describe('다시 시작하기', () => {
    it('다시 시작하기 click시 리셋', () => {
      cy.get('racingcar-winner button').click()
      initialTest()
    })
  })
})
