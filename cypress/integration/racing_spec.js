import { MESSAGE } from '../../src/js/constants';
import { Car } from '../../src/js/car.js';

describe('자동차 경주', () => {
  it('페이지에 접속', () => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  describe('step1', () => {
    it('자동차에 이름을 부여할 수 있다.', () => {
      cy.get('.carname-container').within(() => {
        cy.get('input')
          .type('WEST, SOUTH, NORTH')
          .should('have.value', 'WEST, SOUTH, NORTH');
      });
    });

    it('이름은 1자 이상 가능하다.', () => {
      cy.get('.carname-container').within(() => {
        cy.get('input').type('WEST, , ');
        cy.get('button').click();

        cy.on('window:alert', message => {
          expect(message).to.equal(MESSAGE.NAME_ERROR);
        });
      });
    });

    it('이름은 5자 이하 가능하다.', () => {
      cy.get('.carname-container').within(() => {
        cy.get('input').type('WESTsss');
        cy.get('button').click();

        cy.on('window:alert', message => {
          expect(message).to.equal(MESSAGE.NAME_ERROR);
        });
      });
    });

    it('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있다.', () => {
      cy.get('.gamecount-container').invoke('css', 'display', 'block');
      cy.get('.gamecount-container').within(() => {
        cy.get('input').type(3).should('have.value', 3);
      });
    });

    // it('전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진한다', () => {});

    // it('전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 3 이하일 경우 멈춘다.', () => {});

    // it('자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다.', () => {});

    // it('우승자가 여러명일 경우 `,`를 이용하여 구분한다.', () => {});
  });

  // describe('step2', () => {
  //   it('자동차 경주 게임은 1초의 텀(progressive 재생)을 두고 진행한다.', () => {});

  //   it('정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.', () => {});
  // });
});
