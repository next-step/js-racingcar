import { makeElementDisabled } from './lib/index.js';
import { Racing, RacingInformation } from './store.js';
import { minTrialValidator, participantValidator } from './lib/index.js';

const $racingParticipantForm = document.querySelector('#racing-participant-form');
const $racingParticipantInput = document.querySelector('#racing-participant-input');
const $racingParticipantSubmitButton = document.querySelector('#racing-participant-submit-button');
const $racingTrialForm = document.querySelector('#racing-trial-form');
const $racingTrialInput = document.querySelector('#racing-trial-input');
const $racingTrailSubmitButton = document.querySelector('#racing-trial-submit-button');

const startRacing = (racingInformation) => {
	const { participants, trial } = racingInformation;

	const participantWithCar = participants.map((participant) => new Racing(participant));

	Array.from({ length: trial }).forEach(() => {
		participantWithCar.forEach((participant) => {
			participant.racing();
		});
	});

	return participantWithCar;
};

const submitParticipants = (e) => {
	e.preventDefault();
	const participantsInputValue = e.target.elements.participant.value;
	const participants = participantsInputValue.split(',');

	for (let i = 0; i < participants.length; i += 1) {
		const { isValid, msg } = participantValidator(participants[i]);
		if (!isValid) {
			window.alert(msg);
			return;
		}
	}

	makeElementDisabled($racingParticipantInput, $racingParticipantSubmitButton);
	$racingTrialForm.classList.remove('d-none');

	RacingInformation.participants = [...participants];
};

const submitTrial = (e) => {
	e.preventDefault();

	const trialInputValue = e.target.elements.trial.value;
	const { isValid, msg } = minTrialValidator(trialInputValue);

	if (!isValid) {
		window.alert(msg);
		return;
	}

	RacingInformation.trial = trialInputValue;
	makeElementDisabled($racingTrialInput, $racingTrailSubmitButton);

	const result = startRacing(RacingInformation);
	RacingInformation.result = [...result];
};

$racingParticipantForm.addEventListener('submit', submitParticipants);
$racingTrialForm.addEventListener('submit', submitTrial);
