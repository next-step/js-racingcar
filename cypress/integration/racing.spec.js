describe('ui-racing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')

  })
  const NAMES = 'EAST, WEST, SOUTH, NORTH';
  const NUMBER = 5;
  const NAMES_ERROR_MESSAGE = '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다';
  const COUNT_ERROR_MESSAGE = '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.'
  const WINNER_MESSAGE = '🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇'
  const inputNames = (names = '') => {
    names.trim() && cy.get('.add-car-players input').type(names)
    cy.get('.add-car-players button').click()
  }

  const inputCount = (count = 0) => {
    cy.get('.input-racing-count input').type(count)
    cy.get('.input-racing-count button').click()
  }

  const checkAlertMessage = (message) => {
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains(message)
    })
  }

  const restartRacing = () => {
    cy.get('.restart-racing').click();
  }

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  }

  const goRacing  = (number = 1) => {
    inputNames(NAMES);
    inputCount(number)
    cy.wait(number * 1000  + 2000);
    checkAlertMessage(WINNER_MESSAGE)
  }

  it('자동차이름 제한', () => {
    inputNames();
    checkAlertMessage(NAMES_ERROR_MESSAGE)
  })

  it('자동차이름 유효성 체크', () => {
    inputNames('1,');
    checkAlertMessage(NAMES_ERROR_MESSAGE)
  })


  it('횟수 유효성 체크(0)', () => {
    inputNames(NAMES);
    inputCount(0)
    checkAlertMessage(COUNT_ERROR_MESSAGE)
  })

  it('횟수 유효성 체크(음수)', () => {
    inputNames(NAMES);
    inputCount(-5)
    checkAlertMessage(COUNT_ERROR_MESSAGE)
  })


  it('우승자 선정', () => {
    inputNames(NAMES);
    inputCount(NUMBER)
    cy.wait(NUMBER * 1000 + 2000);
    checkAlertMessage(WINNER_MESSAGE)
  })


})
