beforeEach(() => {
  cy.visit('/');
});

describe('자동차 경주 게임 초기화', () => {
  it('자동차 이름을 입력할 수 있는 필드만 보인다.', () => {
    cy.get('#form-car-name').should('be.visible');
    cy.get('#form-car-name input').should('not.have.value');
    cy.get('#form-try-count, #car-racing, #result-winner').should(
      'not.be.visible'
    );
  });
});

describe('자동차 이름 입력', () => {
  it('자동차 이름이 5자를 초과하면 에러메시지를 확인한다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('#form-car-name input').type('sujin2');
    cy.get('#form-car-name')
      .submit()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
        );
      });
  });

  it('자동차 이름을 입력 후 확인을 클릭하면 횟수 입력 필드가 보인다.', () => {
    cy.get('#form-car-name input').type('blue, red, gray, white, pink');
    cy.get('#form-car-name')
      .submit()
      .then(() => {
        cy.get('#form-try-count').should('be.visible');
      });
  });
});
