describe('racing-car', () => {
    beforeEach(() => {
        // 페이지 접속. 띄워진 서버 port를 작성해주세요.
        cy.visit('http://localhost:5500/');
    });

    describe('정보 입력 (자동차 이름, 시도 횟수) ', () => {
        it('이름은 1자 이상만 가능', () => {
            cy.inputCarName('EAST , WEST, , NORTH');

            cy.on('window:alert', (str) => {
                expect(str).to.equal('이름은 1자 이상 5자 이하만 가능합니다.');
            });
        });

        it('이름은 5자 이하만 가능', () => {
            cy.inputCarName('EAST, WEST, SOUTH, NORTHTH');

            cy.on('window:alert', (str) => {
                expect(str).to.equal('이름은 1자 이상 5자 이하만 가능합니다.');
            });
        });

        it('시도 횟수는 1이상만 가능', () => {
            cy.inputTryNumber('-1');
            cy.on('window:alert', (str) => {
                expect(str).to.equal('시도 횟수는 1 이상만 가능합니다.');
            });
        });

        it('자동차 이름을 입력하면 사용자에게 보여준다.', () => {
            cy.inputCarName('EAST, WEST, SOUTH, NORTH');

            ['EAST', 'WEST', 'SOUTH', 'NORTH'].forEach((car) => {
                cy.get(`.${car}`).should('have.text', `${car}`);
            });
        });

        it('시도 횟수를 입력하면 사용자에게 보여준다. ', () => {
            cy.inputTryNumber('5');
            cy.get('#try-number').should('have.text', '시도 횟수 : 5');
        });
    });

    describe('결과', () => {
        it('자동차 이름을 입력해야 경기 시작 가능', () => {
            cy.inputTryNumber('2');
            cy.get('#start').click();

            cy.on('window:alert', (str) => {
                expect(str).to.contains('자동차 이름을 입력해주세요.');
            });
        });

        it('시도 횟수를 입력해야 경기 시작 가능', () => {
            cy.inputCarName('EAST, WEST, SOUTH, NORTH');
            cy.get('#start').click();

            cy.on('window:alert', (str) => {
                expect(str).to.contains('시도 횟수를 입력해주세요.');
            });
        });

        it('경주 시작을 누르면 결과를 출력한다.', () => {
            cy.startRace('EAST, WEST, SOUTH, NORTH', '2');

            cy.get('.winner').contains('최종 우승자');
        });

        it('결과 출력 후 2초 후에 축하의 alert 메세지를 띄운다.', () => {
            cy.startRace('EAST, WEST, SOUTH, NORTH', '2');

            cy.wait(4 * 1000).then(() => {
                cy.on('window:alert', (str) => {
                    expect(str).to.contains('님 우승을 축하합니다.');
                });
            });
        });

        it('경주 다시 시작하기', () => {
            cy.startRace('EAST, WEST, SOUTH, NORTH', '2');

            cy.wait(2 * 1000).then(() => {
                cy.get('#start').click();
                cy.wait(2 * 1000).then(() => {
                    cy.get('.winner').contains('최종 우승자');
                });
            });
        });
    });
});
