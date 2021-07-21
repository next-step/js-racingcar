import {
	GAME_END_ALERT_MESSAGE,
	INVALID_NAME_ERROR_MESSAGE,
	INVALID_ROUND_ERROR_MESSAGE,
} from '../constants/messages/index.js';
import Model from '../core/Model.js';
import { deepClone, isCarNameValid, isRoundVaild, sleep } from '../utils.js';
import Game from './Game.js';
import MatrixCreator from './MatrixCreator.js';

const initState = {
	carRegister: {
		value: undefined,
		disabled: false,
		hidden: false,
		focus: true,
	},
	roundRegister: {
		value: undefined,
		disabled: false,
		hidden: true,
		focus: true,
	},
	gameFootprints: {
		gameMatrix: [],
		footprints: [],
		candidates: [],
		round: 0,
		hidden: true,
	},
	gameResults: { winners: '', hidden: true },
};
// 비즈니스 로직은 다 모델에 담겨야 한다...
//controller는 model에서 정의한 메서드를 상황에 맞게 호출만 하면 된다!
export default class RacingModel extends Model {
	constructor() {
		super();
		this.state = deepClone(initState);
	}

	carRegisterSubmit = (value) => {
		if (!value || !isCarNameValid(value)) {
			alert(INVALID_NAME_ERROR_MESSAGE);
			return;
		}
		this.setCarRegister({
			value,
			disabled: true,
			focus: false,
		});
		this.setRoundRegister({
			hidden: false,
		});
	};

	// round register
	roundRegisterSubmit = async (value) => {
		if (!value || !isRoundVaild(value)) {
			alert(INVALID_ROUND_ERROR_MESSAGE);
			return;
		}
		this.makeRoundDisabled(value);
		this.racingSetup();
		await this.racingProcess();
		await this.showResult();
	};
	makeRoundDisabled = (value) => {
		// round input disabled
		this.setRoundRegister({
			value,
			disabled: true,
		});
	};
	racingSetup = () => {
		const candidates = this.state.carRegister.value.split(',');
		const round = parseInt(this.state.roundRegister.value);
		const matrix = new MatrixCreator(round, candidates.length).matrix();
		// this.game..... 일단 컨트롤러에 game객체를 멤버변수로 할당하였다.
		// 이게 좋은 방식인지 아닌지는 모르겠으나, 함수를 분리하기 위해 어쩔 수 없이
		// 시도한 방법
		this.game = new Game(candidates, round, matrix);
		this.setGameFootprints({
			hidden: false,
			candidates,
			gameMatrix: matrix,
			round,
		});
	};

	racingProcess = async () => {
		const round = parseInt(this.state.roundRegister.value);
		for (let rnd = 0; rnd < round; rnd++) {
			// racingProcess는 화살표 함수이므로 this가 익명(undefined)이다.
			showWithSpinners.call(this, rnd);
			await sleep(1000);
			showFootPrintsUntil.call(this, rnd + 1);
		}
		// 함수 호이스팅을 이용하여 가독성 높이는 전략
		function showWithSpinners(rnd) {
			const footPrintsWithSpinner = this.game.getFootPrintsAndSpinnerUnit(rnd);
			this.setGameFootprints({
				footprints: footPrintsWithSpinner,
			});
		}
		function showFootPrintsUntil(rnd) {
			const footprints = this.game.getFootPrintsUntil(rnd);
			this.setGameFootprints({
				footprints,
			});
		}
	};
	showResult = async () => {
		const winners = this.game.winners;
		this.setGameResults({
			winners,
			hidden: false,
		});
		await sleep(2000);
		alert(GAME_END_ALERT_MESSAGE);
	};
	// 아래는 mutation 메서드들
	resetAll = () => {
		this.state = deepClone(initState);
	};
	/**
	 * @param value typeof string|undefined
	 * @param disabled typeof boolean
	 * @param hideen typeof boolean
	 */
	setCarRegister = (carRegister) => {
		this.state = {
			...this.state,
			carRegister: { ...this.state.carRegister, ...carRegister },
		};
	};
	/**
	 * @param value typeof number|undefined
	 * @param disabled typeof boolean
	 * @param hideen typeof boolean
	 */
	setRoundRegister = (roundRegister) => {
		this.state = {
			...this.state,
			roundRegister: { ...this.state.roundRegister, ...roundRegister },
		};
	};
	/**
	 * @param gameMatrix typeof number[][]
	 * @param footprints typeof string[][]
	 * @param candidates typeof string[]
	 * @param round typeof number
	 * @param hideen typeof boolean
	 */
	setGameFootprints = (gameFootprints) => {
		this.state = {
			...this.state,
			gameFootprints: { ...this.state.gameFootprints, ...gameFootprints },
		};
	};
	/**
	 * @param winner typeof string
	 * @param hideen typeof boolean
	 */
	setGameResults = (gameResults) => {
		this.state = {
			...this.state,
			gameResults: { ...this.state.gameResults, ...gameResults },
		};
	};
}
