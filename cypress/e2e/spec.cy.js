import { CAR_NAME_MAX_LENGTH, errorMessages, game} from '../../src/js/constants';
import { winnerMessage } from '../../src/js/ui/printCarRacingResult';
import printArrow from '../../src/js/ui/printArrow';
import getRandomNumber from '../../src/js/model/getRandomNumber';

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

  const checkAlertMessage = (alertMessage) => {
    cy.on('window.alert', (text) => {
      expect(text).to.contains(alertMessage);
    });
  }

  const startRacing = () => {
    const count = 7;
    const isOverThresholdScore = (score) => {
      return score >= game.THRESHOLD_SCORE;
    }

    for(let i = 0; i < count; i++) {
      cy.document().then(doc => {
        const carPlayer = doc.querySelectorAll('.car-player');

        carPlayer
          .forEach(it => {
            if(isOverThresholdScore(getRandomNumber(0, 9))) {
              it.dataset.forwardCount = Number(it.dataset.forwardCount) + 1;
              it.parentNode.insertAdjacentHTML('beforeend', printArrow());
            }
          })
      })
    }
  };

  describe('자동차 이름을 입력', () => {
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
  });

  describe('시도 횟수를 입력', () => {
    beforeEach('자동차 입력 영역을 표시한다', () => {
      submitCarnames(defaultCarNames);
    })
    
    it('1회 미만의 숫자가 입력 될 경우 경고창을 띄운다', () => {
      const lessThan1 = 0;

      submitRacingCount(lessThan1);
      checkAlertMessage(errorMessages.INVALID_ATTEMPT);
    });
  });

  describe('자동차 경주를 시작한다', () => {
    beforeEach('자동차 이름과 시도횟수 입력 영역 표시', () => {
      submitCarnames();
      submitRacingCount();
    })
    
    it('자동차 이름 표시', () => {
      for (let i = 0; i < defaultCarNames.length; i++) {
        cy.get('.car-player').contains(defaultCarNames[i]).should('have.text', defaultCarNames[i]);
      }
    });

    it('전진 화살표 표시', () => {
      startRacing();
    });
  });

  describe('자동차 경주를 실행한다', () => {
    beforeEach('자동차 이름과 시도횟수 입력 영역 표시', () => {
      submitCarnames();
      submitRacingCount();
    })
    
    it('경기결과를 표시한다', () => {
      startRacing();
      cy.document().then(doc => {
        const carPlayer = doc.querySelectorAll('.car-player');

        const maxScore = Math.max(...(Array.from(carPlayer).map(it => Number(it.dataset.forwardCount))));

        const maxForwardPlayer = Array.from(carPlayer)
        .filter(it => Number(it.dataset.forwardCount) === maxScore)
        .map(it => it.innerText);


        const resultWrapper = doc.getElementById('result-wrapper');
        resultWrapper.style.display = 'block';
        resultWrapper.style.textAlign = 'center';

        const winner = doc.querySelector('.winner');
        winner.innerHTML = winnerMessage(maxForwardPlayer);
      })
    });

    it('경기 재시작', () => {
      startRacing();
      cy.document().then(doc => {
        const carPlayer = doc.querySelectorAll('.car-player');

        const maxScore = Math.max(...(Array.from(carPlayer).map(it => Number(it.dataset.forwardCount))));

        const maxForwardPlayer = Array.from(carPlayer)
        .filter(it => Number(it.dataset.forwardCount) === maxScore)
        .map(it => it.innerText);


        const resultWrapper = doc.getElementById('result-wrapper');
        resultWrapper.style.display = 'block';
        resultWrapper.style.textAlign = 'center';

        const winner = doc.querySelector('.winner');
        winner.innerHTML = winnerMessage(maxForwardPlayer);
      })
      
      cy.get('.btn-replay').click();
    });
  });
});

