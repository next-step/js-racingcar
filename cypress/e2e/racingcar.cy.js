import { ALERT_TEXT, CAR_RACING_INTERVAL_TIME } from '../../src/js/constants';

describe('자동차 경주 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('화면 첫 진입 후 렌더링된 컨텐츠를 확인한다.', () => {
    racingInitialRender();
  });

  it('1글자 미만의 자동차 이름을 입력할 시 Window Alert을 띄운다', () => {
    clickCarNameEnterButton();
    displayAlert(ALERT_TEXT.CAR_VALIDATION_ERROR);
  });

  it('자동차 이름중 5글자 이상의 이름 입력할 시 Window Alert을 띄운다 ', () => {
    enterCarNames('EAST&WEST, SOUTH');
    clickCarNameEnterButton();
    displayAlert(ALERT_TEXT.CAR_VALIDATION_ERROR);
  });

  it(', 뒤에는 공백이 올 시, Window Alert 을 띄운다.', () => {
    enterCarNames('EAST&WEST, SOUTH,');
    clickCarNameEnterButton();
    displayAlert(ALERT_TEXT.CAR_VALIDATION_ERROR);
  });

  it('자동차 경주 진행를 진행한다.', () => {
    progressRacing(3);
  });

  it('자동차 경주 진행이 끝난 후, 다시 시작하기 버튼 클릭 시 초기 렌더링 상태로 돌아간다.', () => {
    progressRacing(5);
    clickRacingResetButton();
    checkStatusAfterReset();
  });
});

const racingInitialRender = () => {
  cy.get('.car-name-input-container').should('be.visible');
  cy.get('.competition-count-input-container').should('not.be.visible');
  cy.get('.competition-list').should('not.be.visible');
  cy.get('.competition-result').should('not.be.visible');
};

const enterCarNames = (carNames) => cy.get('.car-name-input').type(carNames);

const clickCarNameEnterButton = () => cy.get('.car-name-enter-button').click();

const enterCompetitionCount = (count) =>
  cy.get('.competition-count-input').type(count);

const clickCompetitionCountEnterButton = () =>
  cy.get('.competition-count-enter-button').click();

const clickRacingResetButton = () => cy.get('.racing-reset-button').click();

const displayAlert = (alertText) => {
  cy.on('window:alert', (text) => {
    expect(text).to.equal(alertText);
  });
  cy.on('window:confirm', () => true);
};

const progressRacing = (competitionCount) => {
  enterCarNames('EAST, SOUTH, WEST, NORTH');
  clickCarNameEnterButton();

  cy.get('.competition-count-input-container').should('be.visible');
  enterCompetitionCount(competitionCount);
  clickCompetitionCountEnterButton();

  cy.get('.competition-list').should('be.visible');
  cy.wait(competitionCount * CAR_RACING_INTERVAL_TIME);
  cy.get('.competition-result').should('be.visible');
  displayAlert(ALERT_TEXT.RESULT_CELEBRATION);
};

const checkStatusAfterReset = () => {
  cy.get('.car-name-input').should('have.value', '').and('not.be.disabled');
  cy.get('.car-name-enter-button').and('not.be.disabled');
  cy.get('.competition-count-input')
    .should('have.value', '')
    .and('not.be.disabled');
  cy.get('.competition-count-enter-button').and('not.be.disabled');
  cy.get('.competition-count-input-container').should('not.be.visible');
  cy.get('.competition-list').should('not.be.visible');
  cy.get('.competition-result').should('not.be.visible');
};
