import { $ } from './util/dom.js';
import { ERR_MSG } from './util/constatns.js';
import { isCheckCarNameLength, isMoveCar } from './util/util.js';

const $carNamesInput = $('#car-names-input');
const $carNamesSubmit = $('#car-names-submit');
const $carTryBlock = $('#car-try-block');
const $carTryInput = $('#car-try-input');
const $carTrySubmit = $('#car-try-submit');
const $carRacingBlock = $('#car-racing-block');

const playRacing = (carNames) =>
	carNames
		.map(
			(name) =>
				`<div class="mr-2">
				<div class="car-player">${name}</div>
				${Array(Number($carTryInput.value))
					.fill(0)
					.map(() =>
						isMoveCar() ? `<div class="forward-icon mt-2">⬇️️</div>` : null
					)
					.join('')}
			</div>`
		)
		.join('');

const submitCarNames = () => {
	if (!$carNamesInput.value) {
		alert(ERR_MSG.EMPTY_CAR_NAME);
		return;
	}

	if (!isCheckCarNameLength($carNamesInput.value.split(', '))) {
		alert(ERR_MSG.OVER_CAR_NAME_MAX_LENGTH);
		return;
	}

	$carNamesInput.disabled = true;
	$carTryBlock.style.display = 'block';
};

const submitTryNum = () => {
	if (!$carTryInput.value) {
		alert(ERR_MSG.EMPTY_TRY_NUM);
		return;
	}

	$carTryInput.disabled = true;
	$carRacingBlock.style.display = 'flex';

	const template = playRacing($carNamesInput.value.split(', '));
	$carRacingBlock.innerHTML = `<div class="mt-4 d-flex">${template}</div>`;
};

$carNamesSubmit.addEventListener('click', submitCarNames);
$carTrySubmit.addEventListener('click', submitTryNum);
