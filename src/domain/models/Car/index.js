export class Car {
  static Validation = {
    NAME_MAX_LENGTH: 5,
  };

  static ErrorMessages = {
    NAME_REQUIRED: '자동차 이름은 필수입니다.',
    NAME_MAX_LENGTH: `자동차 이름은 ${Car.Validation.NAME_MAX_LENGTH}자 이하이어야 합니다.`,
  };

  #name;
  #location = 0;
  #accelerator;

  constructor({ name, accelerator }) {
    if (!name || !name.trim()) {
      throw new Error(Car.ErrorMessages.NAME_REQUIRED);
    }
    if (name.trim().length > Car.Validation.NAME_MAX_LENGTH) {
      throw new Error(Car.ErrorMessages.NAME_MAX_LENGTH);
    }

    this.#name = name.trim();
    this.#accelerator = accelerator;
  }

  move() {
    if (!this.#accelerator.accelerate()) {
      return;
    }

    this.#location += 1;
  }

  get information() {
    return {
      name: this.#name,
      location: this.#location,
    };
  }
}
