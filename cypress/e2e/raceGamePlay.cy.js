import { SELECTOR } from '../../src/js/constants';

describe('자동차 경주 게임울 시작한다.', () => {
 const carNames = ['EAST', 'WEST', 'SOUTH', 'NORTH'];
 const SEC = 1000;
 const COUNT = 5;
 beforeEach(() => {
  cy.visit('http://localhost:3000/');
  cy.carNameTypo(carNames.join(','));
  cy.tryCountTypo(COUNT);
 });

 it('자동차 이름과 시도 횟수를 입력하고 확인을 누르면 자동차 경주 게임이 진행된다.', () => {
  cy.get(SELECTOR.ID.RACE_PROCESS).within(() => {
   carNames.forEach((carName) => {
    cy.contains(carName).should('be.visible');
   });
  });
 });
 it('자동차 경주 게임이 진행되는 동안, 로딩바가 보이고 게임이 끝나면 로딩바가 사라진다.', () => {
  cy.wait(0);
  cy.get('.spinner').should('exist');
  cy.wait(COUNT * SEC);
  cy.get('.spinner').should('not.exist');
 });
});
