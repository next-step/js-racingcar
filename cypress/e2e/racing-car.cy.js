describe('empty spec', () => {
  it('passes', () => {
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
});
