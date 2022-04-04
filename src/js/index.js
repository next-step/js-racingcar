import { $ } from './util/dom.js';
import { ERR_MSG } from './util/constatns.js';
import { style } from './util/style.js';
import { isCheckCarNameLength, isRace } from './util/util.js';

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
						isRace() ? `<div class="forward-icon mt-2">⬇️️</div>` : null
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
		alert(ERR_MSG.OVER_CAR_NAME_LENGTH);
		return;
	}

	style.disabled($carNamesInput);
	style.block($carTryBlock);
};

const submitTryNum = () => {
	if (!$carTryInput.value) {
		alert(ERR_MSG.EMPTY_TRY_NUM);
		return;
	}

	style.disabled($carTryInput);
	style.flex($carRacingBlock);

	const template = playRacing($carNamesInput.value.split(', '));
	$carRacingBlock.innerHTML = `<div class="mt-4 d-flex">${template}</div>`;
};

$carNamesSubmit.addEventListener('click', submitCarNames);
$carTrySubmit.addEventListener('click', submitTryNum);
