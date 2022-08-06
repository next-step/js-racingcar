before(() => cy.visit('/'));

describe('자동차 이름 입력에 관한 테스트', () => {
  afterEach(() => {
    cy.get('[data-cy="input-car-name"]').clear();
  });

  it('렌더링 후, 자동차 이름을 입력하는 input과 button이 정상적으로 렌더링 되었는지 확인한다.', () => {
    cy.get('[data-cy="input-car-name"]').should('be.visible');
    cy.get('[data-cy="submit-car-name"]').should('be.visible');
    cy.get('[data-cy="input-race-count"]').should('not.be.visible');
    cy.get('[data-cy="submit-race-count"]').should('not.be.visible');
  });

  it('자동차 이름을 입력하면 시도 횟수를 입력하는 input과 button이 렌더링 된다.', () => {
    cy.enterCarNames('dog');
    cy.get('[data-cy="input-race-count"]').should('be.visible');
    cy.get('[data-cy="submit-race-count"]').should('be.visible');
  });

  it('자동차 이름이 5글자를 초과할 경우 알림창이 나온다.', () => {
    cy.enterCarNames('coffee');
    cy.on('window:alert', (text) => expect(text).to.contains('자동차 이름은 1자 이상, 5자 이하여야 합니다.'));
  });

  it('자동차 이름이 비어있는 경우 알림창이 나온다.', () => {
    cy.enterCarNames('dog, ,cat');
    cy.on('window:alert', (text) => expect(text).to.contains('자동차 이름은 1자 이상, 5자 이하여야 합니다.'));
  });

  it('자동차 이름이 중복되는 경우 알림창이 나온다.', () => {
    cy.enterCarNames('bread,candy,bread');
    cy.on('window:alert', (text) => expect(text).to.contains('자동차 이름은 중복될 수 없습니다.'));
  });
});

describe('경주 횟수에 관한 테스트', () => {
  it('시도 횟수가 30회를 초과할 경우 알림창이 나온다.', () => {
    cy.enterCarNames('dog,cat');
    cy.enterRaceCount(31);
    cy.on('window:alert', (text) => expect(text).to.contains('최대 시도 횟수는 30회 입니다.'));
  });
});

describe('경주 결과에 관한 테스트', () => {
  it('자동차 이름과 시도 횟수를 입력하면 아래에 자동차 이름들이 보인다.', () => {
    const carNames = ['dog', 'cat'];
    cy.enterCarNames(carNames.join(','));
    cy.enterRaceCount(10);
    cy.get('[data-cy="game-progress-component"]').each(($div, index) => {
      expect($div.text()).to.contains(carNames[index]);
    });
  });

  it('자동차 경주가 완료되면 우승자를 보여준다.', () => {
    const carNames = ['dog', 'cat'];
    cy.enterCarNames(carNames.join(','));
    cy.enterRaceCount(10);
    cy.get('[data-cy="winner"]')
      .invoke('text')
      .then((text) => carNames.includes(text));
  });

  it('다시 시작하기 버튼을 누르면 입력창과 결과가 초기화 된다.', () => {
    const carNames = ['dog', 'cat'];
    cy.enterCarNames(carNames.join(','));
    cy.enterRaceCount(10);
    cy.get('[data-cy="reset-button"]').click();
    cy.get('[data-cy="input-car-name"]').should('be.empty');
    cy.get('[data-cy="input-race-count"]').should('be.empty');
    cy.get('[data-cy="game-progress-component"]').should('not.be.visible');
    cy.get('[data-cy="game-result-component"]').should('not.be.visible');
  });
});
