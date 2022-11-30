describe('자동차 경주 게임울 시작한다.', () => {
 beforeEach(() => {
  cy.visit('http://localhost:3000/');
 });
 it('자동차 이름과 시도 횟수를 입력하고 확인을 누르면 자동차 경주 게임이 진행된다.', () => {
  cy.carNameTypo('EAST, WEST, SOUTH, NORTH');
  cy.tryCountTypo(5);
  cy.get('#game-process-component').should('be.visible');
 });
 it('자동차 경주 게임이 진행되는 동안, 로딩바가 보인다.', () => {});
 it('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {});
});
