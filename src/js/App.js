import SETTINGS from './settings.js';

import Component from './component/Component.js';
import Name from './component/Name.js';
import Round from './component/Round.js';
import Race from './component/Race.js';
import Award from './component/Award.js';
import { qsById, values } from './utils.js';

const App = (({ stage, id }) => {
  const privt = new WeakMap();
  return class {
    constructor(sel) {
      privt.set(this, {
        el: qsById(sel),
        stage: stage.entry,
        name: new Name(this, id.userInputComp),
        round: new Round(this, id.raceTimesComp),
        race: new Race(this, id.gameProcessComp),
        award: new Award(this, id.gameResultComp),
      });
    }

    init() {
      this.render();
    }

    reset() {
      this.state = { stage: stage.entry };
    }

    get state() {
      return { ...privt.get(this) };
    }

    set state(state) {
      privt.set(this, { ...privt.get(this), ...state });
      this.render();
    }

    render() {
      values(privt.get(this))
        .filter(comp => comp instanceof Component)
        .forEach(comp => comp.render());
    }
  };
})(SETTINGS);

export default App;
