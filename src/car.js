class Car {
    position = 0;

    constructor(name) {
        this.name = name;
    }

    get position() {
        return this.position;
    }

    moveForward() {
        this.position += 1;
    }
}

export default Car;
