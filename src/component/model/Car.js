class Car {
	constructor(name) {
		this._name = name;
		this._position = 0;
	}

	get name() {
		return this._name;
	}

	set name(name) {
		this._name = name;
	}

	get position() {
		return this._position;
	}

	set position(position) {
		this._position = position;
	}

	moveForward() {
		const randomNumber = Math.floor(Math.random() * 10);
		if (randomNumber <= 3) {
			return;
		}
		this.position += 1;
	}
}

export default Car;
