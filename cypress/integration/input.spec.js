const testNameSection = () => {
  cy.typeToTarget('@nameInput', 'haha, good');
  cy.clickTarget('@nameBtn');
  cy.get('@nameInput').should('be.disabled');
  cy.get('@nameBtn').should('be.disabled');
};

describe('Racing Test!', () => {
  beforeEach(() => {
    // NOTE: baseUrl을 설정해놓음
    cy.visit('/');
    // NOTE: alias를 만들어두면 이후에 @를 접두사로해서 접근할 수 있게 된다.
    cy.getBySel('car-names-input').as('nameInput');
    cy.getBySel('car-names-btn').as('nameBtn');
    cy.getBySel('try-number-input').as('tryNumInput');
    cy.getBySel('try-number-btn').as('tryNumBtn');
  });

  it('인풋, 버튼 disabled 테스트', () => {
    // NOTE: 이렇게 함수로 빼는게 좋을까? 아니면 그냥 아래처럼 이 칸 안에 나열하는게 좋을까
    // NOTE: names 섹션 담당
    testNameSection();

    // NOTE: 아래는 try num 섹션
    cy.typeToTarget('@tryNumInput', 3).clickTarget('@tryNumBtn');
    cy.get('@tryNumInput').should('be.disabled');
    cy.get('@tryNumBtn').should('be.disabled');
  });

  it('자동차 이름 5글자 이상일 시 alert 발생', () => {
    const veryLongName = 'sssdsdsczsdasdasdasdasd';
    // NOTE: stub사용은 공식문서에서 아래처럼 사용하고 있다.
    // TODO: cy.on 과  stub 동작에 대한 이해를 확실히 하도록하자.
    const stub = cy.stub();
    const msg = Cypress.env('ALERT')['CAR_NAME'];
    cy.on('window:alert', stub);
    cy.typeToTarget('@nameInput', veryLongName)
      .clickTarget('@nameBtn')
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(msg);
      });
  });

  it('try num 값이 0 이하일 대 alert 발생', () => {
    const tryNum = 0;
    const stub = cy.stub();
    const msg = Cypress.env('ALERT')['ROUNDS'];
    cy.on('window:alert', stub);
    cy.typeToTarget('@nameInput', 'abcd').clickTarget('@nameBtn');
    cy.typeToTarget('@tryNumInput', tryNum)
      .clickTarget('@tryNumBtn')
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(msg);
      });
  });
});
