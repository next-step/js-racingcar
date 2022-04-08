import { SELECTORS, MESSAGES, CAR_NAME_DIVIDER } from '../../src/js/constant.js';

describe('자동차 경주 게임', () => {
  const carNames = 'EAST,WEST,SOUTH,NORTH';
  const lap = 10;

  const submitCarNamesForm = (value) => {
    cy.get(SELECTORS.CAR_NAME_INPUT).type(value);
    return cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON).click();
  };

  const submitRaceLapForm = (value) => {
    cy.get(SELECTORS.RACE_LAP_INPUT).type(value);
    return cy.get(SELECTORS.RACE_LAP_SUBMIT_BUTTON).click();
  };

  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('자동차 이름을 입력하는 입력창과 확인 버튼이 존재한다.', () => {
    cy.get(SELECTORS.CAR_NAME_INPUT).should('be.visible');
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON).should('be.visible');
  });

  it('자동차 이름으로 빈값을 입력하면 경고창이 출력된다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(SELECTORS.CAR_NAME_INPUT).clear();
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.CAR_NAME_EMPTY);
      });
  });

  it('자동차 이름은 영문, 한글, 쉼표가 아니면 경고창이 출력된다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    submitCarNamesForm('EAST/WEST/SOUTH/NORTH').then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.CAR_NAME_NOT_MATCH_REGEXP);
    });
  });

  it('자동차 이름은 쉼표를 기준으로 5자 이하만 가능하다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    submitCarNamesForm('EAST,WEST,SOUTH,JAVASCRIPT').then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.CAR_NAME_MAX_LENGTH_OVER);
    });
  });

  it('자동차 이름은 2개 이상 입력해야한다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    submitCarNamesForm('EAST').then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.CAR_NAMES_MIN_LENGTH_UNDER);
    });
  });

  it('자동차 이름을 입력하면 자동차 이름 입력창과 버튼이 비활성화 된다.', () => {
    submitCarNamesForm(carNames);
    cy.get(SELECTORS.CAR_NAME_INPUT).should('be.disabled');
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON).should('be.disabled');
  });

  it('자동차 이름을 입력하면 시도 횟수 입력창과 버튼이 노출된다.', () => {
    submitCarNamesForm(carNames);
    cy.get(SELECTORS.RACE_LAP_INPUT).should('be.visible');
    cy.get(SELECTORS.RACE_LAP_SUBMIT_BUTTON).should('be.visible');
  });

  it('시도할 횟수를 빈값으로 입력하면 경고창이 출력된다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    submitCarNamesForm(carNames);
    cy.get(SELECTORS.RACE_LAP_INPUT).clear();
    cy.get(SELECTORS.RACE_LAP_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.RACE_LAP_EMPTY);
      });
  });

  it('시도할 횟수는 최소 1번 이여야한다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    submitCarNamesForm(carNames);
    submitRaceLapForm(0).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.RACE_LAP_MIN_LENGTH_UNDER);
    });
  });

  it('시도할 횟수는 최소 10번 이하여야한다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    submitCarNamesForm(carNames);
    submitRaceLapForm(11).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.RACE_LAP_MAX_LENGTH_OVER);
    });
  });

  it('시도할 횟수를 제출하면 시도 횟수 입력창과 버튼이 비활성화 된다.', () => {
    submitCarNamesForm(carNames);
    submitRaceLapForm(lap);
    cy.get(SELECTORS.RACE_LAP_INPUT).should('be.disabled');
    cy.get(SELECTORS.RACE_LAP_SUBMIT_BUTTON).should('be.disabled');
  });

  it('시도할 횟수를 제출하면 플레이어 목록이 노출된다.', () => {
    submitCarNamesForm(carNames);
    submitRaceLapForm(lap);
    carNames.split(CAR_NAME_DIVIDER).forEach((carName) => {
      cy.get(`[data-player=${carName}]`).should('be.visible');
    });
  });

  it('레이싱이 시작되면 플레이어에 전진 아이콘이 노출된다.', () => {
    submitCarNamesForm(carNames);
    submitRaceLapForm(lap);
    cy.get(SELECTORS.FORWARD_ICON).should('be.visible');
  });
});
