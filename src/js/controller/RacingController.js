import { NAME_ERROR_MESSAGE, NUMBER_ERROR_MESSAGE, CONGRATS_MESSAGE } from '../utils/constants.js';

export default class RacingController {
	constructor(racingModel, racingView) {
		this.model = racingModel;
		this.view = racingView;
		this.registerEventListener(racingModel, racingView);
	}

    registerEventListener(model, view) {
        const $buttons = view.querySelectorAll('button');
        const $carNameButton = $buttons[0];
        const $tryNumButton = $buttons[1];
        const $retryButton = $buttons[2];

        $carNameButton.addEventListener('click', () => this.checkCarNames(model, view));
        $tryNumButton.addEventListener('click', () => this.checkTryNum(model, view));
        $retryButton.addEventListener('click', () => {
			model.retry();
			view.retry();
		});
    }

	checkCarNames(model, view) {
		const $input = view.querySelectorAll('input')[0];
		const value = $input.value;
        
        if (!value) {
            alert(NAME_ERROR_MESSAGE);
            return;
        }

		const names = value.split(/,\s*/);
        if (names.some((name) => name.length > 5 || name.length < 1)) {
            alert(NAME_ERROR_MESSAGE);
            return;
        }

		model.setCars(names);
        view.changeVisibility(view.querySelectorAll('fieldset')[1], true);
	}

	checkTryNum(model, view) {
		const $input = view.querySelectorAll('input')[1];
        const value = +$input.value;

        if (value < 1) {
            alert(NUMBER_ERROR_MESSAGE);
            return;
        }

		model.setTryNum(value);
        this.startRacing(model, view);
	}

	startRacing(model, view) {
        view.changeVisibility(view.querySelectorAll('section')[1], true);

		const cars = model.getCars();
		const tryNum = model.getTryNum();
		for (let i = 0; i < tryNum; i++) {
			cars.forEach((car) => {
				car.checkRandom(this.getRandomNumber());
			});
		}
		
		model.setWinners(this.getWinners(model));
		view.renderWinners(model);
        setTimeout(() => {
            alert(CONGRATS_MESSAGE);
        }, 2000);
        // let i = 0;
        // let last = 0;
        // let isSpinnerRendered = false;
        // const racing = (timestamp) => {
        //     if (i >= tryNum) {
        //         // this.renderResult();
        //         return;
        //     }

        //     if (!last) {
        //         last = timestamp;
        //     } else {
        //         if (Math.floor((timestamp - last) / 1000) === 1) {
        //             isSpinnerRendered = false;
        //             last = timestamp;
        //             i++;
        //             cars.forEach((car) => car.setRandom(this.getRandomNumber()));
        //         } else {
        //             if (!isSpinnerRendered) {
        //                 cars.forEach((car) => car.renderSpinner());
        //                 isSpinnerRendered = true;
        //             }
        //         }
        //     }
        //     window.requestAnimationFrame(racing);
        // };
        // window.requestAnimationFrame(racing);
    }

	getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }
	
	getWinners(model) {
		const cars = model.getCars();
        const max = cars.reduce((prev, curr) => prev < curr.getForwardNum() ? curr.getForwardNum() : prev, 0);
        const winners = cars
                        .filter((car) => car.getForwardNum() === max)
                        .map((car) => car.getModel().getName());
        return winners;
	}
}
