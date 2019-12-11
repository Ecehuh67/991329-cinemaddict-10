import {createElement} from '../mocks/utils.js';

const createContainerPageTemplate = () => {
  return `<section class="films"></section>`;
};


export default class Container {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createContainerPageTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
