import AbstractComponent from '../abstract-components/component';
import {createFilmCardTempalate} from './template';

export default class Card extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmCardTempalate(this._card);
  }

  getHandlerElements() {
    const cardHandlerElements = [
      `.film-card__poster`,
      `.film-card__title`,
      `.film-card__comments`
    ];

    const elements = [];
    cardHandlerElements.forEach((container) => elements.push(this.getElement().querySelector(container)));

    return elements;
  }

  setClickHandler(handler) {
    this
    .getHandlerElements()
    .forEach((container) => {
      container.addEventListener(`click`, handler);
    });
  }

  setAddToWatchlistHandler(handler) {
    this
      .getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setAsWatchedHandler(handler) {
    this
      .getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setAddToFavoritesHandler(handler) {
    this
      .getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }

  turnOnHoverImitation() {
    this.getElement().classList.add(`hover`);
  }

  turnOffHoverImitation() {
    this.getElement().classList.remove(`hover`);
  }
}
