const state = {
    race: {
        names: [],
        round: 0
    },
    renderRace: false,
    renderRound: false,
    observers: [],
    reset: []
}

export default function stateService() {
    return new Proxy(state, {
        get(target, prop) {
            return target[prop];
        },
        set(target, prop, value) {
            const hasProp = Object.keys(state).includes(prop.toString());
            if (!hasProp) return;

            Reflect.set(target, prop, value);

            if (value) {
                Reflect.get(target.observers.find(row => row[prop]), prop)();
            }

            return true;
        }
    });
}