const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item
    ${isActive ? `main-navigation__item--active` : ``}" id="filter__${name}">${name}
      <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

export const createFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);

  return (
    `<nav class="main-navigation">
      ${filtersMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional" id ="filter__Statistics">Stats
      </a>
    </nav>`
  );
};
