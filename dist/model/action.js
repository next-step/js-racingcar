import { StateKeys } from './index.js';
import promiseDelay from './promiseDelay.js';
export const ActionTypes = {
    submit_FormCarNames: 'submit_FormCarNames',
    submit_FormAttempts: 'submit_FormAttempts',
    runGame_Playboard: 'runGame_Playboard',
};
const actionErrorCatcher = (dispatcher) => (model, data) => {
    try {
        dispatcher(model, data);
    }
    catch (err) {
        console.error(err);
        window.alert(err.message);
    }
};
const Actions = {
    [ActionTypes.submit_FormCarNames]: actionErrorCatcher((model, { cars }) => {
        const carNames = cars.map((c) => c.trim());
        if (carNames.some(n => n.length > 5))
            throw Error('5자 이하만!');
        model.setValue({ cars: carNames });
    }),
    [ActionTypes.submit_FormAttempts]: actionErrorCatcher((model, { totalAttempts }) => {
        model.setValue({ totalAttempts });
    }),
    [ActionTypes.runGame_Playboard]: actionErrorCatcher(async (model, { trial = 0 }) => {
        model.setValue({ trial, pending: true });
        const status = model.get(StateKeys.status);
        const [res] = await Promise.all([
            model.get(StateKeys.cars).map(() => Math.floor(Math.random() * 10)),
            promiseDelay(2000),
        ]);
        const newStatus = status.map((s, i) => (s && s.length ? [...s, res[i]] : [res[i]]));
        model.setValue({ status: newStatus, pending: false });
    }),
};
export default Actions;
//# sourceMappingURL=action.js.map