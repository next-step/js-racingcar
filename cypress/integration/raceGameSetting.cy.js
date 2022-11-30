// 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
// 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
// 전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.

import {
 carNameInputSelector,
 carNameFieldsetSelector,
} from '../support/commands';

describe('자동차에 이름을 부여할 수 있다.', () => {
 it('자동차 이름을 적을 수 있는 Input이 존재한다.', () => {
  cy.get(carNameInputSelector).should('exist').should('be.visible');
 });

 it('자동차 이름을 적을 수 있는 Input은 "자동차 이름" placeholder을 가지고있다.', () => {
  cy
   .get(carNameInputSelector)
   .should('exist')
   .should('be.visible')
   .should('have.attr', 'placeholder', '자동차 이름');
 });

 it('자동차 이름을 적을 수 있는 Input에 이름을 적을 수 있다.', () => {
  cy
   .get(carNameInputSelector)
   .type('kia,benz,audi,tesla,volvo')
   .should('have.value', 'kia,benz,audi,tesla,volvo');
 });

 it('자동차 이름은 1자 이상이여야한다.', () => {
  cy.carNameTypo('kia,benz,audi,  ,volvo');
  cy.on('window:alert', (str) => {
   expect(str).to.equal(
    '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
   );
  });
 });

 it('자동차 이름을 적고 제출할 확인 버튼이 존재한다.', () => {
  cy
   .get(carNameFieldsetSelector)
   .within(() => {
    cy.get('button').should('exist').should('be.visible');
   })
   .should('have.text', '확인');
 });

 it('자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.', () => {
  cy.get(carNameFieldsetSelector).within(() => {
   cy.get(carNameInputSelector).type('kia,메르세데스벤츠,audi,tesla,volvo');
   cy.get('button').click();
   cy.on('window:alert', (str) => {
    expect(str).to.equal(
     ' 유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
    );
   });
  });
 });
 it('자동차 이름을 타이핑 후 확인 버튼을 누르면, 자동차 이름 input 은 disabled 된다.', () => {
  cy.get(carNameFieldsetSelector).within(() => {
   cy.get(carNameInputSelector).type('kia,benz,audi,tesla,volvo');
   cy.get('button').click();
   cy.get(carNameInputSelector).should('be.disabled');
  });
 });
});

describe('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.', () => {
 it('시도할 횟수를 입력하는 input이 존재한고 자동차 이름이 입력되지 않았다면 보여지지 않아야한다.', () => {
  cy.get('input[name="racing-count"]').should('exist').should('be.not.visible');
 });

 it('자동차 이름을 입력하면, 시도한 횟수를 입력하는 input이 보여진다.', () => {
  cy.carNameTypo('kia,benz,audi,tesla,volvo');
  cy.get('input[name="racing-count"]').should('exist').should('be.not.visible');
 });

 it('자동차 이름을 입력하면, 시도한 횟수를 입력하는 input이 보여진다.', () => {
  cy.carNameTypo('kia,benz,audi,tesla,volvo');
  cy.get('input[name="racing-count"]').should('exist').should('be.not.visible');
 });

 it('1 미만의 횟수를 입력하고 확인 버튼을 누를시 "입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다." 라는 alert 을 띄워준다.', () => {
  cy.carNameTypo('kia,benz,audi,tesla,volvo');
  cy.get('input[name="racing-count"]').type('0');
  cy.get('button').click();
  cy.on('window:alert', (str) => {
   expect(str).to.equal(
    '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.'
   );
  });
 });
});
