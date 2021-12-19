import { MOCK_RANDOM, MOCK_RACING } from '../support/constants'

describe('1단계 요구 사항 ', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy=car-name-input]').as('nameInput')
    cy.get('[data-cy="car-name-btn"]').as('nameBtn')
    cy.mockMathRandom(MOCK_RANDOM)
  })
  it('자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.', () => {
    cy.get('@nameInput')
      .type('EAST, WEST, SOUTH, NORTH')
      .should('have.value', 'EAST, WEST, SOUTH, NORTH')
  })
  it('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.', () => {
    cy.get('@nameInput').type('EAST, WEST, SOUTH, NORTH')
    cy.get('@nameBtn').click()
    cy.get('[data-cy=car-try-input]').type(4).should('have.value', 4)
  })

  it('전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.', () => {
    cy.autoRacingInput('EAST, WEST, SOUTH, NORTH', 1)
    cy.get('[data-cy=car-forward]').should('have.length', 1)
    cy.get('#car-competition').should('be.visible')
  })
})

describe('2단계 요구 사항 ', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.mockMathRandom(MOCK_RANDOM)
  })
  it('자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.', () => {
    cy.autoRacingInput('EAST, WEST, SOUTH, NORTH', MOCK_RACING[0].tryCount)
    cy.wait(MOCK_RACING[0].wait)
    cy.get('[data-cy=winners]').should('have.text', MOCK_RACING[0].winnerMessage)
  })
  it('우승자가 여러명일 경우 ,를 이용하여 구분한다.', () => {
    cy.autoRacingInput('EAST, WEST, SOUTH, NORTH', MOCK_RACING[1].tryCount)
    cy.wait(MOCK_RACING[1].wait)
    cy.get('[data-cy=winners]').should('have.text', MOCK_RACING[1].winnerMessage)
  })
})

describe('3단계 요구 사항 ', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.mockMathRandom(MOCK_RANDOM)
  })
  it('자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.', () => {
    cy.autoRacingInput('EAST, WEST, SOUTH, NORTH', 3)
    cy.get('[data-cy=car-forward]').should('have.length', 1)
    cy.get('[data-cy=car-spinner]').should('have.length', 3)
    cy.wait(1000)
    cy.get('[data-cy=car-forward]').should('have.length', 4)
    cy.get('[data-cy=car-spinner]').should('have.length', 1)
    cy.wait(1000)
    cy.get('[data-cy=car-forward]').should('have.length', 5)
  })
  it('정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.', () => {
    cy.autoRacingInput('EAST, WEST, SOUTH, NORTH', 1)
    cy.wait(2000)
    cy.on('window:alert', (text) => {
      expect(text).to.contains('🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇')
    })
  })
})
