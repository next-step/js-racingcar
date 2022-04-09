import { $ } from './util/dom.js';
import { ERR_MSG } from './util/constatns.js';
import { toNameArray, isCheckCarNameLength, isMoveCar } from './util/util.js';

const $carNamesInput = $('#car-names-input');
const $carNamesSubmit = $('#car-names-submit');
const $carTryBlock = $('#car-try-block');
const $carTryInput = $('#car-try-input');
const $carTrySubmit = $('#car-try-submit');
const $carRacingBlock = $('#car-racing-block');

const playRacingView = (carNames) =>
	carNames
		.map(
			(name) =>
				`<div class="mr-2">
					<div data-cy="${name}" class="car-player">${name}</div>
					${Array.from({ length: Number($carTryInput.value) }, () =>
						isMoveCar() ? `<div  class="forward-icon mt-2">⬇️️</div>` : null
					).join('')}
				</div>`
		)
		.join('');

const submitCarNames = () => {
	if (!$carNamesInput.value) {
		alert(ERR_MSG.EMPTY_CAR_NAME);
		return;
	}

	const carNamesArr = toNameArray($carNamesInput.value);
	if (!isCheckCarNameLength(carNamesArr)) {
		alert(ERR_MSG.OVER_CAR_NAME_MAX_LENGTH);
		return;
	}

	$carNamesInput.disabled = true;
	$carNamesSubmit.disabled = true;
	$carTryBlock.style.display = 'block';
};

const submitTryNum = () => {
	if (!$carTryInput.value) {
		alert(ERR_MSG.EMPTY_TRY_NUM);
		return;
	}

	$carTryInput.disabled = true;
	$carTrySubmit.disabled = true;
	$carRacingBlock.style.display = 'flex';

	const carNamesArr = toNameArray($carNamesInput.value);
	const template = playRacingView(carNamesArr);
	$carRacingBlock.innerHTML = `<div class="mt-4 d-flex">${template}</div>`;
};

$carNamesSubmit.addEventListener('click', submitCarNames);
$carTrySubmit.addEventListener('click', submitTryNum);
