import { userInteractionType } from '../../src/js/constant/interaction.js'
import { errorMessage } from '../../src/js/constant/message.js'
import {
	buttonSelector,
	fieldSelector,
	inputSelector,
} from '../../src/js/constant/selector.js'

describe('자동차 경주 미션 1단계', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	context('자동차 이름 부여 테스트', () => {
		it('자동차 이름 입력칸에 텍스트를 입력할 수 있다.', () => {
			cy.get(inputSelector.INPUT_CAR_NAME)
				.type('EAST')
				.should('have.value', 'EAST')
		})

		it('5자 이하의 자동차 이름 입력 후 확인 버튼을 마우스 좌클릭하면 시도 횟수 입력 창이 보인다.', () => {
			cy.submitCarName({
				carName: 'ABCDE',
				submitType: userInteractionType.CLICK,
			})
			cy.get(fieldSelector.RACE_COUNT_FIELD).should('be.visible')
		})

		it('5자 이하의 자동차 이름 입력 후 키보드 엔터를 누르면 시도 횟수 입력 창이 보인다.', () => {
			cy.submitCarName({
				carName: 'ABCDE',
				submitType: userInteractionType.ENTER,
			})
			cy.get(fieldSelector.RACE_COUNT_FIELD).should('be.visible')
		})

		it('자동차 이름 입력을 마치면 이름 입력창이 비활성화 된다.', () => {
			cy.submitCarName({ carName: 'WEST', submitType: 'Click' }).then(() => {
				cy.get(fieldSelector.CAR_NAME_FIELD).should('be.disabled')
			})
		})

		it('자동차 이름 입력칸이 비어 있으면 확인을 눌렀을 때 경고창이 뜬다.', () => {
			const stub = cy.stub()
			cy.on('window:alert', stub)
			cy.get(buttonSelector.SUBMIT_CAR_NAME)
				.click()
				.then(() => {
					const actualMessage = stub.getCall(0).lastArg
					expect(actualMessage).to.equal(errorMessage.INVALID_CAR_NAME)
				})
		})

		it('자동차 이름 입력칸에 6자 이상의 텍스트를 입력하면 확인을 눌렀을 때 경고창이 뜬다.', () => {
			const stub = cy.stub()
			cy.on('window:alert', stub)
			cy.submitCarName({
				carName: 'ABCDEF',
				submitType: userInteractionType.CLICK,
			}).then(() => {
				expect(stub.getCall(0)).to.be.calledWith(errorMessage.INVALID_CAR_NAME)
			})
		})

		it('자동차 이름 입력칸에 입력한 자동차 이름 중 빈 문자열이 포함되어 있으면 확인을 눌렀을 때 경고창이 뜬다.', () => {
			const stub = cy.stub()
			cy.on('window:alert', stub)
			cy.submitCarName({
				carName: 'ABC,,DEF',
				submitType: userInteractionType.ENTER,
			}).then(() => {
				expect(stub.getCall(0)).to.be.calledWith(errorMessage.INVALID_CAR_NAME)
			})
		})
	})

	context('자동차 전진 시도 입력 테스트', () => {
		beforeEach(() => {
			cy.submitCarName({
				carName: 'ABC,DE',
				submitType: userInteractionType.ENTER,
			})
		})

		it('자동차 전진 입력칸에 숫자를 입력할 수 있다.', () => {
			cy.get(inputSelector.INPUT_RACE_COUNT).type(10).should('have.value', 10)
		})

		it('자동차 전진 입력칸이 비어있으면 확인을 눌렀을 때 경고창이 뜬다.', () => {
			const stub = cy.stub()
			cy.on('window:alert', stub)
			cy.get(buttonSelector.SUBMIT_RACE_COUNT)
				.click()
				.then(() => {
					const actualMessage = stub.getCall(0).lastArg
					expect(actualMessage).to.equal(errorMessage.SMALL_RACE_COUNT)
				})
		})

		it('자동차 전진 입력칸에 최대 정수보다 큰 수를 입력하면 확인을 눌렀을 때 경고창이 뜬다.', () => {
			const stub = cy.stub()
			cy.on('window:alert', stub)
			cy.get(inputSelector.INPUT_RACE_COUNT).type(10000000000000000000)
			cy.get(buttonSelector.SUBMIT_RACE_COUNT)
				.click()
				.then(() => {
					const actualMessage = stub.getCall(0).lastArg
					expect(actualMessage).to.equal(errorMessage.BIG_RACE_COUNT)
				})
		})
	})
})
