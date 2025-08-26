class Car {
  static FORWARD_STEP = 1

  constructor(name, position = 0) {
	this.name = name
	this.position = position
  }

  forward() {
	this.position += FORWARD_STEP
  }
}