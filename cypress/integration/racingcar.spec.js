import { MESSAGES, VALIDATION, TIMER } from '../../src/js/constant.js';

describe("racingcar", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    const inputCarNames = (names) => {
        cy.get('#input-car-name').type(names);
        cy.get('#submit-car-name').click();
    };

    const inputGoalCount = (count) => {
        cy.get('#input-race-times').type(count);
        cy.get('#submit-race-times').click();
    }

    it("자동차 이름 입력", () => {
        const names = "A, BB, CCC, DDDD, EEEEE";
        inputCarNames(names);
    });

    it("자동차 이름 입력 오류", () => {
        const names = "A, BB, CCC, DDDD, EEEEE, FFFFFF";
        inputCarNames(names);
        cy.on('window:alert', txt => expect(txt).to.contains(MESSAGES.INVALID_CAR_NAME));
    });


    it("시도 횟수 입력", () => {
        const names = "A, BB, CCC, DDDD, EEEEE";
        const count = "3";
        inputCarNames(names);
        inputGoalCount(count);
    });

    it("시도 횟수 입력 오류", () => {
        const names = "A, BB, CCC, DDDD, EEEEE";
        const count = "0";
        inputCarNames(names);
        inputGoalCount(count);
        cy.on('window:alert', txt => expect(txt).to.contains(MESSAGES.INVALID_GOAL_COUNT));
    });

    it("게임 오버", () => {
        const names = "A, BB, CCC, DDDD, EEEEE";
        const count = "3";
        inputCarNames(names);
        inputGoalCount(count);
        cy.wait(+count * 1000);
        cy.on('window:alert', txt => expect(txt).to.contains(MESSAGES.CONGRATS));
    });
});
