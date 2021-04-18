class Car {
  constructor(playerName, targetEl) {
    this.playerName = playerName;
    this.targetEl = targetEl;
    this.loading = targetEl.querySelector('.loading');
    this.forwardCount = 0;
    this.interval = null;
  }

  run(times) {
    return new Promise((resolve) => {
      let tryCount = 0;
      this.interval = setInterval(() => {
        tryCount++;
        console.log(new Date(), this.playerName);

        this.loading.classList.remove('d-none');
        const randomNum = Math.floor(Math.random() * 10);
        const forward = randomNum > 3;

        this.loading.classList.add('d-none');

        if (forward) this.goForward();

        if (tryCount === times) {
          clearInterval(this.interval);
          this.interval = null;
          resolve([this.playerName, this.forwardCount]);
        }
      }, 2000);
    });
  }

  goForward() {
    this.forwardCount++;

    const forwardIcon = document.createElement('div');
    forwardIcon.className = 'forward-icon mt-2';
    forwardIcon.textContent = '⬇️';

    this.loading.before(forwardIcon);
  }
}
