const template = (name) => `
  <div class="mr-2">
    <div class="car-player">${name}</div>
    <div class="loading-spinner d-flex justify-center mt-4">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  </div>
`;

export default class Car {
  constructor(name) {
    this.name = name;
    this.isLoading = false;
    this.createCarTemplate();
  }

  createCarTemplate() {
    const div = document.createElement("div");
    div.innerHTML = template(this.name).trim();
    this.dom = div.firstChild;
    this.loadingSpinner = div.querySelector(".loading-spinner");
  }

  render() {
    this.isLoading
      ? this.loadingSpinner.classList.remove("hidden")
      : this.loadingSpinner.classList.add("hidden");

    return this.dom;
  }

  setLoading(value) {
    this.isLoading = value;
  }
}
