describe("자동차의 입력값을 테스트한다", () => {
  const CAR_NAME_INPUT = "#input-car-name";
  const CAR_NAMES = ".car-player";
  const INPUT = "car1, car2, car3";
  const INPUT_LIST = INPUT.split(",").map(item => item.trim());
  const OVER_LENGTH_INPUT = "name, cawerwer";
  const EMPTY_INPUT = "";

  beforeEach("자동차의 값을 입력한다", () => {
    cy.visit('http://localhost:5500')
  })

  it("자동차 이름은 `쉼표(,)`를 기준으로 구분한다.", () => {
    cy.get(CAR_NAME_INPUT)
    .type(INPUT)
    .type('{enter}')

    cy.get(CAR_NAMES)
      .invoke('text')
      .should('eq', INPUT_LIST.join(""))
  })

  it("자동차 이름은 5자 이하여야한다.", () => {
    cy.on('window:alert', cy.stub().as('alerted'))
    cy.get(CAR_NAME_INPUT)
    .type(OVER_LENGTH_INPUT)
    .type('{enter}')

    cy.get('@alerted').should('have.been.calledOnce')
    .and('have.been.calledWith', 'This browser does not support desktop notification')
  })

  it("빈 문자열은 입력할 수 없다", () => {
    cy.on('window:alert', cy.stub().as('alerted'))

    cy.get(CAR_NAME_INPUT)
    .type(EMPTY_INPUT)
    .type('{enter}')

    cy.get('@alerted').should('have.been.calledOnce')
    .and('have.been.calledWith', 'This browser does not support desktop notification')
  })
})


