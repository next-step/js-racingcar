import SETTINGS from '../settings.js';
import { disabled, popUp, qsById } from '../utils.js';

import Component from './Component.js';
import EntryName from '../domain/EntryName.js';

const Name = (({ stage, id, event, keyCode, string }) => {
  const renderingRouter = {
    data: [
      [
        currStage => currStage <= stage.entry,
        ({ inputCarName, submitCarName }) => {
          disabled(false, inputCarName, submitCarName);
          inputCarName.focus();
        },
      ],
      [
        currStage => currStage > stage.entry,
        ({ inputCarName, submitCarName }) => {
          disabled(true, inputCarName, submitCarName);
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
        inputCarName: qsById(id.inputCarName, el),
        submitCarName: qsById(id.submitCarName, el),
      });
      this.bindEvent();
    }

    bindEvent() {
      const { submitCarName, inputCarName } = privt.get(this);
      submitCarName.addEventListener(
        event.click,
        this.setEntryNames.bind(this),
      );
      inputCarName.addEventListener(event.keyup, ({ code }) => {
        if (code === keyCode.enter) submitCarName.click();
      });
    }

    setEntryNames(event) {
      event.preventDefault();
      const { app, inputCarName } = privt.get(this);

      try {
        const entryNames = inputCarName.value.split(string.comma);
        app.state = {
          entryNames: entryNames.map(EntryName.of),
          stage: stage.round,
        };
      } catch (err) {
        popUp(err);
        inputCarName.focus();
      }
    }

    render() {
      renderingRouter.route(privt.get(this));
    }
  };
})(SETTINGS);

export default Name;
