/// <reference types="cypress" />

import {
  CAR_NAMES,
  CAR_NAMES_ARRAY,
  WRONG_CAR_NAMES,
} from '../support/constants'
import { splitCarNames } from '../support/utils'

describe('🏎️ 자동차 경주 게임', () => {
  beforeEach(() => {
    cy.visit('https://eungyucho.github.io/js-racingcar/')
    cy.get('[id=car_name_input]').as('carNameInput')
    cy.get('[id=car_name_button]').as('carNameButton')
    cy.get('[id=game_count_input]').as('gameCountInput')
    cy.get('[id=game_count_button]').as('gameCountButton')
    cy.get('[id=game_count_button]').as('gameCountButton')
    cy.get('[id=winner_label]').as('winnerLabel')
  })

  it('유효하지 않은 자동차 이름을 입력하면 경고메세지를 띄워준다.', () => {
    cy.get('@carNameInput').should('be.visible')
    cy.get('@carNameButton').should('be.visible')
    cy.get('@gameCountInput').should('not.be.visible')
    cy.get('@gameCountButton').should('not.be.visible')

    cy.get('@carNameInput').type(WRONG_CAR_NAMES)
    cy.alertMessageWillBeEqual(
      '자동차의 이름은 한글자 ~ 5글자 사이만 가능합니다.'
    )
    cy.get('@carNameButton').click()
    cy.get('@gameCountInput').should('not.be.visible')
    cy.get('@gameCountButton').should('not.be.visible')
  })

  it('유효한 자동차 이름을 입력하면 시도할 횟수를 입력받을 수 있다.', () => {
    cy.get('@carNameInput').should('be.visible')
    cy.get('@carNameButton').should('be.visible')
    cy.get('@gameCountInput').should('not.be.visible')
    cy.get('@gameCountButton').should('not.be.visible')

    cy.get('@carNameInput').type(CAR_NAMES)
    cy.get('@carNameButton').click()
    cy.get('@gameCountInput').should('be.visible')
    cy.get('@gameCountButton').should('be.visible')
  })

  it('게임횟수에 3을 입력하면 횟수를 입력하면 입력했던 자동차 이름들이 Road에 세팅된다.', () => {
    cy.get('@carNameInput').type(CAR_NAMES)
    cy.get('@carNameButton').click()
    cy.get('@gameCountInput').type(3)
    cy.get('@gameCountButton').click('')

    cy.getPlayers()
      .should('be.visible')
      .should('have.length', 4)
      .each((player, index) =>
        cy.wrap(player).should('have.text', CAR_NAMES_ARRAY[index])
      )
  })

  it('게임횟수에 3을 입력하면 횟수를 입력하면 게임을 시작한다.', () => {
    cy.get('@carNameInput').type(CAR_NAMES)
    cy.get('@carNameButton').click()
    cy.get('@gameCountInput').type(3)
    cy.get('@gameCountButton').click('')

    cy.wait(3000)

    cy.getPlayers()
      .should('be.visible')
      .should('have.length', 4)
      .each((player) =>
        cy
          .wrap(player)
          .parent()
          .children('.forward-icon')
          .should('have.length.lessThan', 4)
      )
  })

  it('게임을 진행한 후 누가 우승했는지 알려준다.', () => {
    cy.get('@carNameInput').type(CAR_NAMES)
    cy.get('@carNameButton').click()
    cy.get('@gameCountInput').type(2)
    cy.get('@gameCountButton').click('')

    cy.wait(2000)

    const carNames = splitCarNames(CAR_NAMES)
    const carState = carNames.map((carName) => ({ name: carName, move: 0 }))
    let carNameIndex = 0
    let maxMove = 0

    cy.getPlayers()
      .should('be.visible')
      .each((player) => {
        cy.wrap(player)
          .parent()
          .then((parent) => {
            const arrowLength = parent.children('.forward-icon').length
            carState[carNameIndex].move = arrowLength
            if (maxMove < arrowLength) {
              maxMove = arrowLength
            }
            carNameIndex += 1
          })
      })
      .then(() => {
        const winner = carState
          .filter((car) => car.move === maxMove)
          .map((car) => car.name)

        cy.get('@winnerLabel').should(
          'have.text',
          `🏆 최종 우승자: ${winner.join(', ')} 🏆`
        )
      })

    cy.alertMessageWillBeEqual('🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇')

    cy.wait(2000)
  })
})
