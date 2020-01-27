import AbstractComponent from '../abstract-components/component';
import {createFiltersTemplate} from './template';

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

export const MenuItem = {
  ALL: `All`,
  WATCHLIST: `Watchlist`,
  HISTOTY: `History`,
  FAVORITES: `Favorites`,
  STATS: `Statistics`
};

const ACTIVE_FILTER_CLASS = `main-navigation__item--active`;

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }

  setActive(oldFilter, newFilter) {
    this.getElement().querySelector(`#filter__${oldFilter}`).classList.remove(ACTIVE_FILTER_CLASS);
    this.getElement().querySelector(`#filter__${newFilter}`).classList.add(ACTIVE_FILTER_CLASS);
  }
}
