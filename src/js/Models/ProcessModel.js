import { EventModel } from './EventModel.js';
import { Events } from '../constants.js';

export class ProcessModel extends EventModel {
  constructor(onComplete) {
    super();

    this.onComplete = onComplete;

    this.state = {
      isVisible: false,
      names: [],
      count: 0,
      process: [],
    };

    this.listeners = {
      [Events.PROCESS_SECTION_VISIBLE]: [],
      [Events.PROCESS_PRECEED]: [],
    };

    this.bindEvents();
  }

  bindEvents() {
    this.state = this.bindEventToProperty(this.state, {
      isVisible: (value) => {
        this.notify(Events.PROCESS_SECTION_VISIBLE, value);
      },
      process: (value) => {
        this.notify(Events.PROCESS_PRECEED, value);
      },
    });
  }

  startRacing() {
    this.createCars();
    this.proceed();
  }

  proceed() {
    this.state.process = this.state.process.map((car) => ({ ...car, proceeding: true }));

    setTimeout(() => {
      this.moveCars();

      if (this.shouldFinish()) {
        this.finish();
      } else {
        this.proceed();
      }
    }, 1000);
  }

  createCars() {
    this.state.process = this.state.names.map((name) => ({ name, progress: 0, proceeding: false }));
  }

  canMove() {
    return Math.random() * 9 >= 4;
  }

  moveCars() {
    this.state.process = this.state.process.map(({ name, progress }) => ({
      name,
      progress: this.canMove() ? progress + 1 : progress,
      proceeding: false,
    }));
  }

  shouldFinish() {
    return this.state.process.some(({ progress }) => progress === this.state.count);
  }

  finish() {
    const winners = this.state.process
      .filter(({ progress }) => progress === this.state.count)
      .map(({ name }) => name);

    this.onComplete(winners);
  }

  onClickResetBtn() {
    this.state.isVisible = false;
  }
}
