const RacingInformation = {
	participants: [],
	result: [],
	trial: 0,
};

class Racing {
	constructor(participant, success = 0) {
		this.participant = participant;
		this.success = success;
	}

	setParticipant(name) {
		this.participant = name;
	}

	generateRandomNumber() {
		return Math.floor(Math.random() * 10);
	}

	racing() {
		this.success = this.generateRandomNumber() > 3 ? this.success + 1 : this.success;
	}
}

export { Racing, RacingInformation };
