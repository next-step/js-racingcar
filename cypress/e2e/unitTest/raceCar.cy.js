import RacingCar from './../../../src/js/Service/RacingCar.js';

describe('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {
 it('전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진', () => {
  cy.visit('http://localhost:3000', {
   onBeforeLoad(win) {
    cy.stub(win.Math, 'random').returns(0.4);
   },
  });
  const racingCar = new RacingCar('kia');

  racingCar.move().then((position) => {
   expect(position).to.equal(1);
  });
 });

 it('전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 3 이하의 값이면 멈춘다.', () => {
  cy.visit('http://localhost:3000', {
   onBeforeLoad(win) {
    cy.stub(win.Math, 'random').returns(0.3);
   },
  });
  const racingCar = new RacingCar('kia');

  racingCar.move().then((position) => {
   expect(position).to.equal(0);
  });
 });
});
