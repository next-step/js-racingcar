import { MESSAGE } from "../../src/js/utils/constants.js";

describe("racingcar test", () => {
	beforeEach("자동차 경주 사이트로 이동한다.", () => {
		cy.visit("http://127.0.0.1:5500/");
	});

	it("Step1 - 자동차 이름이 5자를 초과하면, 경고창을 표시한다.", () => {
		const alertStub = cy.stub();
		cy.on("window:alert", alertStub);
		cy.get(".input-car-names").type("스포티지, 롤스로이스 팬텀");
		cy.get(".input-car-names-confirm")
			.click()
			.then(() => {
				expect(alertStub.getCall(0)).to.be.calledWith(
					MESSAGE.CAR_NAME_MAX_LENGTH_ERROR
				);
			});
	});

	it("Step2 - 자동차 게임이 완료되면 우승자를 알려준다.", () => {
		cy.get(".input-car-names").type("스포티지, 소나타, 그랜져");
		cy.get(".input-car-names-confirm").click();
		cy.get(".input-try-times").type(2);
		cy.get(".input-try-times-confirm").click();
		setTimeout(() => {
			expect(cy.get(".show-result").should("be.visible"));
		}, 2500);
	});

	it("Step3 - 자동차 게임이 완료된 후, 결과를 경고창에 표시한다.", () => {
		const alertStub = cy.stub();
		cy.on("window:alert", alertStub);
		cy.get(".input-car-names").type("스포티지");
		cy.get(".input-car-names-confirm")
			.click()
				cy.get(".input-try-times").type(2);
				cy.get(".input-try-times-confirm").click()
				setTimeout(() => {
					expect(alertStub.getCall(0)).to.be.calledWith('최종 우승자는 스포티지입니다. 축하합니다!!');
				}, 5500);
	});
});
