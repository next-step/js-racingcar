import Controller from '../core/Controller.js';
// 문제... controller에서 중복이 너무 많이 생긴다.
export default class RacingController extends Controller {
	// carRegister

	handleCarRegisterSubmitClick = () => {
		const { input } = this.views.carRegisterView;
		this.model.carRegisterSubmit(input.value);
	};
	handleCarRegisterKeyup = (e) => {
		if (e.code.toLowerCase() !== 'enter') {
			return;
		}
		this.model.carRegisterSubmit(e.target.value);
	};

	handleRoundRegisterSubmitClick = () => {
		const { input } = this.views.roundRegisterView;
		this.model.roundRegisterSubmit(input.value);
	};
	handleRoundRegisterKeyup = (e) => {
		if (e.code.toLowerCase() !== 'enter') {
			return;
		}
		this.model.roundRegisterSubmit(e.target.value);
	};

	handleResetBtnClick = (e) => {
		this.model.resetAll();
	};
}
