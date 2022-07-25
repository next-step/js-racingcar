describe('자동차 경주 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('화면 진입 및 렌더링 컨텐츠 확인', () => {
    cy.get('.car-name-input-container').should('be.visible');
    cy.get('.competition-count-input-container').should('not.be.visible');
    cy.get('.competition-list').should('not.be.visible');
    cy.get('.competition-result').should('not.be.visible');
  });

  it('자동차 이름은 1자 이상, 5자 이하로 구분한다', () => {
    enterCarNames('EAST&WEST, SOUTH');
    carNameEnterButton();

    cy.on('window:alert', (text) => {
      expect(text).to.equal(
        '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
      );
    });
    cy.on('window:confirm', () => true);
  });

  it(', 뒤에는 공백이 올 수 없다.', () => {
    enterCarNames('EAST&WEST, SOUTH,');
    carNameEnterButton();

    cy.on('window:alert', (text) => {
      expect(text).to.equal(
        '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
      );
    });
    cy.on('window:confirm', () => true);
  });

  it('자동차 경주 진행', () => {});
});

const enterCarNames = (carNames) => cy.get('.car-name-input').type(carNames);

const carNameEnterButton = () => cy.get('.car-name-enter-button').click();
