class Car {
  constructor(name, targetEl) {
    this.name = name;
    this.targetEl = targetEl;
    this.loading = targetEl.querySelector('.loading');
    this.forwardCount = 0;
    this.interval = null;
  }

  run(times) {
    let tryCount = 0;
    this.interval = setInterval(() => {
      tryCount++;
      this.loading.classList.remove('d-none');
      const randomNum = Math.floor(Math.random() * 10);
      const forward = randomNum > 3;

      this.loading.classList.add('d-none');

      if (forward) this.goForward();

      if (tryCount === times) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }, 2000);
  }

  goForward() {
    this.forwardCount++;

    const forwardIcon = document.createElement('div');
    forwardIcon.className = 'forward-icon mt-2';
    forwardIcon.textContent = '⬇️';

    this.loading.before(forwardIcon);
  }
}
