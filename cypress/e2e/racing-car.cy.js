import { ERROR_MESSAGE } from '../../src/js/constants/errorMessage.js';
import { SELECTOR } from '../constants/selector.js';

const typeCarName = (carName) => {
  cy.getByDataset(SELECTOR.CAR_NAME_INPUT).type(carName);
  cy.getByDataset(SELECTOR.CAR_NAME_FORM).submit();
};

const typeCarAttemptsCount = (count) => {
  cy.getByDataset(SELECTOR.CAR_ATTEMPTS_COUNT_INPUT).type(count);
  cy.getByDataset(SELECTOR.CAR_ATTEMPTS_COUNT_FORM).submit();
};

const startRacingGame = (carName, count) => {
  typeCarName(carName);
  typeCarAttemptsCount(count);
};

beforeEach(() => {
  cy.visit('index.html');
});

describe('자동차 경주 게임을 테스트한다.', () => {
  context('자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.', () => {
    it('자동차 이름을 6자 이상으로 입력하면 alert를 띄워준다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.getByDataset(SELECTOR.CAR_NAME_INPUT).type('car111, car22, car3, car4, car55');

      cy.getByDataset(SELECTOR.CAR_NAME_FORM)
        .submit()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_CAR_NAME_LENGTH);
        });
    });

    it('자동차 이름을 입력할 때 구분자로 쉼표(,)를 사용하지 않으면 alert를 띄워준다.  ', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.getByDataset(SELECTOR.CAR_NAME_INPUT).type('car1. car22 - car3 / car4, car55');

      cy.getByDataset(SELECTOR.CAR_NAME_FORM)
        .submit()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_CAR_NAME_LENGTH);
        });
    });

    it('자동차 이름을 입력할 때 쉼표로 구분하여 입력하고 확인 버튼을 누르면 이동 횟수를 입력하는 form이 나타난다. ', () => {
      typeCarName('car1, car2, car3, car4, car5');

      cy.getByDataset(SELECTOR.CAR_ATTEMPTS_COUNT_FORM).should('not.have.class', 'd-none');
    });
  });

  context('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.', () => {
    it('이동할 횟수를 입력하고 확인 버튼을 누르면 입력한 자동차 이름이 보여진다', () => {
      const carName = 'car1, car2, car3, car4, car5';
      startRacingGame(carName, 4);

      cy.getByDataset(SELECTOR.CAR_ROAD).should('have.class', 'd-flex');
      cy.getByDataset(SELECTOR.CAR_ROAD).should('not.have.class', 'd-none');
    });
  });

  context('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    it('자동차 이름과 횟수를 입력하면, 입력한 자동차 이름이 순서대로 출력된다.', () => {
      const carName = 'car1, car2, car3, car4, car5';
      startRacingGame(carName, 4);

      const carNameArray = 'car1, car2, car3, car4, car5'.split(',').map((car) => car.trim());

      cy.getByDataset(SELECTOR.CAR_PLAYER).each(($el, idx) => {
        const text = $el.text();

        expect(text).be.equal(carNameArray[idx]);
      });
    });
  });

  context('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {
    it('');
  });

  context(
    '전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.',
    () => {
      it('random값이 4 이상이면 화살표가 화면에 출력되고 3 이하의 값이면 아무것도 출력되지 않는다.', () => {
        startRacingGame('car1, car2, car3, car4', 5);
      });
    },
  );
});
