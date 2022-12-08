export class StateService {
    static instance;
    raceState = {
        names: [],
        round: 0
    };
    renderState = {
        renderRace: false,
        renderRound: false,
        observers: []
    }
    resetState = {
        reset: [],
        observers: []
    }


    constructor() {
        this.raceState = this.getRaceState();
        this.renderState = this.setObserverState(this.renderState);
        this.resetState = this.setObserverState(this.resetState);
    }

    static getInstance() {
        if (!StateService.instance) {
            StateService.instance = new StateService();
        }

        return StateService.instance;
    }

    getRaceState() {
        return new Proxy(this.raceState, {
            get(target, prop) {
                return target[prop];
            },
            set(target, prop, value) {
                Reflect.set(target, prop, value);

                return true;
            }
        });
    }

    setObserverState(state) {
        return new Proxy(state, {
            set(target, prop, value) {
                Reflect.set(target, prop, value);

                if (value) {
                    Reflect.get(target.observers.find(row => row[prop]), prop)();
                }

                return true;
            }
        });
    }

}