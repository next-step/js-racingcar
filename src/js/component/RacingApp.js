import Racing from "../domain/Racing.js";
import Winner from "../domain/Winner.js";
import CarNamesForm from "./CarNamesForm.js";
import CarTrackForm from "./CarTrackForm.js";
import TryCountForm from "./TryCountForm.js";
import WinnerForm from "./WinnerForm.js";

export default class RacingApp {
    constructor() {
        this.racing = new Racing();

        this.carNamesForm = new CarNamesForm(this.racing, {
            onLoadTryForm: () => {
                this.tryCountForm.renderer();
                this.tryCountForm.mounted();
            },
        });
        this.tryCountForm = new TryCountForm(this.racing, {
            onLoadCarTrackForm: () => {
                this.onPlayRacing();
            },
        });
        this.carTrackForm = new CarTrackForm(this.racing, {
            onForwarding: () => this.racing.forwardTry(),
        });

        this.winnierForm = new WinnerForm({
            onReplay: () => this.onReplay()
        })
    }

    onPlayRacing() {
        this.onDisableButton();
        this.carTrackForm.renderer();

        let count = 0;
        let interval = setInterval(() => {
            count++;
            if(count === Number(this.racing.tryCount)) {
                clearInterval(interval);
                this.carTrackForm.removeSpinner();
                this.winnierForm.winners = Winner.getWinners(this.racing.cars);
                this.winnierForm.renderer();
                this.winnierForm.mounted();
                this.winnierForm.onAlertWinner();
                return;
            }
            this.racing.cars.forEach((car, i) => {
                if(this.getForwardState()) {
                    car.setForwardCount();
                    this.carTrackForm.onForward(i);
                }
            })
        }, 1000);
    }

    onDisableButton() {
        this.carNamesForm.disabled();
        this.tryCountForm.disabled();
    }

    getForwardState() {
        return (Math.floor(Math.random() * Racing.MAX_RANDOM_VALUE)) < Racing.FORWARD_VALUE;
    }

    onReplay() {
        this.carNamesForm.reset();
        this.tryCountForm.reset();
        this.carTrackForm.reset();
        this.winnierForm.reset();
    }   
}