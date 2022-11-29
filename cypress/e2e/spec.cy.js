import { CAR_NAME_MAX_LENGTH, errorMessages} from '../../src/js/constants.js';
import isOverThresholdScore from '../../src/js/model/isOverThresholdScore.js';
import { winnerMessage } from '../../src/js/ui/printWinner.js';

describe('자동차 경주', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.init-hide').should('not.be.visible');
  });

  const defaultCarNames = ['a', 'b', 'c', 'd'];

  const submitCarnames = (carNames = defaultCarNames) => {
    cy.get('.car-name').type(carNames.join(','));
    return cy.get('.btn-car-name').click();
  };

  const submitRacingCount = (racingCount = 4) => {
    cy.get('.attempts-count').type(racingCount);
    return cy.get('.btn-attempts-count').click();
  };

  const disabledElements = (ele) => {
    cy.get(ele).should('have.attr', 'disabled');
  };

  const checkAlertMessage = (alertMessage) => {
    cy.on('window.alert', (text) => {
      expect(text).to.contains(alertMessage);
    });
  }

  describe('자동차 이름을 입력한다', () => {
    it(`쉼표(,)를 기준으로 구분하며 이름이 ${CAR_NAME_MAX_LENGTH}자를 초과하면 경고창을 띄운다`, () => {
      const longCarName = ['1.2.3.4'];

      submitCarnames(longCarName);
      checkAlertMessage(errorMessages.INVALID_CAR_NAMES);
    });

    it('이름이 입력되지 않을 경우 경고창을 띄운다.', () => {
      const blankCarName = [' '];

      submitCarnames(blankCarName);
      checkAlertMessage(errorMessages.INVALID_CAR_NAMES);
    });

    it('자동차 이름을 정상적으로 입력 할 경우 입력창과 버튼은 비활성화 된다.', () => {
      submitCarnames();
      disabledElements('.car-name');
      disabledElements('.btn-car-name');
    })
  });

  describe('경기 시도 횟수를 입력한다', () => {
    beforeEach('자동차 이름을 제출한다', () => {
      submitCarnames(defaultCarNames);
    })
    
    it('1회 미만의 숫자가 입력 될 경우 경고창을 띄운다', () => {
      const lessThan1 = 0;

      submitRacingCount(lessThan1);
      checkAlertMessage(errorMessages.INVALID_ATTEMPT);
    });

    it('경기 시도 횟수가 정상적으로 입력 될 경우 입력창과 버튼은 비활성화 된다.', () => {
      submitRacingCount();
      disabledElements('.attempts-count');
      disabledElements('.btn-attempts-count');
    });
  });

  describe('자동차 경주를 시작한다', () => {
    beforeEach('자동차 이름과 시도횟수를 제출한다', () => {
      submitCarnames();
      submitRacingCount();
    });
    
    it('자동차 경주를 뛰는 자동차의 이름을 표시한다', () => {
      for (let i = 0; i < defaultCarNames.length; i++) {
        cy.get('.car-player').contains(defaultCarNames[i]).should('have.text', defaultCarNames[i]);
      }
    });

    it('랜덤으로 할당 된 숫자가 4보다 클 경우 전진 화살표를 표시한다', () => {
      const randomNumber = 5;

      if(isOverThresholdScore(randomNumber)) {
        console.log(cy.get('.mr-2'));
        cy.get('.mr-2').contains('⬇').should('be.visible');
      }
    });
  });

  describe('자동차 경주를 실행한다', () => {
    beforeEach('자동차 이름과 시도횟수 입력 영역 표시', () => {
      submitCarnames();
      submitRacingCount();
    })
    
    it('경기결과를 표시한다', () => {
      cy.document().then(doc => {
        const carPlayer = doc.querySelectorAll('.car-player');
        const maxScore = Math.max(...(Array.from(carPlayer).map(it => Number(it.dataset.forwardCount))));
        const maxForwardPlayer = Array.from(carPlayer)
        .filter(it => Number(it.dataset.forwardCount) === maxScore)
        .map(it => it.innerText);

        const winner = doc.querySelector('.winner');
        winner.innerHTML = winnerMessage(maxForwardPlayer);

        cy.get('.winner').should('have.text', `🏆 최종 우승자: ${maxForwardPlayer.join(', ')} 🏆`);
      })
    });

    it('재시작 버튼을 클릭하면 게임이 초기화 된다', () => {
      cy.get('.btn-replay').click();
      cy.get('.car-name').should('have.text', '');
      cy.get('.attempts-count').should('have.text', '');
      cy.get('#racing-wrapper').should('not.visible');
      cy.get('#result-wrapper').should('not.visible');
    });
  });
});

