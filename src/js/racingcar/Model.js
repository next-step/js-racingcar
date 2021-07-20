import Model from '../core/Model.js';

export default class RacingModel extends Model {
	constructor() {
		super();
		this.state = {
			carRegister: {value: undefined, disabled: false, hidden: false, focus: true},
			roundRegister: {value: undefined, disabled: false, hidden: true, focus: true},
			gameFootprints: {
				gameMatrix: [],
				footprints: [],
				candidates: [],
				round: 0,
				hidden: true,
			},
			gameResults: {winners: '', hidden: true},
		};
	}

	resetAll = () => {
		this.state = {
			carRegister: {value: undefined, disabled: false, hidden: false, focus: true},
			roundRegister: {value: undefined, disabled: false, hidden: true, focus: true},
			gameFootprints: {
				gameMatrix: [],
				footprints: [],
				candidates: [],
				round: 0,
				hidden: true,
			},
			gameResults: {winners: '', hidden: true},
		};
	};
	/**
	 * @param value typeof string|undefined
	 * @param disabled typeof boolean
	 * @param hideen typeof boolean
	 */
	setCarRegister = (carRegister) => {
		this.state = {...this.state, carRegister: {...this.state.carRegister, ...carRegister}};
	};
	/**
	 * @param value typeof number|undefined
	 * @param disabled typeof boolean
	 * @param hideen typeof boolean
	 */
	setRoundRegister = (roundRegister) => {
		this.state = {
			...this.state,
			roundRegister: {...this.state.roundRegister, ...roundRegister},
		};
	};
	/**
	 * @param gameMatrix typeof number[][]
	 * @param footprints typeof string[]
	 * @param candidates typeof string[]
	 * @param round typeof number
	 * @param hideen typeof boolean
	 */
	setGameFootprints = (gameFootprints) => {
		this.state = {
			...this.state,
			gameFootprints: {...this.state.gameFootprints, ...gameFootprints},
		};
	};
	/**
	 * @param winner typeof string
	 * @param hideen typeof boolean
	 */
	setGameResults = (gameResults) => {
		this.state = {...this.state, gameResults: {...this.state.gameResults, ...gameResults}};
	};
}
