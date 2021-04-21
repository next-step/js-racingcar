import SETTINGS from '../settings.js';
import { disabled, popUp, qsById } from '../utils.js';

import Component from './Component.js';
import TotalRound from '../domain/TotalRound.js';
import RacingGame from '../domain/RacingGame.js';

const Round = (({ stage, id, klass, event, keyCode }) => {
  const renderingRouter = {
    data: [
      [
        currStage => currStage < stage.round,
        ({ el, inputRaceTimes, submitRaceTimes }) => {
          el.classList.add(klass.hidden);
          disabled(true, inputRaceTimes, submitRaceTimes);
        },
      ],
      [
        currStage => currStage === stage.round,
        ({ el, inputRaceTimes, submitRaceTimes }) => {
          disabled(false, inputRaceTimes, submitRaceTimes);
          el.classList.remove(klass.hidden);
          inputRaceTimes.focus();
        },
      ],
      [
        currStage => currStage > stage.round,
        ({ el, inputRaceTimes, submitRaceTimes }) => {
          disabled(true, inputRaceTimes, submitRaceTimes);
          el.classList.remove(klass.hidden);
        },
      ],
    ],
    route(self) {
      this.data
        .filter(([validate]) => validate(self.app.state.stage))
        .forEach(([_, render]) => render(self));
    },
  };

  const privt = new WeakMap();
  return class extends Component {
    constructor(app, sel) {
      super();
      const el = qsById(sel, app.state.el);
      privt.set(this, {
        app,
        el,
        inputRaceTimes: qsById(id.inputRaceTimes, el),
        submitRaceTimes: qsById(id.submitRaceTimes, el),
      });
      this.bindEvent();
    }

    bindEvent() {
      const { submitRaceTimes, inputRaceTimes } = privt.get(this);
      submitRaceTimes.addEventListener(
        event.click,
        this.setTotalRound.bind(this),
      );
      inputRaceTimes.addEventListener(event.keyup, ({ code }) => {
        if (code === keyCode.enter) submitRaceTimes.click();
      });
    }

    setTotalRound(event) {
      event.preventDefault();
      const { app, inputRaceTimes } = privt.get(this);
      const { entryNames } = app.state;

      try {
        const totalRound = TotalRound.of(inputRaceTimes.value);
        app.state = {
          totalRound,
          racingGame: RacingGame.of(entryNames, totalRound),
          stage: stage.race,
        };
      } catch (err) {
        popUp(err);
        inputRaceTimes.focus();
      }
    }

    render() {
      renderingRouter.route(privt.get(this));
    }
  };
})(SETTINGS);

export default Round;
