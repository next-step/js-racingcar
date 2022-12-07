import { SELECTOR, ALERT_MASSAGE } from '../../src/js/constants';

describe('자동차 경주 게임울 시작한다.', () => {
  const carNames = ['EAST', 'WEST', 'SOUTH', 'NORTH'];
  const SEC = 1000;
  const COUNT = 2;

  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        cy.stub(win.Math, 'random').returns(0.4);
      },
    });

    cy.carNameTypo(carNames.join(','));
    cy.tryCountTypo(COUNT);
    cy.wait(COUNT * SEC);
  });

  it('자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다.', () => {
    cy.contains('최종 우승자').should('exist');
  });
  it('우승자가 여러명일 경우 ,를 이용하여 구분한다.', () => {
    const carNames = ['EAST', 'WEST', 'SOUTH', 'NORTH'];
    cy.get(SELECTOR.ID.RACE_RESULT).within(() => {
      cy.contains(carNames.join(', ')).should('exist');
    });
  });
  it('다시 시작하기 버튼을 누르면, 자동차 경주 게임을 다시 시작할 수 있다.', () => {
    cy.contains('다시 시작하기').click();
    cy.get(SELECTOR.ID.RACE_RESULT).children().should('not.exist');
    cy.get(SELECTOR.ID.RACE_PROCESS).children().should('not.exist');
    cy.get(SELECTOR.FIELDSET.RACING_COUNT).should('not.visible');
  });

  it('정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.', () => {
    cy.wait(2 * SEC);
    cy.on('window:alert', (str) => {
      expect(str).to.equal(ALERT_MASSAGE.FINISH);
    });
  });
});
