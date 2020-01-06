import AbstractComponent from '../abstract-components/component';
import {createShowButtonTemplate} from './template';

export default class Button extends AbstractComponent {
  getTemplate() {
    return createShowButtonTemplate();
  }

  setButtonClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
