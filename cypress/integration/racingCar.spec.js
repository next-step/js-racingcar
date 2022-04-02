describe('로또 미션 Cypress', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('START', () => {
    it('초기화면 상태 테스트', () => {
      cy.get('#car-name-input').should('to.be.visible');
      cy.get('#car-name-submit-btn').should('to.be.visible');
      cy.get('#racing-times-input').should('not.be.visible');
      cy.get('#racing-times-submit-btn').should('not.be.visible');
    });

    context('유효하지 않은 자동차 이름 등록 테스트', () => {
      it('(1) 자동차 이름 미입력 테스트', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);
        cy.get('#car-name-input').should('have.value', '');
        cy.get('#car-name-submit-btn')
          .click()
          .then(() => {
            expect(alertStub).to.be.calledWith(
              '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
            );
          });
      });

      it('(2) 5글자를 초과하는 자동차 이름 등록 테스트', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        const mockRacingCar = ['람보르기니가야르도', '폭스바겐골프'].join(',');

        cy.get('#car-name-input').type(mockRacingCar);
        cy.get('#car-name-submit-btn')
          .click()
          .then(() => {
            expect(alertStub).to.be.calledWith(
              '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
            );
          });
      });
    });

    context('유효한 자동차 이름 등록 테스트', () => {
      const mockRacingCar = ['벤틀리', '티코', '벤츠', 'BMW', '모닝'];

      beforeEach(() => {
        cy.get('#car-name-input').type(mockRacingCar.join(','));
        cy.get('#car-name-submit-btn').click();
      });
      it('(1) 자동차 이름을 등록하면 자동차 등록 버튼 비활성화, ', () => {
        cy.get('#car-name-submit-btn').should('be.disabled');
        cy.get('#racing-times-input').should('be.visible');
        cy.get('#racing-times-submit-btn').should('be.visible');
      });

      it('(2) 유저가 입력한 자동차 개수만큼 렌더링된다.', () => {
        cy.get('#racing-times-input').type(3);
        cy.get('#racing-times-submit-btn').click();
        cy.get('#user-racing-car-process .car-player').should(
          'have.length',
          mockRacingCar.length
        );
      });

      it('(3) 1초마다 유저가 입력한 실행 횟수 미만으로 전진 아이콘(forward-icon)이 렌더링된다.', () => {
        cy.get('#racing-times-input').type(3);
        cy.get('#racing-times-submit-btn').click();

        cy.clock();
        cy.tick(1000);
        cy.get(`#racing-${mockRacingCar[0]} .forward-icon-area`)
          .its('length')
          .should('be.lte', 1);
        cy.tick(1000);
        cy.get(`#racing-${mockRacingCar[0]} .forward-icon-area`)
          .its('length')
          .should('be.lte', 2);
        cy.tick(1000);
        cy.get(`#racing-${mockRacingCar[0]} .forward-icon-area`)
          .its('length')
          .should('be.lte', 3);
      });

      it('(4) 게임이 끝나면 spinner가 사라진다.', () => {
        cy.clock();
        cy.get('#racing-times-input').type(3);
        cy.get('#racing-times-submit-btn').click();
        cy.tick(1000);
        cy.get(`.spinner`).should('have.css', 'opacity', '1');
        cy.tick(1000);
        cy.get(`.spinner`).should('have.css', 'opacity', '1');
        cy.tick(1000);
        cy.get(`.spinner`).should('have.css', 'opacity', '1');
        cy.tick(1000);
        cy.get(`.spinner`).should('have.css', 'opacity', '0');
      });
    });
  });
});
