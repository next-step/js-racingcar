import SETTINGS from '../settings.js';
import { qsById, timeout } from '../utils.js';

import Component from './Component.js';

const Race = (({ defaultVal, stage, id, event, delimiter }) => {
  const raceEvent = new Event(event.race);
  const renderingRouter = {
    data: [
      [
        currStage => currStage < stage.race,
        ({ el }) => (el.innerHTML = delimiter.empty),
      ],
      [
        currStage => currStage === stage.race,
        ({ app, el }) => {
          const {
            racingGame: { progress, isFinished },
          } = app.state;
          el.innerHTML = templatesCars(progress, isFinished);
          el.dispatchEvent(raceEvent);
        },
      ],
      [
        currStage => currStage > stage.race,
        ({ app, el }) => {
          const {
            racingGame: { progress, isFinished },
          } = app.state;
          el.innerHTML = templatesCars(progress, isFinished);
        },
      ],
    ],
    route(self) {
      this.data
        .filter(([validate]) => validate(self.app.state.stage))
        .forEach(([_, render]) => render(self));
    },
  };
  const templatesCars = (progress, isFinished) =>
    progress
      .map(
        ([name, laps]) => `
          <div class="mr-2">
            <div class="car-player">${name}</div> 
            ${Array(laps)
              .fill('<div class="forward-icon mt-2">⬇️️</div>')
              .join(delimiter.empty)} 
            ${
              isFinished
                ? delimiter.empty
                : `<div class="d-flex justify-center mt-3">
                    <div class="relative spinner-container">
                      <span class="material spinner"></span>
                    </div>
                  </div>`
            }
          </div>`,
      )
      .join(delimiter.empty);

  const privt = new WeakMap();
  return class extends Component {
    constructor(app) {
      super();
      const el = qsById(id.gameProcessComp, app.state.el);
      privt.set(this, { app, el });
      this.bindEvent();
    }

    bindEvent() {
      const { el } = privt.get(this);
      el.addEventListener(event.race, this.race.bind(this));
    }

    race() {
      const { app } = privt.get(this);
      let { racingGame } = app.state;

      racingGame.race();
      timeout(
        _ =>
          (app.state = {
            stage: racingGame.isFinished ? stage.award : stage.race,
          }),
        defaultVal.raceTerm,
      );
    }

    render() {
      renderingRouter.route(privt.get(this));
    }
  };
})(SETTINGS);

export default Race;
