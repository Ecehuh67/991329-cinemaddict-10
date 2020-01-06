import AbstractComponent from '../abstract-components/component';
import {createFiltersTemplate} from './template';

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}
