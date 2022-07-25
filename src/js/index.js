import { makeElementDisabled } from './lib/index.js';
import { minTrialValidator, participantValidator } from './lib/index.js';

const $racingParticipantForm = document.querySelector('#racing-participant-form');
const $racingParticipantInput = document.querySelector('#racing-participant-input');
const $racingParticipantSubmitButton = document.querySelector('#racing-participant-submit-button');
const $racingTrialForm = document.querySelector('#racing-trial-form');
const $racingTrialInput = document.querySelector('#racing-trial-input');
const $racingTrailSubmitButton = document.querySelector('#racing-trial-submit-button');

const submitParticipants = (e) => {
	e.preventDefault();
	const participantsInputValue = e.target.elements.participant.value;
	const participants = participantsInputValue.split(',');

	const [{ isValid, msg }] = participants.map((participant) => participantValidator(participant));

	if (!isValid) {
		window.alert(msg);
		return;
	}

	makeElementDisabled($racingParticipantInput, $racingParticipantSubmitButton);
	$racingTrialForm.classList.remove('d-none');
};

const submitTrial = (e) => {
	e.preventDefault();

	const trialInputValid = e.target.elements.trial.value;
	const { isValid, msg } = minTrialValidator(trialInputValid);

	if (!isValid) {
		window.alert(msg);
		return;
	}

	makeElementDisabled($racingTrialInput, $racingTrailSubmitButton);
};

$racingParticipantForm.addEventListener('submit', submitParticipants);
$racingTrialForm.addEventListener('submit', submitTrial);
