describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('빈칸만 자동차이름으로 입력할 경우, "자동차 이름을 입력해주세요." 텍스트를 확인할 수 있다. ', () => {
    const carName = '         ';

    cy.get('#input-car-name').type(carName);

    cy.get('#input-car-name')
      .invoke('prop', 'validationMessage')
      .should('eq', '자동차 이름을 입력해주세요.');
  });

  it('"," 이후  자동차이름으로 입력 안힌 경우, "자동차 이름을 입력해주세요." 텍스트를 확인할 수 있다. ', () => {
    const carName = '테스트, ';

    cy.get('#input-car-name').type(carName);

    // FIXME: cy.getValidationMessage(target)
    cy.get('#input-car-name')
      .invoke('prop', 'validationMessage')
      .should('eq', '자동차 이름을 입력해주세요.');
  });

  it('빈칸만 자동차이름으로 입력할 경우, "자동차 이름은 5자 이하로 작성해 주세요." 텍스트를 확인할 수 있다. ', () => {
    const carName = '자동차테스트, 자동차';

    cy.get('#input-car-name').type(carName);

    cy.get('#input-car-name')
      .invoke('prop', 'validationMessage')
      .should('eq', '자동차 이름은 5자 이하로 작성해 주세요.');
  });

  it('자동차이름을 5개 초과로 입력할 경우, "자동차 이름을 5개이하로 입력해주세요." 텍스트를 확인할 수 있다. ', () => {
    const carName = '자동차1, 자동차2, 자동차3, 자동차4, 자동차5, 자동차6';

    cy.get('#input-car-name').type(carName);

    cy.get('#input-car-name')
      .invoke('prop', 'validationMessage')
      .should('eq', '자동차 이름을 5개이하로 입력해주세요.');
  });

  it('자동차 이름을 입력하면, 입력한 자동차 갯수만큼의 플레이어를 볼 수 있다.', () => {
    const carName = '자동차1, 자동차2, 자동차3, 자동차4';
    const carNameCount = 4;

    cy.get('#input-car-name').type(carName);
    cy.get('#form-car-player-name').submit();

    cy.get('.car-player').then($player => {
      cy.wrap($player).should('have.length', carNameCount);
      cy.wrap($player[0]).should('have.text', '자동차1');
      cy.wrap($player[1]).should('have.text', '자동차2');
      cy.wrap($player[2]).should('have.text', '자동차3');
      cy.wrap($player[3]).should('have.text', '자동차4');
    });
  });
});
