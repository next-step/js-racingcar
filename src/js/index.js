import car from './Car.js';
import Form from './Form.js';
import RacingView from './RacingView.js';
import * as dom from './util/dom.js';

const {
	$carNamesInput,
	$carNamesSubmit,
	$carTryBlock,
	$carTryInput,
	$carTrySubmit,
	$carRacingBlock,
} = dom;

const nameForm = new Form({
	$inputEl: $carNamesInput,
	$triggerEl: $carNamesSubmit,
});
const tryForm = new Form({
	$inputEl: $carTryInput,
	$triggerEl: $carTrySubmit,
});

nameForm.setEvent('click', () => {
	car.name = nameForm.getValue();
	nameForm.visibleForm($carTryBlock);
});

tryForm.setEvent('click', () => {
	car.tryCount = tryForm.getValue();
	const racing = new RacingView({ car, $target: $carRacingBlock });
	racing.updateView();
});
