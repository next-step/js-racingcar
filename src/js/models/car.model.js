import { arr, getRandom } from '../common/util.js';
import { CAR, RACETYPE } from '../common/const.js';

export class CarModel {
    #player;
    #round;

    constructor(player, round) {
        this.#player = player;
        this.#round = arr(round);
    }

    getRaces() {
        return {
            player: this.#player,
            races: this.#round.map(() => this.#setRace())
        };
    }

    #setRace = () => {
        const random = getRandom(CAR.MIN_POINT, CAR.MAX_POINT);
        return random > CAR.TURNING_POINT ? RACETYPE.FORWARD : RACETYPE.STOP;
    }
}