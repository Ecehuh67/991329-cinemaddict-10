import AbstractComponent from './abstract-component';
import {cardHandlerElements} from '../mocks/consts';

export const createFilmCardTempalate = (card) => {
  const {title, rate, year, duration, genre, poster, description, comments} = card;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments} ${comments === 1 ? `comment` : `comments`}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Card extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmCardTempalate(this._card);
  }

  getHandlerElements() {
    const elements = [];
    cardHandlerElements.forEach((it) => elements.push(this.getElement().querySelector(it)));

    return elements;
  }

  setClickHandler(handler) {
    this.getHandlerElements().forEach((it) => {
      it.addEventListener(`click`, handler);
    });
  }
}
