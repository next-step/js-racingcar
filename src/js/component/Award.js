import SETTINGS from '../settings.js';
import { popUp, qsById, timeout } from '../utils.js';

import Component from './Component.js';

const Award = (({ defaultVal, stage, id, klass, event, string, msg }) => {
  const awardEvent = new Event(event.award);
  const renderingRouter = {
    data: [
      [
        currStage => currStage < stage.award,
        ({ el, infoGameResult }) => {
          el.classList.add(klass.hidden);
          infoGameResult.innerHTML = string.empty;
        },
      ],
      [
        currStage => currStage >= stage.award,
        ({ app, el, infoGameResult }) => {
          const {
            racingGame: { winners },
          } = app.state;
          infoGameResult.innerHTML = winners.join(string.winnerDelimiter);
          el.classList.remove(klass.hidden);
          el.dispatchEvent(awardEvent);
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
        infoGameResult: qsById(id.infoGameResult, el),
        submitGameResult: qsById(id.submitGameResult, el),
      });
      this.bindEvent();
    }

    bindEvent() {
      const { el, submitGameResult } = privt.get(this);
      submitGameResult.addEventListener(
        event.click,
        this.resetStage.bind(this),
      );
      el.addEventListener(event.award, this.award.bind(this));
    }

    award() {
      timeout(() => popUp(msg.celebration), defaultVal.celebrationTerm);
    }

    resetStage() {
      const { app } = privt.get(this);
      app.reset();
    }

    render() {
      renderingRouter.route(privt.get(this));
    }
  };
})(SETTINGS);

export default Award;
