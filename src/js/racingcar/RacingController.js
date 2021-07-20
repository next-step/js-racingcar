import Controller from '../core/Controller.js';
import {qs} from '../helper.js';
import MatrixCreator from './MatrixCreator.js';
import Game from './Game.js';
import {isCarNameValid, isRoundVaild, sleep} from '../utils.js';
import {
	GAME_END_ALERT_MESSAGE,
	INVALID_ROUND_ERROR_MESSAGE,
	INVALID_NAME_ERROR_MESSAGE,
} from '../constants/messages/index.js';

// 문제... controller에서 중복이 너무 많이 생긴다.
export default class RacingController extends Controller {
	// carRegister
	carRegisterSubmit = (value) => {
		if (!value || !isCarNameValid(value)) {
			alert(INVALID_NAME_ERROR_MESSAGE);
			return;
		}
		this.model.setCarRegister({
			...this.model.state.carRegister,
			value,
			disabled: true,
			focus: false,
		});
		this.model.setRoundRegister({...this.model.state.roundRegister, hidden: false});
	};
	// getInputFn으로 클로져를 이용해 input객체를 넘긴 이유
	// 각각의 view 생성자 메서드에서 qs로 돔 객체를 바인딩 하면,
	// template로 rerender 되면서 이전 dom 데이터를 잃기 때문에
	// 현재시점의 dom을 잡기 위해 클로저와 콜백함수를 이용한 트릭을 사용
	handleCarRegisterSubmitClick = (getInputFn) => (e) => {
		const input = getInputFn();
		this.carRegisterSubmit(input.value);
	};
	handleCarRegisterKeypress = (e) => {
		if (e.code.toLowerCase() !== 'enter') {
			return;
		}
		this.carRegisterSubmit(e.target.value);
	};

	// round register
	roundRegisterSubmit = async (value) => {
		if (!value || !isRoundVaild(value)) {
			alert(INVALID_ROUND_ERROR_MESSAGE);
			return;
		}
		// round input disabled
		this.model.setRoundRegister({...this.model.state.roundRegister, value, disabled: true});
		this.racingSetup();
		await this.racingProcess();
		await this.showResult();
	};
	racingSetup = () => {
		const candidates = this.model.state.carRegister.value.split(',');
		const round = parseInt(this.model.state.roundRegister.value);
		const matrix = new MatrixCreator(round, candidates.length).matrix();
		// this.game..... 일단 컨트롤러에 game객체를 멤버변수로 할당하였다.
		// 이게 좋은 방식인지 아닌지는 모르겠으나, 함수를 분리하기 위해 어쩔 수 없이
		// 시도한 방법
		this.game = new Game(candidates, round, matrix);
		const winners = this.game.winners;
		this.model.setGameFootprints({
			...this.model.state.gameFootPrints,
			hidden: false,
			candidates,
			gameMatrix: matrix,
			round,
		});
	};

	racingProcess = async () => {
		const round = parseInt(this.model.state.roundRegister.value);
		for (let rnd = 0; rnd < round; rnd++) {
			const footPrintsWithSpinner = this.game.getFootPrintsAndSpinnerUnit(rnd);
			this.model.setGameFootprints({
				...this.model.state.gameFootPrints,
				footprints: footPrintsWithSpinner,
			});
			await sleep(1000);
			const footprints = this.game.getFootPrintsUntil(rnd + 1);
			this.model.setGameFootprints({...this.model.state.gameFootPrints, footprints});
		}
	};
	showResult = async () => {
		const winners = this.game.winners;
		this.model.setGameResults({
			...this.model.state.gameResults.winners,
			winners,
			hidden: false,
		});
		await sleep(2000);
		alert(GAME_END_ALERT_MESSAGE);
	};
	handleRoundRegisterSubmitClick = (getInputFn) => (e) => {
		const input = getInputFn();
		this.roundRegisterSubmit(input.value);
	};
	handleRoundRegisterKeypress = (e) => {
		if (e.code.toLowerCase() !== 'enter') {
			return;
		}
		this.roundRegisterSubmit(e.target.value);
	};

	handleResetBtnClick = (e) => {
		this.model.resetAll();
	};
}
