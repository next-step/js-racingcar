import RenderService from "./services/RenderService.js";
import RacingBeforeStartForm from "./components/RacingBeforeStartForm.js";
import RacingStadium from "./components/RacingStadium.js";
import { $ } from "./utils/element.js";
export default function App({ $el }) {
    const state = {
        carNames: [],
        numberOfTry: 0,
    };
    function typeBeforeStartInfo(carNames, numberOfTry) {
        state.carNames = carNames;
        state.numberOfTry = numberOfTry;
        showRacingStadium();
    }
    function showRacingStadium() {
        const { carNames, numberOfTry } = state;
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
                    props: { typeBeforeStartInfo },
                    renderComponent: RacingBeforeStartForm,
                },
            ]
        });
    }
    render();
}
//# sourceMappingURL=App.js.map