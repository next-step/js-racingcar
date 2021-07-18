/// <reference types="cypress" />

const messages = {
  CAR_LENGTH_VALIDATION_ERROR:
    '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.',
  GAME_COUNT_VALIDATION_ERROR:
    '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.',
  Congratulation: '🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇',
}

const cars = 'EAST, WEST, SOUTH, NORTH'

beforeEach(() => {
  cy.visit('/')
})

describe('자동차와 게임 횟수를 설정할 수 있다', () => {
  it('자동차와 게임 횟수 설정이 정상적으로 입력된다.', () => {
    const count = 1
    setRacingGameForm(cars, count)
    carAndCountEqual(cars, count)
  })
})

describe('입력 데이터가 잘못되면 에러 메세지가 호출된다.', () => {
  it('6자리의 이름이 들어갈 경우 에러 메세지가 호출된다.', () => {
    setCarNames('IT_WILL_BE_ALERT_ERROR_MESSAGE, YES')
    alertMessage(messages.CAR_LENGTH_VALIDATION_ERROR)
  })

  it('게임횟수에 0이하의 숫자를 입력하면 에러 메세지가 호출된다.', () => {
    setRacingGameForm('SAFE, WORDS', 0)
    alertMessage(messages.GAME_COUNT_VALIDATION_ERROR)
  })
})

describe('랜덤값의 검증에 성공한다.', () => {
  it('전진 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.', () => {
    setManual()
    setRacingGameForm('ONE', 3)

    shouldCarMoves(0)
    setRandomNumberMove(5)
    shouldCarMoves(1)
    setRandomNumberMove(3)
    shouldCarMoves(1)
  })
})
describe('자동차 게임이 정상적으로 동작한다.', () => {
  beforeEach(() => {
    setManual()
    setRacingGameForm(cars, 2)
  })

  it('자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    carNameMatches()
  })

  it('자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자가 여러명일 경우 ,를 이용하여 구분한다.', () => {
    setRandomNumberMove(5)
    setRandomNumberMove(0)

    validationWinners()
  })
  it('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {
    setRandomNumberMove(5)
    setRandomNumberMove(0)

    isGameEnded()
  })
})

describe('심화 미션에 성공한다', () => {
  beforeEach(() => {
    setRacingGameForm(manyManyCars, 2)
    cy.clock()
  })
  const manyManyCars =
    'EAST, WEST, SOUTH, NORTH, EASTC, WESTA, SOUT, NORT, EASqq, WESww, SOU, NOR'
  it('자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.', () => {
    let count = 0
    cy.tick(1000)
    expect(count).not.equals(getForwardCount())
    count = getForwardCount()
    cy.tick(1000)
    expect(count).not.equals(getForwardCount())

    cy.tick(2000)
    alertMessage(messages.Congratulation)
  })
  it('끝난 2초 후에 축하의 alert 메세지를 띄운다.', () => {
    cy.tick(4000)
    alertMessage(messages.Congratulation)
  })
})

function setInputValue(id, value) {
  cy.get(`#${id}`).type(value).type('{enter}')
}

function setCarNames(cars) {
  setInputValue('cars', cars)
}

function setGameCount(count) {
  setInputValue('count', count)
}

function shouldDisplay(id, value) {
  cy.get(`#${id}`).should(($el) => {
    const text = $el.text()

    expect(text.includes(value), 'element has either this or that string')
  })
}

function carAndCountEqual(car, count) {
  shouldDisplay('cars', car)
  shouldDisplay('count', count)
}

function setRacingGameForm(cars, count) {
  setCarNames(cars)
  setGameCount(count)
}

function setManual() {
  cy.get('#manual').click()
}

function shouldCarMoves(number) {
  cy.get('.forward-icon').should('have.length', number)
}

function getForwardCount() {
  let count = 0
  cy.get('.forward-icon').then(($element) => {
    count++
  })

  console.log(count)

  return count
}

function carNameMatches() {
  cars.split(',').forEach((car) => cy.contains('.car-player', car.trim()))
}

function validationWinners() {
  cy.contains('#winners', cars)
}

function isGameEnded() {
  cy.get('.spinner').should('have.length', 0)
}

function setRandomNumberMove(random) {
  cy.get('#random').type(random)
  cy.get('#random_move').click()
}

function alertMessage(message) {
  cy.on('window:alert', (txt) => {
    expect(txt).to.contains(message)
  })
}
