const carNames = ['1', '2', '3', '4', '5'];

describe('Racing TEST!!', () => {
  // NOTE: 먼저 모든 테스트 에서 사용할 car 이름을 픽스쳐를 통해 가져온다.
  beforeEach(() => {
    cy.fixture('cars.json').as('cars');
  });
  context('자동차 이름를 픽스쳐를 통해 가져옴', () => {
    beforeEach(function () {
      // NOTE: baseUrl을 설정해놓음
      cy.visit('/');
      cy.fixture('cars.json').as('cars');

      // TODO: fixture를 이용해서 car의 이름을 가져오자.
      console.log(this.cars);
      // NOTE: alias를 만들어두면 이후에 @를 접두사로해서 접근할 수 있게 된다.
      cy.getBySel('car-names-input').as('nameInput');
      cy.getBySel('car-names-btn').as('nameBtn');
      cy.getBySel('try-number-input').as('tryNumInput');
      cy.getBySel('try-number-btn').as('tryNumBtn');
      // TODO: fixture로 car의 이름을 가져오도록 만들자
      cy.typeToTarget('@nameInput', carNames.join(',')).clickTarget('@nameBtn');
      cy.typeToTarget('@tryNumInput', 5).clickTarget('@tryNumBtn');
    });

    it('자동차 이름 테스트', () => {
      carNames.forEach((carName, i) => {
        cy.get('.racing-track').find(`[data-car="${i}"]`).contains(carName);
      });
    });
  });
});

// TODO:
