import {ComponentParam} from "./types/common.js";
import RenderService from "./services/RenderService.js";
import RacingBeforeStartForm from "./components/RacingBeforeStartForm.js";

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
        console.log(carNames, numberOfTry);
    }

    function render() {
        RenderService.render({
            $el,
            template: `
                <div class="d-flex justify-center">
                    <section data-component="racing-before-start-form"></section>
                </div>
            `,
            childComponents: [
                {
                    selector: '[data-component="racing-before-start-form"]',
                    props: {typeBeforeStartInfo},
                    renderComponent: RacingBeforeStartForm,
                }
            ]
        });
    }

    render();
}
