import { Component } from './component.js';
import { CarModel } from '../models/car.model.js';

import { MESSAGE_FOR_CELEBRATION, RACETYPE } from "../common/const.js";
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
        const delay = this._stateService.race.round * 1000;

        displayFlex($race.container);
        await this.#renderRace(cars);
        setTimeout(() => this.#renderWinners(cars), delay);
        
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
        try {
            return cars.map(async ({ player, races }) => {
                const $container = parseStringToHTML($car.container);
                appendElement($container, this.#renderPlayer(player));

                return await this.#renderRaces($container, races);
            }).forEach(car => {
                car.then(c => appendElement($race.container, c));
            });
        } catch (e) {
            console.error(e);
        }
    }

    #renderPlayer = (player) => {
        const $player = `<div class="race-player">${player}</div>`;
        return parseStringToHTML($player);
    }

    #renderRaces = ($container, races) => {
        races.forEach((race, i) => {
            const delay = (i + 1) * 1000;
            const $forward = parseStringToHTML($car.forward);

            setTimeout(() => {
                if (race === RACETYPE.FORWARD) return $container.append($forward);
            }, delay);

            this.#renderSpinner($container, i);
        })

        return $container;
    }

    #renderSpinner = ($container, i) => {
        const $spinner = parseStringToHTML($race.spinner);
        setTimeout(() => $container.append($spinner), i * 1000);
        setTimeout(() => $container.removeChild($spinner), (i + 1) * 1000);
    }

    #renderWinners(cars) {
        const winners = this.#getWinners(cars).join(', ');

        displayFlex($winner.container);
        $winner.player.innerHTML = `🏆 최종 우승자: ${winners} 🏆`;
        setTimeout(() => alert(MESSAGE_FOR_CELEBRATION), 2000);
    }

    #reset() {
        this._stateService.reset.resets = true;
        this._stateService.resetState();
        removeChildNodes($race.container);
        this._init();
    }
}