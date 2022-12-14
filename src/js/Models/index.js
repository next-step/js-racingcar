import { dispatch as dispatchGlobal } from './global/global.js';
import { dispatch as dispatchRace } from './race/race.js';

export function resetModels() {
  const models = [dispatchGlobal, dispatchRace];
  models.forEach((dispatch) => dispatch());
}
