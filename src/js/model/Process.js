class Process {
  #value = [];

  constructor(process) {
    this.#value = process;
  }

  set process(process) {
    if (!Array.isArray(process) || !process.every(v => typeof v === 'boolean')) {
      throw new Error('process는 boolean 배열이여야 합니다.');
    }
    this.#value = process;
  }

  get value() {
    return [...this.#value];
  }
}

export default Process;
