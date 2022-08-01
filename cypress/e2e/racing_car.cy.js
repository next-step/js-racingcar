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

    cy.submitCarName('orange').then(() => {
      expect(stub.getCall(0)).to.be.calledWith(
        '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
      );
    });
  });

  it('자동차 이름을 입력 후 확인을 클릭하면 횟수 입력 필드가 보인다.', () => {
    cy.submitCarName('blue, red, gray, white, pink').then(() => {
      cy.get('#form-try-count').should('be.visible');
    });
  });
});

describe('시도할 횟수 입력', () => {
  const carNameValue = 'blue, red, gray, white, pink';

  it('횟수를 입력한 후 확인을 클릭하면 레이싱 영역에서 이름을 확인한다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.submitCarName(carNameValue);

    cy.submitTryCount(5).then(() => {
      const carNames = carNameValue.split(',').map((item) => item.trim());
      carNames.forEach((name) => {
        cy.get('.car-player').contains(name);
      });
    });
  });

  it('레이싱 카의 화살표 개수는 시도할 횟수 보다 작거나 같다.', () => {
    cy.submitCarName('white');
    cy.submitTryCount(3);

    cy.get('.forward-icon').should(($el) => {
      expect($el).length.within(0, 3);
    });
  });
});
