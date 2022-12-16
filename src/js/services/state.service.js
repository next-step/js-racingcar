export class StateService {
    static instance;
    race = {
        names: [],
        round: 0
    };
    render = {
        race: false,
        round: false,
        observers: []
    }
    reset = {
        resets: [],
        observers: []
    }


    constructor() {
        this.race = this.getRaceState();
        this.render = this.setObserverState(this.render);
        this.reset = this.setObserverState(this.reset);
    }

    static getInstance() {
        if (!StateService.instance) {
            StateService.instance = new StateService();
        }

        return StateService.instance;
    }

    resetState() {
        this.race.names = [];
        this.race.round = 0;
        this.render.race = false;
        this.render.round = false;
        this.reset.resets = false;
    }

    getRaceState() {
        return new Proxy(this.race, {
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

                if (value && target.observers.length !== 0) {
                    Reflect.get(target.observers.find(row => row[prop]), prop)();
                }

                return true;
            }
        });
    }

}