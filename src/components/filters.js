import {createElement} from '../mocks/utils.js';

const createFilterMarkup = (filter, isActive) => {
  const {title, count} = filter;

  return (
    `<a href="#${title}" class="main-navigation__item
    ${isActive ? `main-navigation__item--active` : ``}">${title}
      <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

const createFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      ${filtersMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats
      </a>
    </nav>`
  );
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
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
