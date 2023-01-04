import { dispatch as dispatchGlobal } from './global/global.js';
import { dispatch as dispatchRace } from './race/race.js';

export function resetModels() {
  dispatchGlobal('reset');
  dispatchRace('reset');
}
