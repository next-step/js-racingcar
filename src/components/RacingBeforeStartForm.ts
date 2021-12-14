import {ComponentParam} from "../types/common.js";
import RenderService from "../services/RenderService.js";
import {$} from "../utils/element.js";

interface Props {
    typeBeforeStartInfo: (carNames: string[], numberOfTry: number) => void,
}

export default function RacingBeforeStartForm({$el, props}: ComponentParam<Props>) {

    const state = {
        carNames: [],
    };

    function onSubmitCarNamesForm(event: SubmitEvent) {
        event.preventDefault();

        const formData: FormData = new FormData(event.target as HTMLFormElement);
        const carNamesText = formData.get('carNamesText');
        if (typeof carNamesText !== 'string') {
            return;
        }
        typeCarNames(carNamesText);
    }

    function typeCarNames(carNamesText: string) {
        if (typeof carNamesText !== 'string') {
            return;
        }

        const carNames = carNamesText.split(/[ ]*[,]+[ ]*/);
        if (carNames.some(carName => carName.length > 5)) {
            window.alert('자동차 이름은 최대 5자 입니다.');
            return;
        }

        state.carNames = carNames;
        disableFieldset({fieldName: 'carNamesText'});
        showNumberOfTryForm();
    }

    function onSubmitNumberOfTryForm(event: SubmitEvent) {
        event.preventDefault();

        const formData: FormData = new FormData(event.target as HTMLFormElement);
        const numberOfTry = formData.get('numberOfTry');
        typeNumberOfTry(Number(numberOfTry));
    }

    function typeNumberOfTry(numberOfTry: number) {
        if (numberOfTry < 1) {
            window.alert('시도횟수는 0보다 커야합니다.');
            return;
        }

        props.typeBeforeStartInfo(state.carNames, numberOfTry);
        disableFieldset({fieldName: 'numberOfTry'});
    }

    function disableFieldset({fieldName}: {fieldName: string}) {
        const $fieldset = $(`[data-field="${fieldName}"]`, $el);
        if ($fieldset) {
            $fieldset.setAttribute('disabled', '');
        }
    }

    function showNumberOfTryForm() {
        const $numberOfTryForm = $('[data-form="numberOfTryForm"]', $el);
        $numberOfTryForm.style.display = 'block';
        $('input', $numberOfTryForm).focus();
    }

    function render() {
        RenderService.render({
            $el,
            template: `
                <section class="mt-5">
                    <form data-form="carNamesForm">
                        <fieldset data-field="carNamesText">
                            <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
                                <p>
                                    5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br/>
                                    예시) EAST, WEST, SOUTH, NORTH
                                </p>
                                <div class="d-flex">
                                    <input type="text" class="w-100 mr-2" placeholder="자동차 이름" name="carNamesText" required/>
                                    <button type="submit" class="btn btn-cyan">확인</button>
                                </div>
                        </fieldset>
                    </form>
                    <form data-form="numberOfTryForm" class="d-none">
                        <fieldset data-field="numberOfTry">
                            <p>시도할 횟수를 입력해주세요.</p>
                            <div class="d-flex">
                                <input type="number" class="w-100 mr-2" placeholder="시도 횟수" name="numberOfTry" required/>
                                <button type="submit" class="btn btn-cyan">확인</button>
                            </div>
                        </fieldset>
                    </form>
                </section>
            `,
            eventListenerModels: [
                {
                    selector: '[data-form="carNamesForm"]',
                    eventType: 'submit',
                    callback: onSubmitCarNamesForm,
                },
                {
                    selector: '[data-form="numberOfTryForm"]',
                    eventType: 'submit',
                    callback: onSubmitNumberOfTryForm,
                },
            ]
        });
    }

    render();
}
