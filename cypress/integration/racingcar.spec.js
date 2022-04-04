import { ERROR } from './../../src/js/constants/index.js';

// 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
// - 자동차 이름이 1~5글자여야 한다.
// - 입력창 부분이 렌더링 되었는지 확인
//   - '' || 공백 => 얼럿
//   - 5글자 이상일경우 => 얼럿

// 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
// - '토마스, 프링글스'

// 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
// - 입력창 부분이 렌더링 되었는지 확인
// - 숫자가 아닌 값이 들어가는 경우
// - 0 또는 음수인 경우
// - 최대 횟수

// 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
// 전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.

describe('자동차 경주 게임 테스트 케이스', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('첫화면 렌더링 시에, 자동차이름, 시도횟수 관련 폼 확인', () => {
    cy.get('#app form').should('not.be.visible');
  });

  context('자동차 이름을 잘못 입력한 경우', () => {
    it('자동차 이름을 입력하지 않았을 때', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('#racing-name input').clear();
      cy.get('#racing-name button')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.callWith(ERROR.NAME_EMPTY);
        });
    });
    it('자동차 이름을 다섯글자 초과로 입력했을 때', () => {
      const alertStub = cy.stub();
      cy.get('#racing-name input').type('가나다라마바');
      cy.get('#racing-name button')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.callWith(ERROR.NAME_MAX_LENGTH);
        });
    });
  });

  context('자동차 이름을 제대로 입력한 경우', () => {
    it('자동차 이름이 입력된 후 입력창, 확인버튼은 사용이 불가능하다.', () => {
      cy.get('#racing-name input').type('제우스, 오너, 페이커, 구마유시, 케리아');
      cy.get('#racing-name button')
        .click()
        .then(() => {
          cy.get('#racing-name button').should('be.disabled');
          cy.get('#racing-name input').should('be.disabled');
        });
    });
  });
});
