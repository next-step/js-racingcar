const NAMES = ['EAST', 'WEST', 'SOUTH', 'NORTH'];

// NOTE: alias를 만들어두면 이후에 @를 접두사로해서 접근할 수 있게 된다.
const setAlias = () => {
  cy.getBySel('car-names-input').as('nameInput');
  cy.getBySel('car-names-btn').as('nameBtn');
  cy.getBySel('try-number-input').as('tryNumInput');
  cy.getBySel('try-number-btn').as('tryNumBtn');
};

describe('레이싱 시작 전 레이싱카 이름과 시도 횟수에 대한 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    setAlias();
  });

  context('초기 상태', () => {
    it('올바른 이름을 넣으면 name 관련 인풋과 버튼은 disabled가 되어야합니다.', () => {
      cy.typeToTarget('@nameInput', 'haha, good').clickTarget('@nameBtn');
      cy.get('@nameInput').should('be.disabled');
      cy.get('@nameBtn').should('be.disabled');
    });

    it('자동차 이름 5글자 이상일 시 alert 발생', () => {
      const veryLongName = 'sssdsdsczsdasdasdasdasd';
      const stub = cy.stub();
      const msg = Cypress.env('ALERT')['CAR_NAME'];
      cy.on('window:alert', stub);
      cy.typeToTarget('@nameInput', veryLongName)
        .clickTarget('@nameBtn')
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(msg);
        });
    });
  });

  context(
    'names을 정상적으로 입력하고 시도횟수 인풋 버튼이 abled된 상태',
    () => {
      beforeEach(() => {
        cy.typeToTarget('@nameInput', 'haha, good').clickTarget('@nameBtn');
      });

      it('올바른 시도횟수를 넣으면 관련 인풋과 버튼은 disabled과 되어야합니다.', () => {
        cy.typeToTarget('@tryNumInput', 3).clickTarget('@tryNumBtn');
        cy.get('@tryNumInput').should('be.disabled');
        cy.get('@tryNumBtn').should('be.disabled');
      });

      it('시도 횟수 값이 0 이하일 때 alert 발생', () => {
        const tryNum = 0;
        const stub = cy.stub();
        const msg = Cypress.env('ALERT')['ROUNDS'];
        cy.on('window:alert', stub);
        cy.typeToTarget('@tryNumInput', tryNum)
          .clickTarget('@tryNumBtn')
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(msg);
          });
      });
    }
  );

  context('자동차 이름과 시도횟수 정상 입력 된 상태', () => {
    beforeEach(() => {
      cy.typeToTarget('@nameInput', NAMES.join(',')).clickTarget('@nameBtn');
      cy.typeToTarget('@tryNumInput', 3).clickTarget('@tryNumBtn');
    });
    it('자동차들의 이름이 정상적으로 세팅되었는지 확인한다.', () => {
      cy.get('.car-player').each(($div, index) => {
        cy.get($div).should('have.text', NAMES[index]);
      });
    });
  });
});
