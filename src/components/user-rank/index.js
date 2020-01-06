import AbstractComponent from '../abstract-components/component';

import {createUserRankTemplate} from './template';

export default class Rank extends AbstractComponent {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createUserRankTemplate(this._amount);
  }
}
