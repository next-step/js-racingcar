import { ERROR_MESSAGE, MAX_GAME_TRY_COUNT } from '../../src/js/constants.js';
import { inputCarNamesParsing } from '../../src/js/infrastructure/actions/inputSection.action.js';

const BASE_URL = '../../index.html';

// TODO: https://glebbahmutov.com/blog/form-validation-in-cypress/

describe('Racing Car Game', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe('최초 렌더링 시', () => {
    it('자동차 이름 입력창만 보여야 한다.', () => {
      cy.$('[name="car-names-field"]').should('be.visible');
      cy.$('[name="game-try-count-field"]').should('not.be.visible');
      cy.$('[name="game-section"]').should('not.be.visible');
      cy.$('[name="result-section"]').should('not.be.visible');
    });
    it('자동차 이름 입력창의 값은 비어 있어야 한다.', () => {
      cy.$('[name="car-names"]').should('have.text', '');
    });
  });

  describe('자동차 이름을 입력한 뒤 확인 버튼을 누른다.', () => {
    it('자동차 이름 입력창이 비어 있다면 "자동차 이름을 입력해주세요!" 경고창을 출력한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('[name="car-names-confirm"]')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith(ERROR_MESSAGE.REQUIRED_NAME);
        });
    });
    it('자동차 이름은 쉼표로 구분된다.', () => {
      const carNames = 'EAST, WEST, SOUTH, NORTH';
      cy.inputCarNames(carNames).then(() => {
        expect(inputCarNamesParsing(carNames)).to.have.length(4);
      });
    });
    it('자동차 이름의 처음과 마지막에 쉼표가 존재하면 제거한다.', () => {
      const carNames = ',EAST, WEST, SOUTH, NORTH,';
      cy.inputCarNames(carNames).then(() => {
        expect(inputCarNamesParsing(carNames)).to.have.length(4);
      });
    });

    describe('입력된 자동차 이름들이 유효하지 않으면 에러를 출력한다.', () => {
      it('자동차 이름이 하나라도 비어 있다면 "자동차 이름을 입력해주세요!" 경고창을 출력한다.', () => {
        const carNames = 'EAST,, SOUTH, NORTH';
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.inputCarNames(carNames).then(() => {
          expect(alertStub).to.be.calledWith(ERROR_MESSAGE.REQUIRED_NAME);
        });
      });
      it('자동차 이름이 5자를 초과하면 "자동차 이름은 5자 이하여야만 해요!" 경고창을 출력한다.', () => {
        const carNames = 'EAST, WEST, SOUTH, NORTH2222';
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.inputCarNames(carNames).then(() => {
          expect(alertStub).to.be.calledWith(ERROR_MESSAGE.MUST_LESS_THAN);
        });
      });
      it('중복된 자동차 이름이 존재하면 "자동차 이름은 중복될 수 없어요!" 경고창을 출력한다.', () => {
        const carNames = 'EAST, EAST, SOUTH, NORTH';
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.inputCarNames(carNames).then(() => {
          expect(alertStub).to.be.calledWith(ERROR_MESSAGE.NOT_ACCEPT_DUPLICATED);
        });
      });
    });

    describe('입력된 자동차 이름들이 유효한 경우 시도 횟수 입력창을 표시한다.', () => {
      it('시도 횟수 입력창이 보여야 한다.', () => {
        cy.inputCarNames('EAST, WEST, SOUTH, NORTH');
        cy.$('[name="game-try-count-field"]').should('be.visible');
      });
    });
  });

  describe('시도 횟수를 입력한 뒤 확인 버튼을 누른다.', () => {
    beforeEach(() => {
      cy.inputCarNames('EAST, WEST, SOUTH, NORTH');
    });

    describe('입력된 시도 횟수가 유효하지 않으면 에러를 출력한다.', () => {
      it('시도 횟수가 공백일 경우 "숫자를 입력해주세요!" 경고창을 출력한다.', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.get('[name="game-try-count-confirm"]')
          .click()
          .then(() => {
            expect(alertStub).to.be.calledWith(ERROR_MESSAGE.REQUIRED_DIGIT);
          });
      });
      it('시도 횟수가 음수일 경우 "시도 횟수는 0보다 커야 해요!" 경고창을 출력한다.', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.inputGameTryCount(0).then(() => {
          expect(alertStub).to.be.calledWith(ERROR_MESSAGE.MUST_MORE_THAN_ONE);
        });
      });
      it('시도 횟수가 문자일 경우 "숫자를 입력해주세요!" 경고창을 출력한다.', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.inputGameTryCount('오잉?!😳').then(() => {
          expect(alertStub).to.be.calledWith(ERROR_MESSAGE.REQUIRED_DIGIT);
        });
      });
      it(`시도 횟수가 ${MAX_GAME_TRY_COUNT}를 초과하면 "시도 횟수는 ${MAX_GAME_TRY_COUNT}보다 낮아야 해요!" 경고창을 출력한다.`, () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.inputGameTryCount(MAX_GAME_TRY_COUNT + 1).then(() => {
          expect(alertStub).to.be.calledWith(ERROR_MESSAGE.MUST_LESS_THAN_MAX_GAME_TRY_COUNT);
        });
      });
    });
  });

  describe('주어진 시도 횟수 동안 n대의 자동차는 난수 값에 따라 전진/또는 멈출 수 있다.', () => {
    it('난수 값이 4 이상인 경우 전진하고 3 이하의 값이라면 움직이지 않는다.', () => {});
  });

  describe('주어진 시도 횟수가 소진된 경우 가장 많이 전진한 자동차가 우승한다.', () => {
    it('자동차가 중복인 경우 공동 우승한다.', () => {});
    it('자동차가 하나인 경우 단독 우승한다.', () => {});
  });
});
