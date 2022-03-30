describe('자동차 경주 게임', () => {
  beforeEach(() => {
    cy.visit('../index.html');
  });

  it('앱을 처음 접속하면 자동차 이름을 입력하는 화면만 보여야 한다.', () => {
    // given
    // when
    // then
    cy.get('#racing-try-count').should('not.be.visible');
    cy.get('#racing-track').should('not.be.visible');
    cy.get('#racing-result').should('not.be.visible');
  });

  // ! 자동차 이름 제출 관련 테스트
  // - [x] 앱을 처음 실행하면 자동차 이름을 입력할 창이 보여야 한다.
  // - [x] 자동차 이름이 1자 미만, 5자 초과라면 경고창을 호출한다.
  it('자동차 이름을 입력하기 위한 input 과 button이 렌더링 되었는지 확인한다.', () => {
    cy.get('#car-names-input').should('be.visible');
    cy.get('#car-names-submit').should('be.visible');
  });

  it('자동차 이름을 입력하지 않으면 경고창 메시지를 보여준다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#car-names-input').clear();
    cy.get('#car-names-submit')
      .click()
      .then(() => {
        expect(alertStub).to.be.called;
      });
  });

  it('자동차 이름이 6글자 이상이면 경고창 메시지를 보여준다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#car-names-input').type('EVERYDAY');
    cy.get('#car-names-submit')
      .click()
      .then(() => {
        expect(alertStub).to.be.called;
      });
  });

  // ! 시도 횟수 관련 테스트
  // - [x] 시도 횟수 입력창은 자동차 이름을 제출한 후에 표시된다.
  it('시도 횟수 입력창은 자동차 이름을 제출한 후에 표시된다.', () => {
    // given
    cy.get('#racing-try-count').should('not.be.visible');

    // when
    cy.get('#car-names-input').type('CHILL,HIP');
    cy.get('#car-names-submit').click();

    // then
    cy.get('#racing-try-count').should('be.visible');
  });

  // - [ ] 시도 횟수는 숫자여야 한다. 숫자가 아니라면 경고창을 호출한다. ("숫자만 입력해주세요.")

  // - [ ] 시도 횟수가 0이거나 음수일 경우 경고창을 호출한다. (경계값 검증하기)
  // - [ ] 시도 횟수는 임의로 최대 15번까지 제한한다. 16 이상 입력시 경고창을 호출한다.
});
