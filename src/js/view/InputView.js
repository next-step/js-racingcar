export default class InputView {
  constructor() {
    this.hideRacingTryCount();
  }

  showRacingTryCount() {
    document.querySelector('#racing-try-count').style.display = '';
  }

  hideRacingTryCount() {
    document.querySelector('#racing-try-count').style.display = 'none';
  }
}
