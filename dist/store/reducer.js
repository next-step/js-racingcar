import Actions from './action.js';
import { StateKeys } from './index.js';
import { promiseDelay, abortableDelay } from '../util/delay.js';
let abortAlert = () => { };
const reducer = {
    [Actions.setCarName]: (store, { cars }) => {
        abortAlert();
        const carNames = cars.map((c) => c.trim());
        if (carNames.some(n => n.length > 5))
            throw Error('5자 이하만!');
        store.setValue({ cars: carNames, totalAttempts: 0, trial: 0, scores: [], winners: [] });
    },
    [Actions.setTotalAttempts]: async (store, { totalAttempts }) => {
        abortAlert();
        store.setValue({ status: 'idle', totalAttempts, trial: 0, scores: [], winners: [] });
        store.dispatch(Actions.runGame, { trial: 1 });
    },
    [Actions.runGame]: async (store, { trial }) => {
        const cars = store.get(StateKeys.cars);
        const scores = store.get(StateKeys.scores);
        const totalAttempts = store.get(StateKeys.totalAttempts);
        store.setValue({ status: 'playing', trial, processing: true });
        const [res] = await Promise.all([cars.map(() => Math.floor(Math.random() * 10)), promiseDelay(1000)]);
        const newStatus = cars.map((_, i) => {
            const s = scores[i];
            return trial === 1 || !s?.length ? [res[i]] : [...s, res[i]];
        });
        store.setValue({ status: 'playing', scores: newStatus, processing: false });
        if (trial < totalAttempts)
            store.dispatch(Actions.runGame, { trial: trial + 1 });
        else if (totalAttempts > 0 && trial === totalAttempts)
            store.dispatch(Actions.gameFinished);
    },
    [Actions.gameFinished]: store => {
        const cars = store.get(StateKeys.cars);
        const scores = store.get(StateKeys.scores);
        const result = scores.map(stat => stat.filter(s => s >= 4).length);
        const max = Math.max(...result);
        const winners = result.reduce((p, r, i) => {
            if (r === max)
                p.push(cars[i]);
            return p;
        }, []);
        store.setValue({ status: 'finished', winners });
        const { setDelay, abortDelay } = abortableDelay();
        setDelay(() => store.dispatch(Actions.notifyWinner), 2000);
        abortAlert = abortDelay;
    },
    [Actions.notifyWinner]: store => {
        window.alert(`${store.get(StateKeys.winners).join(', ')}님 축하합니다.`);
    },
    [Actions.reset]: store => {
        abortAlert();
        store.setValue({ status: 'idle', cars: [], totalAttempts: 0, trial: 0, scores: [], winners: [] });
    },
};
const reducerWithErrorCatcher = (dispatcher) => (store, data) => {
    try {
        dispatcher(store, data);
    }
    catch (err) {
        console.error(err);
        window.alert(err.message);
    }
};
export default (actionType) => reducerWithErrorCatcher(reducer[actionType]);
//# sourceMappingURL=reducer.js.map