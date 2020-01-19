import AbstractComponent from './component';
import {replaceElements} from '../../utils/render';

const HIDDEN_CLASS = `visually-hidden`;

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();

    replaceElements(newElement, oldElement)

    this.recoverListeners();
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }
}
