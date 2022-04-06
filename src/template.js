export default function Template() {
  this.$forwardElement = null;
  this.$spinnerElement = null;

  this.forwardElementMaker = () => {
    this.$forwardElement = document.createElement('div');
    this.$forwardElement.className = 'forward-icon mt-2';
    this.$forwardElement.textContent = '⬇️';
  };

  this.spinnerElementMaker = () => {
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
    this.forwardElementMaker();
    this.spinnerElementMaker();
  };

  this.init();

  this.getForwardElement = () => this.$forwardElement;
  this.getSpinnerElement = () => this.$spinnerElement;
}
