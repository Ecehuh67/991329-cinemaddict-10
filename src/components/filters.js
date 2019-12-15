import AbstractComponent from './abstract-component';

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

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}
