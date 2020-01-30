import AbstractComponent from '../abstract-components/component';
import {SortType, createSortTemplate} from './template';

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate(type) {
    return createSortTemplate(type);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }

  setActive(oldSort, newSort) {
    this.getElement().querySelector(`#sort__${oldSort}`).classList.remove(`sort__button--active`);
    this.getElement().querySelector(`#sort__${newSort}`).classList.add(`sort__button--active`);
  }
}
