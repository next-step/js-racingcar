import { errorMessage } from '../../src/js/constant/message.js';
import {buttonSelector, fieldSelector, inputSelector} from '../../src/js/constant/selector.js';

describe('자동차 경주 미션 1단계', () => {
	beforeEach(() => {
		cy.visit('/');
	})

	context('자동차 이름 부여 테스트', () => {
		it('자동차 이름 입력칸에 텍스트를 입력할 수 있다.', () => {
			cy.get(inputSelector.INPUT_CAR_NAME)
				.should('be.visible')
				.type('EAST')
				.should('have.value', 'EAST')
		});

		it('5자 이하의 자동차 이름 입력 후 확인을 누르면 시도 횟수 입력 창이 보인다.', () => {
			cy.submitCarName('ABCDE')
			cy.get(fieldSelector.CAR_TRY_FIELD)
				.should('be.visible')
		})
		it('자동차 이름 입력칸이 비어 있으면 확인을 눌렀을 때 경고창이 뜬다.', () => {
			const stub = cy.stub()
			cy.on('window:alert', stub)
			cy.get(buttonSelector.SUBMIT_CAR_NAME)
				.click()
				.then(() => {
					expect(stub.getCall(0)).to.be.calledWith(errorMessage.INVALID_CAR_NAME)
				})
		})
		it('자동차 이름 입력칸에 6자 이상의 텍스트를 입력하면 확인을 눌렀을 때 경고창이 뜬다.', () => {
			const stub = cy.stub()
			cy.on('window:alert', stub)
			cy.submitCarName('ABCDEF')
				.then(() => {
					expect(stub.getCall(0)).to.be.calledWith(errorMessage.INVALID_CAR_NAME)
				})
		})
		it('자동차 이름 입력칸에 입력한 자동차 이름 중 빈 문자열이 포함되어 있으면 확인을 눌렀을 때 경고창이 뜬다.', () => {
			const stub = cy.stub()
			cy.on('window:alert', stub)
			cy.submitCarName('ABC,,DEF')
				.then(() => {
					expect(stub.getCall(0)).to.be.calledWith(errorMessage.INVALID_CAR_NAME)
				})
		})
	})

	context('자동차 전진 시도 입력 테스트', () => {
		beforeEach(() => {
			cy.submitCarName('ABC,DE')
		})
		it('자동차 전진 입력칸에 숫자를 입력할 수 있다.', () => {
			cy.get(inputSelector.INPUT_CAR_TRY)
				.should('be.visible')
				.type(10)
				.should('have.value', 10)
		});
		it('자동차 전진 입력칸이 비어있으면 확인을 눌렀을 때 경고창이 뜬다.', () => {
			const stub = cy.stub()
			cy.on('window:alert', stub)
			cy.get(buttonSelector.SUBMIT_CAR_TRY)
				.click()
				.then(() => {
					expect(stub.getCall(0)).to.be.calledWith(errorMessage.INVALID_CAR_TRY)
				})
		});
	})
});

// 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
// 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
// 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
// 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
// 전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.

// 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
// 우승자가 여러명일 경우 ,를 이용하여 구분한다.

// 자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.
// 애니메이션 구현을 위해 setInterval, setTimeout, requestAnimationFrame 을 활용한다.
// 정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.
