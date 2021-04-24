describe('js-racing.spec.js', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('http://localhost:5500/');
  });

  describe('자동차 이름 입력', () => {
    it('6자 이상의 이름 입력 시 경고창이 뜬다.', () => {
      let alerted;
      cy.on('window:alert', (message) => { alerted = message; });

      cy.inputCarName('abcdef')
        .then(() => {
          expect(alerted).to.contains('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다');
        });
    });

    it('쉼표(,)를 기준으로 구분된 이름은 각 자동차의 이름으로 표시된다.', () => {
      cy.inputCarName('a,b,c,d');
      cy.inputRaceTimes(1);

      cy.get('.car-player')
        .should('have.length', 4)
        .and('contain', 'a')
        .and('contain', 'b')
        .and('contain', 'c')
        .and('contain', 'd');
    });
  });

  describe('이동 횟수 입력', () => {
    it('0 이하의 수 입력 시 경고창이 뜬다.', () => {
      let alerted;
      cy.on('window:alert', (message) => { alerted = message; });

      cy.inputCarName('a,b,c,d');
      cy.inputRaceTimes(0)
        .then(() => expect(alerted).to.contains('입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.'));
    });

    it('이동 횟수s 만큼의 시간이 지난 후 자동차는 최대 이동 횟수만큼 이동한다.', () => {
      const names = ['a', 'b', 'c', 'd'];
      cy.inputCarName(names.join(','));
      cy.inputRaceTimes(4);

      cy.tick(4000);

      cy.get('.car')
        .each((car) => {
          const moves = car.find('.forward-icon').length;
          expect(moves).to.be.at.most(4);
        });
    });
  });

  describe('우승자 표시', () => {
    it('자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다 (우승자 한 명 이상)', () => {
      const names = ['a', 'b', 'c', 'd'];
      let winners = [];
      let maxMove = 0;

      cy.inputCarName(names.join(','));
      cy.inputRaceTimes(4);

      cy.tick(4000);

      cy.get('.car')
        .each((car) => {
          const moves = car.find('.forward-icon').length;
          const name = car.children('.car-player').text();

          if (moves === maxMove) {
            winners.push(name);
          } else if (moves > maxMove) {
            maxMove = moves;
            winners = [name];
          }
        }).then(() => {
          cy.get('#winner-name').should('have.text', winners.join(', '));
        });
    });

    it('2초 후에 축하의 alert 메세지를 띄운다.', () => {
      let alerted;
      cy.on('window:alert', (message) => { alerted = message; });

      const names = ['a', 'b', 'c', 'd'];
      cy.inputCarName(names.join(','));
      cy.inputRaceTimes(4);

      cy.tick(6000)
        .then(() => expect(alerted).to.contains('축하합니다!'));
    });
  });
});
