import AbstractComponent from './abstract-component';

const createShowButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class Button extends AbstractComponent {
  getTemplate() {
    return createShowButtonTemplate();
  }

  setButtonClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
