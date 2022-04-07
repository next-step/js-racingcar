import { ERROR } from './../../src/js/constants/index.js';

describe('자동차 경주 게임 테스트 케이스', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('첫화면 렌더링 시에, 자동차이름, 시도횟수 관련 폼 확인', () => {
    cy.get('#racing-name').should('be.visible');
  });

  context('자동차 이름을 잘못 입력한 경우', () => {
    it('자동차 이름을 다섯글자 초과로 입력했을 때', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('#racing-name input')
        .type('가나다라마바사')
        .then(() => {
          cy.get('#racing-name button')
            .click()
            .then(() => {
              expect(alertStub.getCall(0)).to.be.calledWith(ERROR.NAME_MAX_LENGTH);
              cy.get('#racing-count').should('be.not.visible');
            });
        });
    });
  });

  context('시도 횟수를 제대로 입력한 경우', () => {
    it('자동차 이름이 출력된다.', () => {
      cy.get('#racing-name input').type('제우스, 오너, 페이커, 구마유시, 케리아');
      cy.get('#racing-name button').click();

      cy.get('#racing-name button').should('be.disabled');
      cy.get('#racing-name input').should('be.disabled');
      cy.get('#racing-count').should('be.visible');

      cy.get('#racing-count input').type(5);
      cy.get('#racing-count button').click();

      cy.get('#racing-name input')
        .invoke('val')
        .then((names) => {
          const carNames = names.split(',');

          cy.get('#racing-board').should('be.visible');
          cy.get('#racing-board .car-player').each(($player, index) => {
            expect(carNames[index]).to.equal($player.text());
          });
        });
    });
  });

  context('자동차 이름을 제대로 입력한 경우', () => {
    it('자동차 이름이 입력된 후 입력창, 확인버튼은 사용이 불가능하다.', () => {
      cy.get('#racing-name input').type('제우스, 오너, 페이커, 구마유시, 케리아');
      cy.get('#racing-name button').click();

      cy.get('#racing-name button').should('be.disabled');
      cy.get('#racing-name input').should('be.disabled');
      cy.get('#racing-count').should('be.visible');
    });
  });
});
