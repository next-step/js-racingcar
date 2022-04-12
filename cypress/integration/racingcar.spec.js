describe('자동차 경주 게임', () => {
  beforeEach(() => {
    cy.visit('../index.html');
  });

  describe('자동차 경주의 초기 화면에 대한 테스트', () => {
    it('앱을 처음 접속하면 자동차 이름을 입력하는 화면만 보여야 한다.', () => {
      // given
      // when
      // then
      cy.get('#racing-try-count').should('not.be.visible');
      cy.get('#racing-track').should('not.be.visible');
      cy.get('#racing-result').should('not.be.visible');
    });

    it('자동차 이름을 입력하기 위한 input 과 button이 렌더링 되었는지 확인한다.', () => {
      cy.get('#car-names-input').should('be.visible');
      cy.get('#car-names-submit').should('be.visible');
    });
  });

  describe('자동차 이름 입력창에 대한 테스트', () => {
    it('자동차 이름을 입력하지 않으면 경고창 메시지를 보여준다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('#car-names-input').clear();
      cy.get('#car-names-submit')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith('자동차 이름은 최소 1글자에서 최대 5글자까지 입력해주세요.');
        });
    });

    it('자동차 이름이 6글자 이상이면 경고창 메시지를 보여준다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('#car-names-input').type('EVERYDAY');
      cy.get('#car-names-submit')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith('자동차 이름은 최소 1글자에서 최대 5글자까지 입력해주세요.');
        });
    });
  });

  describe('시도 횟수에 대한 테스트', () => {
    it('시도 횟수 입력창은 자동차 이름을 제출한 후에 표시된다.', () => {
      // given
      cy.get('#racing-try-count').should('not.be.visible');

      // when
      cy.get('#car-names-input').type('CHILL,HIP');
      cy.get('#car-names-submit').click();

      // then
      cy.get('#racing-try-count').should('be.visible');
    });

    it('시도 횟수가 0 이하일 경우 경고창을 호출한다.', () => {
      // given
      cy.get('#racing-try-count').should('not.be.visible');
      cy.get('#car-names-input').type('CHILL,HIP');
      cy.get('#car-names-submit').click();
      cy.get('#racing-try-count').should('be.visible');

      // when
      cy.get('#try-count-input').type('-1');

      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      // then
      cy.get('#try-count-submit')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith('시도 횟수는 1번 이상, 10번 이하여야 합니다.');
        });
    });

    it('시도 횟수가 10 보다 크면 경고창을 호출한다.', () => {
      // given
      cy.get('#racing-try-count').should('not.be.visible');
      cy.get('#car-names-input').type('CHILL,HIP');
      cy.get('#car-names-submit').click();
      cy.get('#racing-try-count').should('be.visible');

      // when
      cy.get('#try-count-input').type('11');

      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      // then
      cy.get('#try-count-submit')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith('시도 횟수는 1번 이상, 10번 이하여야 합니다.');
        });
    });
  });

  describe('자동차 경주 동작에 대한 테스트', () => {
    it('자동차 이름과 시도 횟수를 제출하면, 입력한 이름 개수만큼 자동차가 생성되어야 한다.', () => {
      // given
      cy.get('#racing-try-count').should('not.be.visible');
      cy.get('#car-names-input').type('CHILL,HIP');
      cy.get('#car-names-submit').click();
      cy.get('#racing-try-count').should('be.visible');
      cy.get('#try-count-input').type('5');

      // when
      cy.get('#try-count-submit').click();

      // then
      cy.get('.racing-car')
        .should(racingCars => {
          expect(racingCars).to.have.length(2);
        })
        .should('be.visible');
    });

    it('시도 횟수가 5번이라면 최대 5번 전진할 수 있다.', () => {
      // given
      cy.get('#racing-try-count').should('not.be.visible');
      cy.get('#car-names-input').type('CHILL');
      cy.get('#car-names-submit').click();
      cy.get('#racing-try-count').should('be.visible');
      cy.get('#try-count-input').type('5');

      // when
      cy.get('#try-count-submit').click();
      cy.get('.racing-car')
        .should(racingCars => {
          expect(racingCars).to.have.length(1);
        })
        .should('be.visible');

      // then
      cy.get('#CHILL').should('be.visible').next().should('have.class', 'draw-random-number');

      cy.wait(5000);

      // todo : 시도 횟수가 5회이므로, 화살표는 최대 5개까지 추가될 수 있다.
      cy.get('#CHILL').siblings('.forward-icon').should('have.length.lessThan', 5);
    });
  });
});
