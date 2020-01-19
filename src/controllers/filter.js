import FilterComponent from '../components/filters/index';
import {Filters} from '../mocks/consts';
import {getCardsByFilter} from '../mocks/filter';
import {render, RenderPosition, replace} from '../utils/render';

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = Filters.ALL;
    this._filterComponent = null;
    this._handler = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);

  }

  render() {
    const container = this._container;
    const allCards = this._moviesModel.getAllCards();

    const filters = Object.values(Filters).map((filter) => {
      return {
        name: filter,
        count: getCardsByFilter(allCards, filter).length,
        checked: filter === this._activeFilterType
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    const oldFilter = this._activeFilterType;

    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;

    this._filterComponent.setActive(oldFilter, this._activeFilterType);

    this._handler(filterType);
  }

  _onDataChange() {
    this.render();
  }

  showScreen(handler) {
    this._handler = handler;
    // this._filterComponent.setFilterChangeHandler(handler);
  }

}
