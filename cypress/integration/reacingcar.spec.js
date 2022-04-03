describe('자동차 경주 게임', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('자동차 이름을 입력하는 입력창과 확인 버튼이 존재한다.', () => {
    cy.get('#car-name-input').should('be.visible');
    cy.get('#car-name-submit').should('be.visible');
  });

  it('자동차 이름으로 빈값을 입력하면 경고창이 출력된다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#car-name-input').clear();
    cy.get('#car-name-submit')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('자동차 이름을 입력해주세요.');
      });
  });

  it('자동차 이름은 영문, 한글, 쉼표가 아니면 경고창이 출력된다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#car-name-input').type('EAST/WEST/SOUTH/NORTH');
    cy.get('#car-name-submit')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('자동차 이름은 영문, 한글, 쉼표만 입력할 수 있습니다');
      });
  });

  it('자동차 이름은 쉼표를 기준으로 5자 이하만 가능하다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#car-name-input').type('EAST,WEST,SOUTH,JAVASCRIPT');
    cy.get('#car-name-submit')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('자동차 이름은 쉼표를 기준으로 5자 이하만 가능합니다.');
      });
  });

  it('자동차 이름을 입력하면 자동차 이름 입력창과 버튼이 비활성화 된다.', () => {
    cy.get('#car-name-input').type('EAST,WEST,SOUTH,NORTH');
    cy.get('#car-name-submit').click();
    cy.get('#car-name-input').should('be.disabled');
    cy.get('#car-name-submit').should('be.disabled');
  });

  it('자동차 이름을 입력하면 시도 횟수 입력창과 버튼이 노출된다.', () => {
    cy.get('#car-name-input').type('EAST,WEST,SOUTH,NORTH');
    cy.get('#car-name-submit').click();
    cy.get('#race-lap-input').should('be.visible');
    cy.get('#race-lap-submit').should('be.visible');
  });

  it('시도할 횟수를 빈값으로 입력하면 경고창이 출력된다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#car-name-input').type('EAST,WEST,SOUTH,NORTH');
    cy.get('#car-name-submit').click();
    cy.get('#race-lap-input').clear();
    cy.get('#race-lap-submit')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('시도할 횟수를 입력해주세요.');
      });
  });
});
