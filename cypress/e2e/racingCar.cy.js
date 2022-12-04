import { ERROR_MESSAGE } from '../../src/js/constants/errorMessage.js';
import { SELECTOR } from '../constants/selector.js';

beforeEach(() => {
  cy.visit('index.html');
});

describe('자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.', () => {
  context('자동차 이름을 입력할 때', () => {
    it('자동차 이름이 6자 이상이면 alert를 띄워준다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.getByDataset(SELECTOR.CAR_NAME_INPUT).type('car111, car22, car3, car4, car55');

      cy.getByDataset(SELECTOR.CAR_NAME_FORM)
        .submit()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_CAR_NAME_LENGTH);
        });
    });

    it('구분자로 쉼표(,)를 사용하지 않으면 alert를 띄워준다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.getByDataset(SELECTOR.CAR_NAME_INPUT).type('car1. car22 - car3 / car4, car55');

      cy.getByDataset(SELECTOR.CAR_NAME_FORM)
        .submit()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_CAR_NAME_LENGTH);
        });
    });

    it('쉼표로 구분하여 입력하고 확인 버튼을 누르면 이동 횟수를 입력하는 form이 나타난다. ', () => {
      cy.typeCarName('car1, car2, car3, car4, car5');

      cy.getByDataset(SELECTOR.CAR_ATTEMPTS_COUNT_FORM).should('not.have.class', 'd-none');
    });
  });

  describe('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.', () => {
    context('이동할 횟수를 입력할 때', () => {
      it('0회를 입력하면 alert를 띄워준다.', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.typeCarName('car1, car2');
        cy.typeCarAttemptsCount(0).then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_CAR_ATTEMPTS_COUNT);
        });
      });

      it('1회 이상을 입력하면 자동차 이름이 보여진다.', () => {
        cy.startRacingGame('car1, car2', 3);

        cy.getByDataset(SELECTOR.CAR_ROAD).should('have.class', 'd-flex');
        cy.getByDataset(SELECTOR.CAR_ROAD).should('not.have.class', 'd-none');
      });
    });
  });

  describe('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    context('자동차 이름과 횟수를 입력하면', () => {
      it('자동차 이름과 횟수를 입력하면, 입력한 자동차 이름이 순서대로 출력된다.', () => {
        const carName = 'car1, car2, car3, car4, car5';
        cy.startRacingGame(carName, 4);

        const carNameArray = 'car1, car2, car3, car4, car5'.split(',').map((car) => car.trim());

        cy.getByDataset(SELECTOR.CAR_PLAYER).each(($el, idx) => {
          const text = $el.text();

          expect(text).be.equal(carNameArray[idx]);
        });
      });
    });
  });

  describe('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {
    context('random 값이 ', () => {
      it('4 이상이면 전진하고, 3 이하의 값이면 멈춘다.', () => {
        const carName = 'car1, car2, car3, car4';
        const carNames = carName.split(',').map((elem) => elem.trim());
        const attemptsCount = 5;

        cy.clock();
        cy.startRacingGame(carName, attemptsCount);
        cy.tick(6000);

        cy.window().then((win) => {
          const { record } = win;

          cy.getByDataset(SELECTOR.CAR_FORWARD_ICON_WRAPPER).each(($el, idx) => {
            const viewMoveForwardCount = $el.children().length;
            const racingCarModelMoveForwardCount = record[carNames[idx]];

            expect(viewMoveForwardCount).to.equal(racingCarModelMoveForwardCount);
          });
        });
      });
    });
  });

  describe('자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.', () => {
    context('우승자는', () => {
      it('전진한 횟수가 가장 많은 사람이다.', () => {
        cy.clock();
        cy.startRacingGame('car1, car2, car3', 3);
        cy.tick(4000);

        cy.window().then((win) => {
          cy.getByDataset(SELECTOR.CAR_WINNERS_NAME).should('have.text', win.winners);
        });
      });
    });
  });
});
