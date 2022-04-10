import Racing from "../domain/Racing.js";
import Winner from "../domain/Winner.js";
import CarNamesForm from "./CarNamesForm.js";
import CarTrackForm from "./CarTrackForm.js";
import TryCountForm from "./TryCountForm.js";
import WinnerForm from "./WinnerForm.js";

const INTERVAL = 1000;

export default class RacingApp {
    constructor() {
        this.racing = new Racing();

        this.carNamesForm = new CarNamesForm(this.racing, {
            onLoadTryForm: () => {
                this.tryCountForm.render();
                this.tryCountForm.mounted();
            },
        });
        this.tryCountForm = new TryCountForm(this.racing, {
            onLoadCarTrackForm: () => {        
                this.onDisableButton();
                this.carTrackForm.render();
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
        let count = 0;
        const interval = setInterval(() => {
            count++;
            if(count === Number(this.racing.tryCount)) {
                clearInterval(interval);
                this.carTrackForm.removeSpinner();
                this.winnierForm.onLoadWinners(this.racing.cars);

                return;
            }
            this.racing.cars.forEach((car) => {
                if(Racing.getForwardState()) {
                    car.setForwardCount();
                    this.carTrackForm.onForward(car);
                }
            })
        }, INTERVAL);
    }

    onDisableButton() {
        this.carNamesForm.disabled();
        this.tryCountForm.disabled();
    }

    onReplay() {
        this.carNamesForm.reset();
        this.tryCountForm.reset();
        this.carTrackForm.reset();
        this.winnierForm.reset();
    }   
}