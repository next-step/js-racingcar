import {tryNumberTemplate} from '../../utils/templates.js';
import {$inputNumber, $number} from '../../utils/doms.js';

export let TRY_NUMBER = 0;

export const onRegisterNumber = () => {
    TRY_NUMBER = $inputNumber.value;
    if (TRY_NUMBER < 1) return alert('시도 횟수는 1 이상만 가능합니다.');

    $inputNumber.value = '';
    $number.innerText = '';
    $number.insertAdjacentHTML('afterbegin', tryNumberTemplate(TRY_NUMBER));
};
