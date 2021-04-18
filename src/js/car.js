class Car {
  constructor(playerName, targetEl) {
    this.playerName = playerName;
    this.targetEl = targetEl;
    this.loading = targetEl.querySelector('.loading');
    this.forwardCount = 0;
    this.interval = null;
  }

  canGoForward() {
    const randomNum = Math.floor(Math.random() * 10);
    return randomNum > 3;
  }

  toggleLoading(on) {
    this.loading.classList[on ? 'remove' : 'add']('d-none');
  }

  goForward() {
    this.forwardCount++;

    const forwardIcon = document.createElement('div');
    forwardIcon.className = 'forward-icon mt-2';
    forwardIcon.textContent = '⬇️';

    this.loading.before(forwardIcon);
  }

  finish() {
    clearInterval(this.interval);
    this.interval = null;
  }

  run(times) {
    return new Promise((resolve) => {
      let tryCount = 0;
      this.interval = setInterval(() => {
        tryCount++;

        this.toggleLoading(true);

        if (this.canGoForward()) this.goForward();

        this.toggleLoading(false);

        if (tryCount === times) {
          this.finish();
          resolve([this.playerName, this.forwardCount]);
        }
      }, 1000);
    });
  }
}
