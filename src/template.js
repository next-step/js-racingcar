export default function Template() {
  this.$forwardElement = null;
  this.$spinnerElement = null;

  this.initForwardElement = () => {
    this.$forwardElement = document.createElement('div');
    this.$forwardElement.className = 'forward-icon mt-2';
    this.$forwardElement.textContent = '⬇️';
  };

  this.initSpinnerElement = () => {
    this.$spinnerElement = document.createElement('div');
    this.$spinnerElement.className = 'd-flex justify-center mt-3';
    this.$spinnerElement.dataset.cy = 'spinner-icon';

    this.$spinnerElement.innerHTML = String.raw`
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    `;
  };

  this.init = () => {
    this.initForwardElement();
    this.initSpinnerElement();
  };

  this.init();
}

