export default class InputView {
  showRacingTryCount() {
    document.querySelector('#racing-try-count').style.display = '';
  }

  hideRacingTryCount() {
    document.querySelector('#racing-try-count').style.display = 'none';
  }
}
