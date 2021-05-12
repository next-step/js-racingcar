import { id, msg, delimiter, defaultVal } from '../../src/js/settings';

describe('js-racingcar', () => {
  const ALERTED = 'alerted';
  const AT_ALERTED = '@alerted';

  beforeEach(() => {
    cy.visit('/');
    cy.on('window:alert', cy.stub().as(ALERTED));
    cy.clock();
  });

  it('자동차 이름 입력 성공', () => {
    cy.getById(id.inputCarName).type('1,2,3,4,5');
    cy.getById(id.submitCarName).click();
    cy.getById(id.raceTimesComp).should('be.visible');
  });

  it('자동차 이름 입력 실패', () => {
    cy.getById(id.submitCarName).click();
    cy.checkAlertMsg(AT_ALERTED, msg.invalidName);
  });

  it('레이싱 횟수 입력 성공', () => {
    cy.getById(id.inputCarName).type('1,2,3,4,5');
    cy.getById(id.submitCarName).click();
    cy.getById(id.raceTimesComp).should('be.visible');

    cy.getById(id.inputRaceTimes).type(5);
    cy.getById(id.submitRaceTimes).click();
    cy.getById(id.gameProcessComp).should('be.visible');
  });

  it('레이싱 횟수 입력 실패', () => {
    cy.getById(id.inputCarName).type('1,2,3,4,5');
    cy.getById(id.submitCarName).click();
    cy.getById(id.raceTimesComp).should('be.visible');

    cy.getById(id.inputRaceTimes).type(0);
    cy.getById(id.submitRaceTimes).click();
    cy.checkAlertMsg(AT_ALERTED, msg.invalidRound);
  });

  it('레이싱 결과 확인', () => {
    const [names, round] = [[1, 2, 3, 4, 5], 5];

    cy.getById(id.inputCarName).type(names.join(delimiter.comma));
    cy.getById(id.submitCarName).click();
    cy.getById(id.inputRaceTimes).type(round);
    cy.getById(id.submitRaceTimes).click();

    let [winners, max] = [[], 0];
    cy.tick(round * defaultVal.raceTerm);
    cy.get(`#${id.gameProcessComp} > .mr-2`)
      .each(el => {
        const name = el.find('.car-player').text();
        const length = el.find('.forward-icon').length;

        if (length === max) winners.push(name);
        if (length > max) [winners, max] = [[name], length];
      })
      .then(() =>
        cy.getById(id.infoGameResult).then(el => {
          const re = new RegExp(String.fromCharCode(160), 'g');
          const text = el.text().replace(re, '');
          expect(text).to.equal(winners.join(delimiter.comma));
        }),
      );

    cy.tick(defaultVal.celebrationTerm);
    cy.checkAlertMsg(AT_ALERTED, msg.celebration);
  });
});
