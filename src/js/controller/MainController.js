import CarNameFormSection from '../view/CarNameFormSection.js';
import TryCountFormSection from '../view/TryCountFormSection.js';
import PlaySection from '../view/PlaySection.js';
import WinnerSection from '../view/WinnerSection.js';

export default class MainController {
  constructor({
    carNameFormSection,
    tryCountFormSection,
    playSection,
    winnerSection
  }) {
    this.carNameFormSection = new CarNameFormSection(carNameFormSection);
    this.tryCountFormSection = new TryCountFormSection(tryCountFormSection);
    this.playSection = new PlaySection(playSection);
    this.winnerSection = new WinnerSection(winnerSection);

    this.init();
  }

  init() {
    this.carNameFormSection.show().init();
    this.tryCountFormSection.hide().init();
    this.playSection.hide().render();
    this.winnerSection.hide().render();
  }
}
