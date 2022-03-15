import {ComponentParam} from "./types/common.js";
import RenderService from "./services/RenderService.js";
import RacingBeforeStartForm from "./components/RacingBeforeStartForm.js";
import RacingStadium from "./components/RacingStadium.js";
import {$} from "./utils/element.js";

interface State {
    carNames: string[],
    numberOfTry: number,
}

export default function App({$el}: ComponentParam<null>) {

    const state: State = {
        carNames: [],
        numberOfTry: 0,
    };

    function typeBeforeStartInfo(carNames: string[], numberOfTry: number) {
        state.carNames = carNames;
        state.numberOfTry = numberOfTry;
        showRacingStadium();
    }

    function showRacingStadium() {
        const {carNames, numberOfTry} = state;
        RacingStadium({
            $el: $('[data-component="racing-stadium"]', $el),
            props: {
                carNames,
                numberOfTry,
            },
        });
    }

    function render() {
        RenderService.render({
            $el,
            template: `
                <div class="d-flex direction-column items-center">
                    <section data-component="racing-before-start-form"></section>
                    <section data-component="racing-stadium"></section>
                </div>
            `,
            childComponents: [
                {
                    selector: '[data-component="racing-before-start-form"]',
                    props: {typeBeforeStartInfo},
                    renderComponent: RacingBeforeStartForm,
                },
            ]
        });
    }

    render();
}
