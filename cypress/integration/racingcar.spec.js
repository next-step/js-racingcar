import { ERROR } from './../../src/js/constants/index.js';

const carNamesT1 = '제우스, 오너, 페이커, 구마유시, 케리아';

describe('자동차 경주 게임 테스트 케이스', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('첫화면 렌더링 시에, 자동차이름, 시도횟수 관련 폼 확인', () => {
    cy.get('#racing-name').should('be.visible');
  });

  context('자동차 이름을 잘못 입력한 경우', () => {
    it('자동차 이름을 다섯글자 초과로 입력했을 때 경고창이 출력된다', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      const invalidCarName = '가나다라마바사';

      cy.get('#racing-name input').type(invalidCarName);
      cy.get('#racing-name button')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR.NAME_MAX_LENGTH);
          cy.get('#racing-count').should('be.not.visible');
        });
    });
  });

  context('시도 횟수를 제대로 입력한 경우', () => {
    it('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
      const racingCount = 5;
      const carNames = carNamesT1.split(',');

      cy.get('#racing-name input').type(carNamesT1);
      cy.get('#racing-name button').click();

      cy.get('#racing-count input').type(racingCount);
      cy.get('#racing-count button').click();

      cy.get('#racing-board').should('be.visible');
      cy.get('#racing-board .car-player').each(($player, index) => {
        expect(carNames[index]).to.contains($player.text());
      });
    });
    it('우승자의 이름이 쉼표(,)로 구분되어 화면에 출력된다.', () => {
      const racingCount = 5;
      let winners = [];
      let max = 0;

      cy.get('#racing-name input').type(carNamesT1);
      cy.get('#racing-name button').click();

      cy.get('#racing-count input').type(racingCount);
      cy.get('#racing-count button').click();

      cy.get('#racing-board .car-player')
        .each(($player) => {
          const count = $player[0].parentElement.childElementCount;

          if (count === max) {
            winners.push($player[0].textContent.trim());
          }
          if (count > max) {
            max = count;
            winners = [$player[0].textContent.trim()];
          }
          cy.wrap(winners).as('winners');
        })
        .then(() => {
          cy.get('#racing-result').should('be.visible');
          cy.get('#racing-result h2').contains(winners.join(', '));
        });
    });
  });

  context('자동차 이름을 제대로 입력한 경우', () => {
    it('자동차 이름이 입력된 후 입력창, 확인버튼은 사용이 불가능하다.', () => {
      cy.get('#racing-name input').type(carNamesT1);
      cy.get('#racing-name button').click();

      cy.get('#racing-name button').should('be.disabled');
      cy.get('#racing-name input').should('be.disabled');
      cy.get('#racing-count').should('be.visible');
    });
  });
});
