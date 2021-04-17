class Car {
    constructor({ name, manager }) {
        this.name = name;
        this.count = 0;
        this.manager = manager;
        this.timerId = null;
        this.init();
    }

    init() {
        console.log(this.name, this.manager);
    }

    go() {

    }

    isGo() {
        const num = Math.floor(Math.random() * 10);
        return num > 3;
    }
}

export default Car
