import { DOM } from '../constants.js';

export function racingCarGameView() {
  return String.raw`
		<section class="d-flex justify-center mt-5">
			<form>
				<fieldset>
					<h1 class="text-center">🏎️ 자동차 경주 게임</h1>
					<p>
						5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
						예시) EAST, WEST, SOUTH, NORTH
					</p>
					<div class="d-flex">
						<input id="${DOM.CAR_NAMES_INPUT_ID}" type="text" class="w-100 mr-2" placeholder="자동차 이름" />
						<button id="${DOM.CAR_NAMES_SUBMIT_BUTTON_ID}" type="button" class="btn btn-cyan">확인</button>
					</div>
				</fieldset>
				<fieldset id="${DOM.TRY_COUNT_FIELD_SET_ID}"></fieldset>
			</form>
		</section>
		<section class="d-flex justify-center mt-5">
			<div id="${DOM.GAME_PROCESS_BOARD_ID}" class="mt-4 d-flex"></div>
		</section>
		<section id="${DOM.GAME_SECTION_ID}" class="d-flex justify-center mt-5"></section>
	`;
}
