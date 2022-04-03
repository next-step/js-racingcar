import { Racing } from "../domain/Racing.js";
import { CarNamesForm } from "./CarNamesForm.js";
import { CarTrackForm } from "./CarTrackForm.js";
import { TryCountForm } from "./TryCountForm.js";

export class RacingApp {
    constructor() {
        this.racing = new Racing();

        this.carNamesForm = new CarNamesForm(this.racing, {
            onLoadTryForm: () => this.tryCountForm.display(),
        });
        this.tryCountForm = new TryCountForm(this.racing, {
            onLoadCarTrackForm: () => this.onPlayRacing(),
        });
        this.carTrackForm = new CarTrackForm(this.racing, {
            onForwarding: () => this.racing.forwardTry()
        });
    }

    onPlayRacing() {
        this.carTrackForm.initialize();

        let count = 0;
        let interval = setInterval(() => {
            if(count === +this.racing.tryCount) {
                clearInterval(interval);
                this.carTrackForm.removeSpinner();
            }
            this.racing.cars.forEach((car, i) => {
                if(this.getForwardState()) {
                    car.setForwardCount();
                    this.carTrackForm.onForward(i);
                }
            })
            count++;
        }, 1000);
    }

    getForwardState() {
        return (Math.floor(Math.random() * Racing.MAX_RANDOM_VALUE)) < Racing.FORWARD_VALUE;
    }
}
