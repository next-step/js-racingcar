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
}

export default Car;
