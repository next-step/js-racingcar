import { ERROR_MESSAGE } from '../../src/js/const.js';

const DEFAULT_CAR_NAMES = 'EAST,WEST,SOUTH,NORTH';
const DEFAULT_CARD_RACE_COUNT = 5;

describe('자동차 경주 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('자동차에 이름을 부여할 수 있다.', () => {
    context('페이지에 진입했을 때', () => {
      it('자동차 이름 입력 폼이 노출된다.', () => {
        cy.getCarNameForm();
      });
    });

    context('입력 폼에 이름을 입력했을 때', () => {
      it('입력한 이름이 입력창에 노출된다.', () => {
        cy.typeCarNameInput(DEFAULT_CAR_NAMES);
        cy.getCarNameInput({ value: DEFAULT_CAR_NAMES });
      });
    });

    context('자동차 이름 입력 폼에 확인 버튼을 눌렀을 때', () => {
      it('이름이 5자를 초과한 경우 alert가 노출된다.', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);
        cy.typeCarNameInput('EAST, WEST WEST WEST, SOUTH, NORTH');
        cy.clickCarNameSubmitButton().then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            ERROR_MESSAGE.INVALIDATE_CAR_NAME
          );
        });
      });

      it('입력한 이름이 올바른 경우 입력 폼은 disabled 상태가 된다', () => {
        cy.typeCarNameInput(DEFAULT_CAR_NAMES);
        cy.clickCarNameSubmitButton();
        cy.getCarNameInput({ disabled: true, value: DEFAULT_CAR_NAMES });
        cy.getCarNameSubmitButton({ disabled: true });
      });
    });
  });

  describe('시도할 회수를 입력할 수 있다.', () => {
    beforeEach(() => {
      cy.typeCarNameInput(DEFAULT_CAR_NAMES);
      cy.getCarNameInput({ value: DEFAULT_CAR_NAMES });
      cy.clickCarNameSubmitButton();
    });

    context('자동차 이름 입력 폼 입력이 완료되었을 때', () => {
      it('시도할 횟수 입력 폼이 노출된다.', () => {
        cy.getCarRaceCountForm();
      });
    });

    context('입력 폼에 시도할 횟수를 입력했을 때', () => {
      it('입력한 횟수가 입력창에 노출된다.', () => {
        cy.typeCarRaceCountInput(DEFAULT_CARD_RACE_COUNT);
        cy.getCarRaceCountInput({ value: DEFAULT_CARD_RACE_COUNT });
      });
    });

    context('입력 폼에 확인버튼을 눌렀을 때', () => {
      it('0 이상의 숫자가 입력되지 않았다면 alert가 노출된다.', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);
        cy.typeCarRaceCountInput(-1);
        cy.clickCarRaceCountSubmitButton().then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            ERROR_MESSAGE.INVALIDATE_CAR_RACE_COUNT
          );
        });
      });

      it('입력한 숫자가 올바른 경우 입력 폼은 disabled 상태가 된다', () => {
        cy.typeCarRaceCountInput(DEFAULT_CARD_RACE_COUNT);
        cy.clickCarRaceCountSubmitButton();
        cy.getCarRaceCountInput({
          disabled: true,
          value: DEFAULT_CARD_RACE_COUNT,
        });
        cy.getCarRaceCountSubmitButton({ disabled: true });
      });
    });
  });

  describe('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {
    beforeEach(() => {
      cy.typeCarNameInput(DEFAULT_CAR_NAMES);
      cy.getCarNameInput({ value: DEFAULT_CAR_NAMES });
      cy.clickCarNameSubmitButton();
      cy.typeCarRaceCountInput(DEFAULT_CARD_RACE_COUNT);
      cy.getCarRaceCountInput({ value: DEFAULT_CARD_RACE_COUNT });
      cy.clickCarRaceCountSubmitButton();
    });

    context('자동차 이름 입력 폼에 확인 버튼을 눌렀을 때', () => {
      it('부여된 자동차 이름들이 노출된다.', () => {
        cy.getCarNames(DEFAULT_CAR_NAMES.split(','));
      });

      it('부여된 자동차중 전진한다면 화살표 아이콘이 노출된다.', () => {
        cy.getForwardIcon(DEFAULT_CAR_NAMES.split(','));
      });
    });
  });
});
