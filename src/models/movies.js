import {Filters} from '../mocks/consts';
import {getCardsByFilter} from '../mocks/filter';

export default class Movies {
  constructor() {
    this._cards = [];
    this._activeFilterType = Filters.ALL;

    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  getCards() {
    return getCardsByFilter(this._cards, this._activeFilterType);
  }

  getAllCards() {
    return this._cards;
  }

  setCards(cards) {
    this._cards = Array.from(cards);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removeCard(id) {
    const index = this._cards.findIndex((card) => card.id === id);

    if (index === -1) {
      return false;
    }

    this._cards = [].concat(this._cards.slice(0, index), this._cards.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateCard(id, card) {
    const index = this._cards.findIndex((film) => film.id === id);

    if (index === -1) {
      return false;
    }

    this._cards = [].concat(this._cards.slice(0, index), card, this._cards.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
