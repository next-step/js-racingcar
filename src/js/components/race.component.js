import { Component } from './component.js';
import { CarModel } from '../models/car.model.js';

import { DELAY_TIME, MESSAGE_FOR_CELEBRATION, RACETYPE } from "../common/const.js";
import { $car, $race, $reset, $round, $winner } from '../views/selector.js';
import {
    appendElement,
    displayFlex,
    displayNones,
    parseStringToHTML,
    removeChildNodes,
    renderInputValue
} from "../common/util.js";

export class RaceComponent extends Component {
    constructor(stateService) {
        super(stateService);
        this._init();
        this._subscribe();
    }

    _init() {
        super._init();
        displayNones([$winner.container, $race.container]);
        renderInputValue($round.input);
    }

    _setEventListeners() {
        $reset.button.addEventListener('click', () => this.#reset());
    }

    _subscribe() {
        this._stateService.render.observers.push({ race: () => this.#render() });
        this._stateService.reset.observers.push({ resets: () => this.#reset() });
    }

    async #render() {
        const cars = this.#getCars();

        displayFlex($race.container);
        await this.#renderRace(cars);
        await this.#renderWinners(cars);
    }

    #getCars = () => {
        const { names, round } = this._stateService.race;
        return names.map(name => new CarModel(name, round).getRaces());
    }

    #getWinners = (cars) => {
        const playerScore = this.#getPlayerScore(cars);
        const winnerScore = Math.max(...playerScore.map(winner => winner.score));

        return playerScore
            .filter(player => player.score === winnerScore)
            .map(player => player.name);
    }

    #getPlayerScore = (cars) => {
        return cars.map((car) => {
            return {
                name: car.player,
                score: car.races.filter(race => race === RACETYPE.FORWARD).length
            }
        });
    }

    #renderRace(cars) {
        const promises = [];
        for (const car of cars) {
            const $container = parseStringToHTML($car.container);
            appendElement($container, this.#renderPlayer(car.player));
            appendElement($race.container, $container);

            promises.push(this.#renderRaces($container, car.races));
        }

        return Promise.all(promises);
    }

    #renderPlayer = (player) => {
        const $player = `<div class="race-player">${player}</div>`;
        return parseStringToHTML($player);
    }

    #renderRaces = async ($container, races) => {
        const $spinner = parseStringToHTML($race.spinner);

        for (const race of races) {
            $container.append($spinner);
            const $forward = parseStringToHTML($car.forward);
            await this.#delay(DELAY_TIME.SPINNER);
            $container.removeChild($spinner);
            if (race === RACETYPE.FORWARD) $container.append($forward);
        }
    }

    #delay = (ms = 0) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    async #renderWinners(cars) {
        const winners = this.#getWinners(cars).join(', ');

        displayFlex($winner.container);
        $winner.player.innerHTML = `🏆 최종 우승자: ${winners} 🏆`;
        await this.#delay(DELAY_TIME.WINNER);
        alert(MESSAGE_FOR_CELEBRATION);
    }

    #reset() {
        this._stateService.reset.resets = true;
        this._stateService.resetState();
        removeChildNodes($race.container);
        this._init();
    }
}