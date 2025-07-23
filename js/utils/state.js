export class State {
  #value = null;
  #subscribers = [];

  constructor(initialValue) {
    this.#value = initialValue;
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    if (this.#value !== newValue) {
      this.#value = newValue;
      this.#subscribers.forEach((subscriber) => subscriber());
    }
  }

  subscribe(subscriber) {
    this.#subscribers.push(subscriber);
  }
}
