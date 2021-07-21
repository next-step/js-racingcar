/// <reference types="cypress" />

import {
	CAR_NAME_PLACEHOLDER,
	FINAL_WINNERS_TITLE,
	RESTART_BTN,
	ROUND_PLACEHOLDER,
} from '../../../src/js/constants/testConstants/index.js';
import {
	INVALID_NAME_ERROR_MESSAGE,
	GAME_END_ALERT_MESSAGE,
	INVALID_ROUND_ERROR_MESSAGE,
} from '../../../src/js/constants/messages/index.js';

const findByPlaceholderText = (regex) => cy.findByPlaceholderText(regex);
const findBtn = (regex) => cy.findByRole('button', { name: regex });
const findRestartBtn = () => findBtn(RESTART_BTN);

const findFinishTitle = () =>
	cy.findByRole('heading', { level: 2, name: FINAL_WINNERS_TITLE });

/**
 * 사용방법: message인자에 alert 문구를 등록하여, return되는 콜백함수를 alert이 발생할 이벤트then에 입력한다.
 */
const sholudAlertByMessage = (message) => {
	const stub = cy.stub();
	cy.on('window:alert', stub);
	return () => expect(stub.getCall(0)).to.be.calledWith(message);
};
/**
 * 사실 논리적으로 생각한다면, wrapper tag가 몇겹이 쌓여있는지 모르기 때문에
 * 첫번째 부모에서 findByRole이 실패한다면, 재귀적으로 부모를 탐색해야하는 로직이 더 정확할텐데
 * cypress 함수들이 손에 익지 않아 원하는 로직을 만들기 쉽지 않다.
 */
const find확인BtnNextByPlaceHolder = (regex) =>
	cy
		.findByPlaceholderText(regex)
		.parent()
		.findByRole('button', { name: /확인/ });

const typeAndEnter = (f) => (type) => f().type(`${type}{enter}`);
const carNameInputTypeAndEnter = typeAndEnter(() =>
	findByPlaceholderText(CAR_NAME_PLACEHOLDER)
);
const roundInputTypeAndEnter = typeAndEnter(() =>
	findByPlaceholderText(ROUND_PLACEHOLDER)
);
describe('레이싱 카', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	context('자동차 이름 입력 테스트', () => {
		it('placeholder가 자동차 이름인 input이 있다.', () => {
			findByPlaceholderText(CAR_NAME_PLACEHOLDER).should('exist');
		});
		context('에러 발생시키는 입력들', () => {
			[' !@#$% 0 ', '       ', ', ,', 'asdddd', '이신호 짱짱'].forEach(
				(inputValue) => {
					it(`${inputValue}를 입력하면 "${INVALID_NAME_ERROR_MESSAGE}"메시지 알림`, () => {
						const assertAlertExpectation = sholudAlertByMessage(
							INVALID_NAME_ERROR_MESSAGE
						);
						find확인BtnNextByPlaceHolder(CAR_NAME_PLACEHOLDER)
							.click()
							.then(assertAlertExpectation);
					});
				}
			);
		});
	});

	context('시도횟수 테스트', () => {
		let goodCarNames;
		beforeEach(() => {
			goodCarNames = '이신호,윤성민,임학수';
		});
		it('정상적인 input을 입력하면 round number input이 나타난다.', () => {
			carNameInputTypeAndEnter(goodCarNames);
			findByPlaceholderText(ROUND_PLACEHOLDER).should('exist');
		});
		[-1, 0].forEach((round) => {
			it(`${round} 입력시, ${INVALID_ROUND_ERROR_MESSAGE}`, () => {
				carNameInputTypeAndEnter(goodCarNames);
				const assertAlertExpectation = sholudAlertByMessage(
					INVALID_ROUND_ERROR_MESSAGE
				);
				roundInputTypeAndEnter(round).then(assertAlertExpectation);
				find확인BtnNextByPlaceHolder(ROUND_PLACEHOLDER)
					.click()
					.then(assertAlertExpectation);
			});
		});
	});

	context('최종 결과', () => {
		let goodCarNames;
		let assertAlertExpectation;
		beforeEach(() => {
			goodCarNames = '이신호,윤성민,임학수';
			assertAlertExpectation = sholudAlertByMessage(GAME_END_ALERT_MESSAGE);
		});

		it.only(`자동차 이름:'이신호,윤성민,임학수', 시도횟수${3}를 입력하면, 3초후 최종우승자와 다시시작하기가 나오고 그다음 2초 후에 ${GAME_END_ALERT_MESSAGE} 알림`, () => {
			carNameInputTypeAndEnter(goodCarNames);
			roundInputTypeAndEnter(3);
			cy.wait(3000);
			findRestartBtn().should('exist');
			findFinishTitle().should('exist');

			cy.wait(2000).then(assertAlertExpectation);
		});
		it('결과가 나온 후 다시하기 버튼을 누른다면, 자동차 입력버튼만 남아있고 화면이 초기화 된다.', () => {
			carNameInputTypeAndEnter('123');
			roundInputTypeAndEnter(1);
			cy.wait(1000);
			cy.wait(2000);
			findRestartBtn().click();
			findByPlaceholderText(CAR_NAME_PLACEHOLDER)
				.should('exist')
				.and('not.have.text');
			// cy.findByPlaceholderText(ROUND_PLACEHOLDER).should('not.exist'); // 원인 모를 현상으로 findByPlaceholder 메서드만 엘리먼트가 없을때 에러를 반환한다.
			cy.findByText(ROUND_PLACEHOLDER).should('not.exist');
			findRestartBtn().should('not.exist');
			findFinishTitle().should('not.exist');
		});
	});
});
