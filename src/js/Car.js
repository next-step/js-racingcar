class Car {
    constructor({ name, manager }) {
        this.name = name;
        this.count = 0;
        this.manager = manager;
        this.timerId = null;
        this.init();
    }

    init() {
        this.timerId = setInterval(this.go.bind(this), 1000);
    }

    go() {
        if (this.manager.isGameOver) return clearInterval(this.timerId);
        if (!this.isGo()) return;
        if (++this.count === this.manager.goalCount) return this.manager.winners.push(this.name);
    }

    isGo() {
        const num = Math.floor(Math.random() * 10);
        return num > 3;
    }
}

export default Car
