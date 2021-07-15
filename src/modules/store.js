import { createStore } from '../core/Redux';
import reducer from './reducer.js';

const store = createStore(reducer);

export { store };
