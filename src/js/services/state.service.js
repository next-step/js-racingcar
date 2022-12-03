const state = {
    race: {
        names: [],
        turn: 0
    },
    renderRace: false,
    renderRound: false,
    observers: [],
    reset: []
}

export default function stateService() {
    return new Proxy(state, {
        set(target, prop, value) {
            const hasProp = Object.keys(state).includes(prop.toString());
            if (!hasProp) return;

            Reflect.set(target, prop, value);

            if (value) {
                target.observers.forEach(fn => fn[prop]());
            }

            return true;
        }
    });
}