<<<<<<< HEAD
import { CarNamesForm } from "./CarNamesForm.js";
import { TryCountForm } from "./TryCountForm.js";
=======
import Racing from "../domain/Racing.js";
import Winner from "../domain/Winner.js";
import CarNamesForm from "./CarNamesForm.js";
import CarTrackForm from "./CarTrackForm.js";
import TryCountForm from "./TryCountForm.js";
import WinnerForm from "./WinnerForm.js";
>>>>>>> minsiki

export default class RacingApp {
    constructor() {
<<<<<<< HEAD
        this.tryCountForm = new TryCountForm();
        this.carNamesForm = new CarNamesForm({
            onLoadTryForm: () => this.tryCountForm.toggleDisplay(),
        });
=======
        this.racing = new Racing();

        this.carNamesForm = new CarNamesForm(this.racing, {
            onLoadTryForm: () => this.tryCountForm.display(),
        });
        this.tryCountForm = new TryCountForm(this.racing, {
            onLoadCarTrackForm: () => {
                this.onDisableButton();
                this.onPlayRacing();

            },
        });
    }

    onDisableButton() {
        this.carNamesForm.disabled();
        this.tryCountForm.disabled();
    }

    onPlayRacing() {
        this.carTrackForm = new CarTrackForm(this.racing, {
            onForwarding: () => this.racing.forwardTry()
        });

        let count = 0;
        let interval = setInterval(() => {
            count++;
            if(count === +this.racing.tryCount) {
                clearInterval(interval);
                this.carTrackForm.removeSpinner();
                new WinnerForm(Winner.getWinners(this.racing.cars), {});
                return;
            }
            this.racing.cars.forEach((car, i) => {
                if(this.getForwardState()) {
                    car.setForwardCount();
                    this.carTrackForm.onForward(i);
                }
            })
        }, 1000);
>>>>>>> minsiki
    }

    getForwardState() {
        return (Math.floor(Math.random() * Racing.MAX_RANDOM_VALUE)) < Racing.FORWARD_VALUE;
    }
}
