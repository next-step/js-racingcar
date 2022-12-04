import { arr, getRandom } from '../common/util.js';
import { RACETYPE } from '../common/const.js';

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
        const random = getRandom(0, 9);
        return random > 3 ? RACETYPE.FORWARD : RACETYPE.STOP;
    }
}