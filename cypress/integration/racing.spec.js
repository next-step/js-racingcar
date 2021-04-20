describe('racing-car', () => {
    beforeEach(() => {
        // 페이지 접속. 띄워진 서버 port를 작성해주세요.
        cy.visit('http://localhost:5500/');
    });

    describe('정보 입력 (자동차 이름, 시도 횟수) ', () => {
        it('자동차 이름은 쉼표(,)를 기준으로 구분, 이름은 5자 이하만 가능', () => {
            cy.inputCarName('EAST, WEST, SOUTH, NORTHTH');

            // value 클래스를 가진 요소의 텍스트가 10
            cy.on('window:alert', (str) => {
                expect(str).to.equal('이름은 5자 이하만 가능합니다.');
            });
        });

        it('자동차 이름 입력 -> 사용자에게 보여준다.', () => {
            cy.inputCarName('EAST, WEST, SOUTH, NORTH');

            ['EAST', 'WEST', 'SOUTH', 'NORTH'].forEach((car) => {
                cy.get(`.${car}`).should('have.text', `${car}`);
            });
        });

        it('시도 횟수 입력 -> 사용자에게 보여준다. ', () => {
            cy.inputTryNumber('5');
            cy.get('#try-number').should('have.text', '시도 횟수 : 5');
        });
    });

    describe('결과', () => {
        it('자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.', () => {
            // cy.startRace('EAST, WEST, SOUTH, NORTH', '5');
            // cy.wait(5 * 1000).then(() => {});
        });

        it('결과 출력 후 2초 후에 축하의 alert 메세지를 띄운다.', () => {
            cy.startRace('EAST, WEST, SOUTH, NORTH', '2');

            cy.wait(4 * 1000).then(() => {
                cy.on('window:alert', (str) => {
                    expect(str).to.contains('님 우승을 축하합니다.');
                });
            });
        });
    });
});
